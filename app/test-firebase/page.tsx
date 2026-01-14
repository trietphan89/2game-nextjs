'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'

export default function TestFirebasePage() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [message, setMessage] = useState('Đang kiểm tra kết nối Firebase...')
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    testFirebase()
  }, [])

  const testFirebase = async () => {
    try {
      setStatus('testing')
      setMessage('Đang kiểm tra kết nối Firebase...')

      // Test 1: Thêm document vào Firestore
      const testData = {
        title: 'Test Post',
        content: 'Firebase đang hoạt động!',
        createdAt: serverTimestamp(),
        testId: Math.random().toString(36).substring(7)
      }

      const docRef = await addDoc(collection(db, 'test_posts'), testData)
      console.log('✅ Document đã được tạo với ID:', docRef.id)

      // Test 2: Đọc documents từ Firestore
      const querySnapshot = await getDocs(collection(db, 'test_posts'))
      const fetchedPosts: any[] = []

      querySnapshot.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setPosts(fetchedPosts)
      setStatus('success')
      setMessage(`✅ Firebase đã hoạt động! Tìm thấy ${fetchedPosts.length} documents.`)
    } catch (error: any) {
      console.error('❌ Firebase Error:', error)
      setStatus('error')
      setMessage(`❌ Lỗi: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#ff6b35] hover:text-[#f7931e] mb-4 inline-block">
          ← Quay lại trang chủ
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">
          Firebase Connection Test
        </h1>

        {/* Status Card */}
        <div className={`p-6 rounded-lg mb-6 ${
          status === 'testing' ? 'bg-blue-500/10 border border-blue-500/30' :
          status === 'success' ? 'bg-green-500/10 border border-green-500/30' :
          'bg-red-500/10 border border-red-500/30'
        }`}>
          <p className={`text-lg font-semibold ${
            status === 'testing' ? 'text-blue-400' :
            status === 'success' ? 'text-green-400' :
            'text-red-400'
          }`}>
            {message}
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={testFirebase}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Kiểm tra lại
        </button>

        {/* Posts List */}
        {posts.length > 0 && (
          <div className="bg-[#151922] border border-[#2d333b] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Test Posts ({posts.length})
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-[#0a0e17] p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">ID: {post.id}</p>
                  <p className="text-white font-semibold">{post.title}</p>
                  <p className="text-gray-300 text-sm">{post.content}</p>
                  {post.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      {post.createdAt.toDate?.()?.toLocaleString() || 'Pending...'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-[#151922] border border-[#2d333b] rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Hướng dẫn:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Nếu thấy thông báo lỗi "Missing or insufficient permissions", bạn cần:</li>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm text-gray-400">
              <li>Vào Firebase Console: <a href="https://console.firebase.google.com/" target="_blank" className="text-[#ff6b35] hover:underline">console.firebase.google.com</a></li>
              <li>Chọn project "game-demo-c2462"</li>
              <li>Vào Firestore Database → Rules</li>
              <li>Thay đổi rules thành:</li>
            </ul>
            <pre className="bg-[#0a0e17] p-4 rounded mt-2 text-xs text-gray-300 overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
            </pre>
            <li className="mt-4">Nếu thấy "Firebase đã hoạt động!", có nghĩa là kết nối thành công!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
