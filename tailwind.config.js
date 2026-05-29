/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        lumen: {
          bg: "#151619",
          surface: "#141116",
          border: "#46404f",
          text: "#f5f4f6",
          hover: "#1d1f24",
        },
      },

      fontFamily: {
        plex: ['"IBM Plex Mono"', "monospace"],
      },

    },
  },

  plugins: [],
}
