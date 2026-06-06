"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Icon Components (SVG paths from src/assets/icons) ───────────────────────

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function BookOpenIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function FileTextIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function DownloadIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function SettingsIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MailIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function InfoIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function HeartIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

function ShieldIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function CircleUserIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function XIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface MenuItem {
  label?: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  isDivider?: boolean;
  isAuth?: boolean;
}

interface MobileNavMenuProps {
  /** Custom menu items. If not provided, defaults are used. */
  items?: MenuItem[];
  /** Called when the menu is dismissed. */
  onClose?: () => void;
}

// ─── Default Menu Items ──────────────────────────────────────────────────────

const defaultItems: MenuItem[] = [
  {
    label: "تسجيل الدخول / حساب جديد",
    icon: CircleUserIcon,
    href: "/signin",
    isAuth: true,
  },
  { isDivider: true },
  { label: "تعلّم", icon: BookOpenIcon, href: "/learn" },
  { label: "الوثائق", icon: FileTextIcon, href: "/docs" },
  { label: "تحميل", icon: DownloadIcon, href: "/download" },
  { label: "الإعدادات", icon: SettingsIcon, href: "/settings" },
  { label: "تواصل معنا", icon: MailIcon, href: "/contact" },
  { label: "من نحن", icon: InfoIcon, href: "/about" },
  { label: "المساهمة", icon: HeartIcon, href: "/support" },
  { isDivider: true },
  { label: "الشروط والخصوصية", icon: ShieldIcon, href: "/terms" },
];

// ─── Menu Item Component ─────────────────────────────────────────────────────

interface NavMenuItemProps {
  item: MenuItem;
  onClick: () => void;
}

function NavMenuItem({ item, onClick }: NavMenuItemProps) {
  if (item.isDivider) {
    return <div className="mx-2 my-3 border-b border-white/10" />;
  }

  // Guard: icon must exist for non-divider items
  if (!item.icon) return null;

  const IconComponent = item.icon;

  if (item.isAuth) {
    return (
      <a
        href={item.href || "#"}
        onClick={(e) => {
          if (item.onClick) {
            e.preventDefault();
            item.onClick();
          }
          onClick();
        }}
        className="mx-2 my-1 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-primary/10 active:bg-primary/15"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
          <IconComponent size={18} strokeWidth={1.8} className="text-primary" />
        </span>
        <span className="text-base font-medium text-text">{item.label}</span>
      </a>
    );
  }

  return (
    <a
      href={item.href || "#"}
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault();
          item.onClick();
        }
        onClick();
      }}
      className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-text-secondary transition-colors hover:bg-primary/5 hover:text-text active:bg-white/10"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
        <IconComponent
          size={20}
          strokeWidth={1.8}
          className="text-text-secondary"
        />
      </span>
      <span className="text-base font-medium">{item.label}</span>
    </a>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MobileNavMenu({
  items = defaultItems,
  onClose,
}: MobileNavMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  // Refs
  const sheetRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Drag state
  const dragStartY = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // ── Open / Close ─────────────────────────────────────────────────────────

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    currentTranslate.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }
    setTimeout(() => fabRef.current?.focus(), 100);
    onClose?.();
  }, [onClose]);

  // ── Keyboard: Escape to close ────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
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
    isDragging.current = true;

    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - dragStartY.current;

    // Only allow downward drag
    if (deltaY < 0) return;

    currentTranslate.current = deltaY;
    sheetRef.current?.style.setProperty(
      "transform",
      `translateY(${currentTranslate.current}px)`,
    );
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 120;

    if (currentTranslate.current > threshold) {
      // Animate out
      const sheet = sheetRef.current;
      if (sheet) {
        const rect = sheet.getBoundingClientRect();
        const remaining = window.innerHeight - rect.top;
        sheet.style.transition = "transform 300ms ease-in";
        sheet.style.transform = `translateY(${remaining}px)`;
        setTimeout(() => closeMenu(), 310);
      } else {
        closeMenu();
      }
    } else {
      // Snap back
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

  return (
    <>
      {/* ── FAB Trigger ─────────────────────────────────────────────────── */}
      <button
        ref={fabRef}
        type="button"
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-sheet"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        className={[
          "fixed z-70 flex items-center justify-center md:hidden",
          "bottom-8 right-8 w-12 h-12",
          "rounded-2xl",
          "bg-primary-deep/15 backdrop-blur-md",
          "border border-primary/60",
          "shadow-lg shadow-primary/20",
          "transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "hover:scale-105",
          "active:scale-95",
          isOpen ? "translate-y-[-82.5svh]" : "translate-y-0",
        ].join(" ")}
      >
        {/* SVG Menu Icon (three lines → X animation) */}
        <svg
          className="svg w-7 h-7 text-text-secondary"
          viewBox="0 0 32 32"
          style={{
            transition: "transform 900ms cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
          }}
        >
          {/* 
            The 'top-bottom' path is a single continuous loop that contains both 
            the top and bottom segments. By manipulating stroke-dasharray/offset, 
            we create the 'flowing' effect. 
          */}
          <path
            className="line top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 3,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              transition:
                "stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 900ms cubic-bezier(0.4, 0, 0.2, 1)",
              // Closed: shows two segments (top-right and bottom-left)
              // Open: flows into a single long segment that forms the main diagonal of the X
              strokeDasharray: isOpen ? "20 300" : "12 63",
              strokeDashoffset: isOpen ? -32.42 : 0,
            }}
          />
          {/* 
            The 'middle' line is handled separately. 
            In this 'pro' version, we transform it into the second leg of the X 
            for maximum smoothness.
          */}
          <path
            className="line middle"
            d="M7 16 27 16"
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 3,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              transition:
                "transform 900ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ease",
              transformOrigin: "center",
              // We don't hide it; we rotate it to intersect the top-bottom path
            }}
          />
        </svg>
      </button>

      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className={[
          "fixed inset-0 z-50 md:hidden",
          "bg-black/50 backdrop-blur-sm",
          "transition-opacity duration-600",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />

      {/* ── Bottom Sheet Panel ──────────────────────────────────────────── */}
      <div
        id="mobile-nav-sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        aria-hidden={!isOpen}
        className={[
          "fixed bottom-0 left-0 right-0 z-60 md:hidden",
          "h-[90svh]",
          "bg-site-bg/10 backdrop-blur-xl",
          "rounded-t-3xl",
          "border-t border-primary/40",
          "shadow-[0_-20px_60px_-15px_rgba(36,123,255,0.4)]",
          "flex flex-col",
          "transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isOpen ? "translate-y-0" : "translate-y-full",
          !isOpen ? "pointer-events-none" : "pointer-events-auto",
        ].join(" ")}
      >
        {/* ── Drag Handle Area ─────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center w-full shrink-0 py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="w-12 h-1.5 bg-accent-primary/90 rounded-full"
            role="grabber"
            aria-label="اسحب للأسفل لإغلاق القائمة"
          />
        </div>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 pb-2 shrink-0">
          <h2 className="text-xl font-bold text-text tracking-wide">القائمة</h2>
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-text-secondary
             hover:text-text hover:bg-accent-primary/10 transition-colors"
          >
            <XIcon size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="mx-6 border-b border-white/10 shrink-0" />

        {/* ── Scrollable Content ───────────────────────────────────────── */}
        <nav
          className="flex-1 overflow-y-auto px-0 py-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(36,123,255,0.3) transparent",
          }}
        >
          <div className="flex flex-col gap-0">
            {items.map((item, index) => {
              if (item.isDivider) {
                return (
                  <NavMenuItem
                    key={`divider-${index}`}
                    item={item}
                    onClick={closeMenu}
                  />
                );
              }

              return (
                <NavMenuItem
                  key={item.label + "-" + index}
                  item={item}
                  onClick={closeMenu}
                />
              );
            })}
          </div>
        </nav>

        {/* ── Footer Spacer for Safe Area ──────────────────────────────── */}
        <div className="h-4 shrink-0" />
      </div>
    </>
  );
}

export { MobileNavMenu };
export type { MenuItem, MobileNavMenuProps };
