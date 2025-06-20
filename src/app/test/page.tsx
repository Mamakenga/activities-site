'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .limit(5)
        
        if (error) throw error
        setActivities(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="p-8">Загрузка...</div>
  if (error) return <div className="p-8 text-red-500">Ошибка: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест Supabase подключения</h1>
      <p className="mb-4">Найдено активностей: {activities.length}</p>
      
      {activities.map((activity) => (
        <div key={activity.id} className="border p-4 mb-2 rounded">
          <h3 className="font-semibold">{activity.title}</h3>
          <p className="text-sm text-gray-600">{activity.short_description}</p>
        </div>
      ))}
    </div>
  )
}