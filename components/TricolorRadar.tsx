interface TricolorRadarProps {
  className?: string;
}

export function TricolorRadar({ className = "h-10 w-10" }: TricolorRadarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tricolor-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#FFFFFF" />
          <stop offset="66%" stopColor="#FFFFFF" />
          <stop offset="66%" stopColor="#138808" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
        <linearGradient id="tricolor-gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#F0F0F0" />
          <stop offset="66%" stopColor="#F0F0F0" />
          <stop offset="66%" stopColor="#138808" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
      </defs>
      {/* Radar icon paths */}
      <path
        d="M19.07 4.93A10 10 0 0 0 6.99 3.34"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6h.01"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.29 9.62A10 10 0 1 0 21.31 8.35"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.24 7.76A6 6 0 1 0 8.23 16.67"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18h.01"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.99 11.66A6 6 0 0 1 15.77 16.67"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13.41 10.59 5.66-5.66"
        stroke="url(#tricolor-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
