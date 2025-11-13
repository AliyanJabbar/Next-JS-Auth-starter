import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/80 hover:shadow-lg transition-all duration-200",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80 hover:shadow-lg transition-all duration-200",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent/50 hover:text-accent-foreground hover:border-accent/50 hover:shadow-md transition-all duration-200",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70 hover:shadow-md transition-all duration-200",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-all duration-200",
      },
      size: {
        default: "h-10 px-6 py-2 text-sm",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-12 px-8 py-3 text-base",
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
