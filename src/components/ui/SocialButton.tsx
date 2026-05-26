interface SocialButtonProps {
  children: React.ReactNode;
  href: string;
  bgColor: string;
  ariaLabel: string;
}

export function SocialButton({
  children,
  href,
  bgColor,
  ariaLabel,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group relative flex h-12 w-12 items-center justify-center"
    >
      {/* Glow path in top right corner - behind the button */}
      <div className="pointer-events-none absolute top-0.5 right-0.5 z-0">
        <svg
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "blur(0.5625rem)",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <path
            d="M0 0L8.10156 0Q8.32001 0 8.53819 0.0107186Q8.75637 0.0214371 8.97376 0.0428484Q9.19115 0.0642597 9.40723 0.0963121Q9.62331 0.128365 9.83756 0.170981Q10.0518 0.213597 10.2637 0.266675Q10.4756 0.319753 10.6846 0.383164Q10.8937 0.446575 11.0994 0.520166Q11.305 0.593758 11.5068 0.677353Q11.7087 0.760948 11.9061 0.854345Q12.1036 0.947742 12.2963 1.05072Q12.4889 1.15369 12.6763 1.26599Q12.8636 1.3783 13.0453 1.49966Q13.2269 1.62102 13.4024 1.75115Q13.5778 1.88127 13.7467 2.01985Q13.9155 2.15843 14.0774 2.30513Q14.2392 2.45183 14.3937 2.60629Q14.5482 2.76076 14.6949 2.92261Q14.8416 3.08447 14.9801 3.25333Q15.1187 3.42219 15.2489 3.59764Q15.379 3.7731 15.5003 3.95473Q15.6217 4.13636 15.734 4.32373Q15.8463 4.51109 15.9493 4.70374Q16.0523 4.89639 16.1457 5.09386Q16.239 5.29134 16.3226 5.49315Q16.4062 5.69497 16.4798 5.90064Q16.5534 6.10632 16.6168 6.31536Q16.6802 6.5244 16.7333 6.73629Q16.7864 6.94819 16.829 7.16244Q16.8716 7.37669 16.9037 7.59277Q16.9357 7.80885 16.9572 8.02624Q16.9786 8.24363 16.9893 8.46181Q17 8.67999 17 8.89844L17 17"
            fill="none"
            stroke={bgColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(2.5 2.5)"
          />
        </svg>
      </div>

      {/* Main Button Background & Border (Layered in the middle) */}
      <div
        className="flex w-full h-full items-center justify-center inset-0 rounded-2xl text-text-secondary/75 border border-(--brd-color)/21 backdrop-blur-lg 
        transition-all duration-500 group-hover:text-text group-hover:border-(--brd-color)/45 group-hover:bg-(--brd-color)/9 z-10"
        style={{ "--brd-color": bgColor } as React.CSSProperties}
      >
        {children}
      </div>
    </a>
  );
}
