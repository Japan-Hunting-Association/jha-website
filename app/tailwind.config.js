/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        "white": "#EEEEEE",
        "gray": "#686D76",
        "black": "#373A40",
        "orange": "#DC5F00"
      },
    },
  },
  plugins: [require('daisyui'),],
}

