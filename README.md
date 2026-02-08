# kcain — SAT Prep (Math + Reading)

A modern SAT preparation platform where math meets reading. Structured lessons, practice questions, and gamified progress.

## Features

- **kcain branding** — Sine wave + book logo, orange/red gradient theme
- **Learning path** — 18+ lessons across Math and Reading & Writing
- **Real auth** — Sign up, email verification (Resend), secure login
- **Practice bank** — 30+ SAT-style questions, randomized by topic
- **Subscription plans** — Free, Premium, Annual (pricing page ready)
- **Dashboard** — XP, streaks, daily goals, strengths/weaknesses

## Tech Stack

- Next.js 14, React, TypeScript
- Tailwind CSS, Framer Motion
- NextAuth.js (credentials)
- Prisma + SQLite (or PostgreSQL)
- Resend (email verification)
- bcryptjs (password hashing)

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — SQLite: `file:./dev.db` (default)
- `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000`
- `RESEND_API_KEY` — (optional) From [resend.com](https://resend.com) for email verification. Without it, the signup success page shows the verification link for dev.

### 3. Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Auth Flow

1. **Sign up** → Creates user with hashed password, sends verification email (or shows link in dev)
2. **Verify email** → User clicks link, `emailVerified` set
3. **Log in** → Credentials checked against DB

## Project Structure

```
src/
├── app/
│   ├── api/auth/         # signup, verify-email, nextauth
│   ├── auth/             # login, signup, verify-email pages
│   ├── learn/            # skill tree, lesson viewer
│   ├── practice/         # question bank, topic sessions
│   ├── plans/            # subscription pricing
│   └── dashboard/
├── components/
│   ├── layout/           # Navigation, KcainLogo
│   ├── learn/            # SkillTree, LessonViewer
│   └── dashboard/        # ProgressTracker
├── lib/
│   ├── auth.ts           # bcrypt, Resend, verification
│   ├── lessons.ts        # 18 lessons + questions
│   ├── questions.ts      # 30+ practice questions
│   └── prisma.ts
```

## Scripts

- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run db:push` — Sync Prisma schema
- `npm run db:studio` — Prisma Studio
