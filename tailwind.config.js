/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        ubantu: ['Ubantu', 'sans-serif'], // 'ubantu' is the Tailwind class name you'll use
      },
         colors: {
        primary: '#DB1A1A',
        secondary: '#ff8b35',
        lightpara: "#adb5bd",
        darkpara: "#212529",
        bgdark: '#020617',
        bglight: '#F3F4F6'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: '3rem'
        }
      }
    },
  },
  plugins: [],
}