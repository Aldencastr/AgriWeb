'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || React.useId()
    const errorId = error ? `${selectId}-error` : undefined
    const hintId = hint ? `${selectId}-hint` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'flex h-10 w-full rounded-lg border border-surface-border bg-surface-1 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2',
            'transition-colors duration-200 appearance-none',
            'bg-[url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }