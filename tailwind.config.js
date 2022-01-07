
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
    },
    fontSize: {
      'sm': '.875rem',
      '4xl': '2.063rem',
    },
    colors:{
      binkGreen: '#8EB1B7',
      primaryGreen: '#194B53',
      binkGrey: '#68727E',
      white: '#FFFFFF',
      toolBg: '#F8F9FE',
      outlineGrey: '#B8B8B8',
      invalidRed: '#CB4A33',
      envDevFg: '#43D5AF',
      envStagingFg: '#7C6A20',
      envSandboxFg: '#327A8B',
      envProdFg: '#C8452D',
      envDevBg: '#EEFDF9',
      envStagingBg: '#F9EDBA',
      envSandboxBg: '#ECF8FA',
      envProdBg: '#FEF5F4',
    },
    extend: {
    },
  },
  plugins: [],
}