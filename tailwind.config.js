/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#CF2632",
                secondary: "#ffffff",
            },
            animation: {
                "animate-spin-slow": "spin 40s linear infinite",
            },
            keyframes: {
                'border-spin': {
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
}
