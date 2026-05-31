"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen,
  FileText,
  Download,
  Settings,
  Mail,
  Info,
  Heart,
  Shield,
  UserCircle,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MenuItem {
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  isDivider?: boolean;
  isAccent?: boolean;
}

interface MobileBottomMenuProps {
  /** Custom menu items. If not provided, defaults are used. */
  items?: MenuItem[];
  /** Called when the menu is dismissed. */
  onClose?: () => void;
}

// ─── Default Menu Items ──────────────────────────────────────────────────────

const defaultItems: MenuItem[] = [
  { label: "تعليم", icon: BookOpen, href: "/learn" },
  { label: "وثائق", icon: FileText, href: "/docs" },
  { label: "تحميل اللغة", icon: Download, href: "/download" },
  { label: "إعدادات", icon: Settings, href: "/settings" },
  { label: "تواصل معنا", icon: Mail, href: "/contact" },
  { label: "من نحن", icon: Info, href: "/about" },
  { label: "المساهمة", icon: Heart, href: "/support" },
  { label: "الشروط والخصوصية", icon: Shield, href: "/terms" },
  {
    label: "تسجيل الدخول / حساب جديد",
    icon: UserCircle,
    href: "/signin",
    isAccent: true,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MobileBottomMenu({
  items = defaultItems,
  onClose,
}: MobileBottomMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  // Refs for drag / focus management
  const sheetRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  // Drag state refs (mutable, no re-renders)
  const dragStartY = useRef<number>(0);
  const dragStartTranslate = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const lastTouchY = useRef<number>(0);
  const lastTouchTime = useRef<number>(0);
  const velocity = useRef<number>(0);

  // Reduced motion preference
  const prefersReducedMotion = useRef<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Open / Close ─────────────────────────────────────────────────────────

  const openMenu = useCallback(() => {
    setIsOpen(true);
    // Lock body scroll
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    // Unlock body scroll
    document.body.style.overflow = "";
    // Reset drag position
    currentTranslate.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    // Return focus to FAB
    setTimeout(() => fabRef.current?.focus(), 100);
    onClose?.();
  }, [onClose]);

  // ── Focus Trap ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    // Collect focusable elements inside the sheet
    const sheet = sheetRef.current;
    if (!sheet) return;

    const selectors = [
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
    ];
    focusableElementsRef.current = Array.from(
      sheet.querySelectorAll<HTMLElement>(selectors.join(",")),
    ).filter(
      (el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null,
    );

    // Focus first element
    focusableElementsRef.current[0]?.focus();
  }, [isOpen]);

  // ── Keyboard: Escape to close, Tab trapping ───────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key === "Tab") {
        const focusable = focusableElementsRef.current;
        if (focusable.length === 0) return;

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift+Tab
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // ── Cleanup on unmount ───────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Drag Handlers ────────────────────────────────────────────────────────

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartY.current = touch.clientY;
    dragStartTranslate.current = currentTranslate.current;
    lastTouchY.current = touch.clientY;
    lastTouchTime.current = Date.now();
    velocity.current = 0;
    isDragging.current = true;

    // Disable transition during drag for instant response
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStartY.current;

    // Only allow downward drag (positive deltaY)
    if (deltaY < 0) return;

    const now = Date.now();
    const timeDelta = now - lastTouchTime.current;
    if (timeDelta > 0) {
      velocity.current = (touch.clientY - lastTouchY.current) / timeDelta;
    }
    lastTouchY.current = touch.clientY;
    lastTouchTime.current = now;

    currentTranslate.current = dragStartTranslate.current + deltaY;
    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${currentTranslate.current}px)`,
    );
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 100;
    const velocityThreshold = 0.5;

    if (
      currentTranslate.current > threshold ||
      velocity.current > velocityThreshold
    ) {
      // Dismiss
      if (prefersReducedMotion.current) {
        closeMenu();
        return;
      }

      // Animate out to bottom of viewport
      const sheet = sheetRef.current;
      if (sheet) {
        const rect = sheet.getBoundingClientRect();
        const remaining = window.innerHeight - rect.top;
        sheet.style.transition = "transform 250ms ease-in";
        sheet.style.transform = `translateY(${remaining}px)`;
        setTimeout(() => closeMenu(), 260);
      } else {
        closeMenu();
      }
    } else {
      // Snap back
      if (prefersReducedMotion.current) {
        currentTranslate.current = 0;
        sheetRef.current?.style.setProperty("transform", "");
        return;
      }

      currentTranslate.current = 0;
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.transition =
          "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";
        sheet.style.transform = "translateY(0px)";
      }
    }
  }, [closeMenu]);

  // ── Overlay click to dismiss ─────────────────────────────────────────────

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  // ── Render ────────────────────────────────────────────────────────────────

  const animationClass = prefersReducedMotion.current
    ? "transition-opacity duration-200"
    : "";

  return (
    <>
      {/* ── FAB Trigger ─────────────────────────────────────────────────── */}
      <button
        ref={fabRef}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-bottom-sheet"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        className={[
          "fixed z-60",
          "bottom-6 right-6",
          "rounded-2xl",
          "px-4 py-[14px]",
          "bg-blue-500/20 backdrop-blur-md",
          "border border-white/20",
          "shadow-lg shadow-blue-500/10",
          "text-white",
          "flex items-center justify-center",
          "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "hover:scale-105 hover:brightness-110",
          "active:scale-95",
          isOpen ? "-translate-y-115" : "",
        ].join(" ")}
      >
        {/* Icon morph: three dots → X */}
        <span
          className={[
            "relative w-5 h-5 flex items-center justify-center",
            "transition-transform duration-300",
            isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100",
          ].join(" ")}
        >
          {isOpen ? (
            // X icon
            <X size={20} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            // Three vertical dots
            <span
              className="flex flex-col items-center justify-center gap-[3px]"
              aria-hidden="true"
            >
              <span className="block w-1 h-1 rounded-full bg-white" />
              <span className="block w-1 h-1 rounded-full bg-white" />
              <span className="block w-1 h-1 rounded-full bg-white" />
            </span>
          )}
        </span>
      </button>

      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        className={[
          "fixed inset-0 z-50",
          "bg-black/40 backdrop-blur-sm",
          animationClass,
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />

      {/* ── Bottom Sheet Panel ──────────────────────────────────────────── */}
      <div
        id="mobile-bottom-sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={[
          "fixed bottom-0 left-0 right-0",
          "h-[70dvh]",
          "bg-slate-900/95 backdrop-blur-xl",
          "rounded-t-3xl",
          "border-t border-white/10",
          "shadow-[0_-20px_60px_-15px_rgba(36,123,255,0.9)]",
          "z-50",
          "flex flex-col",
          animationClass,
          isOpen
            ? prefersReducedMotion.current
              ? "translate-y-0 opacity-100"
              : "translate-y-0"
            : "translate-y-full",
          !isOpen ? "pointer-events-none" : "pointer-events-auto",
        ].join(" ")}
        style={
          isOpen
            ? {
                transition: prefersReducedMotion.current
                  ? "opacity 200ms"
                  : "transform 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms",
              }
            : {
                transition: prefersReducedMotion.current
                  ? "opacity 200ms"
                  : "transform 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms",
              }
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Drag Handle ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center w-full flex-shrink-0">
          <div
            className="w-12 h-1.5 bg-gray-500/50 rounded-full mt-3 mb-1 cursor-grab active:cursor-grabbing"
            role="grabber"
            aria-label="Drag to dismiss"
          />
        </div>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 pt-2 pb-2 flex-shrink-0">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            القائمة
          </h2>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-white/5 mx-6" />

        {/* ── Scrollable Content ───────────────────────────────────────── */}
        <nav
          className="flex-1 overflow-y-auto px-6 py-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}
        >
          <div className="flex flex-col gap-1">
            {items.map((item, index) => {
              const IconComponent = item.icon;

              // Divider rendering
              if (item.isDivider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="border-b border-white/5 my-3 mx-2"
                  />
                );
              }

              const isLastItem = index === items.length - 1 && item.isAccent;

              if (isLastItem) {
                // Accent card for Sign In / Sign Up
                return (
                  <a
                    key={item.label}
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      closeMenu();
                    }}
                    className={[
                      "flex items-center gap-3",
                      "mt-4 p-4 rounded-xl",
                      "bg-blue-500/10 border border-blue-500/20",
                      "hover:bg-blue-500/20 active:bg-blue-500/30",
                      "transition-colors duration-200",
                    ].join(" ")}
                    role="button"
                    aria-label={item.label}
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20">
                      <IconComponent
                        size={20}
                        strokeWidth={1.8}
                        className="text-blue-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-white font-medium text-base">
                      {item.label}
                    </span>
                  </a>
                );
              }

              // Standard menu item
              return (
                <button
                  key={item.label}
                  type="button"
                  ref={index === 0 ? firstFocusableRef : undefined}
                  onClick={() => {
                    item.onClick?.();
                    closeMenu();
                  }}
                  className={[
                    "flex items-center gap-3 w-full",
                    "py-3 px-4 rounded-xl",
                    "text-left",
                    "text-gray-200",
                    "hover:bg-white/5 active:bg-white/10",
                    "transition-colors duration-200",
                  ].join(" ")}
                  aria-label={item.label}
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5">
                    <IconComponent
                      size={20}
                      strokeWidth={1.8}
                      className="text-gray-300"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-base font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Footer Spacer ────────────────────────────────────────────── */}
        <div className="h-4 flex-shrink-0" />
      </div>
    </>
  );
}

export { MobileBottomMenu };
export type { MenuItem, MobileBottomMenuProps };
