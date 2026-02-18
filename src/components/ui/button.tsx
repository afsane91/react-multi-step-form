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
          "text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 " +
          "shadow-md shadow-purple-500/25 " +
          "hover:shadow-lg hover:shadow-purple-500/35 hover:scale-[1.02] " +
          "active:scale-[0.98] cursor-pointer",

        soft:
          "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200 " +
          "shadow-sm hover:shadow-md hover:scale-[1.02] " +
          "hover:from-gray-200 hover:to-gray-100 active:scale-[0.98] cursor-pointer",

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
