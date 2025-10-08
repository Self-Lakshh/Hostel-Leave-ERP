/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#6366f1',
        bg: '#f9fafb',
        sidebar: '#ffffff',
        header: '#ffffff',
        footer: '#f3f4f6',
        text: '#111827',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
      },
      spacing: {
        sidebarWidth: '280px',
      },
      boxShadow: {
        header: '0 1px 2px rgba(0,0,0,0.05)',
        sidebar: '0 0 10px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        card: '0.5rem',
      },
    },
  },
  plugins: [],
}
