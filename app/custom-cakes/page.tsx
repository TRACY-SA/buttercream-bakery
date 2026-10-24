import type { Metadata } from "next";
import Image from "next/image";
import { CustomCakeForm } from "@/components/forms/EnquiryForms";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Custom Cakes",
  description: "Request a Buttercream Bakery cake for a birthday, wedding, or other celebration in Accra.",
};

const gallery = products.filter((product) => product.category === "cakes");

export default function CustomCakesPage() {
  return (
    <div>
      <section className="relative min-h-[70vh] bg-ink">
        <Image
          src="/images/products/classic-vanilla-celebration-cake.jpg"
          alt="Pale celebration cake finished with flowers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="font-script text-4xl text-butter">Made for the day itself</p>
            <h1 className="mt-2 font-serif text-5xl leading-tight sm:text-6xl">A cake as special as the moment.</h1>
            <p className="mt-4 text-lg leading-7 text-white/90">
              Share a flavour, a size, the date, and the feeling you want the cake to have. Buttercream Bakery reads the request before confirming what can be made.
            </p>
            <a href="#request" className="mt-6 inline-flex h-12 items-center rounded-full bg-white px-6 text-ink">
              Go to the request form
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl">A few shapes to start from</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Minimal birthdays, floral finishes, bento boxes, sheet cakes, and chocolate celebrations. These photographs are inspiration, not a promise that a pictured design can be repeated.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((product) => (
            <figure key={product.id} className="overflow-hidden rounded-[1.3rem] bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="240px" />
              </div>
              <figcaption className="p-3 text-sm">{product.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="request" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="font-serif text-4xl">Tell us about the cake</h2>
            <p className="mt-4 leading-7 text-muted">
              Flavour, size, date, and a message are required.
            </p>
            <ol className="mt-6 space-y-3 text-sm leading-6">
              <li>1. Share the occasion and the flavour.</li>
              <li>2. Choose a size that fits the table.</li>
              <li>3. Give a date and anything the cake should say.</li>
            </ol>
          </div>
          <CustomCakeForm />
        </div>
      </section>
    </div>
  );
}
