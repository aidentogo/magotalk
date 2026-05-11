import lineClamp from "@tailwindcss/line-clamp";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        magoGreen: "#00B88C",
        magoOrange: "#F15B2A",
      },
    },
  },
  plugins: [lineClamp],
};
export default config;
