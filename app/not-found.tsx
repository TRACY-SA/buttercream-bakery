import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-script text-4xl text-rose">A missing crumb</p>
      <h1 className="mt-2 font-serif text-5xl">That page is not on the counter</h1>
      <p className="mt-4 text-muted">The link may be old, or the bake may have a different name.</p>
      <Link href="/products" className="mt-6 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
        Browse the menu
      </Link>
    </div>
  );
}
