import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Geriye Kapsama (Facade) Deseni: HTML düğmelerine özgü özellikleri saklamak ve kullanımı kolaylaştırmak için kullanılıyor.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Geriye Kapsama (Facade) Deseni kullanılarak, HTML düğmeleri için genel bir bileşen oluşturuluyor.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(`
        w-full
        rounded-full
        bg-green-500
        border
        border-transparent
        px-3
        py-3
        disabled:cursur-not-allowed
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `,
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button";

export default Button;
