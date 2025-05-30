import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        pending: "border-transparent bg-gray-300 text-gray-800 hover:bg-gray-400",
        processing: "border-transparent bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
        shipped: "border-transparent bg-blue-400 text-blue-900 hover:bg-blue-500",
        delivered: "border-transparent bg-green-400 text-green-900 hover:bg-green-500",
        cancelled: "border-transparent bg-red-500 text-white hover:bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
