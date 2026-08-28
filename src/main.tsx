import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LenisProvider } from "@/providers/LenisProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </StrictMode>
);
