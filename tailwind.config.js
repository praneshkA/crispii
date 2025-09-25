/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // 👈 tells Tailwind to scan all React/Vite files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
