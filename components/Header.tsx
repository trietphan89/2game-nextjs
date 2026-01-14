'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Download, Sparkles, User, LogOut, Settings, Smartphone, Monitor } from 'lucide-react'
import { useLanguage } from '@/app/layout'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePlatform } from '@/lib/contexts/PlatformContext'
import { Tooltip } from '@/components/ui'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { t } = useLanguage()
  const { user, isAuthenticated, loading, login, register, logout } = useAuth()
  const { platform, setPlatform } = usePlatform()

  // Login form state
  const [loginForm, setLoginForm] = useState({ emailOrUsername: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    email: '',
    username: '',
    password: '',
    displayName: '',
  })
  const [registerError, setRegisterError] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    const result = await login(loginForm.emailOrUsername, loginForm.password)

    if (result.success) {
      setShowLoginModal(false)
      setLoginForm({ emailOrUsername: '', password: '' })
    } else {
      setLoginError(result.error || 'Login failed')
    }

    setLoginLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError('')
    setRegisterLoading(true)

    const result = await register(
      registerForm.email,
      registerForm.username,
      registerForm.password,
      registerForm.displayName
    )

    if (result.success) {
      setShowRegisterModal(false)
      setRegisterForm({ email: '', username: '', password: '', displayName: '' })
    } else {
      setRegisterError(result.error || 'Registration failed')
    }

    setRegisterLoading(false)
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-[100] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl border-b border-[#2d333b]">
        <div className="px-6 py-3 flex items-center justify-between relative">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center font-semibold text-black text-sm">
              2G
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-gray-100">2GAME.VN</div>
            </div>
          </Link>

          {/* Search Bar - Absolutely Positioned to Align with Main Feed */}
          <div className="absolute left-[260px] w-[600px] px-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#1c2128] border border-[#2d333b] rounded-3xl py-2.5 px-4 pr-24 text-sm text-[#e8eaed] placeholder:text-[#6e7681] focus:outline-none focus:border-[#ff6b35] focus:bg-[#242b36] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-3 py-1 rounded-2xl text-[11px] font-semibold text-black flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{t.copilot}</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Platform Switch */}
            <div className="flex bg-[#1c2128] border border-[#2d333b] rounded-2xl overflow-hidden">
              <button
                onClick={() => setPlatform('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all ${
                  platform === 'all'
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                    : 'text-[#9aa0a6] hover:text-[#e8eaed]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>All</span>
              </button>
              <button
                onClick={() => setPlatform('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all ${
                  platform === 'mobile'
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                    : 'text-[#9aa0a6] hover:text-[#e8eaed]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setPlatform('pc')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all ${
                  platform === 'pc'
                    ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                    : 'text-[#9aa0a6] hover:text-[#e8eaed]'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
                </svg>
                <span>PC</span>
              </button>
            </div>

            {/* Download PC Button */}
            <Tooltip content="Download for Windows & macOS" position="bottom">
              <button className="flex items-center gap-1 bg-[#1c2128] border border-[#2d333b] px-3 py-1.5 rounded-2xl text-xs font-semibold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all whitespace-nowrap">
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadPC}</span>
              </button>
            </Tooltip>

            {/* Mobile App Button */}
            <Tooltip content="Get Android & iOS app" position="bottom">
              <button className="flex items-center gap-1 bg-[#1c2128] border border-[#2d333b] px-3 py-1.5 rounded-2xl text-xs font-semibold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all whitespace-nowrap">
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.downloadMobile}</span>
              </button>
            </Tooltip>

            {/* Auth Buttons or User Dropdown */}
            {!loading && (
              <>
                {isAuthenticated && user ? (
                  <>
                    {/* Click outside overlay */}
                    {showUserMenu && (
                      <div
                        className="fixed inset-0 z-[105]"
                        onClick={() => setShowUserMenu(false)}
                      />
                    )}

                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 bg-[#1c2128] border border-[#2d333b] px-3 py-1.5 rounded-2xl hover:border-[#ff6b35] transition-all"
                      >
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                          alt={user.username}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs font-semibold">{user.displayName || user.username}</span>
                      </button>

                      {showUserMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1c2128] border border-[#2d333b] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden z-[110]">
                          <Link
                            href="/my-account"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#242b36] transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#242b36] transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#242b36] transition-colors text-red-400"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      href="https://www.2game.space/login/"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#1c2128] border border-[#2d333b] rounded-2xl hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all"
                    >
                      Login
                    </a>
                    <a
                      href="https://www.2game.space/register/"
                      className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black rounded-2xl hover:opacity-90 transition-all"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-[rgba(10,14,23,0.95)] backdrop-blur-xl border-b border-[#2d333b]">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-[#1c2128] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] rounded-lg flex items-center justify-center font-semibold text-black text-sm">
                2G
              </div>
              <div className="text-sm font-semibold tracking-tight text-gray-100">2GAME.VN</div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#1c2128] rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Platform Switch */}
              <div className="flex bg-[#1c2128] border border-[#2d333b] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setPlatform('all')}
                  className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold ${
                    platform === 'all'
                      ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                      : 'text-[#9aa0a6]'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>All</span>
                </button>
                <button
                  onClick={() => setPlatform('mobile')}
                  className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold ${
                    platform === 'mobile'
                      ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                      : 'text-[#9aa0a6]'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>
                <button
                  onClick={() => setPlatform('pc')}
                  className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold ${
                    platform === 'pc'
                      ? 'bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black'
                      : 'text-[#9aa0a6]'
                  }`}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/>
                  </svg>
                  <span>PC</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[57px]" />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-[#1c2128] border border-[#2d333b] rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#242b36] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Login to 2GAME.VN</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email or Username</label>
                <input
                  type="text"
                  value={loginForm.emailOrUsername}
                  onChange={(e) => setLoginForm({ ...loginForm, emailOrUsername: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="Enter your email or username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-sm text-red-400">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setShowLoginModal(false)
                  setShowRegisterModal(true)
                }}
                className="text-[#ff6b35] hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-[#1c2128] border border-[#2d333b] rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#242b36] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Create Account</h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Name (Optional)</label>
                <input
                  type="text"
                  value={registerForm.displayName}
                  onChange={(e) => setRegisterForm({ ...registerForm, displayName: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full bg-[#0a0e17] border border-[#2d333b] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6b35] transition-all"
                  placeholder="At least 6 characters"
                  required
                />
              </div>

              {registerError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5 text-sm text-red-400">
                  {registerError}
                </div>
              )}

              <button
                type="submit"
                disabled={registerLoading}
                className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {registerLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setShowRegisterModal(false)
                  setShowLoginModal(true)
                }}
                className="text-[#ff6b35] hover:underline font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
