export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🎨🏃‍♂️👨‍🍳🔬</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Конец скуке!<br />
            <span className="text-blue-600">120+ активностей</span> для детей
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Telegram-приложение, которое мгновенно подберет интересное занятие 
            для вас или вашего ребенка по возрасту и настроению
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#telegram"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Открыть приложение в Telegram
            </a>
            <a 
              href="/activities"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              📚 Посмотреть каталог на сайте
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            ⚡ Бесплатно • 🎯 Только доступные материалы • 👶 От 3 до 99 лет
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600">
              Мы решили главную проблему — что делать в свободное время без гаджетов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Мгновенный результат
              </h3>
              <p className="text-gray-600">
                Выберите возраст и категорию — получите 3 готовые идеи за 10 секунд. 
                Никаких долгих поисков в интернете!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Только доступные материалы
              </h3>
              <p className="text-gray-600">
                Забудьте про специальные краски и дорогие наборы. 
                Все активности — из того, что есть дома у любой семьи.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Подбор по возрасту
              </h3>
              <p className="text-gray-600">
                Подходит всем: с 3 до 99 лет
                Каждая активность проверена и подходит именно вашему ребенку.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Прямо в Telegram
              </h3>
              <p className="text-gray-600">
                Не нужно скачивать отдельное приложение. 
                Работает там, где вы и так общаетесь каждый день.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌈</div>
              <h3 className="text-xl font-semibold text-gray-808 mb-3">
                8 категорий активностей
              </h3>
              <p className="text-gray-600">
                Творчество, спорт, кулинария, эксперименты, чтение, подарки — 
                на любое настроение и интерес.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Пошаговые инструкции
              </h3>
              <p className="text-gray-600">
                Каждая активность расписана понятными шагами. 
                Ребенок может выполнить сам или с минимальной помощью.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Что говорят родители
            </h2>
            <p className="text-xl text-gray-600">
              Реальные отзывы мам и пап, которые уже используют приложение
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Спасибо огромное! Дочка (7 лет) теперь не просит планшет каждые 10 минут. 
                Вчера 2 часа рисовала солью — в восторге!"
              </p>
              <div className="font-semibold text-gray-800">Анна, мама двоих детей</div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Гениально! Особенно нравится, что не нужно ничего покупать. 
                Все из того, что есть дома. Сыну 12 лет — увлекся экспериментами."
              </p>
              <div className="font-semibold text-gray-800">Сергей, папа</div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Раньше на поиск занятий тратила полчаса. Теперь за минуту получаю 3 идеи. 
                Дети довольны, я спокойна!"
              </p>
              <div className="font-semibold text-gray-800">Мария, мама троих</div>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram App Info */}
      <section id="telegram" className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-4xl font-bold mb-6">
            Как пользоваться приложением?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Откройте Telegram</h3>
              <p className="text-blue-100">
                Найдите наш бот или перейдите по ссылке ниже
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите параметры</h3>
              <p className="text-blue-100">
                Укажите возраст и что хочется делать
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Получите активности</h3>
              <p className="text-blue-100">
                3 готовые идеи с пошаговыми инструкциями
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Готовы попробовать? Это бесплатно!
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://t.me/mamakenga"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                Открыть в Telegram
              </a>
              <a 
                href="/activities"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Посмотреть на сайте
              </a>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              📊 Уже помогли найти занятия для 10,000+ детей и взрослым
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}