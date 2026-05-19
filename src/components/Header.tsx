import Link from "next/link";
import { NavLink } from "./NavLink";
import { PrimaryButton } from "@/ui/PrimaryButton";
import { SecondaryButton } from "@/ui/SecondaryButton";
import { Logo } from "@/ui/Logo";

/**
 * Header component displayed on all pages
 *
 * Layout (RTL - Right to Left for Arabic):
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 * | [Logo]    الرئيسية  التعليم  الوثائق  من نحن  المساهمة     [تسجيل حساب][تسجيل الدخول]   │
 * └──────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * - Logo on the RIGHT (start in RTL = right side)
 * - Navigation links in the CENTER
 * - Auth buttons on the LEFT (end in RTL = left side)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-site-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-22.5 max-w-[1440] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Right side (start in RTL) */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Navigation Links - Center */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink href="/">الرئيسية</NavLink>
          <NavLink href="/education">التعليم</NavLink>
          <NavLink href="/docs">الوثائق</NavLink>
          <NavLink href="/contribute">من نحن</NavLink>
          <NavLink href="/support">المساهمة</NavLink>
        </nav>

        {/* Auth Buttons - Left side (end in RTL) */}
        <div className="flex items-center gap-9">
          <SecondaryButton>تسجيل الدخول</SecondaryButton>
          <PrimaryButton>تسجيل حساب</PrimaryButton>
        </div>
      </div>
    </header>
  );
}
