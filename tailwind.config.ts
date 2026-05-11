import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sat: {
          // Legacy colors kept for backward compat in app pages
          primary: "#FF6B35",
          "primary-dark": "#E85A2A",
          accent: "#FF4500",
          flame: "#FF5722",
          ember: "#E64A19",
          crimson: "#C62828",
          "crimson-dark": "#B71C1C",
          "ember-dark": "#BF360C",
          cream: "#FFF8F0",
          // Neutral grays (light mode)
          gray: {
            50: "#FAFAFA",
            100: "#F0F0F0",
            200: "#E0E0E0",
            300: "#BDBDBD",
            400: "#9E9E9E",
            500: "#757575",
            600: "#616161",
            700: "#424242",
            800: "#212121",
            900: "#121212",
          },
          // ── New dark-mode navy palette ──
          night: "#060B18",    // deepest background
          dusk: "#0D1627",     // surface / sidebar
          slate: "#122033",    // cards
          horizon: "#1E3A5F", // borders
          azure: "#2563EB",   // primary accent (not neon)
          frost: "#E8F0FF",   // body text (dark mode)
          mist: "#8BA5C5",    // secondary text (dark mode)
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        "gradient-card": "linear-gradient(145deg, #FFFFFF 0%, #F0F0F0 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(0,0,0,0.12), 0 0 30px rgba(0,0,0,0.06)",
        glow: "0 0 30px rgba(0,0,0,0.18), 0 0 60px rgba(0,0,0,0.08)",
        "glow-lg": "0 0 60px rgba(0,0,0,0.25), 0 0 100px rgba(0,0,0,0.12)",
        "glow-white": "0 0 20px rgba(255,255,255,0.7), 0 0 50px rgba(255,255,255,0.35)",
        "glow-blue": "0 0 20px rgba(37,99,235,0.3), 0 0 45px rgba(37,99,235,0.15)",
        "glow-blue-lg": "0 0 40px rgba(37,99,235,0.45), 0 0 90px rgba(37,99,235,0.2)",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1.5deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
