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
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
    borderRadius: "0.5rem",
    border: "1px solid",
    cursor: "pointer",
    fontWeight: 600
  };
  const variantStyle: React.CSSProperties =
    variant === "outline"
      ? { background: "#fff", color: "#1f2937", borderColor: "#d1d5db" }
      : { background: "#2563eb", color: "#fff", borderColor: "#2563eb" };
  const sizeStyle: React.CSSProperties = size === "sm" ? { padding: "0.35rem 0.55rem", fontSize: "0.8rem" } : { padding: "0.5rem 0.85rem", fontSize: "0.9rem" };

  return (
    <button
      type={type}
      className={className}
      style={{ ...baseStyle, ...variantStyle, ...sizeStyle, ...(style ?? {}) }}
      {...props}
    >
      {children}
    </button>
  );
}
