import Link from 'next/link'

type ButtonVariant = 'solid' | 'outline' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  variant = 'solid',
  href,
  onClick,
  children,
  className = '',
  'aria-label': ariaLabel,
  disabled,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2'

  const variants: Record<ButtonVariant, string> = {
    solid: 'bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-950',
    outline:
      'border border-brand-300 text-brand-900 hover:bg-brand-50 active:bg-brand-100',
    ghost: 'text-accent-700 hover:bg-accent-50 active:bg-accent-100',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
