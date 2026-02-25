/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                prokoti: {
                    bg: '#F4F0FF',
                    primary: '#5E43D8',
                    'primary-hover': '#4B36AD',
                    text: '#2D1B6B',
                    'purple-dark': '#3D1F8F',
                    'purple-card': '#4A2FAA',
                    'purple-sidebar': '#2D1B6B',
                    'accent-lavender': '#8B72E8',
                    'light-purple': '#EDE8FB',
                }
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
            },
            boxShadow: {
                'card': '0 2px 12px 0 rgba(94, 67, 216, 0.08)',
                'card-hover': '0 4px 20px 0 rgba(94, 67, 216, 0.15)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
