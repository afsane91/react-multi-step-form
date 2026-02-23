import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 " +
    "transition-all duration-200 outline-none " +
    "disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-gray-200 " +
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] " +
          "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 " +
          "focus:shadow-[0_4px_16px_rgba(124,58,237,0.12)]",
        error:
          "bg-white border border-red-400 " +
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] " +
          "focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
        plain:
          "bg-white border border-gray-200 shadow-none " +
          "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export { Input, inputVariants };
