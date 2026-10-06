/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Scans your Navbar
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans all your pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};