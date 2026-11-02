/** Decorative hero illustration: a phone receiving WiFi, with paid-plan chips. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 340" className={className} role="presentation" aria-hidden fill="none">
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="170" r="150" fill="#fff" fillOpacity=".06" />
      <circle cx="210" cy="170" r="105" fill="#fff" fillOpacity=".07" />

      <g className="hero-float">
        <rect x="138" y="42" width="144" height="264" rx="26" fill="#0b2b26" stroke="#fff" strokeOpacity=".25" strokeWidth="3" />
        <rect x="149" y="56" width="122" height="236" rx="16" fill="url(#screen)" />
        <rect x="190" y="64" width="40" height="6" rx="3" fill="#0b2b26" fillOpacity=".6" />

        <g stroke="#fff" strokeWidth="10" strokeLinecap="round">
          <path className="hero-wave" style={{ animationDelay: ".6s" }} d="M170 134a58 58 0 0 1 80 0" />
          <path className="hero-wave" style={{ animationDelay: ".3s" }} d="M184 152a38 38 0 0 1 52 0" />
          <path className="hero-wave" d="M198 170a18 18 0 0 1 24 0" />
        </g>
        <circle cx="210" cy="188" r="8" fill="#fff" />

        <rect x="167" y="222" width="86" height="34" rx="10" fill="#fff" />
        <path d="M193 239l8 8 15-16" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="hero-float" style={{ animationDelay: "1s" }}>
        <rect x="18" y="84" width="104" height="52" rx="14" fill="url(#chip)" />
        <circle cx="44" cy="110" r="11" fill="#fff" fillOpacity=".9" />
        <path d="M46 102l-6 10h6l-2 7 7-10h-6z" fill="#f97316" />
        <rect x="64" y="101" width="44" height="7" rx="3.5" fill="#fff" />
        <rect x="64" y="114" width="30" height="6" rx="3" fill="#fff" fillOpacity=".7" />
      </g>

      <g className="hero-float" style={{ animationDelay: "2s" }}>
        <rect x="298" y="200" width="104" height="52" rx="14" fill="#fff" />
        <circle cx="324" cy="226" r="11" fill="#a7f3d0" />
        <path d="M318 226l4 4 8-8" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="344" y="217" width="44" height="7" rx="3.5" fill="#047857" />
        <rect x="344" y="230" width="30" height="6" rx="3" fill="#6ee7b7" />
      </g>

      <circle cx="330" cy="86" r="6" fill="#fbbf24" />
      <circle cx="84" cy="240" r="5" fill="#6ee7b7" />
      <circle cx="356" cy="130" r="3" fill="#fff" />
      <circle cx="60" cy="176" r="3" fill="#fff" />
    </svg>
  );
}
