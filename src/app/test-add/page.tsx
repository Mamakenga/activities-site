'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestAddPage() {
  const [status, setStatus] = useState('')

  const addTestActivity = async () => {
    setStatus('Добавляем...')
    
    const testActivity = {
      id: 'test_001',
      title: 'Тестовая активность',
      short_description: 'Простая тестовая активность для проверки',
      full_description: 'Подробное описание тестовой активности',
      category: 'creativity',
      age_groups: ['6-8'],
      duration_minutes: 15,
      difficulty: 'easy',
      materials: ['бумага', 'карандаши'],
      instructions: ['Возьми бумагу', 'Нарисуй что-нибудь', 'Покажи результат'],
      skills_developed: ['творчество'],
      location: 'indoor',
      premium: false,
      tags: ['тест', 'простое']
    }

    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([testActivity])
        .select()
      
      if (error) throw error
      setStatus(`✅ Добавлено! ID: ${data[0].id}`)
    } catch (err: any) {
      setStatus(`❌ Ошибка: ${err.message}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Добавить тестовую активность</h1>
      <button 
        onClick={addTestActivity}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Добавить тест
      </button>
      <p className="mt-4">{status}</p>
    </div>
  )
}