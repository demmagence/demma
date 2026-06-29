# Demma Intelligence

Demma Intelligence is a modern web platform crafted to showcase open-source projects, team members, and handle secure contact inquiries with a clean, responsive interface. Built with a focus on intelligence and a human touch.

---

## Table of Contents
1. [Core Features](#core-features)
2. [Tech Stack](#tech-stack)
3. [Project Directory Structure](#project-directory-structure)
4. [Getting Started & Local Setup](#getting-started--local-setup)
5. [Environment Variables](#environment-variables)
6. [Building and Deployment](#building-and-deployment)

---

## Core Features

- **Responsive Landing Page**: Built using modern UI guidelines, utilizing Tailwind CSS v4 with custom responsive spacing tokens and theme values.
- **Open-Source Projects Grid**: Fully responsive project showcases featuring active repositories — CBT App (Dart), GlowMatch (Dart), OmniAgent Studio (TypeScript), and Kassa (TypeScript / Python).
- **Interactive Team Members Section**: Beautiful circular profile cards linking directly to their respective GitHub profiles. Includes premium custom spring elevation animations on hover (`shadow-xl` and `-translate-y-2` offset) designed to look consistent with project cards.
- **Secure Email Contact Form**: Fully validated frontend form coupled with an API route (`/api/contact`) powered by **Nodemailer** to securely dispatch customer inquiries directly to the team's inbox. Protected against abuse with a honeypot field and per-IP rate limiting, and against email header injection by sanitizing submitted values.
- **Translation-Safe UI**: Icon ligatures are protected with custom `translate="no"` attributes and `notranslate` classes to ensure Material Symbols render correctly even when translation tools (like Google Translate) are active.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Material Symbols Outlined](https://fonts.google.com/icons)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Email Dispatcher**: [Nodemailer](https://nodemailer.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Project Directory Structure

```text
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Secure Nodemailer API handler (honeypot + rate limit)
│   ├── globals.css              # Theme tokens & custom utility typographies
│   ├── layout.tsx               # Root layout, Plus Jakarta Sans, and icon loading
│   └── page.tsx                 # Fully interactive main landing page
├── public/
│   ├── icons/                   # Self-hosted tech-stack SVGs (Dart, TypeScript, Python)
│   └── images/                  # Core image assets (logo, profile pictures)
├── next.config.ts               # Next.js config (next/image SVG settings)
├── package.json                 # Project scripts and dependencies
├── pnpm-lock.yaml               # Package lockfile
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

---

## Getting Started & Local Setup

To run this project locally, ensure you have Node.js and `pnpm` installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/demmagence/demma.git
cd demma
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and configure the Gmail SMTP credentials (see [Environment Variables](#environment-variables) for details):
```bash
cp .env.example .env.local  # Or create it manually
```

### 4. Run the development server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Environment Variables

The email backend integration requires the following environment variables. Store these inside a local file named `.env.local` (this file is ignored by Git to keep credentials secure):

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

> [!IMPORTANT]
> The `GMAIL_APP_PASSWORD` must be a **16-digit App Password** generated from your Google Account settings, rather than your standard Gmail account password. Ensure that Multi-Factor Authentication is enabled on the sending account to generate this.

---

## Building and Deployment

### Build for Production
To create an optimized production build, run:
```bash
pnpm build
```

### Deploy to Vercel
The easiest way to deploy this Next.js application is via the [Vercel Platform](https://vercel.com/new). Make sure to configure the same environment variables (`GMAIL_USER` and `GMAIL_APP_PASSWORD`) in the Project Settings dashboard on Vercel.
