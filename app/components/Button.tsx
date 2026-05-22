import React from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const variantClass = variant === "outline" ? "btn-outline" : "btn-primary";
  const sizeClass = size === "sm" ? "btn-sm" : "btn-md";

  return (
    <button type={type} className={`${variantClass} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
