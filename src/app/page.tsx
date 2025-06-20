export default function Home() {
  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Hero Section */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              #1e293b 0%, 
              #334155 50%, 
              #475569 100%
            )
          `,
          // 🎨 ДЛЯ ДОБАВЛЕНИЯ ФОНОВОГО ИЗОБРАЖЕНИЯ ЗАМЕНИТЕ НА:
          // backgroundImage: `
          //   linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)),
          //   url('/hero-background.jpg')
          // `,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        {/* Декоративные элементы */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-32 h-32 bg-cyan-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Иконки активностей */}
          <div className="flex justify-center items-center gap-8 mb-8 text-5xl">
            <i className="bi bi-palette text-yellow-400"></i>
            <i className="bi bi-bicycle text-cyan-400"></i>
            <i className="bi bi-cup-hot text-yellow-400"></i>
            <i className="bi bi-flask text-cyan-400"></i>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Конец скуке!<br />
            <span className="text-yellow-400">120+ активностей</span> для детей
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Telegram-приложение, которое мгновенно подберет интересное занятие 
            для вас или вашего ребенка по возрасту и настроению
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#telegram"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <i className="bi bi-telegram"></i>
              Открыть приложение в Telegram
            </a>
            <a 
              href="/activities"
              className="bg-transparent hover:bg-slate-700 text-cyan-400 border-2 border-cyan-400 hover:border-cyan-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <i className="bi bi-grid-3x3-gap"></i>
              Посмотреть каталог на сайте
            </a>
          </div>
          
          <div className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-1">
              <i className="bi bi-lightning-charge text-yellow-400"></i>
              Бесплатно
            </span>
            <span className="flex items-center gap-1">
              <i className="bi bi-house text-cyan-400"></i>
              Только доступные материалы
            </span>
            <span className="flex items-center gap-1">
              <i className="bi bi-people text-yellow-400"></i>
              От 3 до 99 лет
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-slate-300">
              Мы решили главную проблему — что делать в свободное время без гаджетов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-lightning-charge text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Мгновенный результат
              </h3>
              <p className="text-slate-300">
                Выберите возраст и категорию — получите 3 готовые идеи за 10 секунд. 
                Никаких долгих поисков в интернете!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-house text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Только доступные материалы
              </h3>
              <p className="text-slate-300">
                Забудьте про специальные краски и дорогие наборы. 
                Все активности — из того, что есть дома у любой семьи.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-bullseye text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Подбор по возрасту
              </h3>
              <p className="text-slate-300">
                Подходит всем: с 3 до 99 лет.
                Каждая активность проверена и подходит именно вашему ребенку.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-phone text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Прямо в Telegram
              </h3>
              <p className="text-slate-300">
                Не нужно скачивать отдельное приложение. 
                Работает там, где вы и так общаетесь каждый день.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-grid-3x3-gap text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                8 категорий активностей
              </h3>
              <p className="text-slate-300">
                Творчество, спорт, кулинария, эксперименты, чтение, подарки — 
                на любое настроение и интерес.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-check-circle text-slate-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Пошаговые инструкции
              </h3>
              <p className="text-slate-300">
                Каждая активность расписана понятными шагами. 
                Ребенок может выполнить сам или с минимальной помощью.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Что говорят родители
            </h2>
            <p className="text-xl text-slate-300">
              Реальные отзывы мам и пап, которые уже используют приложение
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-700 p-6 rounded-xl border border-slate-600 hover:border-yellow-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "Спасибо огромное! Дочка (7 лет) теперь не просит планшет каждые 10 минут. 
                Вчера 2 часа рисовала солью — в восторге!"
              </p>
              <div className="font-semibold text-yellow-400">Анна, мама двоих детей</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-700 p-6 rounded-xl border border-slate-600 hover:border-cyan-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "Гениально! Особенно нравится, что не нужно ничего покупать. 
                Все из того, что есть дома. Сыну 12 лет — увлекся экспериментами."
              </p>
              <div className="font-semibold text-cyan-400">Сергей, папа</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-700 p-6 rounded-xl border border-slate-600 hover:border-yellow-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-lg">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "Раньше на поиск занятий тратила полчаса. Теперь за минуту получаю 3 идеи. 
                Дети довольны, я спокойна!"
              </p>
              <div className="font-semibold text-cyan-400">Мария, мама троих</div>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram App Info */}
      <section id="telegram" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="bi bi-phone text-slate-800 text-3xl"></i>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Как пользоваться приложением?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-800 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Откройте Telegram</h3>
              <p className="text-slate-300">
                Найдите наш бот или перейдите по ссылке ниже
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-800 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">Выберите параметры</h3>
              <p className="text-slate-300">
                Укажите возраст и что хочется делать
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-800 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Получите активности</h3>
              <p className="text-slate-300">
                3 готовые идеи с пошаговыми инструкциями
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur rounded-2xl p-8 border border-slate-600">
            <h3 className="text-2xl font-bold mb-4">
              Готовы попробовать? Это бесплатно!
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://t.me/mamakenga"
                className="bg-yellow-400 text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-500 transition-colors inline-flex items-center justify-center gap-2"
              >
                <i className="bi bi-telegram"></i>
                Открыть в Telegram
              </a>
              <a 
                href="/activities"
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-400 hover:text-slate-800 transition-colors inline-flex items-center justify-center gap-2"
              >
                <i className="bi bi-grid-3x3-gap"></i>
                Посмотреть на сайте
              </a>
            </div>
            <p className="text-slate-400 text-sm mt-4 flex items-center justify-center gap-2">
              <i className="bi bi-bar-chart text-yellow-400"></i>
              Уже помогли найти занятия для 10,000+ детей и взрослым
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}