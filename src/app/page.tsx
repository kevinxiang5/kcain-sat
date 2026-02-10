"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Target, Trophy, Zap, ArrowRight, CheckCircle, LayoutDashboard } from "lucide-react";
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
        {/* Graph paper + sine wave background */}
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
            {/* Multiple sine waves - mathematical graph aesthetic */}
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
              {session ? (
                <>
                  <Link href="/dashboard">
                    <motion.span
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold text-sat-primary bg-white hover:bg-sat-cream text-lg shadow-xl"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                  <Link href="/dashboard">
                    <motion.span
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold border-2 border-white/80 text-white hover:bg-white/15 text-lg"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue Learning
                    </motion.span>
                  </Link>
                </>
              ) : (
                <>
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
                  <Link href="/dashboard">
                    <motion.span
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-bold border-2 border-white/80 text-white hover:bg-white/15 text-lg"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try free
                    </motion.span>
                  </Link>
                </>
              )}
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
            {session ? (
              <Link href="/dashboard">
                <motion.span
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-display font-bold bg-white text-sat-primary hover:bg-sat-cream"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Go to Dashboard
                </motion.span>
              </Link>
            ) : (
              <>
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
              </>
            )}
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
