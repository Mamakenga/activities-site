'use client'

import { useState, useEffect } from 'react'
import { supabase, Activity } from '@/lib/supabase'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAge, setSelectedAge] = useState<string>('all')

  const categories = [
    { id: 'all', title: 'Все категории', emoji: '🎯' },
    { id: 'creativity', title: 'Творчество', emoji: '🎨' },
    { id: 'active_games', title: 'Активные игры', emoji: '🏃‍♂️' },
    { id: 'cooking', title: 'Кулинария', emoji: '👨‍🍳' },
    { id: 'experiments', title: 'Эксперименты', emoji: '🔬' },
  ]

  const ageGroups = [
    { id: 'all', title: 'Все возрасты' },
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

  const getDurationText = (minutes: number) => {
    if (minutes <= 20) return `${minutes} мин ⚡`
    if (minutes <= 45) return `${minutes} мин 🕐`
    return `${minutes} мин 🕒`
  }

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '😊'
      case 'medium': return '🤔'
      case 'hard': return '😤'
      default: return '😊'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 Каталог активностей
          </h1>
          <p className="text-gray-600">
            Найди идеальное занятие для своего ребенка!
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Категории */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Возраст */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Возраст
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ageGroups.map((age) => (
                  <option key={age.id} value={age.id}>
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
            <div className="text-2xl mb-2">⏳</div>
            <p className="text-gray-600">Загружаем активности...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Найдено активностей: <span className="font-semibold">{activities.length}</span>
              </p>
            </div>

            {/* Сетка активностей */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  {/* Заголовок */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                      {activity.title}
                    </h3>
                    {activity.premium && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
                        ⭐ Premium
                      </span>
                    )}
                  </div>

                  {/* Описание */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.short_description}
                  </p>

                  {/* Метаданные */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{getDurationText(activity.duration_minutes)}</span>
                    <span>{getDifficultyEmoji(activity.difficulty)} {activity.difficulty}</span>
                  </div>

                  {/* Материалы */}
                  {activity.materials && activity.materials.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Понадобится:</p>
                      <div className="flex flex-wrap gap-1">
                        {activity.materials.slice(0, 3).map((material, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {material}
                          </span>
                        ))}
                        {activity.materials.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{activity.materials.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Кнопка */}
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
                    Подробнее
                  </button>
                </div>
              ))}
            </div>

            {/* Пустое состояние */}
            {activities.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Активности не найдены
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить фильтры или добавить новые активности
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}