module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          100: '#1A1A1A',
          200: '#2A2A2A',
        },
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
}