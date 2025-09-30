import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  loading?: boolean
}

const Button = ({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  const base =
    'px-4 py-2 rounded-md font-medium cursor-pointer transition flex items-center justify-center space-x-2'

  const variants: Record<typeof variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-pink-500 text-white hover:bg-pink-600',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600',
  }

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-current"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      <span>{children}</span>
    </button>
  )
}

export default Button
