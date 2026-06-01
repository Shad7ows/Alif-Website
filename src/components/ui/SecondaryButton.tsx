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
      className={`relative inline-flex items-center justify-center group ${
        className ?? ""
      }`}
    >
      {/* Oval glow effect behind the button */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-18 h-5.25 bg-primary blur-xs rounded-full pointer-events-none transition-all duration-300 group-hover:w-22
        tablet:w-24 tablet:h-7 tablet:blur-sm tablet:group-hover:w-30"
      />
      <button
        type={type}
        onClick={onClick}
        className={`
          relative px-2 rounded-xl h-9.5 w-26.25 font-medium transition-all cursor-pointer text-[0.75rem] z-10 text-text bg-primary/3 backdrop-blur-sm
          tablet:px-3 tablet:rounded-2xl tablet:h-12.5 tablet:w-35 tablet:text-[1rem] tablet:backdrop-blur-md
        `.trim()}
      >
        {children}
      </button>
    </div>
  );
}
