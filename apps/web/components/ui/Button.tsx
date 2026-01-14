import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-widest uppercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-background-dark hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(0,174,239,0.4)]",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-primary/50",
        secondary: "bg-navy-900 text-white hover:bg-navy-800",
        ghost: "hover:bg-white/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        cyan: "bg-primary text-background-dark hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(0,174,239,0.4)]", // Alias for explicit request
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
