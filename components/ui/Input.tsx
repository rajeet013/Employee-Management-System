import { cn } from "@/lib/utils";
import type React from "react";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-black-300 bg-white px-3 py-2 text-sm placeholder:text-black-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
