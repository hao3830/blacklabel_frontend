/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
   daisyui: {
        themes: [
          {'dark': {
    primary: "#661AE6",
    "primary-content": "#ffffff",
    secondary: "#D926AA",
    "secondary-content": "#ffffff",
    accent: "#1FB2A5",
    "accent-content": "#ffffff",
    neutral: "#191D24",
    "neutral-focus": "#111318",
    "neutral-content": "#A6ADBB",
    "base-100": "#2A303C",
    "base-200": "#242933",
    "base-300": "#20252E",
    "base-content": "#A6ADBB",
  },},
          'light',
        ]
    }
}
