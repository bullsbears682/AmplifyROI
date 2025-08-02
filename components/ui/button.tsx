import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-gradient-infinex text-white hover:shadow-lg hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-200',
        destructive: 'bg-error-600 text-error-foreground hover:bg-error-700 shadow-md hover:shadow-lg',
        outline: 'border-2 border-primary-500 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200',
        secondary: 'bg-gradient-cyber text-white hover:shadow-lg hover:shadow-accent-500/25 transform hover:scale-105 transition-all duration-200',
        ghost: 'hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950 dark:hover:text-primary-400 transition-all duration-200',
        link: 'text-primary-600 underline-offset-4 hover:underline',
        glass: 'glass backdrop-blur-xl text-foreground hover:bg-primary-500/20 border border-primary-200/20 dark:border-primary-800/20',
        gradient: 'bg-gradient-mesh text-white hover:shadow-lg hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-200',
        neumorphism: 'neumorphism text-foreground hover:shadow-neumorphism-light dark:hover:shadow-neumorphism-dark',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m12 2l0 4a8 8 0 0 1 8 8l4 0a12 12 0 0 0-12-12z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    )
    
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }