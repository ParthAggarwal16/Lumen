interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({ onClick, children, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded-lg font-semibold transition"

  const variantStyles = variant === 'primary'
    ? "bg-white-500 text-white hover:bg-blue-600"
    : "border border-gray-400 text-white hover:bg-gray-800"

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  )
}
