/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключаем ESLint во время сборки
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорируем TypeScript ошибки во время сборки
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig