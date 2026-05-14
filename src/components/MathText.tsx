"use client";
import React from "react";

// Unicode fractions and superscripts for zero-dependency math rendering
const FRACS: Record<string, string> = {
  "1/2": "½", "1/3": "⅓", "2/3": "⅔", "1/4": "¼", "3/4": "¾",
  "1/5": "⅕", "2/5": "⅖", "3/5": "⅗", "4/5": "⅘",
  "1/6": "⅙", "5/6": "⅚",
  "1/8": "⅛", "3/8": "⅜", "5/8": "⅝", "7/8": "⅞",
};
const SUP: Record<string, string> = {
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵",
  "6":"⁶","7":"⁷","8":"⁸","9":"⁹","n":"ⁿ","x":"ˣ","k":"ᵏ",
};
const GREEK: Record<string, string> = {
  pi:"π", theta:"θ", alpha:"α", beta:"β",
  gamma:"γ", delta:"Δ", sigma:"σ", lambda:"λ", omega:"ω", mu:"μ",
};

/**
 * Converts plain-text math patterns into proper symbols:
 *   (1/2) → ½    x^2 → x²    sqrt(x) → √x    pi → π    -> → →
 */
export function mathStr(text: string): string {
  return text
    // Operators
    .replace(/->/g, "→")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠")
    .replace(/\+-/g, "±")
    // Parenthesized fractions: (1/2) (3/4) etc.
    .replace(/\((\d+)\/(\d+)\)/g, (_, n, d) => FRACS[`${n}/${d}`] || `(${n}/${d})`)
    // Simple single-char/digit superscripts: x^2  x^n  (x)^2
    .replace(/\^([0-9nxk])/g, (_, e) => SUP[e] ?? `^${e}`)
    // Multi-char exponents in braces: x^{-1}  x^{2k}
    .replace(/\^\{([^}]+)\}/g, (_, e) => {
      if (e.length === 1 && SUP[e]) return SUP[e];
      // Map each char if possible, else wrap in Unicode combining
      return `^(${e})`;
    })
    // sqrt(expr)
    .replace(/sqrt\(([^)]+)\)/g, (_, c) => `√(${c})`)
    // Greek
    .replace(/\bpi\b/g, "π")
    .replace(/\btheta\b/g, "θ")
    .replace(/\balpha\b/g, "α")
    .replace(/\bbeta\b/g, "β")
    .replace(/\bgamma\b/g, "γ")
    .replace(/\bdelta\b/g, "Δ")
    .replace(/\bsigma\b/g, "σ");
}

/**
 * Inline component — renders math text with proper symbols.
 * Usage: <MathText>{someString}</MathText>
 */
export function MathText({ children, className }: { children: string; className?: string }) {
  return <span className={className}>{mathStr(children)}</span>;
}
