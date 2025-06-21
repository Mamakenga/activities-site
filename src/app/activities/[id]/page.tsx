import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase, Activity } from '@/lib/supabase'

interface Props {
  params: { id: string }
}

// Получение данных этой идеи
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
      title: 'Идея не найдена | Мама, мне скучно!',
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
    'active_games': 'bg-red-100 text-red-800 border-red-200',
    'creativity': 'bg-purple-100 text-purple-800 border-purple-200',
    'learn_new': 'bg-blue-100 text-blue-800 border-blue-200',
    'cooking': 'bg-green-100 text-green-800 border-green-200',
    'gifts': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'experiments': 'bg-orange-100 text-orange-800 border-orange-200',
    'reading_stories': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <i className="bi bi-chevron-right"></i>
            <Link href="/activities" className="hover:text-blue-600 transition-colors">
              Каталог активностей
            </Link>
            <i className="bi bi-chevron-right"></i>
            <span className="text-slate-900 font-medium">{activity.title}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(activity.category)}`}>
                  {getCategoryName(activity.category)}
                </span>
                {activity.premium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Premium
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {activity.title}
              </h1>
              
              {activity.short_description && (
                <p className="text-xl text-slate-600 mb-6">
                  {activity.short_description}
                </p>
              )}

              {/* Метаинформация */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">⏰</div>
                  <div className="text-sm text-slate-600">Время</div>
                  <div className="font-semibold">{activity.duration_minutes} мин</div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">{getDifficultyEmoji(activity.difficulty)}</div>
                  <div className="text-sm text-slate-600">Сложность</div>
                  <div className="font-semibold">{getDifficultyText(activity.difficulty)}</div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-sm text-slate-600">Возраст</div>
                  <div className="font-semibold text-xs">
                    {activity.age_groups?.join(', ') || 'Любой'}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">📍</div>
                  <div className="text-sm text-slate-600">Место</div>
                  <div className="font-semibold">
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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-info-circle text-blue-500"></i>
                  О занятии
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {activity.full_description}
                </p>
              </div>
            )}

            {/* Пошаговые инструкции */}
            {activity.instructions && activity.instructions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <i className="bi bi-list-ol text-green-500"></i>
                  Пошаговые инструкции
                </h2>
                <div className="space-y-4">
                  {activity.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed pt-1">
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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-bag text-purple-500"></i>
                  Что понадобится
                </h3>
                <ul className="space-y-2">
                  {activity.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-700">
                      <i className="bi bi-check-circle text-green-500"></i>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Развиваемые навыки */}
            {activity.skills_developed && activity.skills_developed.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-lightbulb text-yellow-500"></i>
                  Что развивает
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.skills_developed.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Теги */}
            {activity.tags && activity.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-tags text-blue-500"></i>
                  Теги
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA - Telegram Bot */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-center text-white">
              <h3 className="text-xl font-bold mb-2">Попробуй в Telegram!</h3>
              <p className="text-yellow-100 mb-4 text-sm">
                Получай персональные подборки активностей каждый день
              </p>
              <a 
                href="https://t.me/ne_skuchno_bot" 
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-yellow-50 transition-colors"
              >
                <i className="bi bi-telegram"></i>
                Открыть бот
              </a>
            </div>
          </div>
        </div>

        {/* Навигация снизу */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              href="/activities"
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl transition-colors"
            >
              <i className="bi bi-arrow-left"></i>
              Вернуться к каталогу
            </Link>
            
            <Link 
              href={`/activities?category=${activity.category}`}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors"
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