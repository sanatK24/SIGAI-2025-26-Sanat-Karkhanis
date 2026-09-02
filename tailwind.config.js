import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('custom-variant', '&:is(.dark *)');
    }),
    plugin(function({ addBase }) {
      addBase({
        '@theme': {
          /* Add your theme-specific styles here */
        },
      });
    }),
  ],
};