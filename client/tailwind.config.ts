import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add any other folders with JSX/TSX
  ],
  theme: {
    extend: {
      // your custom theme tweaks
    },
  },
  plugins: [
    // require("@tailwindcss/line-clamp"), // if you need line-clamp
  ],
};

export default tailwindConfig;
