import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Мама, мне скучно!',
  description: 'Telegram-приложение для детских активностей',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Активности для детей | Telegram приложение',
  description: 'Проверенные активности для развития детей от 3 до 17 лет. Только доступные материалы, понятные инструкции. Telegram приложение для занятых родителей.',
  keywords: 'дети, активности, развитие, telegram, родители, творчество, игры',
  authors: [{ name: 'Activities for Kids' }],
  openGraph: {
    title: 'Активности для детей | Telegram приложение',
    description: 'Проверенные активности для развития детей. Telegram приложение с 120+ идеями.',
    type: 'website',
    locale: 'ru_RU',
  },
}

function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="text-2xl">🎯</span>
            <span className="hidden sm:block">Активности для детей</span>
            <span className="sm:hidden">Активности</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Главная
            </Link>
            <Link 
              href="/activities" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Каталог
            </Link>
            <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
            <a 
              href="https://t.me/your_bot_username" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🚀 Открыть бот
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-2xl">🎯</span>
              Активности для детей
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Telegram приложение с проверенными активностями для развития детей от 3 до 17 лет. 
              Только доступные материалы и понятные инструкции.
            </p>
            <a 
              href="https://t.me/your_bot_username" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🚀 Открыть приложение
            </a>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link href="/activities" className="hover:text-white transition-colors">Каталог активностей</Link></li>
              <li><a href="https://t.me/your_bot_username" className="hover:text-white transition-colors">Telegram бот</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Категории</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/activities?category=creativity" className="hover:text-white transition-colors">🎨 Творчество</Link></li>
              <li><Link href="/activities?category=active_games" className="hover:text-white transition-colors">🏃‍♂️ Активные игры</Link></li>
              <li><Link href="/activities?category=cooking" className="hover:text-white transition-colors">👨‍🍳 Кулинария</Link></li>
              <li><Link href="/activities?category=experiments" className="hover:text-white transition-colors">🔬 Эксперименты</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2024 Активности для детей. Сделано с ❤️ для развития детей.</p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}