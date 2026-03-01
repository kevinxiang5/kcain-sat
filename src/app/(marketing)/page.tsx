"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Target, Trophy, Zap, ArrowRight, CheckCircle, LayoutDashboard, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { KcainLogo } from "@/components/layout/KcainLogo";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sat-primary via-sat-flame to-sat-crimson text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50 T550,50 T600,50 T650,50 T700,50 T750,50 T800,50 T850,50 T900,50 T950,50 T1000,50 T1050,50 T1100,50 T1150,50 T1200,50" fill="none" stroke="url(#waveGrad)" strokeWidth="3" strokeLinecap="round" className="translate-y-[10vh]" />
            <path d="M0,150 Q25,120 50,150 T100,150 T150,150 T200,150 T250,150 T300,150 T350,150 T400,150 T450,150 T500,150 T550,150 T600,150 T650,150 T700,150 T750,150 T800,150 T850,150 T900,150 T950,150 T1000,150 T1050,150 T1100,150 T1150,150 T1200,150" fill="none" stroke="url(#waveGrad)" strokeWidth="2" strokeLinecap="round" className="translate-y-[30vh]" opacity="0.7" />
            <path d="M0,250 Q25,220 50,250 T100,250 T150,250 T200,250 T250,250 T300,250 T350,250 T400,250 T450,250 T500,250 T550,250 T600,250 T650,250 T700,250 T750,250 T800,250 T850,250 T900,250 T950,250 T1000,250 T1050,250 T1100,250 T1150,250 T1200,250" fill="none" stroke="url(#waveGrad)" strokeWidth="2.5" strokeLinecap="round" className="translate-y-[50vh]" opacity="0.5" />
            <path d="M0,350 Q25,320 50,350 T100,350 T150,350 T200,350 T250,350 T300,350 T350,350 T400,350 T450,350 T500,350 T550,350 T600,350 T650,350 T700,350 T750,350 T800,350 T850,350 T900,350 T950,350 T1000,350 T1050,350 T1100,350 T1150,350 T1200,350" fill="none" stroke="url(#waveGrad)" strokeWidth="2" strokeLinecap="round" className="translate-y-[70vh]" opacity="0.4" />
            <path d="M0,100 Q50,60 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100 T900,100 T1000,100 T1100,100 T1200,100" fill="none" stroke="url(#waveGrad)" strokeWidth="1.5" strokeLinecap="round" className="translate-y-[20vh]" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
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
              <Link href="/auth/login">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold border-2 border-white/80 text-white hover:bg-white/15 text-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Log in
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sat-cream to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-sat-cream dark:bg-sat-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-sat-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why kcain?
          </motion.h2>
          <motion.p
            className="text-sat-gray-600 dark:text-sky-200 text-center max-w-2xl mx-auto mb-20 text-lg"
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
              { icon: BookOpen, title: "Structured Path", description: "Visual skill tree with Math and Reading tracks. Unlock all 24 lessons as you progress." },
              { icon: Zap, title: "5–10 Min Lessons", description: "Short, focused sessions. Learn concepts then practice immediately." },
              { icon: Trophy, title: "XP & Streaks", description: "Earn points, build daily streaks. Gamified progress tracking." },
              { icon: Target, title: "SAT-Style Questions", description: "Realistic multiple choice with detailed explanations." },
            ].map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="card p-8 hover:shadow-2xl hover:shadow-sat-primary/10 dark:hover:shadow-sky-500/10 transition-all duration-300 border-sat-gray-100 dark:border-sat-gray-700"
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary/10 to-sat-crimson/10 dark:from-sky-500/20 dark:to-sky-600/20 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-7 h-7 text-sat-primary dark:text-sky-400" />
                </motion.div>
                <h3 className="font-display font-bold text-xl mb-3 dark:text-white">{title}</h3>
                <p className="text-sat-gray-600 dark:text-sky-200 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subscriptions / Plans Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-sat-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-sat-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Plans & pricing
          </motion.h2>
          <p className="text-sat-gray-600 dark:text-sky-200 text-center max-w-2xl mx-auto mb-16">
            Start free. Upgrade when you&apos;re ready. No credit card required to begin.
          </p>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div className="card p-6" variants={fadeUp}>
              <div className="w-12 h-12 rounded-xl bg-sat-primary/10 dark:bg-sky-500/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-sat-primary dark:text-sky-400" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1 dark:text-white">Free</h3>
              <p className="text-3xl font-bold text-sat-gray-900 dark:text-white">$0</p>
              <p className="text-sm text-sat-gray-600 dark:text-sky-200 mb-4">forever</p>
              <ul className="space-y-2 text-sm text-sat-gray-700 dark:text-sky-100 mb-6">
                <li>5 lessons per day</li>
                <li>Math & Reading paths</li>
                <li>Basic progress & streaks</li>
              </ul>
              <Link href="/auth/signup" className="btn-secondary block text-center py-2.5">Get started</Link>
            </motion.div>
            <motion.div className="card p-6 border-2 border-sat-primary dark:border-sky-500 relative" variants={fadeUp}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sat-primary dark:bg-sky-500 text-white text-xs font-bold">Popular</div>
              <div className="w-12 h-12 rounded-xl bg-sat-primary/20 dark:bg-sky-500/30 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-sat-primary dark:text-sky-400" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1 dark:text-white">Premium</h3>
              <p className="text-3xl font-bold text-sat-gray-900 dark:text-white">$9.99<span className="text-base font-normal text-sat-gray-500">/month</span></p>
              <p className="text-sm text-sat-gray-600 dark:text-sky-200 mb-4">Unlimited access</p>
              <ul className="space-y-2 text-sm text-sat-gray-700 dark:text-sky-100 mb-6">
                <li>Unlimited lessons</li>
                <li>Full practice test bank</li>
                <li>Detailed analytics</li>
                <li>Ad-free</li>
              </ul>
              <Link href="/auth/signup?plan=premium" className="btn-primary block text-center py-2.5">Start free trial</Link>
            </motion.div>
            <motion.div className="card p-6" variants={fadeUp}>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1 dark:text-white">Annual</h3>
              <p className="text-3xl font-bold text-sat-gray-900 dark:text-white">$79<span className="text-base font-normal text-sat-gray-500">/year</span></p>
              <p className="text-sm text-sat-gray-600 dark:text-sky-200 mb-4">Save 34%</p>
              <ul className="space-y-2 text-sm text-sat-gray-700 dark:text-sky-100 mb-6">
                <li>Everything in Premium</li>
                <li>2 months free</li>
                <li>Full practice tests</li>
              </ul>
              <Link href="/auth/signup?plan=annual" className="btn-secondary block text-center py-2.5">Get best value</Link>
            </motion.div>
          </motion.div>
          <p className="text-center mt-8">
            <Link href="/plans" className="text-sat-primary dark:text-sky-400 font-medium hover:underline inline-flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              View full plan details
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-sat-cream dark:bg-sat-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-sat-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <p className="text-sat-gray-600 dark:text-sky-200 text-center max-w-2xl mx-auto mb-20">Sign up to unlock lessons, practice, and full tests. No questions on this page—everything happens after you log in.</p>

          <div className="max-w-3xl mx-auto space-y-10">
            {[
              { step: 1, title: "Sign up in seconds", desc: "Create a free account. No credit card required." },
              { step: 2, title: "Log in", desc: "You’ll be taken to your private dashboard—separate from this page." },
              { step: 3, title: "Use the app", desc: "Lessons, Full Test, Calendar, and Practice live in the app. Tabs on the left." },
              { step: 4, title: "Track & improve", desc: "Build streaks, earn XP, and unlock premium for unlimited access." },
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
                  className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-sat-primary to-sat-crimson dark:from-sky-500 dark:to-sky-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-sat-primary/30 dark:shadow-sky-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  {step}
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1 dark:text-white">{title}</h3>
                  <p className="text-sat-gray-600 dark:text-sky-200">{desc}</p>
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
            Sign up to access your dashboard, lessons, full tests, and calendar.
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
          <p className="mt-8 text-sm text-white/85">Free: 5 lessons/day • Premium: Unlimited • <Link href="/plans" className="underline hover:no-underline">View plans</Link></p>
        </div>
      </section>

      <footer className="py-10 bg-sat-gray-900 text-sat-gray-400 dark:text-sky-300/80 text-center text-sm">
        <p>© {new Date().getFullYear()} kcain</p>
      </footer>
    </div>
  );
}
