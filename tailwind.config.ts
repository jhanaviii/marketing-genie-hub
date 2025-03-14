
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom neon colors
        "neon-blue": "#01CDFE",
        "neon-purple": "#B967FF",
        "neon-pink": "#FF71CE",
        "neon-green": "#05FFA1",
        "neon-yellow": "#FFFB96",
        // Premium UI colors
        "premium-blue": "#4F46E5",
        "premium-purple": "#7C3AED",
        "premium-pink": "#EC4899",
        "premium-indigo": "#6366F1",
        "premium-teal": "#0D9488",
        "premium-orange": "#F97316",
      },
      backgroundImage: {
        "shimmer": "linear-gradient(to right, #4d4d4d 0%, #ffffff 20%, #4d4d4d 40%, #4d4d4d 100%)",
        "cyber-grid": "linear-gradient(rgba(65, 184, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(65, 184, 255, 0.05) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "light-gradient": "linear-gradient(to bottom right, #ffffff, #f7f9fc, #edf2f7)",
        "cool-gradient": "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "warm-gradient": "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
        "premium-gradient": "linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)",
        "subtle-gradient": "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "text-shimmer": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "0 0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "text-shimmer": "text-shimmer 5s linear infinite",
        "gradient-flow": "gradient-flow 5s ease infinite",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.3s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-out": "fade-out 0.3s ease-in forwards",
        "pulse": "pulse 1.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
