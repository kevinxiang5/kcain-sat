import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { adminAuth } from "@/lib/firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim().toLowerCase() },
        });

        if (!user || !user.password) return null;

        if (!user.emailVerified) return null;

        const valid = await verifyPassword(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    // Firebase Google Sign-In: client pops up Firebase auth, sends us the ID token
    CredentialsProvider({
      id: "firebase-google",
      name: "Google",
      credentials: {
        firebaseToken: { label: "Firebase Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.firebaseToken) return null;
        try {
          // Verify the Firebase ID token with the kalshi-nono project
          const decoded = await adminAuth.verifyIdToken(credentials.firebaseToken);
          if (!decoded.email) return null;

          const email = decoded.email.toLowerCase();
          const name = decoded.name ?? decoded.email.split("@")[0];
          const image = decoded.picture ?? null;

          // Find or create user
          let user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            user = await prisma.user.create({
              data: { email, name, image, emailVerified: new Date() },
            });
          } else if (!user.emailVerified) {
            await prisma.user.update({
              where: { id: user.id },
              data: { emailVerified: new Date(), name: name ?? user.name, image: image ?? user.image },
            });
          }

          return { id: user.id, email: user.email, name: user.name, image: user.image };
        } catch (err) {
          console.error("[firebase-google] Token verification failed:", err);
          return null;
        }
      },
    }),

    // Legacy NextAuth Google OAuth (only active if env vars are set)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only handle OAuth providers (Google, etc.)
      if (account?.provider === "google") {
        if (!user.email) return false;

        try {
          // Find or create the user record
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true },
          });

          if (existingUser) {
            // User exists — link Google account if not already linked
            const alreadyLinked = existingUser.accounts.some(
              (a) => a.provider === "google" && a.providerAccountId === account.providerAccountId
            );
            if (!alreadyLinked) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                },
              });
            }
            // Ensure emailVerified is set for Google users
            if (!existingUser.emailVerified) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  emailVerified: new Date(),
                  image: user.image ?? existingUser.image,
                  name: user.name ?? existingUser.name,
                },
              });
            }
            // Pass the DB id back through so jwt callback gets the right id
            user.id = existingUser.id;
          } else {
            // New user — create them
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
                accounts: {
                  create: {
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                  },
                },
              },
            });
            user.id = newUser.id;
          }
          return true;
        } catch (err) {
          console.error("[Google signIn] DB error:", err);
          return false;
        }
      }
      // Credentials provider — already validated in authorize()
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
