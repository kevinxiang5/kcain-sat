import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createVerificationToken, sendVerificationEmail } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        password: hashed,
        emailVerified: null,
      },
    });

    const token = await createVerificationToken(user.email);
    const sent = await sendVerificationEmail(user.email, token);

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/auth/verify-email?token=${token}&email=${encodeURIComponent(user.email)}`;

    return NextResponse.json({
      success: true,
      message: sent
        ? "Account created. Check your email to verify."
        : "Account created. Verification email could not be sent—check console for link in dev.",
      verifyUrl: !sent ? verifyUrl : undefined,
    });
  } catch (e) {
    console.error("Signup error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
