"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useId, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useShop } from "@/components/shop/ShopProvider";
import { business, mapsUrl } from "@/lib/business";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { categoryMeta } from "@/lib/products";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Products" },
  { href: "/custom-cakes", label: "Custom Cakes" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AnnouncementBar() {
  return (
    <div className="bg-rose-deep px-4 py-2 text-center text-[0.78rem] tracking-wide text-white">
      Made with love in Accra
      <span className="mx-2 text-blush" aria-hidden="true">
        ·
      </span>
      <span className="text-blush">{business.hoursLabel}</span>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setCartOpen, currency, setCurrency } = useShop();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [path, setPath] = useState(pathname);
  const searchId = useId();
  const currencyId = useId();

  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/products?q=${encodeURIComponent(value)}` : "/products");
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream">
      <div className="mx-auto flex h-[4.6rem] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Buttercream Bakery home" className="mr-auto shrink-0 lg:mr-0">
          <Logo />
        </Link>

        <nav className="mx-auto hidden items-center gap-1 rounded-full bg-white px-1.5 py-1 lg:flex" aria-label="Main">
          {links.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm ${
                  current ? "bg-blush text-rose-deep" : "text-ink hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <label className="sr-only" htmlFor={currencyId}>
            Display currency
          </label>
          <select
            id={currencyId}
            value={currency}
            onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
            className="hidden h-10 rounded-full border border-line bg-white px-3 text-sm text-ink sm:block"
            title="Display currency"
          >
            {CURRENCIES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white"
            aria-expanded={searchOpen}
            aria-controls="header-search"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Search products</span>
          </button>

          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-white"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open cart, {cartCount} {cartCount === 1 ? "item" : "items"}</span>
            <span aria-hidden="true" className="absolute right-1 top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-rose-deep px-1 text-[0.68rem] font-semibold text-white">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {searchOpen ? (
        <form id="header-search" onSubmit={onSearch} className="border-t border-line px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-3xl gap-2">
            <label className="sr-only" htmlFor={searchId}>
              Search by product name
            </label>
            <input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cakes, bread, bento…"
              className="h-11 flex-1 rounded-full border border-line bg-white px-4"
            />
            <button type="submit" className="h-11 rounded-full bg-rose-deep px-5 text-sm text-white">
              Search
            </button>
          </div>
        </form>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-navigation">
          <button className="absolute inset-0 bg-ink/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo compact />
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => {
                const current = isCurrent(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3 text-lg ${current ? "bg-blush text-rose-deep" : "hover:bg-white"}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <label className="mt-6 text-sm text-muted" htmlFor="mobile-currency">
              Currency
              <select
                id="mobile-currency"
                value={currency}
                onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
                className="mt-2 h-11 w-full rounded-2xl border border-line bg-white px-3 text-ink"
              >
                {CURRENCIES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const year = business.copyrightYear;
  return (
    <footer className="mt-auto bg-[#3f2a2e] text-[#f8efe9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo tone="inverse" />
          <p className="mt-4 font-script text-2xl text-blush">{business.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#f0ddd4]">
            Cakes, cupcakes, bread, and pastries baked in Dome Pillar 2 since {business.established}.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-butter" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-butter" href="/products/buttercream-recipe-book">
                Recipe book
              </Link>
            </li>
            <li>
              <Link className="hover:text-butter" href="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl">The counter</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {Object.values(categoryMeta).map((category) => (
              <li key={category.href}>
                <Link className="hover:text-butter" href={category.href}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl">Visit</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-6 text-[#f0ddd4]">
            <p>{business.name}</p>
            <p>{business.location}</p>
            <p>{business.streetAddress}</p>
            <p>
              <a className="underline decoration-blush underline-offset-4" href={`tel:${business.telephoneTel}`}>
                {business.telephoneDisplay}
              </a>
            </p>
            <p>
              <a className="underline decoration-blush underline-offset-4" href={mapsUrl()}>
                Directions from the address
              </a>
            </p>
          </address>
          <p className="mt-4 text-sm leading-6">
            <span className="block text-butter">{business.hoursLabel}</span>
            Closed {business.closedDaysLabel}.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs leading-5 text-[#e7d4cb] sm:px-6 lg:px-8">
          <p>
            © {year} {business.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
