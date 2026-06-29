/** @type {import('tailwindcss').Config} */
export default {
  // NOTE (frontend-mix smoke guard): these globs must cover every file that
  // emits class names — index.html + everything under src. If a component
  // lives outside these globs it renders unstyled at runtime despite a clean build.
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
