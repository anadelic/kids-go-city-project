/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brick: '#e87948',
        second: '#e3a555',
        three: '#e00256',
        black: '#212121',
        white: '#ffffff',
        gray: '#808080e2',
      },
      height: {
        large: '780px',
      },
    },
  },
  plugins: [require('daisyui')],
};
