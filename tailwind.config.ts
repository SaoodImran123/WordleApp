import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        emptyCircle: '#ccdffd',
        greenCircle: '#7ed957',
        orangeCircle: '#ffbd59',
        grayCircle: '#a6a6a6',
        circleText: '#e6f0ff',
        textColor: '#92acd6',
        gradientTop: '#e4ffef',
        gradientBot: '#d7e4ff'
      }
    },
    fontFamily: {
      sans: ['var(--font-fredoka)']
    },
  },
  plugins: [],
};
export default config;
