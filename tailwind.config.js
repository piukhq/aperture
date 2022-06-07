module.exports = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
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
      '4xs': '0.625rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFF',
      'black': '#000',
      'blue': '#0062ff',
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
        825: '#292932',
        850: '#1C1C25',
        900: '#171725',
        950: '#14141A',
        975: '#09090F',
      },

    },
    extend: {
      lineHeight: {
        '5.5': '1.375rem',
        '6.5': '1.625rem',
      },
      spacing: {
        '112': '28rem',
        '148': '37rem',

      },
      opacity: {
        '12': '.12',
      },
      boxShadow: {
        'md': '0 1px 6px 0px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

