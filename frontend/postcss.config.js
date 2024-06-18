// postcss.config.js
import discardUnused from 'postcss-discard-unused';

export default {
  plugins: [
    discardUnused({
      keyframes: false,
      // Additional options if needed
    }),
    // Other plugins as needed
]
};