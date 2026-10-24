"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { minPrice, primaryProducts, products } from "@/lib/products";
import type { Product } from "@/lib/types";

const filters = [
  { id: "all", label: "All treats" },
  { id: "cakes", label: "Cakes" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "bread", label: "Bread" },
  { id: "pastries", label: "Pastries" },
  { id: "recipe-book", label: "Recipe book" },
];

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "name", label: "Name, A to Z" },
];

function matchProduct(product: Product, query: string) {
  if (!query) return true;
  const haystack = [product.name, product.description, product.details, product.category, product.subcategory ?? "", ...product.tags]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function ProductBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") ?? "all";
  const sub = params.get("sub") ?? "";
  const sort = params.get("sort") ?? "featured";
  const query = params.get("q") ?? "";
  const bestsellersOnly = params.get("bestseller") === "1";
  const [draft, setDraft] = useState(query);
  const [seenQuery, setSeenQuery] = useState(query);

  if (query !== seenQuery) {
    setSeenQuery(query);
    setDraft(query);
  }

  function update(partial: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(partial)) {
      if (!value) next.delete(key);
      else next.set(key, value);
    }
    const text = next.toString();
    router.replace(text ? `/products?${text}` : "/products", { scroll: false });
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (draft === query) return;
      update({ q: draft.trim() || null });
    }, 250);
    return () => window.clearTimeout(handle);
    // update closes over the latest params via render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const visible = useMemo(() => {
    let list = products.filter((product) => {
      if (category === "all") return product.category !== "recipe-book" || query || bestsellersOnly;
      if (product.category !== category) return false;
      if (sub && product.subcategory !== sub) return false;
      return true;
    });
    if (category === "all" && !query && !bestsellersOnly && !sub) {
      list = primaryProducts;
    }
    list = list.filter((product) => matchProduct(product, query));
    if (bestsellersOnly) list = list.filter((product) => product.bestseller);
    if (sub) list = list.filter((product) => product.subcategory === sub);

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "price-asc") return minPrice(a) - minPrice(b);
      if (sort === "price-desc") return minPrice(b) - minPrice(a);
      if (sort === "name") return a.name.localeCompare(b.name);
      const score = (item: Product) => Number(item.bestseller) * 2 + Number(item.featured);
      return score(b) - score(a) || a.name.localeCompare(b.name);
    });
    return sorted;
  }, [bestsellersOnly, category, query, sort, sub]);

  const showingPrimary = category === "all" && !query && !sub && !bestsellersOnly;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-muted">
            {visible.length} {visible.length === 1 ? "result" : "results"}
            {showingPrimary ? ` · ${primaryProducts.length} treats` : ""}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="text-sm text-muted">
            Search
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="mt-1 h-11 w-full rounded-full border border-line bg-white px-4 text-ink sm:w-64"
              placeholder="Name or flavour"
            />
          </label>
          <label className="text-sm text-muted">
            Sort
            <select
              value={sort}
              onChange={(event) => update({ sort: event.target.value === "featured" ? null : event.target.value })}
              className="mt-1 h-11 w-full rounded-full border border-line bg-white px-3 text-ink sm:w-52"
            >
              {sorts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Categories">
        {filters.map((filter) => {
          const active = category === filter.id || (filter.id === "all" && category === "all");
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={active}
              onClick={() =>
                update({
                  category: filter.id === "all" ? null : filter.id,
                  sub: null,
                })
              }
              className={`h-10 rounded-full px-4 text-sm ${active ? "bg-rose-deep text-white" : "bg-white text-ink ring-1 ring-line"}`}
            >
              {filter.label}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={sub === "bento"}
          onClick={() => update({ category: "cakes", sub: sub === "bento" ? null : "bento" })}
          className={`h-10 rounded-full px-4 text-sm ${sub === "bento" ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}
        >
          Bento cakes
        </button>
        <button
          type="button"
          aria-pressed={sub === "sheet"}
          onClick={() => update({ category: "cakes", sub: sub === "sheet" ? null : "sheet" })}
          className={`h-10 rounded-full px-4 text-sm ${sub === "sheet" ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}
        >
          Sheet cakes
        </button>
        <button
          type="button"
          aria-pressed={bestsellersOnly}
          onClick={() => update({ bestseller: bestsellersOnly ? null : "1" })}
          className={`h-10 rounded-full px-4 text-sm ${bestsellersOnly ? "bg-butter text-ink" : "bg-white ring-1 ring-line"}`}
        >
          Bestsellers
        </button>
        {query || sub || bestsellersOnly || category !== "all" || sort !== "featured" ? (
          <button type="button" className="h-10 rounded-full px-4 text-sm underline" onClick={() => router.push("/products")}>
            Clear filters
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-[1.6rem] border border-dashed border-line bg-white px-6 py-16 text-center">
          <h2 className="font-serif text-3xl">Nothing matches that search</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Try a flavour such as lemon, chocolate, or bento, or clear the filters to see the full menu.
          </p>
          <button type="button" className="mt-6 h-11 rounded-full bg-rose-deep px-5 text-sm text-white" onClick={() => router.push("/products")}>
            Show all treats
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
