
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
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
      envStagingFg: '#ECCA42',
      envSandboxFg: '#327A8B',
      envProdFg: '#C8452D',
      envDevBg: '#EEFDF9',
      envStagingBg: '#F9EDBA',
      envSandboxBg: '#ECF8FA',
      envProdBg: '#FEF5F4',
    },
    extend: {
      spacing: {
        '112': '28rem',
        '148': '37rem',

      },
      opacity: {
        '12': '.12',
      },
      fontSize: {
        'sm': '.875rem',
        '4xl': '2.063rem',
      },
    },
  },
  plugins: [],
}
