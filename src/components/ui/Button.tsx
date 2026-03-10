"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-accent text-white hover:bg-orange-600 shadow-sm active:bg-orange-700',
      secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 active:bg-gray-100',
      outline: 'bg-transparent border border-primary text-primary hover:bg-blue-50 active:bg-blue-100',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base font-bold min-h-[48px]',
      lg: 'px-8 py-4 text-lg font-black min-h-[56px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
