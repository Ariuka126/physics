import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], display: ["Fraunces", "Georgia", "serif"] } } },
  plugins: [],
} satisfies Config;
