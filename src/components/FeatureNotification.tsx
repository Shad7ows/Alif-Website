"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface FeatureNotificationProps {
  /** Message to display */
  message?: string;
  /** Title to display */
  title?: string;
  /** Duration in ms before auto-dismiss (0 = no auto-dismiss) */
  duration?: number;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export default function FeatureNotification({
  message = "نعمل حالياً على هذه الميزة ونحتاج بعض الوقت لإكتمالها",
  title = "قيد التطوير",
  duration = 8000,
  onDismiss,
}: FeatureNotificationProps) {
  const [phase, setPhase] = useState<"entering" | "visible" | "exiting">(
    "entering"
  );
  const handleDismissRef = useRef<(() => void) | null>(null);

  const handleDismiss = useCallback(() => {
    setPhase("exiting");
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  }, [onDismiss]);

  // Keep ref in sync for use in useEffect
  useEffect(() => {
    handleDismissRef.current = handleDismiss;
  }, [handleDismiss]);

  // Auto-dismiss after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismissRef.current?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  // Transition to visible after entering
  useEffect(() => {
    if (phase === "entering") {
      const timer = setTimeout(() => {
        setPhase("visible");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Entering: start at -100% Y, animate to 0
  // Visible: at 0
  // Exiting: animate from 0 to -100% Y
  return (
    <div
      className="fixed top-0 left-0 right-0 z-100 flex items-center justify-center pointer-events-none"
      style={{
        opacity: phase === "visible" || phase === "exiting" ? 1 : 0,
        transform:
          phase === "entering"
            ? "translateY(-100%)"
            : phase === "exiting"
            ? "translateY(-100%)"
            : "translateY(0)",
        transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="pointer-events-auto relative mx-auto mt-4 max-w-lg px-4">
        {/* Glow effect behind notification */}
        <div className="absolute -inset-1 bg-primary/30 rounded-xl blur-2xl pointer-events-none" />

        <div
          className="relative flex items-center gap-6 rounded-xl border border-primary/40 px-5 py-7"
          style={{
            background: "rgba(36,123,255,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Status indicator */}
          <div className="shrink-0">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>

          {/* Text content */}
          <div className="flex-1" dir="rtl">
            <p
              className="text-sm font-semibold text-primary mb-1"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              {title}
            </p>
            <p
              className="text-xs text-white/70 leading-relaxed"
              style={{ fontFamily: "'Tajawal', sans-serif" }}
            >
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="shrink-0 p-1.5 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white/90"
            title="إغلاق"
            aria-label="إغلاق"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M1 13L13 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
