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
        emptyCircle: '#ffffff',
        greenCircle: '#7ed957',
        orangeCircle: '#ffbd59',
        grayCircle: '#a6a6a6',
        circleText: '#e6f0ff',
        navTextColor: '#ffffff',
        gradientLeft: '#8561d5',
        gradientRight: '#079df1',
        keyboardCol1: '#8462d5',
        keyboardCol2: '#7e65d6',
        keyboardCol3: '#7369d8',
        keyboardCol4: '#6371dc',
        keyboardCol5: '#4e7ce1',
        keyboardCol6: '#3886e6',
        keyboardCol7: '#2390ea',
        keyboardCol8: '#1497ed',
        keyboardCol9: '#0b9bf0',
        keyboardCol10: '#079df1',
      }
    },
    fontFamily: {
      sans: ['var(--font-fredoka)']
    },
  },
  plugins: [],
};
export default config;
