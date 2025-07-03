module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7dd3fc',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        secondary: {
          light: '#fef9c3',
          DEFAULT: '#fde047',
          dark: '#facc15',
        },
        accent: '#22d3ee',
        background: '#f8fafc',
        surface: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}; 