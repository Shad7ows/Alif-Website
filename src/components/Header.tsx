"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import { PrimaryButton } from "./ui/PrimaryButton";
import { SecondaryButton } from "./ui/SecondaryButton";
import { Logo } from "./ui/Logo";
import FeatureNotification from "./FeatureNotification";

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
 * - Background appears only after scrolling down
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full self-center border-b transition-all duration-600 ${
        isScrolled
          ? "border-gray-800 bg-site-bg/90"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className="mx-auto flex h-22.5 w-full max-w-400 items-center justify-between px-4 
      tablet:px-6 
      laptop:px-8"
      >
        {/* Logo - Right side (start in RTL) */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Navigation Links - Center */}
        <nav className="hidden tablet:flex items-center gap-4.5 laptop:gap-7">
          <NavLink href="/">الرئيسية</NavLink>
          <NavLink href="/education">التعليم</NavLink>
          <NavLink href="/docs">الوثائق</NavLink>
          <NavLink href="/contribute">من نحن</NavLink>
          <NavLink href="/support">المساهمة</NavLink>
        </nav>

        {/* Auth Buttons - Left side (end in RTL) */}
        <div className="flex items-center gap-4.5 laptop:gap-9">
          <SecondaryButton onClick={() => setShowNotification(true)}>
            تسجيل الدخول
          </SecondaryButton>
          <PrimaryButton onClick={() => setShowNotification(true)}>
            تسجيل حساب
          </PrimaryButton>
        </div>

        {/* Feature Notification */}
        {showNotification && (
          <FeatureNotification
            title="قيد التطوير"
            message="نعمل حالياً على نظام تسجيل حساب ضمن موقع ألف ونحتاج بعض الوقت للإنتهاء منه
            لا تذهب بعيداً، قد تتوفر الميزة في أي وقت"
            duration={8000}
            onDismiss={() => setShowNotification(false)}
          />
        )}
      </div>
    </header>
  );
}
