import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// Получаем статистику для главной страницы
async function getStats() {
  const { data: activities, error } = await supabase
    .from('activities')
    .select('category, premium')

  if (error) {
    console.error('Error fetching stats:', error)
    return { total: 0, categories: 0, premium: 0 }
  }

  const total = activities?.length || 0
  const categories = new Set(activities?.map(a => a.category)).size || 0
  const premium = activities?.filter(a => a.premium).length || 0

  return { total, categories, premium }
}

// Получаем популярные активности
async function getPopularActivities() {
  const { data, error } = await supabase
    .from('activities')
    .select('id, title, short_description, category, duration_minutes, premium')
    .order('rating', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching popular activities:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const stats = await getStats()
  const popularActivities = await getPopularActivities()

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'active_games': '🏃‍♂️',
      'creativity': '🎨',
      'learn_new': '🧠',
      'cooking': '👨‍🍳',
      'gifts': '🎁',
      'experiments': '🔬',
      'reading_stories': '📚'
    }
    return emojis[category] || '🎯'
  }

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      'active_games': 'Активная игра',
      'creativity': 'Творчество',
      'learn_new': 'Узнать что-то новое',
      'cooking': 'Кулинария',
      'gifts': 'Сделать подарок',
      'experiments': 'Эксперименты',
      'reading_stories': 'Чтение и истории'
    }
    return categories[category] || category
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Активности для детей
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Telegram приложение с проверенными активностями для развития детей от 3 до 17 лет. 
            Только доступные материалы, понятные инструкции!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://t.me/your_bot_username" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              🚀 Открыть приложение
            </a>
            <Link 
              href="/activities" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              📚 Каталог активностей
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-blue-50 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.total}+</div>
              <div className="text-lg text-gray-700">Проверенных активностей</div>
            </div>
            <div className="p-8 bg-purple-50 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.categories}</div>
              <div className="text-lg text-gray-700">Категорий развития</div>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <div className="text-4xl font-bold text-pink-600 mb-2">3-17</div>
              <div className="text-lg text-gray-700">Лет возрастной охват</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Как это работает?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-bold text-lg mb-2">1. Открой бот</h3>
              <p className="text-gray-600">Найди наш Telegram бот и нажми &apos;Приложение&apos;</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="font-bold text-lg mb-2">2. Выбери возраст</h3>
              <p className="text-gray-600">Укажи возраст ребенка для подходящих активностей</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-lg mb-2">3. Выбери категорию</h3>
              <p className="text-gray-600">Творчество, спорт, кулинария или что-то еще?</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">4. Получи активности</h3>
              <p className="text-gray-600">3 идеальные активности с пошаговыми инструкциями</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Activities */}
      {popularActivities.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Популярные активности
              </h2>
              <Link 
                href="/activities" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Смотреть все →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularActivities.map((activity) => (
                <Link 
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getCategoryEmoji(activity.category)}</span>
                    <span className="text-sm font-medium text-gray-500">
                      {getCategoryName(activity.category)}
                    </span>
                    {activity.premium && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        ⭐
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {activity.short_description}
                  </p>
                  <div className="text-xs text-gray-500">
                    ⏰ {activity.duration_minutes} минут
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Почему родители выбирают нас?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="font-bold text-xl mb-3">Только доступные материалы</h3>
              <p className="text-gray-600">
                Используем только то, что есть в каждом доме: бумага, ножницы, подушки, вода
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">👶</div>
              <h3 className="font-bold text-xl mb-3">Для каждого возраста</h3>
              <p className="text-gray-600">
                От малышей 3 лет до подростков 17+. Активности адаптированы под развитие ребенка
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="font-bold text-xl mb-3">Понятные инструкции</h3>
              <p className="text-gray-600">
                Пошаговые инструкции, которые понятны детям. Никаких сложных терминов
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-xl mb-3">Быстрый результат</h3>
              <p className="text-gray-600">
                Большинство активностей занимает 15-30 минут. Идеально для занятых родителей
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="font-bold text-xl mb-3">Развивающий эффект</h3>
              <p className="text-gray-600">
                Каждая активность развивает конкретные навыки: моторику, творчество, логику
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold text-xl mb-3">Удобно в Telegram</h3>
              <p className="text-gray-600">
                Не нужно устанавливать отдельное приложение. Все работает прямо в Telegram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы найти идеальную активность для вашего ребенка?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам родителей, которые уже используют наше приложение
          </p>
          <a 
            href="https://t.me/your_bot_username" 
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            🚀 Попробовать сейчас
          </a>
        </div>
      </section>
    </div>
  )
}