import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Мама, мне скучно! | Telegram приложение',
  description: 'Проверенные идеи занятий для детей и взрослых от 3 до 99 лет. Только доступные материалы, понятные инструкции. Telegram приложение для занятых родителей.',
  keywords: 'дети, активности, развитие, telegram, родители, творчество, игры',
  authors: [{ name: 'Мама, мне скучно!' }],
  openGraph: {
    title: 'Мама, мне скучно! | Telegram приложение',
    description: 'Проверенные идеи увлекательных занятий для детей и взрослых. Telegram приложение с 120+ идеями.',
    type: 'website',
    locale: 'ru_RU',
  },
}

function Navigation() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-yellow-400 transition-colors">
            <i className="bi bi-bullseye text-yellow-400 text-2xl"></i>
            <span className="hidden sm:block">Мама, мне скучно!</span>
            <span className="sm:hidden">Идеи занятий</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="bi bi-house"></i>
              <span className="hidden sm:block">Главная</span>
            </Link>
            <Link 
              href="/activities" 
              className="px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="bi bi-grid-3x3-gap"></i>
              <span className="hidden sm:block">Каталог</span>
            </Link>
            <div className="hidden sm:block w-px h-6 bg-slate-600 mx-2"></div>
            <a 
              href="https://t.me/ne_skuchno_bot" 
              className="bg-yellow-400 text-slate-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium flex items-center gap-2"
            >
              <i className="bi bi-telegram"></i>
              <span className="hidden sm:block">Открыть бот</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

'use client'
import { useState, useEffect, useRef } from 'react'

function Footer() {
  const [showCategories, setShowCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Выберите категорию...')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'creativity', title: 'Творчество', icon: 'bi-palette' },
    { id: 'active_games', title: 'Активные игры', icon: 'bi-bicycle' },
    { id: 'learn_new', title: 'Узнать что-то новое', icon: 'bi-lightbulb' },
    { id: 'cooking', title: 'Кулинария', icon: 'bi-cup-hot' },
    { id: 'gifts', title: 'Сделать подарок', icon: 'bi-gift' },
    { id: 'experiments', title: 'Эксперименты', icon: 'bi-flask-florence' },
    { id: 'reading_stories', title: 'Чтение и истории', icon: 'bi-book' },
    { id: 'surprise_me', title: 'Удиви меня!', icon: 'bi-dice-5' }
  ]

  const handleCategorySelect = (category: typeof categories[0]) => {
    setSelectedCategory(category.title)
    setShowCategories(false)
    window.location.href = `/activities?category=${category.id}`
  }

  // Закрытие dropdown при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategories(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <i className="bi bi-bullseye text-yellow-400 text-2xl"></i>
              Мама, мне скучно!
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Telegram приложение с проверенными идеями для детей и взрослых от 3 до 99 лет. 
              Только доступные материалы и понятные инструкции.
            </p>
            <a 
              href="https://t.me/ne_skuchno_bot" 
              className="inline-flex items-center gap-2 bg-yellow-400 text-slate-800 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            >
              <i className="bi bi-telegram"></i>
              Открыть приложение
            </a>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">Навигация</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-house"></i>
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-grid-3x3-gap"></i>
                  Каталог идей
                </Link>
              </li>
              <li>
                <a href="https://t.me/ne_skuchno_bot" className="hover:text-white transition-colors flex items-center gap-2">
                  <i className="bi bi-telegram"></i>
                  Telegram бот
                </a>
              </li>
            </ul>
          </div>

          <div className="relative" ref={dropdownRef}>
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Категории</h3>
            <button
              className="w-full bg-slate-800 border border-slate-600 text-slate-300 rounded-lg px-3 py-2 text-left flex items-center justify-between hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span className="text-slate-400">{selectedCategory}</span>
              <i className={`bi bi-chevron-${showCategories ? 'up' : 'down'} transition-transform`}></i>
            </button>
            
            {showCategories && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full px-3 py-2 text-left hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-300 hover:text-white first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <i className={`${category.icon} text-cyan-400`}></i>
                    {category.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 mt-8 text-center text-slate-400">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="https://t.me/mamakenga" className="text-slate-400 hover:text-yellow-400 transition-colors">
              <i className="bi bi-telegram text-xl"></i>
            </a>
            <a href="mailto:mamakenga1@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <i className="bi bi-envelope text-xl"></i>
            </a>
          </div>
          <p>&copy; 2025 Мама, мне скучно! Сделано с ❤️ для детей и взрослых.</p>
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
      <head>
        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}