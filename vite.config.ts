import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Default base to "/" for custom domain (Hostinger), Vercel, and local development.
// Only use GitHub repo subpath if GITHUB_PAGES env flag is set.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const base = isGithubPages ? "/TechiesHack-3.0-Doomsday-Protocol/" : "/";

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
