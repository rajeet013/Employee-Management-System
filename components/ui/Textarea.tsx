import { cn } from "@/lib/utils";
import type React from "react";
import { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Added 'text-black' here
          "flex min-h-[80px] w-full rounded-md border border-lime-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
