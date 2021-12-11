import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  theme: {
    extend: {
      outline: {
        primary: '2px solid #FEA81E',
      },
      animation: ['hover', 'group-hover'],
      boxShadow: {
      },
      colors: {
        primary: '#b6c5b8',
        secondary: '#435058',
        tertiary: '#9D695A ',
        accent: '#CE796B',
      },

    },
  },
  plugins: [
    // Other plugins
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],

  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-xl shadow-md cursor-pointer',
    'btn-primary': 'text-white bg-primary hover:bg-opacity-30 border-2 border-transparent',
    'btn-secondary': 'text-black border-secondary border-2 hover:bg-opacity-30 bg-white',
    'tag': 'bg-primary bg-opacity-30 rounded-full px-4 py-1 max-w-max text-primary',
  },
})
