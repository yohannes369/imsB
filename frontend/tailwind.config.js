// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx,html}',
//     './public/index.html',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// tailwind.config.js
// tailwind.config.js (partial excerpt for verification)
// tailwind.config.js (partial excerpt)



// tailwind.config.js (partial excerpt)
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html',
  ],
  theme: {
    extend: {
      animation: {
        'spin-and-bounce': 'spin 1s linear infinite, bounce 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'text-glow': 'textGlow 2s ease-in-out infinite',
        'header-glow': 'headerGlow 1.5s ease-in-out infinite',
        'text-pulse': 'textPulse 1.5s ease-in-out infinite',
        'text-flip': 'textFlip 0.8s ease-in-out',
        'spin-and-grow': 'spin 1s linear infinite, grow 0.5s ease-in-out infinite',
        'wiggle': 'wiggle 0.4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'row-slide': 'rowSlide 0.5s ease-out',
        'cell-pop': 'cellPop 0.4s ease-out',
        'modal-explode': 'modalExplode 0.6s ease-out',
        'bg-shift': 'bgShift 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.8s ease-out',
      },
      // ... (keyframes as previously provided)
    },
  },
  plugins: [],
};