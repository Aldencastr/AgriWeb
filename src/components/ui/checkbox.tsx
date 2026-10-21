'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || React.useId()

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-surface-border bg-surface-1',
              'checked:border-primary-600 checked:bg-primary-600 checked:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200',
              'after:content-[""] after:absolute after:h-2 after:w-3.5 after:opacity-0 after:rotate-45 after:border-r-2 after:border-b-2 after:border-white after:translate-y-[-1px] peer-checked:after:opacity-100',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-neutral-900 dark:text-neutral-100 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }