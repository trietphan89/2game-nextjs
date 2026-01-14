"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  CreditCard,
  DollarSign,
  Cloud,
  UserCog,
  Image,
  Shield,
  Search,
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const quickActions = [
  {
    group: "Navigation",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      { label: "Games Management", icon: Gamepad2, href: "/admin/games" },
      { label: "Transactions", icon: CreditCard, href: "/admin/transactions" },
      { label: "Payouts", icon: DollarSign, href: "/admin/payouts" },
      { label: "Gamers", icon: Users, href: "/admin/users/gamers" },
      { label: "Partners (KYC)", icon: UserCog, href: "/admin/users/partners" },
      { label: "Cloud Library", icon: Cloud, href: "/admin/cloud-library" },
    ],
  },
  {
    group: "Quick Search",
    items: [
      { label: "Search User by ID...", icon: Search, action: "search-user" },
      { label: "Search Game by ID...", icon: Search, action: "search-game" },
      { label: "Search Transaction...", icon: Search, action: "search-transaction" },
    ],
  },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const handleSelect = (href?: string, action?: string) => {
    if (href) {
      router.push(href)
      onOpenChange(false)
    } else if (action) {
      // Handle quick search actions
      console.log(`Executing action: ${action}`)
      onOpenChange(false)
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="scrollbar-thin">
        <CommandEmpty>No results found.</CommandEmpty>
        {quickActions.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.label}
                  onSelect={() => handleSelect(item.href, item.action)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
