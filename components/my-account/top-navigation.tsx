"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Settings,
  FileText,
  Bell,
  LogOut,
  Gamepad2,
  Code,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface TopNavigationProps {
  userRole?: "end-user" | "content-creator" | "developer" | "partner"
  userName?: string
  userEmail?: string
  hasNotifications?: boolean
}

const navigationItems = [
  {
    name: "Profile",
    href: "/my-account",
    icon: User,
    roles: ["end-user", "content-creator", "developer", "partner"],
  },
  {
    name: "Content",
    href: "/my-account/content",
    icon: FileText,
    roles: ["content-creator"],
  },
  {
    name: "Developer",
    href: "/my-account/developer",
    icon: Code,
    roles: ["developer"],
  },
  {
    name: "Partners",
    href: "/my-account/partners",
    icon: Users,
    roles: ["partner"],
  },
  {
    name: "Settings",
    href: "/my-account/settings",
    icon: Settings,
    roles: ["end-user", "content-creator", "developer", "partner"],
  },
]

export function TopNavigation({
  userRole = "end-user",
  userName = "User",
  userEmail = "user@example.com",
  hasNotifications = false,
}: TopNavigationProps) {
  const pathname = usePathname()
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  )

  return (
    <nav className="mx-4 mt-4 rounded-2xl border border-white/5 bg-zinc-900/80 shadow-linear-floating backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <Gamepad2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-zinc-50">2GAME.VN</span>
            <span className="text-xs text-zinc-500">My Account</span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-white/10 text-zinc-50"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-smooth hover:bg-white/5 hover:text-zinc-50">
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-smooth hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-zinc-50">{userName}</span>
                <Badge variant="info" className="text-xs py-0.5 px-2">
                  {userRole === "end-user" && "End User"}
                  {userRole === "content-creator" && "Creator"}
                  {userRole === "developer" && "Developer"}
                  {userRole === "partner" && "Partner"}
                </Badge>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-zinc-900/95 p-2 shadow-linear-lg backdrop-blur-xl">
                <div className="border-b border-white/10 px-3 py-3">
                  <p className="text-sm font-medium text-zinc-50">{userName}</p>
                  <p className="text-xs text-zinc-500">{userEmail}</p>
                </div>
                <div className="mt-2">
                  <Link
                    href="/my-account"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-smooth hover:bg-white/5 hover:text-zinc-50"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/my-account/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-smooth hover:bg-white/5 hover:text-zinc-50"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-smooth hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
