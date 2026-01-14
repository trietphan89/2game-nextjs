"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/my-account/card"
import { Button } from "@/components/my-account/button"
import { Input } from "@/components/my-account/input"
import { Label } from "@/components/my-account/label"
import { Badge } from "@/components/my-account/badge"
import {
  Bell,
  Mail,
  Lock,
  Globe,
  Palette,
  Shield,
  Trash2,
  Save,
  Download,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-zinc-50 tracking-tight leading-tight">
              Settings
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
              Customize your experience and manage your account preferences
            </p>
          </div>
          <Button variant="default" size="default">
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
              <Bell className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Notification Preferences</CardTitle>
              <CardDescription className="text-base">
                Choose what notifications you want to receive
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-50">Email Notifications</p>
                <p className="text-xs text-zinc-500">Receive updates via email</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-50">Game Updates</p>
                <p className="text-xs text-zinc-500">New releases and updates</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-50">Promotional Offers</p>
                <p className="text-xs text-zinc-500">Deals and special promotions</p>
              </div>
              <input type="checkbox" className="h-5 w-5 rounded" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-zinc-50">Community Updates</p>
                <p className="text-xs text-zinc-500">Events and community news</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
              <Shield className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Privacy & Security</CardTitle>
              <CardDescription className="text-base">
                Manage your privacy settings and account security
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-zinc-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="default">Update Password</Button>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
              <Palette className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Appearance</CardTitle>
              <CardDescription className="text-base">
                Customize how 2GAME.VN looks for you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-50">Theme</p>
                <p className="text-xs text-zinc-500">Currently using dark mode</p>
              </div>
              <Badge variant="default">Dark Mode</Badge>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-zinc-50">Language</p>
                <p className="text-xs text-zinc-500">Choose your preferred language</p>
              </div>
              <Badge variant="outline">English</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
              <Download className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Data & Privacy</CardTitle>
              <CardDescription className="text-base">
                Download or delete your data
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-50">Download Your Data</p>
                <p className="text-xs text-zinc-500">
                  Get a copy of your information
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-red-400">Delete Account</p>
                <p className="text-xs text-zinc-500">
                  Permanently delete your account and data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
