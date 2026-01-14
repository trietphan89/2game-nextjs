'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FirebaseStatusPage() {
  const [step, setStep] = useState(0)
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [errorDetails, setErrorDetails] = useState('')

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  const allConfigSet = Object.values(config).every(val => val && val !== '')

  const testFirebaseAuth = async () => {
    setTestResult('testing')
    setErrorDetails('')

    try {
      const { auth } = await import('@/lib/firebase')
      const { createUserWithEmailAndPassword } = await import('firebase/auth')

      const testEmail = `test-${Date.now()}@test.com`
      const testPassword = 'test123456'

      console.log('🔥 Testing Firebase Auth with:', testEmail)

      await createUserWithEmailAndPassword(auth, testEmail, testPassword)

      setTestResult('success')
      setStep(3)
    } catch (error: any) {
      console.error('❌ Firebase Test Error:', error)
      setTestResult('error')
      setErrorDetails(`Code: ${error.code}\nMessage: ${error.message}`)

      if (error.code === 'auth/operation-not-allowed') {
        setStep(2)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#ff6b35] hover:text-[#f7931e] mb-6 inline-block">
          ← Quay lại trang chủ
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">
          🔥 Trạng Thái Firebase
        </h1>

        {/* Step 1: Config Check */}
        <div className="mb-6 bg-[#151922] border border-[#2d333b] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              allConfigSet ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {allConfigSet ? '✓' : '✗'}
            </div>
            <h2 className="text-xl font-bold text-white">Bước 1: Kiểm tra Config</h2>
          </div>

          <div className="space-y-2 text-sm ml-11">
            {Object.entries(config).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-400">{key}:</span>
                <span className={value ? 'text-green-400' : 'text-red-400'}>
                  {value ? '✅ OK' : '❌ Thiếu'}
                </span>
              </div>
            ))}
          </div>

          {!allConfigSet && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm ml-11">
              ⚠️ Vui lòng kiểm tra file .env và restart server!
            </div>
          )}
        </div>

        {/* Step 2: Enable Authentication */}
        <div className="mb-6 bg-[#151922] border border-[#2d333b] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-yellow-500' : 'bg-gray-600'
            }`}>
              {step >= 2 ? '!' : '2'}
            </div>
            <h2 className="text-xl font-bold text-white">Bước 2: Enable Email/Password Authentication</h2>
          </div>

          <div className="ml-11 space-y-3">
            <p className="text-gray-300">
              Bạn CẦN BẬT tính năng Email/Password trong Firebase Console:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
              <li>
                Mở link này:{' '}
                <a
                  href="https://console.firebase.google.com/project/game-demo-c2462/authentication/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6b35] hover:underline font-semibold"
                >
                  Firebase Console - Authentication
                </a>
              </li>
              <li>Tìm dòng <span className="font-mono bg-gray-800 px-2 py-1 rounded">Email/Password</span></li>
              <li>Click vào dòng đó</li>
              <li>Bật switch <span className="font-bold text-green-400">Enable</span></li>
              <li>Click nút <span className="font-bold">Save</span></li>
            </ol>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <p className="text-yellow-400 text-sm">
                💡 <strong>QUAN TRỌNG:</strong> Nếu không bật bước này, bạn sẽ gặp lỗi "Network error"!
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Test */}
        <div className="mb-6">
          <button
            onClick={testFirebaseAuth}
            disabled={!allConfigSet || testResult === 'testing'}
            className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {testResult === 'testing' ? '⏳ Đang kiểm tra...' : '🧪 Kiểm tra Firebase Authentication'}
          </button>
        </div>

        {/* Test Result */}
        {testResult !== 'idle' && (
          <div className={`mb-6 p-6 rounded-lg ${
            testResult === 'testing' ? 'bg-blue-500/10 border border-blue-500/30' :
            testResult === 'success' ? 'bg-green-500/10 border border-green-500/30' :
            'bg-red-500/10 border border-red-500/30'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${
              testResult === 'testing' ? 'text-blue-400' :
              testResult === 'success' ? 'text-green-400' :
              'text-red-400'
            }`}>
              {testResult === 'testing' && '⏳ Đang kiểm tra...'}
              {testResult === 'success' && '✅ Firebase hoạt động hoàn hảo!'}
              {testResult === 'error' && '❌ Firebase chưa sẵn sàng'}
            </h3>

            {testResult === 'error' && errorDetails && (
              <div className="mt-3 p-3 bg-black/30 rounded font-mono text-xs text-gray-300 overflow-auto">
                {errorDetails}
              </div>
            )}

            {testResult === 'error' && errorDetails.includes('operation-not-allowed') && (
              <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded">
                <p className="text-yellow-300 font-semibold mb-2">
                  ⚠️ Bạn chưa enable Email/Password Authentication!
                </p>
                <p className="text-sm text-yellow-200">
                  Hãy làm theo Bước 2 ở trên, sau đó click "Kiểm tra" lại.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Success - Next Steps */}
        {testResult === 'success' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-400 mb-4">
              🎉 Sẵn sàng sử dụng!
            </h3>
            <p className="text-gray-300 mb-4">
              Firebase Authentication đã hoạt động. Bạn có thể:
            </p>
            <div className="space-y-2">
              <Link
                href="/register"
                className="block px-4 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg hover:shadow-lg transition-all text-center font-semibold"
              >
                Đăng Ký Tài Khoản
              </Link>
              <Link
                href="/login"
                className="block px-4 py-3 bg-[#151922] border border-[#2d333b] text-white rounded-lg hover:border-[#ff6b35] transition-colors text-center"
              >
                Đăng Nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
