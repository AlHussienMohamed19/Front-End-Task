module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    theme: {
      screens: {
        xs: '320px',
        sm: '375px',
        lsm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      extend: {
        colors: {
          primary: '#fa9900',
          headingColor: '#666666',
          textColor: '#999',
        },
        fontFamily: {
          primary: ['Nunito', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
}