import nodemailer from 'nodemailer';

// Simple in-memory rate limiter. Note: on serverless this is per-instance
// and resets on cold start, so it is a lightweight burst guard rather than a
// strict global limit. For stronger guarantees use a shared store (e.g. Redis).
const RATE_LIMIT_MAX = 5; // requests allowed per window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLimitHits.get(ip) ?? []).filter((t) => t > windowStart);
  hits.push(now);
  rateLimitHits.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot: real users never see or fill the "website" field. If it has a
    // value, silently accept the request without sending so bots get no signal.
    if (typeof website === 'string' && website.trim() !== '') {
      return Response.json({ success: true, code: 'SENT', message: 'Email sent successfully.' }, { status: 200 });
    }

    // Rate limit by client IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (isRateLimited(ip)) {
      return Response.json(
        { code: 'RATE_LIMITED', error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { code: 'MISSING_FIELDS', error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { code: 'INVALID_EMAIL', error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.');
      return Response.json(
        { code: 'SERVICE_UNAVAILABLE', error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Strip control characters (incl. CR/LF) to prevent email header injection
    const safeName = name.replace(/[\r\n\t]+/g, ' ').trim();

    // Compose the email
    const mailOptions = {
      from: `"Demma Intelligence Website" <${gmailUser}>`,
      to: 'demmagence@gmail.com',
      // Use the address-object form so Nodemailer encodes the display name safely
      replyTo: { name: safeName, address: email },
      subject: `[Contact Form] New message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="margin:0;padding:32px 16px;background:#f3efe4;color:#101b4c;font-family:'Plus Jakarta Sans','Segoe UI',Arial,sans-serif;">
          <div style="max-width:620px;margin:0 auto;">
            <div style="padding:36px;background:#ff8589;border-radius:20px;">
              <p style="margin:0 0 28px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Demma Intelligence</p>
              <h1 style="max-width:500px;margin:0;font-size:36px;line-height:1.05;letter-spacing:-1.5px;color:#101b4c;">A new message has arrived.</h1>
              <p style="margin:18px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.5;color:#101b4c;">Someone reached out through the Demma website.</p>
            </div>

            <div style="margin-top:12px;padding:32px;background:#fbf8f0;border-radius:20px;">
              <div style="margin-bottom:12px;padding:18px 20px;background:#f3efe4;border-radius:12px;">
                <p style="margin:0 0 7px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ff4038;">Name</p>
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.4;color:#101b4c;">${escapeHtml(name)}</p>
              </div>

              <div style="margin-bottom:12px;padding:18px 20px;background:#f3efe4;border-radius:12px;">
                <p style="margin:0 0 7px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ff4038;">Email</p>
                <a href="mailto:${escapeHtml(email)}" style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.4;color:#2d58ce;text-decoration:none;word-break:break-word;">${escapeHtml(email)}</a>
              </div>

              <div style="padding:22px 20px;background:#101b4c;border-radius:12px;">
                <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ff8589;">Message</p>
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.6;white-space:pre-wrap;color:#fbf8f0;">${escapeHtml(message)}</p>
              </div>

              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;margin-top:24px;padding:14px 18px;background:#2d58ce;border-radius:6px;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:.7px;text-decoration:none;text-transform:uppercase;">Reply to ${escapeHtml(safeName)}</a>
            </div>

            <p style="margin:22px 0 0;text-align:center;font-size:11px;line-height:1.5;color:#3e4563;">Sent from the contact form at <a href="https://demma.vercel.app/" style="color:#2d58ce;text-decoration:none;">demma.vercel.app</a></p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, code: 'SENT', message: 'Email sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return Response.json(
      { code: 'SEND_FAILED', error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper to escape HTML to prevent XSS in email content
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
