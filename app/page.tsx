import Image from "next/image";
import Link from "next/link";
import { CakeSlice, Clock3, Croissant, Heart, Sparkles, type LucideIcon } from "lucide-react";
import { RecipeCover } from "@/components/brand/RecipeCover";
import { Price } from "@/components/ui/Price";
import { FlavourReel } from "@/components/home/FlavourReel";
import { ProductCard } from "@/components/products/ProductCard";
import { business } from "@/lib/business";
import { recipeChapters, testimonials } from "@/lib/content";
import { categoryMeta, getProduct, products } from "@/lib/products";

const bestSlugs = [
  "classic-vanilla-celebration-cake",
  "rich-chocolate-fudge-cake",
  "bento-birthday-cake",
  "celebration-sheet-cake",
  "vanilla-buttercream-cupcake",
  "milk-bread",
  "butter-croissant",
  "cinnamon-roll",
];

const marquee = products.filter((product) => product.category === "cakes");

export default function HomePage() {
  const bestsellers = bestSlugs.map((slug) => getProduct(slug)).filter((product) => product !== undefined);
  const book = getProduct("buttercream-recipe-book");

  return (
    <div>
      <section className="relative min-h-[88vh] bg-ink">
        <Image
          src="/images/brand/hero.jpg"
          alt="Pale pink buttercream cake with daisies on a linen table"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-end px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pb-12">
          <div className="rise w-full max-w-3xl rounded-[2rem] bg-cream/95 p-6 shadow-2xl sm:p-10">
            <p className="font-script text-3xl text-rose sm:text-4xl">{business.tagline}</p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
              A little sweetness
              <span className="block text-rose">for every special moment.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              From everyday treats to cakes made for your biggest celebrations, every Buttercream Bakery creation is prepared with care and a little extra joy.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-rose-deep px-6 text-white">
                Shop Our Treats
              </Link>
              <Link href="/custom-cakes" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-ink ring-1 ring-line">
                Order a Custom Cake
              </Link>
            </div>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              <span>Established {business.established}</span>
              <span>{business.location}</span>
              <span>{business.hoursLabel}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="categories-title">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-rose">The counter</p>
          <h2 id="categories-title" className="mt-2 font-serif text-4xl sm:text-5xl">
            Start with what you came for
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {Object.entries(categoryMeta).map(([key, category]) => (
            <Link key={key} href={category.href} className="group overflow-hidden rounded-[1.4rem] bg-white shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image src={category.image} alt={category.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="200px" />
              </div>
              <div className="p-3">
                <h3 className="font-serif text-xl">{category.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-white py-14" aria-labelledby="marquee-title">
        <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-rose">Finished by hand</p>
            <h2 id="marquee-title" className="mt-2 font-serif text-4xl sm:text-5xl">
              Cakes that keep moving past
            </h2>
          </div>
          <Link href="/custom-cakes" className="hidden text-sm underline sm:inline">
            Plan a custom cake
          </Link>
        </div>
        <div className="marquee">
          <div className="marquee-track flex w-max gap-4 px-4">
            {[...marquee, ...marquee].map((product, index) => (
              <Link
                key={`${product.id}-${index}`}
                href={`/products/${product.slug}`}
                className="relative h-72 w-56 shrink-0 overflow-hidden rounded-[1.4rem]"
                aria-hidden={index >= marquee.length ? true : undefined}
                tabIndex={index >= marquee.length ? -1 : undefined}
              >
                <Image src={product.image} alt={index >= marquee.length ? "" : product.imageAlt} fill className="object-cover" sizes="224px" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 font-serif text-lg text-white">
                  {product.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl sm:text-5xl">Bestsellers</h2>
          <Link href="/products?bestseller=1" className="text-sm underline">
            All bestsellers
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <FlavourReel />

      {book ? (
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <RecipeCover className="min-h-[28rem]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-rose">Recipe book</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Bring a little Buttercream into your own kitchen.</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              Explore a collection of favourite baking recipes, helpful tips, and sweet ideas for creating something special at home.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {recipeChapters.map((chapter) => (
                <li key={chapter} className="flex gap-2">
                  <span className="text-rose" aria-hidden="true">
                    ·
                  </span>
                  {chapter}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-serif text-3xl">
              <Price amountGhs={book.variants[0].priceGhs} />
            </p>
            <Link href={`/products/${book.slug}`} className="mt-5 inline-flex h-12 items-center rounded-full bg-ink px-6 text-white">
              Explore the Recipe Book
            </Link>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.6rem]">
            <Image src="/images/brand/about.jpg" alt="Warm bakery counter with fresh bread and pastry" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
            <Image src="/images/brand/bag.jpg" alt="Cream bakery gift bag with blush tissue paper" fill className="object-cover" sizes="240px" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
            <Image src="/images/products/bento-birthday-cake.jpg" alt="Small boxed bento cake" fill className="object-cover" sizes="240px" />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-rose">Since {business.established}</p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">A neighbourhood bakery with a celebration habit</h2>
          <p className="mt-4 leading-7 text-muted">
            Buttercream Bakery has been baking in Dome Pillar 2 since {business.established}. The counter holds everyday bread and pastry, and the bench is where birthday cakes, bento boxes, and sheet cakes are finished for the moments people actually remember.
          </p>
          <p className="mt-3 leading-7 text-muted">
            The work is thoughtful rather than showy: a soft crumb, a finish that looks considered, and a cake that belongs on a family table.
          </p>
          <Link href="/about" className="mt-6 inline-flex text-sm underline decoration-rose underline-offset-4">
            Read our story
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {(
            [
              [Heart, "Baked with care", "Each tray is mixed, baked, and finished in the bakery. Nothing here claims a certification we have not been given."],
              [Sparkles, "Made for celebrations", "Birthdays, showers, and family tables are the reason the larger cakes exist."],
              [CakeSlice, "Thoughtful designs", "Buttercream, flowers, and a short message. The design follows the moment, and not every request can be matched."],
              [Croissant, "Treats for ordinary days", "Bread, croissants, and a single cupcake count just as much as a celebration cake."],
            ] as [LucideIcon, string, string][]
          ).map(([Icon, title, copy]) => (
            <article key={title} className="rounded-[1.5rem] bg-cream p-6">
              <Icon className="h-6 w-6 text-rose-deep" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image src="/images/products/red-velvet-cake.jpg" alt="Red velvet cake with cream-cheese frosting" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-rose">Custom cakes</p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">A cake as special as the moment.</h2>
          <p className="mt-4 leading-7 text-muted">
            Tell us the flavour, the size, the date, and what the cake should feel like. We read the note before anything is promised. A message for the top can be included with the design notes.
          </p>
          <Link href="/custom-cakes#request" className="mt-6 inline-flex h-12 items-center rounded-full bg-rose-deep px-6 text-white">
            Start a cake request
          </Link>
        </div>
      </section>

      <section className="bg-[#f8efe8] py-16" aria-labelledby="stories-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="stories-title" className="font-serif text-4xl">Customer reviews</h2>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            {testimonials.map((story) => (
              <figure key={story.id} className="w-72 shrink-0 rounded-[1.4rem] bg-white p-5">
                <p className="text-sm text-gold" aria-label={`Rating ${story.stars} out of 5`}>
                  {"★".repeat(story.stars)}
                  <span className="text-line">{"★".repeat(5 - story.stars)}</span>
                </p>
                <blockquote className="mt-3 text-sm leading-6">{story.quote}</blockquote>
                <figcaption className="mt-4 text-sm text-muted">{story.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl">How an order moves</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Choose", "Pick a bake, a size or a box, and keep everything in one cart."],
            ["02", "Tell us how to hand it over", "Choose pickup at the bakery or delivery."],
            ["03", "Place your order", "Add your details at checkout and keep the reference for collection or delivery."],
          ].map(([number, title, copy]) => (
            <li key={number} className="rounded-[1.5rem] border border-line bg-white p-6">
              <p className="font-serif text-rose">{number}</p>
              <h3 className="mt-2 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          Open {business.hoursLabel}. Closed {business.closedDaysLabel}.
        </p>
      </section>

      <section className="mx-4 mb-16 overflow-hidden rounded-[2rem] bg-rose-deep text-white sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <div className="grid items-center gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Come for a loaf. Stay for the cake.</h2>
            <p className="mt-3 max-w-xl text-blush">The counter is in Dome Pillar 2, and the menu is ready to browse.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-ink">
              Our Products
            </Link>
            <Link href="/custom-cakes" className="inline-flex h-12 items-center justify-center rounded-full bg-butter px-6 text-ink">
              Custom Cakes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
