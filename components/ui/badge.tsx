import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-600 text-primary-foreground hover:bg-primary-700',
        secondary:
          'border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
        destructive:
          'border-transparent bg-error-600 text-error-foreground hover:bg-error-700',
        outline: 'text-foreground border-border hover:bg-accent hover:text-accent-foreground',
        success:
          'border-transparent bg-success-600 text-success-foreground hover:bg-success-700',
        warning:
          'border-transparent bg-warning-600 text-warning-foreground hover:bg-warning-700',
        glass:
          'glass border-white/20 text-foreground hover:bg-white/20',
        gradient:
          'border-transparent bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700',
        neumorphism:
          'neumorphism border-0 text-foreground shadow-sm hover:shadow-md',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }