"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  /** The route path to navigate to */
  href: string;
  /** Link text content */
  children: React.ReactNode;
}

/**
 * Reusable Navigation Link component
 *
 * Automatically detects the active route using Next.js usePathname hook
 * and applies the active styling when the current URL matches the link href.
 */
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-md font-medium transition-all cursor-pointer text-[1rem]
        ${
          pathname === href
            ? "text-primary"
            : "text-text-secondary hover:text-primary"
        }
      `.trim()}
    >
      {children}
    </Link>
  );
}
