import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx,md}',
    './content/post/**/*.{js,ts,jsx,tsx,mdx,md}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Nanum Gothic'],
      'serif': [],
      'mono': ['Source Code Pro'],
    },
    container: {
      center: true,
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
	'html': { fontFamily: ['Inter', 'Nanum Gothic'], fontSize: '18px', fontWeight: '400' }
      })
    })
  ],
}
export default config
