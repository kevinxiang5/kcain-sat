"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Crown, BookOpen } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "5 lessons per day",
      "Math & Reading paths",
      "Basic progress tracking",
      "Streak counter",
    ],
    cta: "Get started",
    href: "/auth/signup",
    highlighted: false,
    icon: BookOpen,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Unlimited access for serious prep",
    features: [
      "Unlimited lessons",
      "Full practice test bank",
      "Detailed analytics",
      "Ad-free experience",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/auth/signup?plan=premium",
    highlighted: true,
    icon: Crown,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$79",
    period: "/year",
    description: "Best value—2 months free",
    features: [
      "Everything in Premium",
      "Save 34% vs monthly",
      "Full practice tests",
      "Score predictions",
    ],
    cta: "Get best value",
    href: "/auth/signup?plan=annual",
    highlighted: false,
    icon: Zap,
  },
];

export default function PlansPage() {
  return (
    <motion.div
      className="min-h-screen py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-sat-primary to-sat-crimson bg-clip-text text-transparent">
            Choose your plan
          </h1>
          <p className="text-sat-gray-600 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. No credit card required to begin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-sat-primary to-sat-crimson text-white shadow-2xl shadow-sat-primary/30 scale-105"
                    : "bg-white card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-sat-primary text-sm font-bold">
                    Most popular
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.highlighted ? "bg-white/20" : "bg-sat-primary/10"
                  } ${plan.highlighted ? "text-white" : "text-sat-primary"}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{plan.name}</h2>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-white/90" : "text-sat-gray-600"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? "text-white/80" : "text-sat-gray-500"}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <motion.span
                    className={`block w-full py-3 rounded-xl text-center font-bold ${
                      plan.highlighted
                        ? "bg-white text-sat-primary hover:bg-sat-cream"
                        : "btn-primary"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-sat-gray-500 text-sm mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          All plans include email verification. Cancel anytime.
        </motion.p>
      </div>
    </motion.div>
  );
}
