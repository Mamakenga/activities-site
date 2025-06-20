export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Мама, мне скучно!
      </h1>
      
      <div className="text-center">
        <a 
          href="/activities"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Посмотреть активности
        </a>
      </div>
    </div>
  )
}