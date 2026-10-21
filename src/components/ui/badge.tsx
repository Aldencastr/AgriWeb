'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300',
        secondary: 'border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200',
        destructive: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300',
        outline: 'text-neutral-700 border-surface-border hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
        success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />
}

export { Badge, badgeVariants }