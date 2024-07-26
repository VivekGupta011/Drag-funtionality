import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-blue": "rgb(0 94 184 / <alpha-value>)",
        "bg-sky-blue": "rgb(238 247 249  / <alpha-value>)",
        "work-ratio-text-color": "rgb(0 94 184  / <alpha-value>)",
        "help-bg": "rgb(0 134 191  / <alpha-value>)",
        "footer-info": "rgb(0 64 122  / <alpha-value>)",
        "Card-text-color": "rgb(66 85 99 / <alpha-value>)",
        "add-btn-bg": "rgb(0 134 191 / <alpha-value>)",
        "add-top-border": "rgba(0, 134, 191, 0.3)",
        'custom-gray': '#D1D5DB',
      },
      textDecoration: {
        "yellow-underline": "underline yellow",
      },
    },
  },
  plugins: [],
}
export default config
