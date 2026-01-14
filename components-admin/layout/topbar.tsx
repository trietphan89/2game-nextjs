"use client"

import * as React from "react"
import { Search, Bell, User, LogOut, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TopBarProps {
  onSearchClick: () => void
}

export function TopBar({ onSearchClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div
          onClick={onSearchClick}
          className="group relative cursor-pointer"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-400" />
          <Input
            readOnly
            placeholder="Search users, games, transactions... (⌘K)"
            className="pl-10 pr-20 bg-zinc-900 border-zinc-800 cursor-pointer hover:border-zinc-700"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-xs text-zinc-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-zinc-400" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </Button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-zinc-50">Admin User</span>
            <span className="text-xs text-zinc-500">Super Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <User className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
