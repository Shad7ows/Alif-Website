import React from "react";

interface SecondaryButtonProps {
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
 * Secondary Button component
 *
 * Outlined button with blurred background and oval glow effect behind it.
 * Used for secondary actions like "تسجيل الدخول"
 */
export function SecondaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}: SecondaryButtonProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        className ?? ""
      }`}
    >
      {/* Oval glow effect behind the button */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#247BFF] blur-sm rounded-full pointer-events-none" />
      <button
        type={type}
        onClick={onClick}
        className={`
          px-3 rounded-2xl h-12.5 w-35 font-medium transition-all cursor-pointer text-[1rem] z-10
          relative text-[#eeeeee] bg-[#247BFF]/3 backdrop-blur-md
        `.trim()}
      >
        {children}
      </button>
    </div>
  );
}
