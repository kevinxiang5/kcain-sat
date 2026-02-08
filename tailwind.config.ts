import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sat: {
          primary: "#FF6B35",
          "primary-dark": "#E85A2A",
          accent: "#FF4500",
          flame: "#FF5722",
          ember: "#E64A19",
          crimson: "#C62828",
          "crimson-dark": "#B71C1C",
          "ember-dark": "#BF360C",
          cream: "#FFF8F0",
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
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #FF6B35 0%, #FF4500 50%, #C62828 100%)",
        "gradient-card": "linear-gradient(145deg, #FFF8F0 0%, #FFE4D6 100%)",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
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
      },
    },
  },
  plugins: [],
};
export default config;
