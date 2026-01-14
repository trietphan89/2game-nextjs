"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Gamepad2,
  Users,
  Settings,
  ChevronDown,
  CreditCard,
  Cloud,
  UserCog,
  Image,
  Shield,
  DollarSign
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  title: string
  href?: string
  icon: React.ElementType
  badge?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Commerce Management",
    icon: ShoppingCart,
    children: [
      { title: "Transactions", href: "/admin/transactions", icon: CreditCard },
      { title: "Payouts", href: "/admin/payouts", icon: DollarSign },
    ],
  },
  {
    title: "Content & Catalog",
    icon: Gamepad2,
    children: [
      { title: "Games", href: "/admin/games", icon: Gamepad2 },
      { title: "Cloud Library", href: "/admin/cloud-library", icon: Cloud },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      { title: "Gamers", href: "/admin/users/gamers", icon: Users },
      { title: "Partners", href: "/admin/users/partners", icon: UserCog },
    ],
  },
  {
    title: "System",
    icon: Settings,
    children: [
      { title: "Banners", href: "/admin/system/banners", icon: Image },
      { title: "Permissions", href: "/admin/system/permissions", icon: Shield },
    ],
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  const toggleMenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-50">2GAME.VN</span>
              <span className="text-xs text-zinc-500">Admin CMS</span>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-md p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", collapsed ? "rotate-90" : "-rotate-90")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin h-[calc(100vh-4rem)] overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openMenus.includes(item.title) && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && openMenus.includes(item.title) && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-zinc-800 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href || "#"}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors",
                              pathname === child.href && "bg-zinc-900 text-zinc-50 font-medium"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors",
                    pathname === item.href && "bg-zinc-900 text-zinc-50",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
