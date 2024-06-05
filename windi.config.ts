import { defineConfig } from "windicss/helpers";

// import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export default defineConfig({
  attributify: true,
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px',
      },
      fontSize: {
        14: "14px",
        12: "12px",
      },
      colors: {
        // gray: colors.coolGray,
        // blue: colors.sky,
        // red: colors.rose,
        // pink: colors.fuchsia,
      },
      fontFamily: {
        // sans: ['Graphik', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      spacing: {
        // 128: '32rem',
        // 144: '36rem',
      },
      borderRadius: {
        // '4xl': '2rem',
      },
    },
  },
});
// doc：https://cn.windicss.org/
// usage:
// <button
//   x:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
//   x:text="sm white"
//   x:font="mono light"
//   x:p="y-2 x-4"
//   x:border="2 rounded blue-200"
// >
//   Button
// </button>
