export function RecipeCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full min-h-64 w-full flex-col justify-between overflow-hidden bg-[#f4b7c8] p-6 text-ink ${className}`}
      role="img"
      aria-label="Recipe book cover titled From our kitchen, Buttercream Bakery"
    >
      <span className="absolute inset-y-0 left-0 w-4 bg-[#e28aa6]" aria-hidden="true" />
      <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-butter/80" aria-hidden="true" />
      <div className="relative">
        <p className="font-serif text-[0.68rem] tracking-[0.32em]">FROM THE BAKERY</p>
        <p className="mt-8 font-script text-5xl leading-none text-rose-deep sm:text-6xl">From our kitchen</p>
      </div>
      <div className="relative">
        <p className="font-serif text-3xl">Buttercream</p>
        <p className="mt-1 text-xs tracking-[0.28em] text-gold">BAKERY NOTES</p>
      </div>
    </div>
  );
}
