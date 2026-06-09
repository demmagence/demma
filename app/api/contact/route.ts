import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.');
      return Response.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
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

    // Compose the email
    const mailOptions = {
      from: `"Demma Intelligence Website" <${gmailUser}>`,
      to: 'demmagence@gmail.com',
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact Form] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #fdf8fd; border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #003db4, #2b57d0); padding: 24px 32px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 20px; font-weight: 700; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">New Contact Form Message</h1>
            <p style="color: #d4dbff; margin: 8px 0 0 0; font-size: 14px; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">From Demma Intelligence Website</p>
          </div>
          
          <div style="background: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #c4c5d6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e5e1e7; color: #434654; font-weight: 600; width: 100px; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">Name</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e5e1e7; color: #1c1b1f; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e5e1e7; color: #434654; font-weight: 600; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">Email</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e5e1e7; color: #1c1b1f; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #003db4; text-decoration: none;">${escapeHtml(email)}</a>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 16px; background-color: #f1ecf2; border-radius: 8px;">
              <p style="color: #434654; font-weight: 600; margin: 0 0 8px 0; font-size: 14px; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">Message</p>
              <p style="color: #1c1b1f; margin: 0; line-height: 1.6; white-space: pre-wrap; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">${escapeHtml(message)}</p>
            </div>
          </div>
          
          <p style="color: #747685; font-size: 12px; text-align: center; margin-top: 24px; font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;">
            This email was sent from the contact form at <a href="https://demma.vercel.app/" style="color: #003db4; text-decoration: none;">demma.vercel.app</a>
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: 'Email sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return Response.json(
      { error: 'Failed to send email. Please try again later.' },
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
