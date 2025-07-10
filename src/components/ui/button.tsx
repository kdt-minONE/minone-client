import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "urgent"
    | "minone";
  size?: "default" | "sm" | "lg" | "icon" | "xs" | "xl";
}

const buttonVariants = {
  variant: {
    default: "bg-primary-500 text-white hover:bg-primary-600 shadow-sm",
    destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-sm",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm",
    info: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-primary-500 underline-offset-4 hover:underline",
    urgent: "bg-red-500 text-white hover:bg-red-600 shadow-lg animate-pulse",
    minone: "gradient-bg text-white hover:opacity-90 shadow-lg font-semibold",
  },
  size: {
    default: "h-10 px-4 py-2",
    xs: "h-7 px-2 text-xs rounded",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8 text-base",
    xl: "h-12 rounded-md px-10 text-lg",
    icon: "h-10 w-10",
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses =
      buttonVariants.variant[variant] || buttonVariants.variant.default;
    const sizeClasses =
      buttonVariants.size[size] || buttonVariants.size.default;

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClasses,
          sizeClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
