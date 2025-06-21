'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, Activity } from '@/lib/supabase'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<string>('all')

  const categories = [
    { id: 'all', title: 'Все категории', icon: 'bi-bullseye' },
    { id: 'creativity', title: 'Творчество', icon: 'bi-palette' },
    { id: 'active_games', title: 'Активные игры', icon: 'bi-bicycle' },
    { id: 'learn_new', title: 'Узнать что-то новое', icon: 'bi-lightbulb' },
    { id: 'cooking', title: 'Кулинария', icon: 'bi-cup-hot' },
    { id: 'gifts', title: 'Сделать подарок', icon: 'bi-gift' },
    { id: 'experiments', title: 'Эксперименты', icon: 'bi-flask' },
    { id: 'reading_stories', title: 'Чтение и истории', icon: 'bi-book' },
    { id: 'surprise_me', title: 'Удиви меня!', icon: 'bi-dice-5' },
  ]

  const ageGroups = [
    { id: 'all', title: 'Все возраста' },
    { id: '3-5', title: '3-5 лет' },
    { id: '6-8', title: '6-8 лет' },
    { id: '9-12', title: '9-12 лет' },
    { id: '13-17', title: '13-17 лет' },
    { id: '18+', title: '18+ лет' },
  ]

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true)
      try {
        let query = supabase.from('activities').select('*')

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory)
        }

        if (selectedAge !== 'all') {
          query = query.contains('age_groups', [selectedAge])
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error) throw error
        setActivities(data || [])
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [selectedCategory, selectedAge])

  function getDurationText(minutes: number) {
    if (minutes <= 20) return `${minutes} мин`
    if (minutes <= 45) return `${minutes} мин`
    return `${minutes} мин`
  }

  function getDurationIcon(minutes: number) {
    if (minutes <= 20) return 'bi-lightning-charge'
    if (minutes <= 45) return 'bi-clock'
    return 'bi-hourglass'
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bi-emoji-smile'
      case 'medium': return 'bi-emoji-neutral'
      case 'hard': return 'bi-emoji-frown'
      default: return 'bi-emoji-smile'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко'
      case 'medium': return 'Средне'
      case 'hard': return 'Сложно'
      default: return 'Легко'
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <i className="bi bi-grid-3x3-gap text-yellow-400"></i>
            Каталог интересных занятий
          </h1>
          <p className="text-slate-300">
            Найди идеальное занятие для себя или своего ребенка!
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Категории */}
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                <i className="bi bi-funnel"></i>
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-slate-600">
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Возраст */}
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                <i className="bi bi-people"></i>
                Возраст
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-white"
              >
                {ageGroups.map((age) => (
                  <option key={age.id} value={age.id} className="bg-slate-600">
                    {age.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Результаты */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Загружаем интересные занятия...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-300 flex items-center gap-2">
                <i className="bi bi-search text-cyan-400"></i>
                Найдено интересных занятий: <span className="font-semibold text-yellow-400">{activities.length}</span>
              </p>
              {activities.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedAge('all')
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors"
                >
                  <i className="bi bi-arrow-clockwise"></i>
                  Сбросить фильтры
                </button>
              )}
            </div>

            {/* Сетка занятий */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <Link key={activity.id} href={`/activities/${activity.id}`}>
                  <div className="bg-slate-700 rounded-xl border border-slate-600 hover:border-yellow-400 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer hover:transform hover:scale-105">
                    {/* Заголовок */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-white line-clamp-2">
                        {activity.title}
                      </h3>
                      {activity.premium && (
                        <span className="bg-yellow-400 text-slate-800 text-xs px-2 py-1 rounded-full ml-2 flex items-center gap-1">
                          <i className="bi bi-star-fill"></i>
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Описание */}
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {activity.short_description}
                    </p>

                    {/* Метаданные */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-cyan-400 flex items-center gap-1">
                        <i className={getDurationIcon(activity.duration_minutes)}></i>
                        {getDurationText(activity.duration_minutes)}
                      </span>
                      <span className="text-yellow-400 flex items-center gap-1">
                        <i className={getDifficultyIcon(activity.difficulty)}></i>
                        {getDifficultyText(activity.difficulty)}
                      </span>
                    </div>

                    {/* Возрастные группы */}
                    {activity.age_groups && activity.age_groups.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                          <i className="bi bi-people"></i>
                          Возраст:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {activity.age_groups.slice(0, 3).map((age, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-600 text-slate-200 text-xs px-2 py-1 rounded border border-slate-500"
                            >
                              {age}
                            </span>
                          ))}
                          {activity.age_groups.length > 3 && (
                            <span className="text-xs text-slate-400 px-2 py-1">
                              +{activity.age_groups.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Материалы */}
                    {activity.materials && activity.materials.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                          <i className="bi bi-tools"></i>
                          Понадобится:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {activity.materials.slice(0, 3).map((material, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-600 text-slate-200 text-xs px-2 py-1 rounded border border-slate-500"
                            >
                              {material}
                            </span>
                          ))}
                          {activity.materials.length > 3 && (
                            <span className="text-xs text-slate-400 px-2 py-1">
                              +{activity.materials.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Теги */}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {activity.tags.slice(0, 4).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-800 text-cyan-300 text-xs px-2 py-1 rounded border border-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                          {activity.tags.length > 4 && (
                            <span className="text-xs text-slate-400 px-2 py-1">
                              +{activity.tags.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Кнопка */}
                    <div className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-800 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <i className="bi bi-arrow-right-circle"></i>
                      Подробнее
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Пустое состояние */}
            {activities.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-search text-3xl text-slate-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Интересные занятия не найдены
                </h3>
                <p className="text-slate-400 mb-4">
                  Попробуйте изменить фильтры или добавить новые занятия
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedAge('all')
                  }}
                  className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto"
                >
                  <i className="bi bi-arrow-clockwise"></i>
                  Сбросить фильтры
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA для Telegram */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
            <i className="bi bi-telegram"></i>
            Больше идей в Telegram!
          </h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Получайте персональные подборки активностей каждый день прямо в мессенджере
          </p>
          <a 
            href="https://t.me/ne_skuchno_bot"
            className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors text-lg"
          >
            <i className="bi bi-telegram"></i>
            Открыть Telegram бот
          </a>
        </div>
      </div>
    </div>
  )
}