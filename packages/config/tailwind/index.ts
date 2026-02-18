import type { Config } from "tailwindcss";

export const link8Preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1a365d",
          600: "#152d4e",
          700: "#102440",
          800: "#0b1b31",
          900: "#061223",
        },
        accent: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        link: {
          navy: "#1a365d",
          dark: "#0f172a",
          gold: "#f59e0b",
          orange: "#f97316",
          gray: "#64748b",
          light: "#f8fafc",
        },
        cta: {
          DEFAULT: "#f97316",
          hover: "#ea580c",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          "Meiryo",
          "sans-serif",
        ],
      },
    },
  },
};
