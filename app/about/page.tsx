import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Buttercream Bakery has baked cakes, bread, and pastries in Dome Pillar 2, Accra since 2018.",
};

const values = [
  ["Care in every bake", "The dough, the crumb, and the finish get the time they need on the bench."],
  ["Thoughtful details", "A border, a ribbon, or a short name on top is part of the cake, not an afterthought."],
  ["Celebration and connection", "The larger cakes exist so people have something to gather around."],
  ["Everyday sweetness", "A loaf or a croissant is as much a part of the bakery as a birthday tier."],
];

const craft = [
  ["Planning", "A cake starts with the date, the size, and the flavour the table actually wants."],
  ["Preparation", "Sponges, doughs, and fillings are mixed for that day’s list."],
  ["Baking", "Trays go into the oven in the order the counter and the celebrations need them."],
  ["Decorating", "Buttercream, fruit, or a simple finish is added once the cake is cool enough."],
  ["Presenting", "Cakes are boxed, loaves are bagged, and the order is ready to collect."],
];

export default function AboutPage() {
  return (
    <div>
      <section className="grid min-h-[70vh] lg:grid-cols-2">
        <div className="flex items-center bg-cream px-4 py-16 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="font-script text-4xl text-rose">{business.tagline}</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">Baking for the table since {business.established}.</h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Buttercream Bakery is a neighbourhood bakery in {business.location}. The work is cakes, cupcakes, bread, pastries, and the small celebrations that fit in a box.
            </p>
          </div>
        </div>
        <div className="relative min-h-80">
          <Image src="/images/brand/about.jpg" alt="Bakery bread and pastry arranged on a counter" fill className="object-cover" priority sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-4xl">The bakery</h2>
        <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
          <p>
            Established in {business.established}, Buttercream Bakery bakes for ordinary mornings and for the days people dress up a little. The range runs from a white loaf and a butter croissant to bento cakes and sheet cakes large enough for a full table.
          </p>
          <p>
            The idea is simple: bring warmth to a celebration without making the everyday treats feel like an afterthought. A cake can be quiet. A loaf can still be the reason someone crosses the road.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {values.map(([title, copy]) => (
            <article key={title} className="rounded-[1.5rem] bg-blush/50 p-6">
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/images/products/black-forest-cake.jpg" alt="Chocolate and cherry cake on a cake board" fill className="object-cover" sizes="480px" />
          </div>
          <div>
            <h2 className="font-serif text-4xl">How a bake comes together</h2>
            <ol className="mt-6 space-y-4">
              {craft.map(([title, copy], index) => (
                <li key={title} className="grid grid-cols-[3rem_1fr] gap-3">
                  <span className="font-serif text-2xl text-rose">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="text-sm leading-6 text-muted">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-7xl rounded-[2rem] bg-butter px-6 py-12 sm:px-10">
        <h2 className="font-serif text-4xl">See what is on the counter</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-white">
            Our Products
          </Link>
          <Link href="/custom-cakes" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-ink">
            Custom Cakes
          </Link>
        </div>
      </section>
    </div>
  );
}
