import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gradient:
          "text-white font-medium " +
          "bg-violet-600 " +
          "shadow-[0_10px_30px_rgba(124,58,237,0.22)] " +
          "hover:bg-violet-700 " +
          "hover:shadow-[0_16px_40px_rgba(124,58,237,0.32)] " +
          "hover:-translate-y-[2px] " +
          "active:scale-[0.96] " +
          "transition-all duration-200",

        soft:
          "font-medium text-gray-700 " +
          "px-5 py-2.5 " +
          "rounded-lg " +
          "border border-gray-200 " +
          "bg-white " +
          "hover:bg-gray-50 " +
          "hover:border-gray-300 " +
          "hover:-translate-y-[1px] " +
          "active:scale-[0.97] " +
          "transition-all duration-200",

        ghost: "text-gray-600 hover:bg-gray-100 hover:text-black",

        destructive: "bg-red-500 text-white shadow hover:bg-red-600",

        default: "bg-black text-white hover:bg-black/90",
      },

      size: {
        default: "h-11 px-7",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
