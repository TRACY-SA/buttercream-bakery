export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 34h36l-4.2 22H18.2L14 34z" fill="#F9E08C" />
      <path d="M22 36.5 20.6 54M32 36v18M42 36.5 43.4 54" stroke="#E0B84A" strokeWidth="1.6" />
      <path
        d="M12 34c1.2-8 6.4-13 12.4-11.2 1.2-7.4 12.6-9.2 19.2-3.2 5.6 1.4 8.8 7 6.6 14.4H12z"
        fill="#F4B7C8"
      />
      <path
        d="M18 30c3.2-6.4 10-8.2 15.2-4.6 2.4-5.2 10.4-5.6 14 0"
        fill="none"
        stroke="#E28AA6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32.2 14.2c.8-2.2 3.5-2.8 4.8-.6 1.4-2 4.4-1.6 5 .8 1.6 2.6-3.2 6.2-4.8 7.2-1.8-1.2-6.2-4.4-5-7.4z"
        fill="#C96B84"
      />
    </svg>
  );
}

export function Logo({
  tone = "default",
  compact = false,
}: {
  tone?: "default" | "inverse";
  compact?: boolean;
}) {
  const script = tone === "inverse" ? "text-blush" : "text-rose";
  const small = tone === "inverse" ? "text-butter" : "text-gold";

  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className={compact ? "h-9 w-9" : "h-11 w-11 shrink-0"} />
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`font-script text-[1.65rem] leading-none sm:text-[1.9rem] ${script}`}>
          Buttercream
        </span>
        {!compact ? (
          <span className={`mt-1 font-serif text-[0.62rem] tracking-[0.38em] ${small}`}>BAKERY</span>
        ) : null}
      </span>
    </span>
  );
}
