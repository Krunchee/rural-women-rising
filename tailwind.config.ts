import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          dark: 'rgb(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
        },
        neutral: {
          light: 'rgb(var(--neutral-light))',
          dark: 'rgb(var(--primary-dark))',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
