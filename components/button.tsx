import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {

  return (
    <button
      className={`
        px-4
        py-2
        rounded-lg
        border
        border-lumen-border
        bg-lumen-surface
        text-lumen-text
        font-plex
        font-normal
        hover:bg-lumen-hover
        transition-colors
        duration-200
        whitespace-nowrap
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
