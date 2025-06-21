import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase, Activity } from '@/lib/supabase'

interface Props {
  params: { id: string }
}

// Получение данных активности
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

// Генерация метаданных для SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivity(params.id)

  if (!activity) {
    return {
      title: 'Активность не найдена | Мама, мне скучно!',
    }
  }

  return {
    title: `${activity.title} | Мама, мне скучно!`,
    description: activity.short_description || activity.full_description?.slice(0, 160),
    keywords: `${activity.title}, ${activity.category}, дети, активности, ${activity.tags?.join(', ')}`,
    openGraph: {
      title: activity.title,
      description: activity.short_description || activity.full_description?.slice(0, 160),
      type: 'article',
    },
  }
}

// Функция для получения цвета категории
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'active_games': 'bg-red-900 text-red-300 border-red-700',
    'creativity': 'bg-purple-900 text-purple-300 border-purple-700',
    'learn_new': 'bg-blue-900 text-blue-300 border-blue-700',
    'cooking': 'bg-green-900 text-green-300 border-green-700',
    'gifts': 'bg-yellow-900 text-yellow-300 border-yellow-700',
    'experiments': 'bg-orange-900 text-orange-300 border-orange-700',
    'reading_stories': 'bg-indigo-900 text-indigo-300 border-indigo-700',
  }
  return colors[category] || 'bg-gray-900 text-gray-300 border-gray-700'
}

// Функция для получения названия категории
function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'active_games': 'Активные игры',
    'creativity': 'Творчество',
    'learn_new': 'Узнать что-то новое',
    'cooking': 'Кулинария',
    'gifts': 'Сделать подарок',
    'experiments': 'Эксперименты',
    'reading_stories': 'Чтение и истории',
  }
  return names[category] || category
}

// Функция для получения эмодзи сложности
function getDifficultyEmoji(difficulty: string): string {
  const emojis: Record<string, string> = {
    'easy': '😊',
    'medium': '🤔',
    'hard': '😤'
  }
  return emojis[difficulty] || '😊'
}

// Функция для получения текста сложности
function getDifficultyText(difficulty: string): string {
  const texts: Record<string, string> = {
    'easy': 'Легко',
    'medium': 'Средне',
    'hard': 'Сложно'
  }
  return texts[difficulty] || 'Легко'
}

export default async function ActivityDetailPage({ params }: Props) {
  const activity = await getActivity(params.id)

  if (!activity) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Главная
            </Link>
            <i className="bi bi-chevron-right text-slate-500"></i>
            <Link href="/activities" className="hover:text-cyan-400 transition-colors">
              Каталог активностей
            </Link>
            <i className="bi bi-chevron-right text-slate-500"></i>
            <span className="text-white font-medium">{activity.title}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(activity.category)}`}>
                  {getCategoryName(activity.category)}
                </span>
                {activity.premium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Premium
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {activity.title}
              </h1>
              
              {activity.short_description && (
                <p className="text-xl text-slate-300 mb-6">
                  {activity.short_description}
                </p>
              )}

              {/* Метаинформация */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-600 rounded-lg p-4 text-center border border-slate-500">
                  <div className="text-2xl mb-1">⏰</div>
                  <div className="text-sm text-slate-400">Время</div>
                  <div className="font-semibold text-cyan-400">{activity.duration_minutes} мин</div>
                </div>
                
                <div className="bg-slate-600 rounded-lg p-4 text-center border border-slate-500">
                  <div className="text-2xl mb-1">{getDifficultyEmoji(activity.difficulty)}</div>
                  <div className="text-sm text-slate-400">Сложность</div>
                  <div className="font-semibold text-yellow-400">{getDifficultyText(activity.difficulty)}</div>
                </div>
                
                <div className="bg-slate-600 rounded-lg p-4 text-center border border-slate-500">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-sm text-slate-400">Возраст</div>
                  <div className="font-semibold text-xs text-white">
                    {activity.age_groups?.join(', ') || 'Любой'}
                  </div>
                </div>
                
                <div className="bg-slate-600 rounded-lg p-4 text-center border border-slate-500">
                  <div className="text-2xl mb-1">📍</div>
                  <div className="text-sm text-slate-400">Место</div>
                  <div className="font-semibold text-white">
                    {activity.location === 'indoor' ? 'Дома' : 
                     activity.location === 'outdoor' ? 'На улице' : 'Где угодно'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Левая колонка - основная информация */}
          <div className="md:col-span-2 space-y-8">
            {/* Подробное описание */}
            {activity.full_description && (
              <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="bi bi-info-circle text-cyan-400"></i>
                  О занятии
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {activity.full_description}
                </p>
              </div>
            )}

            {/* Пошаговые инструкции */}
            {activity.instructions && activity.instructions.length > 0 && (
              <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <i className="bi bi-list-ol text-yellow-400"></i>
                  Пошаговые инструкции
                </h2>
                <div className="space-y-4">
                  {activity.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-slate-800 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-slate-300 leading-relaxed pt-1">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Правая колонка - дополнительная информация */}
          <div className="space-y-6">
            {/* Материалы */}
            {activity.materials && activity.materials.length > 0 && (
              <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="bi bi-bag text-cyan-400"></i>
                  Что понадобится
                </h3>
                <ul className="space-y-2">
                  {activity.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-300">
                      <i className="bi bi-check-circle text-yellow-400"></i>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Развиваемые навыки */}
            {activity.skills_developed && activity.skills_developed.length > 0 && (
              <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="bi bi-lightbulb text-yellow-400"></i>
                  Что развивает
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.skills_developed.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-[#1d2a3d] text-yellow-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Теги */}
            {activity.tags && activity.tags.length > 0 && (
              <div className="bg-slate-700 rounded-2xl border border-slate-600 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i className="bi bi-tags text-cyan-400"></i>
                  Теги
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-slate-600 text-cyan-300 px-3 py-1 rounded-full text-sm border border-slate-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA - Telegram Bot */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-center text-slate-800">
              <h3 className="text-xl font-bold mb-2">Попробуй в Telegram!</h3>
              <p className="text-slate-700 mb-4 text-sm">
                Получай персональные подборки активностей каждый день
              </p>
              <a 
                href="https://t.me/ne_skuchno_bot" 
                className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 px-6 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors"
              >
                <i className="bi bi-telegram"></i>
                Открыть бот
              </a>
            </div>
          </div>
        </div>

        {/* Навигация снизу */}
        <div className="mt-12 bg-slate-700 rounded-2xl border border-slate-600 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/activities"
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-xl transition-colors border border-slate-500"
            >
              <i className="bi bi-arrow-left"></i>
              Вернуться к каталогу
            </Link>
            
            <Link 
              href={`/activities?category=${activity.category}`}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-6 py-3 rounded-xl transition-colors font-medium"
            >
              <i className="bi bi-collection"></i>
              Ещё из категории "{getCategoryName(activity.category)}"
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}