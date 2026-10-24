import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";
import { OpenStatus } from "@/components/contact/OpenStatus";
import { ContactForm } from "@/components/forms/EnquiryForms";
import { business, mapsUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call or visit Buttercream Bakery at GE 452 - 3365, Dome Pillar 2, Accra.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-rose">Dome Pillar 2</p>
      <h1 className="mt-2 max-w-3xl font-serif text-5xl sm:text-6xl">Come in, or send a note.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Ask about a loaf, an order, or a cake for a celebration. The telephone is the direct line.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <article className="rounded-[1.6rem] bg-white p-6">
            <h2 className="font-serif text-3xl">{business.name}</h2>
            <div className="mt-5 space-y-4 text-sm leading-6">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-deep" aria-hidden="true" />
                <span>
                  {business.location}
                  <span className="block">{business.streetAddress}</span>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-rose-deep" aria-hidden="true" />
                <a className="underline" href={`tel:${business.telephoneTel}`}>
                  {business.telephoneDisplay}
                </a>
              </p>
              <p className="flex gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-rose-deep" aria-hidden="true" />
                <span>
                  {business.hoursLabel}
                  <span className="block">Closed {business.closedDaysLabel}.</span>
                  <OpenStatus />
                </span>
              </p>
            </div>
          </article>
          <article className="rounded-[1.6rem] bg-blush/60 p-6">
            <h2 className="font-serif text-3xl">Find the bakery</h2>
            <p className="mt-3 text-sm leading-6">
              {business.streetAddress}
              <span className="block">{business.location}</span>
            </p>
            <a href={mapsUrl()} className="mt-5 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm text-white">
              Open directions
            </a>
          </article>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
