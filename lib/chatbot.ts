import { business } from "@/lib/business";
import { formatMoney } from "@/lib/currency";
import { getProduct, products } from "@/lib/products";

export const suggestedQuestions = [
  "What cakes do you offer?",
  "How can I request a custom cake?",
  "What are your opening hours?",
  "Where are you located?",
  "How do I place an order?",
  "Can I buy the recipe book?",
];

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s&]/g, " ").replace(/\s+/g, " ").trim();
}

export function answerQuestion(input: string): { reply: string; suggestions: string[] } {
  const text = normalise(input);
  const phone = business.telephoneDisplay;
  const book = getProduct("buttercream-recipe-book");

  const reply = (message: string, suggestions: string[] = suggestedQuestions.slice(0, 3)) => ({
    reply: message,
    suggestions,
  });

  if (!text) {
    return reply("Type a question and I will answer from what this website actually offers.");
  }

  if (/recipe|cook ?book|book/.test(text)) {
    return reply(
      `Yes. The Buttercream Recipe Book is in the shop${
        book ? `, listed at ${formatMoney(book.variants[0].priceGhs, "GHS")}` : ""
      }. It can be added to the same cart as the bakes.`,
      ["How do I place an order?", "What cakes do you offer?"],
    );
  }

  if (/hour|open|close|time|when/.test(text)) {
    return reply(
      `${business.name} is open ${business.hoursLabel}. The bakery is closed on ${business.closedDaysLabel}. Times follow Accra.`,
      ["Where are you located?", "How do I place an order?"],
    );
  }

  if (/where|locat|address|direction|map|dome|pillar/.test(text)) {
    return reply(
      `You will find ${business.name} at ${business.streetAddress}, ${business.location}. The contact page has a directions link based on that address.`,
      ["What are your opening hours?", "How can I request a custom cake?"],
    );
  }

  if (/phone|call|telephone|number|whatsapp/.test(text)) {
    return reply(
      `The bakery telephone is ${phone}.`,
      ["What are your opening hours?", "Where are you located?"],
    );
  }

  if (/custom|bespoke|wedding cake|design a cake|message on/.test(text)) {
    return reply(
      "Open Custom Cakes and send the request form. You can share flavour, size, date, and a message.",
      ["What cakes do you offer?", "How do I place an order?"],
    );
  }

  if (/currency|cedi|dollar|pound|euro|naira|ghs|convert/.test(text)) {
    return reply(
      "Prices are set in Ghanaian cedis. The currency control in the header can also show USD, GBP, EUR, or NGN.",
      ["How do I place an order?"],
    );
  }

  if (/deliver|pickup|pick up|collection|fee/.test(text)) {
    return reply(
      `Checkout lets you choose pickup or delivery. Pickup is from ${business.location}. Delivery adds ${formatMoney(
        business.deliveryFeeGhs,
        "GHS",
      )}, converted into the currency you have selected.`,
      ["How do I place an order?", "Where are you located?"],
    );
  }

  if (/pay|checkout|momo|mobile money|card|order/.test(text)) {
    return reply(
      "Add treats to the cart, then open checkout. You can choose pickup or delivery, and pay by mobile money, card, or pay on collection.",
      ["What cakes do you offer?", "Can I buy the recipe book?"],
    );
  }

  if (/cart|basket/.test(text)) {
    return reply(
      "The cart icon in the header opens your basket. Quantities can be changed there, and the same items appear at checkout.",
    );
  }

  if (/bento/.test(text)) {
    return reply(
      "Bento cakes are in the Cakes collection. Look for Bento Birthday Cake and Chocolate Bento Cake, or use the Bento cakes category. They are small cakes for one or two people.",
      ["What cakes do you offer?", "How can I request a custom cake?"],
    );
  }

  if (/sheet/.test(text)) {
    return reply(
      "The Celebration Sheet Cake is in the Cakes collection, with quarter-sheet and half-sheet prices. Open Sheet cakes from the homepage or the product filters.",
      ["What cakes do you offer?"],
    );
  }

  if (/cupcake/.test(text)) {
    return reply(
      "There are 15 cupcakes, from vanilla buttercream to sprinkle celebration cakes. Each one can be bought singly or in a box of 6 or 12.",
      ["What cakes do you offer?", "How do I place an order?"],
    );
  }

  if (/bread|loaf|baguette|roll/.test(text)) {
    return reply(
      "The bread shelf has 15 loaves and rolls, including milk bread, brioche, garlic bread, and a baguette.",
    );
  }

  if (/pastr|croissant|cookie|brownie|pie|tart/.test(text)) {
    return reply(
      "Pastries include croissants, cinnamon rolls, cookies, brownies, tarts, sausage rolls, and meat pies. There are 15.",
    );
  }

  if (/cake|menu|product|flavour|flavor|offer|sell|treat/.test(text)) {
    return reply(
      "The menu has 15 cakes, 15 cupcakes, 15 breads, and 15 pastries, including bento cakes and a celebration sheet cake. Browse Our Products to see photos and prices.",
      ["How can I request a custom cake?", "How do I place an order?"],
    );
  }

  const named = products.find((item) => {
    const name = normalise(item.name);
    return text.includes(name) || (name.includes(text) && text.length > 5);
  });
  if (named) {
    return reply(
      `${named.name} is in the catalogue under ${named.category.replace("-", " ")}. Open it from Our Products to see the price.`,
      ["How do I place an order?"],
    );
  }

  if (/name|who are|about|established|started|2018/.test(text)) {
    return reply(
      `${business.name} was established in ${business.established}. ${business.tagline} The bakery bakes cakes, cupcakes, bread, pastries, bento cakes, and sheet cakes in ${business.location}.`,
    );
  }

  return reply(
    `I do not have an answer for that. I can help with the menu, custom cakes, opening hours, location, and checkout. For anything else, call ${phone}.`,
    suggestedQuestions.slice(0, 4),
  );
}
