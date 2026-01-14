'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'

export default function CheckFirebasePage() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [errorCode, setErrorCode] = useState('')

  const testFirebaseAuth = async () => {
    setStatus('testing')
    setMessage('Đang kiểm tra Firebase Authentication...')
    setErrorCode('')

    try {
      // Try to create a test user
      const testEmail = `test-${Date.now()}@example.com`
      const testPassword = 'test123456'

      await createUserWithEmailAndPassword(auth, testEmail, testPassword)

      setStatus('success')
      setMessage('✅ Firebase Authentication đang hoạt động!')
    } catch (error: any) {
      console.error('Firebase Auth Test Error:', error)
      setErrorCode(error.code)
      setStatus('error')

      if (error.code === 'auth/operation-not-allowed') {
        setMessage('❌ Email/Password authentication CHƯA ĐƯỢC BẬT trong Firebase Console')
      } else if (error.code === 'auth/invalid-api-key') {
        setMessage('❌ API Key không hợp lệ')
      } else {
        setMessage(`❌ Lỗi: ${error.message}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[#ff6b35] hover:text-[#f7931e] mb-4 inline-block">
          ← Quay lại
        </Link>

        <h1 className="text-3xl font-bold text-white mb-6">
          Kiểm Tra Firebase Authentication
        </h1>

        {/* Config Status */}
        <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Firebase Config:</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">API Key:</span>
              <span className={process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Có' : '❌ Thiếu'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Auth Domain:</span>
              <span className={process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Có' : '❌ Thiếu'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Project ID:</span>
              <span className={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Có' : '❌ Thiếu'}
              </span>
            </div>
            {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && (
              <div className="mt-2 text-xs text-gray-500">
                Project: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
              </div>
            )}
          </div>
        </div>

        {/* Test Button */}
        <button
          onClick={testFirebaseAuth}
          disabled={status === 'testing'}
          className="w-full mb-6 px-6 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          {status === 'testing' ? 'Đang kiểm tra...' : 'Kiểm Tra Firebase Authentication'}
        </button>

        {/* Result */}
        {status !== 'idle' && (
          <div className={`p-6 rounded-lg mb-6 ${
            status === 'testing' ? 'bg-blue-500/10 border border-blue-500/30' :
            status === 'success' ? 'bg-green-500/10 border border-green-500/30' :
            'bg-red-500/10 border border-red-500/30'
          }`}>
            <p className={`text-lg font-semibold mb-2 ${
              status === 'testing' ? 'text-blue-400' :
              status === 'success' ? 'text-green-400' :
              'text-red-400'
            }`}>
              {message}
            </p>
            {errorCode && (
              <p className="text-sm text-gray-400 mt-2">
                Error Code: <code className="bg-black/30 px-2 py-1 rounded">{errorCode}</code>
              </p>
            )}
          </div>
        )}

        {/* Instructions */}
        {status === 'error' && errorCode === 'auth/operation-not-allowed' && (
          <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              ⚠️ Cần Làm Gì?
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>
                Mở Firebase Console:{' '}
                <a
                  href="https://console.firebase.google.com/project/game-demo-c2462/authentication/providers"
                  target="_blank"
                  className="text-[#ff6b35] hover:underline"
                >
                  Click vào đây
                </a>
              </li>
              <li>Tìm dòng <strong>"Email/Password"</strong></li>
              <li>Click vào dòng đó</li>
              <li>Bật switch <strong>"Enable"</strong> (phải màu xanh)</li>
              <li>Click nút <strong>"Save"</strong></li>
              <li>Quay lại đây và click <strong>"Kiểm Tra Firebase Authentication"</strong> lại</li>
            </ol>

            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <p className="text-yellow-400 text-sm">
                💡 <strong>Lưu ý:</strong> Đây là bước BẮT BUỘC để đăng ký/đăng nhập hoạt động!
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-[#151922] border border-green-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">
              ✅ Hoàn Thành!
            </h2>
            <p className="text-gray-300 mb-4">
              Firebase Authentication đã sẵn sàng. Bây giờ bạn có thể:
            </p>
            <div className="space-y-2">
              <Link
                href="/register"
                className="block px-4 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#f7931e] transition-colors text-center font-semibold"
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
