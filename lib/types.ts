export type CategoryId = "cakes" | "cupcakes" | "bread" | "pastries" | "recipe-book";

export type SubcategoryId = "celebration" | "bento" | "sheet";

export type Variant = {
  id: string;
  label: string;
  priceGhs: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  subcategory?: SubcategoryId;
  description: string;
  details: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  bestseller: boolean;
  isAvailable: boolean;
  tags: string[];
  variants: Variant[];
  /** Sample catalogue or demonstration item, not a confirmed retail listing. */
  sample: boolean;
};

export type Fulfilment = "pickup" | "delivery";

export type PaymentMethod = "mobile-money" | "card" | "pay-on-collection";

export type StoredCartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type DemoOrderLine = {
  name: string;
  variant: string;
  quantity: number;
  unitLabel: string;
  lineLabel: string;
  image: string;
  imageAlt: string;
};

export type DemoOrder = {
  reference: string;
  createdAt: string;
  currency: string;
  fulfilment: Fulfilment;
  paymentMethod: PaymentMethod;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    notes: string;
  };
  lines: DemoOrderLine[];
  subtotalLabel: string;
  deliveryLabel: string;
  totalLabel: string;
  demo: true;
};
