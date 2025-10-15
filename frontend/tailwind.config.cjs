/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add dynamic grid column classes for board sizes
        "board-2": "repeat(2, minmax(0, 1fr))",
        "board-3": "repeat(3, minmax(0, 1fr))",
        "board-4": "repeat(4, minmax(0, 1fr))",
        "board-5": "repeat(5, minmax(0, 1fr))",
        "board-6": "repeat(6, minmax(0, 1fr))",
        "board-7": "repeat(7, minmax(0, 1fr))",
        "board-8": "repeat(8, minmax(0, 1fr))",
        "board-9": "repeat(9, minmax(0, 1fr))",
        "board-10": "repeat(10, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
