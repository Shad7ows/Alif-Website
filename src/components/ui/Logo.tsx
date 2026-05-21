import Image from "next/image";

/**
 * Alif Logo component
 *
 * Displays the Alif logo with a glow effect using the blur() technique.
 * A blurred duplicate sits behind the sharp logo, creating a glow that
 * exactly matches the logo's blue (#335B98) and purple (#5B3398) colors.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      {/* Blurred background copy - creates the glow */}
      <Image
        src="/AlifLogo.svg"
        alt=""
        width={60}
        height={47}
        className="pointer-events-none absolute inset-0 h-12 w-auto blur-sm"
        aria-hidden="true"
      />

      {/* Sharp foreground copy */}
      <Image
        src="/AlifLogo.svg"
        alt="ألف"
        width={60}
        height={47}
        className="relative h-12 w-auto"
      />
    </div>
  );
}
