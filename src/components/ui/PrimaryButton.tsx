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
        px-3 rounded-2xl h-12.5 w-35 font-medium transition-all cursor-pointer text-[1rem]
        bg-[#247BFF] text-[#EEEEEE] hover:bg-[#1a6de8] shadow-[0_0_2.25rem_rgba(32,121,255,0.9)]
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
}
