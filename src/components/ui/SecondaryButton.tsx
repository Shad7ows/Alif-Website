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
                
        laptop:w-24 laptop:h-7 laptop:blur-sm laptop:group-hover:w-30"
      />
      <button
        type={type}
        onClick={onClick}
        className={`
          relative px-2 rounded-xl h-9.5 w-26.25 font-medium transition-all cursor-pointer text-[0.75rem] z-10 text-text bg-primary/3 backdrop-blur-sm
          
          laptop:px-3 laptop:rounded-2xl laptop:h-12.5 laptop:w-35 laptop:text-base laptop:backdrop-blur-md
        `.trim()}
      >
        {children}
      </button>
    </div>
  );
}
