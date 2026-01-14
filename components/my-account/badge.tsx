import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium transition-smooth",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-zinc-50 hover:bg-white/20",
        secondary: "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800",
        success: "bg-green-500/10 text-green-400 hover:bg-green-500/20",
        destructive: "bg-red-500/10 text-red-400 hover:bg-red-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20",
        info: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
        outline: "border border-white/10 text-zinc-50 hover:bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
