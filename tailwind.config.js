module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#0f0e17',
        'secondary': '#f25f4c',
        'tertiary': '#e53170',
        'main': '#fffffe'
      },
      textColor: {
        'primary': '#a7a9be',
        'headline': '#fffffe',
        'btn': '#fffffe',
      },
      minWidth: {
        '1/4': '25vw',
        '1/2': '50vw',
        '3/4': '75vw',
        'primary': '500px',
      },
      minHeight: {
        '1/2': '50vh',
        '3/4': '75vh',
        '1/4': '25vh'
      },
      height: {
        'fixed': '640px',
        'header': '100px',
        'main': 'calc(100% - 100px)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
