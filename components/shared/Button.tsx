import Link from 'next/link'

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'onDark' | 'accent'
type ButtonSize = 'sm' | 'md'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
}

export default function Button({
  variant = 'solid',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  'aria-label': ariaLabel,
  disabled,
  type = 'button',
  external,
}: ButtonProps) {
  const sizes: Record<ButtonSize, string> = {
    sm: 'rounded-lg px-3.5 py-2 text-sm font-semibold',
    md: 'rounded-lg px-6 py-3.5 font-semibold',
  }

  const base =
    `inline-flex cursor-pointer items-center justify-center ${sizes[size]} transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60`

  const variants: Record<ButtonVariant, string> = {
    solid: 'bg-brand-800 text-white hover:bg-brand-700',
    outline:
      'border border-brand-300 bg-white text-brand-800 hover:bg-brand-50',
    ghost: 'text-accent-800 hover:bg-accent-50',
    onDark:
      'border border-white/50 bg-white/10 text-white hover:bg-white/20',
    accent: 'bg-accent-500 text-[#202055] hover:bg-accent-300',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    const isExternal =
      external ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')

    if (isExternal) {
      const opensInNewTab = Boolean(external) || href.startsWith('http')
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(opensInNewTab
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      )
    }

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
