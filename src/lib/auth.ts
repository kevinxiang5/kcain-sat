import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const SALT_ROUNDS = 10;
const VERIFY_EXPIRY_HOURS = 24;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function createVerificationToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + VERIFY_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  return token;
}

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set - skipping email send. Token:", token);
    return false;
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Cain <onboarding@resend.dev>",
    to: email,
    subject: "Verify your Cain account",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #FF6B35;">Verify your email</h1>
        <p>Thanks for signing up for Cain. Click the button below to verify your email and start learning.</p>
        <a href="${verifyUrl}" style="display: inline-block; margin: 16px 0; padding: 12px 24px; background: linear-gradient(135deg, #FF6B35, #C62828); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Verify Email
        </a>
        <p style="color: #666; font-size: 14px;">Or copy this link: ${verifyUrl}</p>
        <p style="color: #999; font-size: 12px;">This link expires in ${VERIFY_EXPIRY_HOURS} hours.</p>
      </div>
    `,
  });

  return !error;
}

export async function verifyEmailToken(email: string, token: string): Promise<boolean> {
  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token },
  });
  if (!record || record.expires < new Date()) return false;
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  return true;
}

// ----- Password reset (uses VerificationToken with identifier "password-reset:email")
const RESET_EXPIRY_HOURS = 1;
const RESET_PREFIX = "password-reset:";

function resetIdentifier(email: string): string {
  return RESET_PREFIX + email.trim().toLowerCase();
}

export async function createPasswordResetToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + RESET_EXPIRY_HOURS * 60 * 60 * 1000);
  const identifier = resetIdentifier(email);
  await prisma.verificationToken.deleteMany({ where: { identifier } });
  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  });
  return token;
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set - skipping reset email. Token:", token);
    return false;
  }
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Cain <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Cain password",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="color: #FF6B35;">Reset your password</h1>
        <p>You requested a password reset. Click the button below to set a new password.</p>
        <a href="${resetUrl}" style="display: inline-block; margin: 16px 0; padding: 12px 24px; background: linear-gradient(135deg, #FF6B35, #C62828); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Reset Password
        </a>
        <p style="color: #666; font-size: 14px;">Or copy this link: ${resetUrl}</p>
        <p style="color: #999; font-size: 12px;">This link expires in ${RESET_EXPIRY_HOURS} hour(s). If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });
  return !error;
}

export async function verifyPasswordResetToken(email: string, token: string): Promise<boolean> {
  const identifier = resetIdentifier(email);
  const record = await prisma.verificationToken.findFirst({
    where: { identifier, token },
  });
  if (!record || record.expires < new Date()) return false;
  await prisma.verificationToken.deleteMany({ where: { identifier } });
  return true;
}
