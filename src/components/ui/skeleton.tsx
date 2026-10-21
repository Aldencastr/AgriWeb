'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
}

function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  ...props
}: SkeletonProps) {
  const baseStyles = 'animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'
  
  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{
        width: variant === 'text' ? width : width ?? undefined,
        height: variant === 'text' ? '1rem' : height ?? undefined,
      }}
      {...props}
    />
  )
}

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
}

export function SkeletonText({ lines = 3, ...props }: SkeletonTextProps) {
  return (
    <div className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  )
}

export function SkeletonCard({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-4 p-6" {...props}>
      <Skeleton variant="rectangular" height="200px" width="100%" />
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  )
}

export { Skeleton }