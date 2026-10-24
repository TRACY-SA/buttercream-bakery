/**
 * Official Buttercream Bakery details.
 * Do not add an email, social account, branch, or fee that the business has not supplied.
 * `formEndpoint` is optional. Leave it empty for the local demonstration.
 * Set NEXT_PUBLIC_FORM_ENDPOINT to a real form service when one is available.
 */
export const business = {
  name: "Buttercream Bakery",
  established: 2018,
  tagline: "Smells like home, tastes like a celebration",
  category:
    "Bakery specialising in cakes, cupcakes, bread, pastries, bento cakes, sheet cakes, celebration cakes, and desserts.",
  location: "Dome Pillar 2, Accra, Ghana",
  streetAddress: "GE 452 - 3365",
  city: "Accra",
  country: "Ghana",
  telephoneDisplay: "+233 53 979 7097",
  telephoneTel: "+233539797097",
  openingDaysLabel: "Tuesday–Saturday",
  closedDaysLabel: "Sunday and Monday",
  opensLabel: "9:00 AM",
  closesLabel: "7:00 PM",
  hoursLabel: "Tuesday–Saturday, 9:00 AM–7:00 PM",
  opensHour: 9,
  closesHour: 19,
  openWeekdays: ["Tue", "Wed", "Thu", "Fri", "Sat"] as const,
  timeZone: "Africa/Accra",
  baseCurrency: "GHS" as const,
  /** Demonstration delivery fee in Ghanaian cedis. Pickup has no fee. */
  deliveryFeeGhs: 30,
  copyrightYear: 2026,
  email: null as string | null,
  social: [] as { label: string; href: string }[],
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  mapsQuery: "GE 452 - 3365, Dome Pillar 2, Accra, Ghana",
} as const;

export function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`;
}
