/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit'],
        serif: ['Outfit'],
        mono: ['Outfit'],
      },
      colors: {
        brand: {
          purple:           "#6B21A8",
          "purple-deep":    "#5B21B6",
          magenta:          "#E91E8C",
          "magenta-text":   "#A8155F",
          "purple-mid":     "#7C3AED",
          "magenta-mid":    "#D946EF",
          violet:           "#7B2FBE",
          tagline:          "#9333EA",
        },
        accent: {
          "teal-text":      "#115E59",
          "teal-decor":     "#0D9488",
          "lime-dark":      "#22C55E",
        },
        text: {
          base:             "#1A1A2E",
          secondary:        "#4B5563",
          inverse:          "#FFFFFF",
          "inverse-muted":  "#F3F4F6",
        },
        dark: {
          base:             "#1A1A2E",
          surface:          "#16213E",
        },
        state: {
          "error-text":     "#B91C1C",
          "success-text":   "#15803D",
          "warning-text":   "#B45309",
          "info-text":      "#115E59",
        },
      },
      backgroundImage: {
        "brand-gradient":     "linear-gradient(90deg, #7C3AED, #D946EF)",
        "brand-gradient-v":   "linear-gradient(180deg, #7C3AED, #D946EF)",
        "brand-gradient-135": "linear-gradient(135deg, #6B21A8, #E91E8C)",
      },
    },
  },
  plugins: [],
}
