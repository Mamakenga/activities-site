import { notFound } from 'next/navigation'
import { supabase, Activity } from '@/lib/supabase'
import Link from 'next/link'

interface ActivityDetailProps {
  params: {
    id: string
  }
}

async function getActivity(id: string): Promise<Activity | null> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching activity:', error)
    return null
  }

  return data
}

export default async function ActivityDetail({ params }: ActivityDetailProps) {
  const activity = await getActivity(params.id)

  if (!activity) {
    notFound()
  }

  const getDurationText = (minutes: number) => {
    if (minutes <= 20) return 'Быстро'
    if (minutes <= 45) return 'Средне'
    return 'Долго'
  }

  const getDifficultyEmoji = (difficulty: string) => {
    const emojis = { easy: '😊', medium: '🤔', hard: '😤' }
    return emojis[difficulty as keyof typeof emojis] || '😊'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Навигация */}
        <div className="mb-6">
          <Link 
            href="/activities" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Назад к каталогу
          </Link>
        </div>

        {/* Заголовок */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {getCategoryName(activity.category)}
            </span>
            {activity.premium && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Premium
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {activity.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {activity.short_description}
          </p>

          {/* Метаданные */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">⏰</div>
              <div className="font-medium">{activity.duration_minutes} мин</div>
              <div className="text-sm text-gray-500">{getDurationText(activity.duration_minutes)}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{getDifficultyEmoji(activity.difficulty)}</div>
              <div className="font-medium capitalize">{activity.difficulty}</div>
              <div className="text-sm text-gray-500">Сложность</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">👶</div>
              <div className="font-medium">{activity.age_groups.join(', ')}</div>
              <div className="text-sm text-gray-500">Возраст</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{activity.location === 'indoor' ? '🏠' : activity.location === 'outdoor' ? '🌳' : '🌍'}</div>
              <div className="font-medium">{activity.location === 'indoor' ? 'Дома' : activity.location === 'outdoor' ? 'На улице' : 'Везде'}</div>
              <div className="text-sm text-gray-500">Место</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Материалы */}
          {activity.materials && activity.materials.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📋 Что понадобится
              </h2>
              <ul className="space-y-2">
                {activity.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Навыки */}
          {activity.skills_developed && activity.skills_developed.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💡 Что развивает
              </h2>
              <div className="flex flex-wrap gap-2">
                {activity.skills_developed.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Инструкции */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📝 Пошаговые инструкции
          </h2>
          <div className="space-y-4">
            {activity.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-1">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Теги */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏷️ Теги</h2>
            <div className="flex flex-wrap gap-2">
              {activity.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA для Telegram */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 mt-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Попробовать в Telegram приложении!</h2>
          <p className="mb-6 opacity-90">
            Получите персональные рекомендации и отслеживайте прогресс
          </p>
          <a 
            href="https://t.me/your_bot_username" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            🚀 Открыть приложение
          </a>
        </div>
      </div>
    </div>
  )
}