# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

No test runner is configured.

## Architecture

Single-page marketing website for Demma Intelligence. All visible content lives in one file (`app/page.tsx`) as a client component (`"use client"`) with scroll-anchor sections: `#projects`, `#about`, `#contact`. The only backend is a single API route (`app/api/contact/route.ts`) that sends email via Nodemailer over Gmail SMTP.

**Data flow for contact form:**
`app/page.tsx` (form state + fetch) → `POST /api/contact` → Nodemailer → Gmail SMTP

**Required environment variables** (in `.env.local`):
```
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
```
The API route checks for these at runtime and returns 500 if missing.

## Styling System

Tailwind CSS v4 with a fully custom `@theme` block in `app/globals.css`. Do **not** use arbitrary values or standard Tailwind palette colors — use the semantic tokens defined there (e.g. `bg-background`, `text-on-surface`, `text-primary`). Typography is handled via custom utility classes (`body-lg`, `headline-lg`, `display-lg`, etc.) defined with `@utility` in `globals.css`, not Tailwind's prose or text-size utilities.

Icons use Material Symbols Outlined loaded via Google Fonts. Render them as `<span className="material-symbols-outlined" translate="no">icon_name</span>`.
