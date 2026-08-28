import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Automatically detect Vercel vs GitHub Pages vs Local Development
const isVercel = Boolean(process.env.VERCEL);
const isProd = process.env.NODE_ENV === "production";
const base = isVercel ? "/" : (isProd ? "/TechiesHack-3.0-Doomsday-Protocol/" : "/");

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "motion/react", "sonner"],
  },
});
