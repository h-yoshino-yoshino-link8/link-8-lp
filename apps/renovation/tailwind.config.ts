import type { Config } from "tailwindcss";
import { link8Preset } from "@link8/tailwind-config";

const config: Config = {
  presets: [link8Preset as Config],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
export default config;
