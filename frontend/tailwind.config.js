import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0f4ff',
                    100: '#d9e2ff',
                    200: '#bccaff',
                    300: '#8fa8ff',
                    400: '#5c7bff',
                    500: '#3754fb',
                    600: '#2133f0',
                    700: '#1a27db',
                    800: '#1c23b1',
                    900: '#1c248c',
                    950: '#111456',
                },
                premium: {
                    dark: '#0f172a',
                    glass: 'rgba(255, 255, 255, 0.03)',
                    border: 'rgba(255, 255, 255, 0.1)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [
        tailwindAnimate,
    ],
}
