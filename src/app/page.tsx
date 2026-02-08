"use client";

import Link from "next/link";
import { BookOpen, Target, Trophy, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sat-primary via-sat-flame to-sat-crimson text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        {/* Decorative: sine wave + book motif */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-20 hidden lg:block">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20 100 Q50 50 80 100 T140 100 T200 100" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <rect x="60" y="40" width="80" height="120" rx="4" fill="none" stroke="white" strokeWidth="3" />
            <path d="M100 40 L100 160" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight"
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              Math meets Reading.
              <span className="block text-white drop-shadow-2xl mt-2">Meet kcain.</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl leading-relaxed"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Structured SAT prep where sine curves meet sentence structure. Build streaks, earn XP, and level up your score.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/auth/signup">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold text-sat-primary bg-white hover:bg-sat-cream text-lg shadow-xl"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <Link href="/learn">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold border-2 border-white/80 text-white hover:bg-white/15 text-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
Try free
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sat-cream to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-sat-cream">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-sat-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why kcain?
          </motion.h2>
          <motion.p
            className="text-sat-gray-600 text-center max-w-2xl mx-auto mb-20 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Reimagined SAT prep—structured, engaging, and effective.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: BookOpen, title: "Structured Path", description: "Visual skill tree with Math and Reading tracks. Unlock 18+ lessons as you progress." },
              { icon: Zap, title: "5–10 Min Lessons", description: "Short, focused sessions. Learn concepts then practice immediately." },
              { icon: Trophy, title: "XP & Streaks", description: "Earn points, build daily streaks. Gamified progress tracking." },
              { icon: Target, title: "SAT-Style Questions", description: "Realistic multiple choice with detailed explanations." },
            ].map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="card p-8 hover:shadow-2xl hover:shadow-sat-primary/10 transition-all duration-300 border-sat-gray-100"
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary/10 to-sat-crimson/10 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-7 h-7 text-sat-primary" />
                </motion.div>
                <h3 className="font-display font-bold text-xl mb-3">{title}</h3>
                <p className="text-sat-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-sat-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <p className="text-sat-gray-600 text-center max-w-2xl mx-auto mb-20">Start today. Build momentum. Ace the SAT.</p>

          <div className="max-w-3xl mx-auto space-y-10">
            {[
              { step: 1, title: "Sign up in seconds", desc: "Create a free account. No credit card required." },
              { step: 2, title: "Choose your path", desc: "Pick Math or Reading & Writing. 18+ lessons to unlock." },
              { step: 3, title: "Complete lessons", desc: "5–10 minute lessons with concepts and practice. Immediate feedback." },
              { step: 4, title: "Track & improve", desc: "Dashboard, streaks, topic strengths. Unlock premium for unlimited access." },
            ].map(({ step, title, desc }) => (
              <motion.div
                key={step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step * 0.1 }}
              >
                <motion.div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary to-sat-crimson text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-sat-primary/30"
                  whileHover={{ scale: 1.1 }}
                >
                  {step}
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">{title}</h3>
                  <p className="text-sat-gray-600">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-sat-primary via-sat-flame to-sat-crimson text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to start?
          </motion.h2>
          <p className="text-white/95 text-lg mb-10 max-w-xl mx-auto">
            Join students leveling up their SAT scores with kcain.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/auth/signup">
              <motion.span
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-display font-bold bg-white text-sat-primary hover:bg-sat-cream"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up Free
                <CheckCircle className="w-5 h-5" />
              </motion.span>
            </Link>
            <Link href="/auth/login">
              <motion.span
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-display font-bold border-2 border-white hover:bg-white/15"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Log In
              </motion.span>
            </Link>
          </motion.div>
          <p className="mt-8 text-sm text-white/85">Free tier: 5 lessons/day • Premium: Unlimited • <Link href="/plans" className="underline hover:no-underline">View plans</Link></p>
        </div>
      </section>

      <footer className="py-10 bg-sat-gray-900 text-sat-gray-400 text-center text-sm">
        <p>© {new Date().getFullYear()} kcain</p>
      </footer>
    </div>
  );
}
