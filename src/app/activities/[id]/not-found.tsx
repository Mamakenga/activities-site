import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8">
          {/* 404 Icon */}
          <div className="text-6xl mb-4">🤔</div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Активность не найдена
          </h1>
          
          {/* Description */}
          <p className="text-slate-300 mb-8 leading-relaxed">
            Кажется, эта активность убежала играть в прятки! 
            Возможно, она была удалена или вы перешли по неправильной ссылке.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/activities"
              className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-6 py-3 rounded-xl transition-colors font-medium"
            >
              <i className="bi bi-grid-3x3-gap"></i>
              Смотреть все активности
            </Link>
            
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-xl transition-colors font-medium border border-slate-500"
            >
              <i className="bi bi-house"></i>
              На главную
            </Link>
          </div>
          
          {/* Telegram CTA */}
          <div className="mt-8 p-4 bg-slate-600 rounded-xl border border-slate-500">
            <p className="text-sm text-slate-300 mb-3">
              💡 А может попробуем в Telegram боте? Там точно найдется что-то интересное!
            </p>
            <a 
              href="https://t.me/ne_skuchno_bot"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <i className="bi bi-telegram"></i>
              Открыть бот
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}