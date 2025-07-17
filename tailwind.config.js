/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F4E3B5",
        zinc: {
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        nexus: {
          blue: {
            50: "#E6F1FF",
            100: "#CCE4FF",
            200: "#99C9FF",
            300: "#66ADFF",
            400: "#3392FF",
            500: "#0077FF",
            600: "#005FCC",
            700: "#004799",
            800: "#003066",
            900: "#001833",
          },
          purple: {
            50: "#F3E6FF",
            100: "#E7CCFF",
            200: "#CF99FF",
            300: "#B766FF",
            400: "#9F33FF",
            500: "#8700FF",
            600: "#6C00CC",
            700: "#510099",
            800: "#360066",
            900: "#1B0033",
          },
          neutral: {
            50: "#F8F9FA",
            100: "#F1F3F5",
            200: "#E9ECEF",
            300: "#DEE2E6",
            400: "#CED4DA",
            500: "#ADB5BD",
            600: "#868E96",
            700: "#495057",
            800: "#343A40",
            900: "#212529",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft": "linear-gradient(180deg, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    },
  ],
};
