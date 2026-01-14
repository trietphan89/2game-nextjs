'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp')
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    setLoading(true)

    try {
      console.log('🔥 Starting Firebase registration...')
      console.log('Auth object:', auth)
      console.log('Auth config:', {
        apiKey: auth.config.apiKey ? 'SET' : 'MISSING',
        authDomain: auth.config.authDomain,
        projectId: auth.app.options.projectId
      })
      console.log('DB object:', db)

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      console.log('✅ User created in Firebase Auth:', userCredential.user.uid)

      const user = userCredential.user

      // Update display name
      await updateProfile(user, {
        displayName: formData.username,
      })

      console.log('✅ Display name updated')

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        username: formData.username,
        displayName: formData.username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=random`,
        role: 'USER',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      console.log('✅ User data saved to Firestore')

      // Show success message
      alert('✅ Đăng ký thành công! Đang chuyển hướng...')

      // Redirect to home or profile
      router.push('/')
    } catch (error: any) {
      console.error('❌ Register error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)

      // Handle Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError('Email đã được sử dụng')
      } else if (error.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu')
      } else if (error.code === 'auth/invalid-email') {
        setError('Email không hợp lệ')
      } else if (error.code === 'auth/configuration-not-found') {
        setError('❌ Firebase Authentication chưa được cấu hình! Vui lòng bật Email/Password trong Firebase Console > Authentication > Sign-in method')
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('❌ Domain chưa được authorize! Vui lòng thêm domain vào Firebase Console > Authentication > Settings > Authorized domains')
      } else if (error.message) {
        setError(`Lỗi: ${error.message}`)
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      console.log('🔥 Starting Google Sign-In...')

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      console.log('✅ Google Sign-In successful:', user.uid)

      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))

      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          username: user.email?.split('@')[0] || user.displayName || 'user',
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=random`,
          role: 'USER',
          provider: 'google',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        console.log('✅ User data saved to Firestore')
      } else {
        console.log('✅ User already exists in Firestore')
      }

      // Show success message
      alert('✅ Đăng nhập Google thành công!')

      // Redirect to home
      router.push('/')
    } catch (error: any) {
      console.error('❌ Google Sign-In error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)

      if (error.code === 'auth/popup-closed-by-user') {
        setError('Bạn đã đóng cửa sổ đăng nhập')
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup bị chặn. Vui lòng cho phép popup và thử lại.')
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('❌ Google Sign-In chưa được bật! Vui lòng enable trong Firebase Console > Authentication > Sign-in method > Google')
      } else if (error.code === 'auth/configuration-not-found') {
        setError('❌ Firebase Authentication chưa được cấu hình! Vui lòng bật Google trong Firebase Console > Authentication > Sign-in method')
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('❌ Domain chưa được authorize! Vui lòng thêm domain vào Firebase Console > Authentication > Settings > Authorized domains')
      } else if (error.message) {
        setError(`Lỗi: ${error.message}`)
      } else {
        setError('Đăng nhập Google thất bại. Vui lòng thử lại.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-black bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent mb-2">
              2GAME
            </h1>
          </Link>
          <p className="text-gray-400">Create your account</p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#151922] border border-[#2d333b] rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-[#0a0e17] border border-[#2d333b] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-[#2d333b] bg-[#0a0e17] text-[#ff6b35] focus:ring-[#ff6b35] focus:ring-offset-0"
              />
              <label className="text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-[#ff6b35] hover:text-[#f7931e]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#ff6b35] hover:text-[#f7931e]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff6b35]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 border-t border-[#2d333b]"></div>
            <span className="text-sm text-gray-500">hoặc</span>
            <div className="flex-1 border-t border-[#2d333b]"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            type="button"
            className="mt-4 w-full py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-gray-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Đang xử lý...' : 'Đăng ký với Google'}
          </button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#ff6b35] hover:text-[#f7931e] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
