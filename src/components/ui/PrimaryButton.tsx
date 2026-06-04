import React from "react";

interface PrimaryButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional CSS class for additional styling */
  className?: string;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
}

/**
 * Primary Button component
 *
 * Filled blue button with glow shadow effect.
 * Used for primary actions like "تسجيل حساب"
 */
export function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-9.5 w-26.25 px-2 rounded-xl font-medium transition-all cursor-pointer text-[0.75rem]
        bg-primary text-text shadow-[0_0_1.7rem_rgba(32,121,255,0.75)] hover:shadow-[0_0_2rem_rgba(32,121,255,1)]
        
        laptop:shadow-[0_0_2.25rem_rgba(32,121,255,0.9)] laptop:hover:shadow-[0_0_3rem_rgba(32,121,255,1)] laptop:px-3 laptop:rounded-2xl laptop:h-12.5 laptop:w-35 laptop:text-base
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
}
