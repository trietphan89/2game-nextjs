'use client'

import { useState, useEffect } from 'react'

export default function FirebaseDebug() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    setConfig({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
    })
  }, [])

  if (!config) return null

  const allSet = Object.values(config).every((val) => val === '✅ Set')

  return (
    <div className={`mt-4 p-4 rounded-lg text-xs ${
      allSet ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
    }`}>
      <p className={`font-semibold mb-2 ${allSet ? 'text-green-400' : 'text-red-400'}`}>
        Firebase Config Status:
      </p>
      <div className="space-y-1 text-gray-300">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span>{key}:</span>
            <span>{value as string}</span>
          </div>
        ))}
      </div>
      {!allSet && (
        <p className="mt-2 text-red-400 text-xs">
          ⚠️ Vui lòng kiểm tra file .env và restart server!
        </p>
      )}
    </div>
  )
}
