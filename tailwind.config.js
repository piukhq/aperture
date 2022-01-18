
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      primary: ['Poppins','sans-serif'],
      body: ['Roboto','sans-serif'],
    },
    fontSize: {
      '5xl': '3.5rem',
      '4xl': '3rem',
      '3xl': '2.25rem',
      '2xl': '1.75rem',
      'xl': '1.5rem',
      'lg': '1.125rem',
      'base': '1rem',
      'sm': '0.875rem',
      'xs': '0.813rem',
      '2xs': '0.75rem',
      '3xs': '0.688rem',
    },







    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFF',
      'black': '#000',
      'blue': '#007bff',
      'yellow': '#ffc542',
      'lightBlue': '#50b5ff',
      'aquamarine': '#3dd598',
      'orange': '#ff974a',
      'red': '#fc5a5a',
      'green': '#82c43c',
      'purple': '#a461d8',
      'pink': '#ff9ad5',
      'grey': {
        100: '#fafafb',
        200: '#f1f1f5',
        300: '#e2e2ea',
        400: '#d5d5dc',
        500: '#b5b5be',
        600: '#92929d',
        700: '#696974',
        800: '#44444f',
        900: '#171725',
      },

    },
    extend: {
      spacing: {
        '112': '28rem',
        '148': '37rem',

      },
      opacity: {
        '12': '.12',
      },
    },
  },
  plugins: [],
}
