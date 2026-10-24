import type { CategoryId, Product, SubcategoryId, Variant } from "@/lib/types";

function cake(six: number, eight: number, ten: number): Variant[] {
  return [
    { id: "6-inch", label: "6 inch", priceGhs: six },
    { id: "8-inch", label: "8 inch", priceGhs: eight },
    { id: "10-inch", label: "10 inch", priceGhs: ten },
  ];
}

/** Box prices follow the single price so one edit updates the whole cupcake. */
function cupcakes(single: number): Variant[] {
  return [
    { id: "single", label: "Single", priceGhs: single },
    { id: "box-6", label: "Box of 6", priceGhs: Math.round(single * 5.5) },
    { id: "box-12", label: "Box of 12", priceGhs: Math.round(single * 10.5) },
  ];
}

function one(id: string, label: string, priceGhs: number): Variant[] {
  return [{ id, label, priceGhs }];
}

type Seed = {
  slug: string;
  name: string;
  category: CategoryId;
  subcategory?: SubcategoryId;
  description: string;
  details: string;
  imageAlt: string;
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
  variants: Variant[];
  sample?: boolean;
};

function product(seed: Seed): Product {
  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    subcategory: seed.subcategory,
    description: seed.description,
    details: seed.details,
    image: `/images/products/${seed.slug}.jpg`,
    imageAlt: seed.imageAlt,
    featured: Boolean(seed.featured),
    bestseller: Boolean(seed.bestseller),
    isAvailable: true,
    tags: seed.tags,
    variants: seed.variants,
    sample: Boolean(seed.sample),
  };
}

const seeds: Seed[] = [
  {
    slug: "classic-vanilla-celebration-cake",
    name: "Classic Vanilla Celebration Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "A soft vanilla sponge with buttercream, finished for birthdays and family tables.",
    details:
      "Two or three layers of vanilla sponge, filled and covered with vanilla buttercream. Choose a size for the number of people you are gathering. The finish is simple, with room for a short message on the top.",
    imageAlt: "Vanilla celebration cake with pale pink buttercream and small white flowers",
    featured: true,
    bestseller: true,
    tags: ["vanilla", "birthday", "buttercream", "celebration"],
    variants: cake(240, 340, 460),
  },
  {
    slug: "rich-chocolate-fudge-cake",
    name: "Rich Chocolate Fudge Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Dark chocolate sponge and a glossy fudge frosting for people who want the cocoa first.",
    details:
      "A moist chocolate sponge with chocolate fudge frosting between the layers and over the top. It is the cake to order when the celebration should taste unmistakably of chocolate.",
    imageAlt: "Chocolate fudge cake with a glossy chocolate coating",
    featured: true,
    bestseller: true,
    tags: ["chocolate", "fudge", "birthday"],
    variants: cake(260, 370, 500),
  },
  {
    slug: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "A deep red crumb with a tangy cream-cheese frosting.",
    details:
      "Red velvet layers stacked with cream-cheese frosting. The colour stays rich rather than bright, and the crumb is soft. A reliable choice for birthdays.",
    imageAlt: "Slice of red velvet cake with white cream-cheese frosting",
    bestseller: true,
    tags: ["red velvet", "cream cheese", "birthday"],
    variants: cake(270, 380, 520),
  },
  {
    slug: "strawberry-shortcake",
    name: "Strawberry Shortcake",
    category: "cakes",
    subcategory: "celebration",
    description: "Vanilla sponge, fresh strawberries, and lightly sweetened cream.",
    details:
      "Sponge layered with cream and strawberries. Best enjoyed soon after collection, while the fruit is still bright. Ask for a size that matches your table.",
    imageAlt: "Strawberry shortcake topped with fresh strawberries",
    featured: true,
    tags: ["strawberry", "fruit", "cream", "vanilla"],
    variants: cake(250, 360, 490),
  },
  {
    slug: "lemon-drizzle-cake",
    name: "Lemon Drizzle Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "A bright lemon sponge with a sharp citrus glaze.",
    details:
      "Lemon sponge soaked with a citrus glaze so the crumb stays moist. It works for afternoon gatherings as well as birthdays that should taste fresh rather than very sweet.",
    imageAlt: "Lemon drizzle cake with a glossy lemon glaze and zest",
    tags: ["lemon", "citrus", "glaze"],
    variants: cake(230, 330, 450),
  },
  {
    slug: "carrot-cake",
    name: "Carrot Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Spiced carrot sponge, walnuts, and cream-cheese frosting.",
    details:
      "A warmly spiced carrot cake with cream-cheese frosting. The crumb is close and moist. It is a favourite for family lunches and low-key celebrations.",
    imageAlt: "Carrot cake with cream-cheese frosting and walnuts",
    tags: ["carrot", "spice", "cream cheese", "walnut"],
    variants: cake(240, 350, 470),
  },
  {
    slug: "black-forest-cake",
    name: "Black Forest Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Chocolate sponge, cherries, and whipped cream in the classic stack.",
    details:
      "Chocolate layers with cherries and cream. The fruit keeps it from tasting only of cocoa. Choose a larger size when the cake is the centre of the table.",
    imageAlt: "Black forest cake with cherries and cream",
    featured: true,
    tags: ["chocolate", "cherry", "cream"],
    variants: cake(280, 400, 540),
  },
  {
    slug: "coconut-cream-cake",
    name: "Coconut Cream Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Coconut sponge and a soft coconut buttercream.",
    details:
      "A coconut-scented sponge covered in coconut buttercream. It is gentle in sweetness and suits celebrations that want a lighter flavour than chocolate.",
    imageAlt: "Pale coconut cake with a soft white frosting",
    tags: ["coconut", "buttercream"],
    variants: cake(240, 350, 480),
  },
  {
    slug: "cookies-and-cream-cake",
    name: "Cookies and Cream Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Vanilla buttercream folded with crushed chocolate cookies.",
    details:
      "Vanilla sponge and a cookies-and-cream buttercream, with cookie pieces through the frosting. A playful cake that still looks neat enough for a party table.",
    imageAlt: "Cookies and cream cake covered with crushed chocolate cookies",
    tags: ["cookies", "chocolate", "vanilla", "birthday"],
    variants: cake(260, 370, 510),
  },
  {
    slug: "salted-caramel-cake",
    name: "Salted Caramel Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Caramel sponge, salted caramel, and a smooth caramel frosting.",
    details:
      "Layers filled with salted caramel and finished with caramel frosting. The salt keeps the sweetness in check. A popular pick for adult birthdays.",
    imageAlt: "Caramel-toned celebration cake with a glossy finish",
    bestseller: true,
    tags: ["caramel", "salt", "birthday"],
    variants: cake(270, 390, 530),
  },
  {
    slug: "marble-cake",
    name: "Marble Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Vanilla and chocolate swirled in one sponge, with a light buttercream.",
    details:
      "A marble sponge for tables that cannot choose between vanilla and chocolate. The buttercream is kept simple so the swirl stays the point.",
    imageAlt: "Marble cake showing chocolate and vanilla swirls",
    tags: ["marble", "vanilla", "chocolate"],
    variants: cake(220, 320, 440),
  },
  {
    slug: "pineapple-upside-down-cake",
    name: "Pineapple Upside-Down Cake",
    category: "cakes",
    subcategory: "celebration",
    description: "Caramelised pineapple on a golden butter cake.",
    details:
      "Pineapple rings baked on top of a butter cake, with a caramel edge. It is a nostalgic bake that still looks festive when it is turned out.",
    imageAlt: "Pineapple upside-down cake with caramelised pineapple rings",
    tags: ["pineapple", "caramel", "fruit"],
    variants: cake(230, 330, 460),
  },
  {
    slug: "bento-birthday-cake",
    name: "Bento Birthday Cake",
    category: "cakes",
    subcategory: "bento",
    description: "A small birthday cake for one or two, packed in a gift box.",
    details:
      "A compact buttercream cake made to be given or shared between two people. Add a short name or message when you order. It is a bento cake, not a full celebration tier.",
    imageAlt: "Small pink bento birthday cake in a gift box with a heart on top",
    featured: true,
    bestseller: true,
    tags: ["bento", "birthday", "gift", "small"],
    variants: [
      { id: "4-inch", label: "4 inch bento", priceGhs: 165 },
      { id: "5-inch", label: "5 inch bento", priceGhs: 195 },
    ],
  },
  {
    slug: "chocolate-bento-cake",
    name: "Chocolate Bento Cake",
    category: "cakes",
    subcategory: "bento",
    description: "A little chocolate cake in a box, finished with buttercream.",
    details:
      "Chocolate sponge and chocolate buttercream in a bento size. Useful for a desk celebration, a gift, or a very small party. A short message can be added on top.",
    imageAlt: "Small chocolate bento cake with dark frosting",
    tags: ["bento", "chocolate", "gift", "small"],
    variants: [
      { id: "4-inch", label: "4 inch bento", priceGhs: 175 },
      { id: "5-inch", label: "5 inch bento", priceGhs: 210 },
    ],
  },
  {
    slug: "celebration-sheet-cake",
    name: "Celebration Sheet Cake",
    category: "cakes",
    subcategory: "sheet",
    description: "A rectangular buttercream cake cut for a larger gathering.",
    details:
      "A sheet cake with vanilla or chocolate noted in your order message at checkout, covered in buttercream and a simple border. Quarter and half sheets are priced separately. It is meant to be sliced for a crowd.",
    imageAlt: "Rectangular blush sheet cake decorated with small white flowers",
    featured: true,
    bestseller: true,
    tags: ["sheet", "party", "crowd", "buttercream"],
    variants: [
      { id: "quarter", label: "Quarter sheet", priceGhs: 320 },
      { id: "half", label: "Half sheet", priceGhs: 480 },
    ],
  },
  {
    slug: "vanilla-buttercream-cupcake",
    name: "Vanilla Buttercream Cupcake",
    category: "cupcakes",
    description: "A vanilla cupcake with a tall swirl of buttercream.",
    details:
      "Baked in a single portion and finished with vanilla buttercream. Buy one, or a box when you need a tray for the office or a children’s table.",
    imageAlt: "Vanilla cupcake with a swirl of pale buttercream",
    featured: true,
    bestseller: true,
    tags: ["vanilla", "buttercream", "party"],
    variants: cupcakes(18),
  },
  {
    slug: "chocolate-fudge-cupcake",
    name: "Chocolate Fudge Cupcake",
    category: "cupcakes",
    description: "Chocolate cake and a fudge frosting swirl.",
    details:
      "A chocolate cupcake with enough frosting to feel generous. The box of 12 is the practical choice for a class or a family lunch.",
    imageAlt: "Chocolate cupcake with chocolate fudge frosting",
    bestseller: true,
    tags: ["chocolate", "fudge"],
    variants: cupcakes(18),
  },
  {
    slug: "red-velvet-cupcake",
    name: "Red Velvet Cupcake",
    category: "cupcakes",
    description: "Red velvet in a paper case, with cream-cheese frosting.",
    details:
      "The same red velvet crumb as the large cake, scaled to a cupcake and topped with cream-cheese frosting.",
    imageAlt: "Red velvet cupcake with cream-cheese frosting",
    tags: ["red velvet", "cream cheese"],
    variants: cupcakes(20),
  },
  {
    slug: "strawberry-cupcake",
    name: "Strawberry Cupcake",
    category: "cupcakes",
    description: "Strawberry-scented sponge with a pink buttercream top.",
    details:
      "A fruity cupcake for birthdays that want colour as well as flavour. The frosting is strawberry buttercream, not a heavy ganache.",
    imageAlt: "Strawberry cupcake with pink buttercream",
    featured: true,
    tags: ["strawberry", "fruit", "pink"],
    variants: cupcakes(20),
  },
  {
    slug: "lemon-cupcake",
    name: "Lemon Cupcake",
    category: "cupcakes",
    description: "A sharp lemon cupcake with a light citrus frosting.",
    details:
      "Lemon sponge and lemon buttercream. A good contrast on a mixed tray next to chocolate.",
    imageAlt: "Lemon cupcake with pale yellow frosting",
    tags: ["lemon", "citrus"],
    variants: cupcakes(18),
  },
  {
    slug: "cookies-and-cream-cupcake",
    name: "Cookies and Cream Cupcake",
    category: "cupcakes",
    description: "Vanilla cupcake, cookie crumbs, and cookies-and-cream frosting.",
    details:
      "Crushed chocolate cookies folded into the frosting and scattered on top. Sweet, and familiar to anyone who likes the cake version.",
    imageAlt: "Cupcake topped with cookies-and-cream frosting and cookie crumbs",
    tags: ["cookies", "chocolate", "vanilla"],
    variants: cupcakes(20),
  },
  {
    slug: "salted-caramel-cupcake",
    name: "Salted Caramel Cupcake",
    category: "cupcakes",
    description: "Caramel cupcake with a salted caramel swirl.",
    details:
      "A small version of the salted caramel cake. The salt is noticeable, not just a label on a very sweet frosting.",
    imageAlt: "Caramel cupcake with a golden frosting swirl",
    bestseller: true,
    tags: ["caramel", "salt"],
    variants: cupcakes(22),
  },
  {
    slug: "coconut-cupcake",
    name: "Coconut Cupcake",
    category: "cupcakes",
    description: "Coconut sponge with coconut buttercream.",
    details:
      "A tender coconut cupcake. Pair it with chocolate on a mixed box if you want both flavours in one order.",
    imageAlt: "Coconut cupcake with white coconut frosting",
    tags: ["coconut"],
    variants: cupcakes(18),
  },
  {
    slug: "coffee-mocha-cupcake",
    name: "Coffee Mocha Cupcake",
    category: "cupcakes",
    description: "Coffee sponge and a mocha buttercream.",
    details:
      "For people who want cake that tastes a little like a milky coffee. The cocoa and coffee are balanced so neither disappears.",
    imageAlt: "Mocha cupcake with coffee-coloured frosting",
    tags: ["coffee", "mocha", "chocolate"],
    variants: cupcakes(22),
  },
  {
    slug: "funfetti-cupcake",
    name: "Funfetti Cupcake",
    category: "cupcakes",
    description: "Vanilla sponge speckled with sprinkles and a bright buttercream.",
    details:
      "The cheerful cupcake, made for children’s birthdays and anyone who wants the tray to look like a party before it is unwrapped.",
    imageAlt: "Funfetti cupcake with sprinkles in the sponge and on the frosting",
    featured: true,
    tags: ["sprinkles", "vanilla", "birthday", "children"],
    variants: cupcakes(18),
  },
  {
    slug: "double-chocolate-cupcake",
    name: "Double Chocolate Cupcake",
    category: "cupcakes",
    description: "Chocolate sponge and a darker chocolate frosting.",
    details:
      "More cocoa than the fudge cupcake, with a frosting that sets softly. A straightforward choice for chocolate loyalists.",
    imageAlt: "Double chocolate cupcake with dark chocolate frosting",
    tags: ["chocolate"],
    variants: cupcakes(22),
  },
  {
    slug: "banana-cupcake",
    name: "Banana Cupcake",
    category: "cupcakes",
    description: "Ripe banana sponge with a light cream-cheese frosting.",
    details:
      "Banana cake in cupcake form. The frosting is cream cheese, so it tastes less sweet than a vanilla swirl.",
    imageAlt: "Banana cupcake with cream-cheese frosting",
    tags: ["banana", "cream cheese"],
    variants: cupcakes(18),
  },
  {
    slug: "carrot-cake-cupcake",
    name: "Carrot Cake Cupcake",
    category: "cupcakes",
    description: "Spiced carrot cake and cream-cheese frosting in a single portion.",
    details:
      "The carrot cake, portioned for a meeting or a mixed dessert table. Walnuts sit in the crumb rather than on every top.",
    imageAlt: "Carrot cupcake with cream-cheese frosting",
    tags: ["carrot", "spice", "cream cheese"],
    variants: cupcakes(20),
  },
  {
    slug: "raspberry-cupcake",
    name: "Raspberry Cupcake",
    category: "cupcakes",
    description: "Vanilla sponge with raspberry frosting and a sharp fruit note.",
    details:
      "Raspberry keeps the cupcake brighter than a plain vanilla. It sits well beside lemon on a mixed box.",
    imageAlt: "Raspberry cupcake with pink fruit frosting",
    tags: ["raspberry", "fruit", "berry"],
    variants: cupcakes(22),
  },
  {
    slug: "celebration-sprinkle-cupcake",
    name: "Celebration Sprinkle Cupcake",
    category: "cupcakes",
    description: "Buttercream finished with a generous scatter of sprinkles.",
    details:
      "The party cupcake: a reliable vanilla base and sprinkles chosen to look festive in a box. Often ordered with the funfetti cupcakes.",
    imageAlt: "Celebration cupcake covered in colourful sprinkles",
    bestseller: true,
    tags: ["sprinkles", "party", "birthday", "vanilla"],
    variants: cupcakes(20),
  },
  {
    slug: "classic-white-loaf",
    name: "Classic White Loaf",
    category: "bread",
    description: "A soft white sandwich loaf with a thin golden crust.",
    details:
      "The everyday loaf for toast and sandwiches. Baked as a tin loaf, with a soft crumb and a crust that is not too thick.",
    imageAlt: "Soft white sandwich loaf",
    tags: ["white", "sandwich", "loaf", "everyday"],
    variants: one("loaf", "Loaf", 18),
  },
  {
    slug: "soft-butter-bread",
    name: "Soft Butter Bread",
    category: "bread",
    description: "An enriched white loaf with a buttery crumb.",
    details:
      "Richer than the plain white loaf, with butter in the dough. Good on its own or with a little jam.",
    imageAlt: "Enriched butter bread with a soft golden crust",
    bestseller: true,
    tags: ["butter", "enriched", "soft"],
    variants: one("loaf", "Loaf", 24),
  },
  {
    slug: "whole-wheat-bread",
    name: "Whole Wheat Bread",
    category: "bread",
    description: "A whole-wheat loaf with a nutty crumb and a sturdy slice.",
    details:
      "Milled wheat in the dough, so the slice is a little denser than white bread and better for toast that needs to hold a topping.",
    imageAlt: "Whole wheat loaf with a brown crust",
    tags: ["wheat", "wholemeal", "toast"],
    variants: one("loaf", "Loaf", 22),
  },
  {
    slug: "milk-bread",
    name: "Milk Bread",
    category: "bread",
    description: "A pillowy milk loaf with a faintly sweet crumb.",
    details:
      "The soft, pull-apart style loaf. It is lightly sweet and stays tender, which is why it leaves the counter quickly.",
    imageAlt: "Soft milk bread loaf with a pale golden top",
    featured: true,
    bestseller: true,
    tags: ["milk", "soft", "sweet"],
    variants: one("loaf", "Loaf", 26),
  },
  {
    slug: "brioche-loaf",
    name: "Brioche Loaf",
    category: "bread",
    description: "An enriched brioche with a deep gold crust.",
    details:
      "Eggs and butter make this loaf rich. Slice it for breakfast or use it under something savoury if you like the contrast.",
    imageAlt: "Golden brioche loaf",
    featured: true,
    tags: ["brioche", "enriched", "breakfast"],
    variants: one("loaf", "Loaf", 34),
  },
  {
    slug: "banana-bread",
    name: "Banana Bread",
    category: "bread",
    description: "A moist banana loaf, baked in a tin and lightly spiced.",
    details:
      "Ripe bananas in a close crumb. It is a cake-bread, sweet enough for a snack and sturdy enough to wrap as a gift.",
    imageAlt: "Banana bread loaf with a deep golden crust",
    tags: ["banana", "loaf", "snack"],
    variants: one("loaf", "Loaf", 30),
  },
  {
    slug: "cinnamon-swirl-bread",
    name: "Cinnamon Swirl Bread",
    category: "bread",
    description: "Soft bread rolled with cinnamon sugar.",
    details:
      "A swirled loaf that toasts well. The cinnamon is in the spiral, not only dusted on the crust.",
    imageAlt: "Cinnamon swirl bread showing the spiral inside",
    bestseller: true,
    tags: ["cinnamon", "swirl", "breakfast"],
    variants: one("loaf", "Loaf", 32),
  },
  {
    slug: "garlic-bread",
    name: "Garlic Bread",
    category: "bread",
    description: "A loaf split and finished with garlic butter and herbs.",
    details:
      "Baked, then dressed with garlic butter. Best the day it is collected. It is a side for lunch rather than a sandwich loaf.",
    imageAlt: "Sliced garlic bread with herbs and melted butter",
    tags: ["garlic", "herbs", "savoury"],
    variants: one("loaf", "Loaf", 28),
  },
  {
    slug: "coconut-bread",
    name: "Coconut Bread",
    category: "bread",
    description: "A tender loaf with coconut through the crumb.",
    details:
      "Sweetened, but still a bread. Coconut sits in the dough so each slice tastes of it without needing a topping.",
    imageAlt: "Coconut bread loaf with a golden crust",
    tags: ["coconut", "sweet"],
    variants: one("loaf", "Loaf", 28),
  },
  {
    slug: "cheese-bread",
    name: "Cheese Bread",
    category: "bread",
    description: "A savoury loaf baked with cheese in the dough.",
    details:
      "Cheese melted into a soft crumb, with a little more on the crust. It does not need a spread, though butter is welcome.",
    imageAlt: "Cheese bread with a golden, savoury crust",
    tags: ["cheese", "savoury"],
    variants: one("loaf", "Loaf", 32),
  },
  {
    slug: "chocolate-swirl-bread",
    name: "Chocolate Swirl Bread",
    category: "bread",
    description: "Soft dough rolled around a chocolate filling.",
    details:
      "A breakfast loaf with a chocolate spiral. It is sweet, and closer to a bun than to a plain sandwich bread.",
    imageAlt: "Chocolate swirl bread with a dark spiral",
    tags: ["chocolate", "swirl", "sweet"],
    variants: one("loaf", "Loaf", 34),
  },
  {
    slug: "french-baguette",
    name: "French Baguette",
    category: "bread",
    description: "A crackly baguette with an open crumb.",
    details:
      "A long loaf with a crisp crust. Eat it the day you collect it. It is priced as a single baguette.",
    imageAlt: "Crusty French baguette",
    tags: ["baguette", "crust", "french"],
    variants: one("loaf", "Baguette", 16),
  },
  {
    slug: "soft-dinner-rolls",
    name: "Soft Dinner Rolls",
    category: "bread",
    description: "A pack of six soft rolls for the table.",
    details:
      "Plain, soft rolls sold as a pack of six. Warm them before a meal. They are not sweet.",
    imageAlt: "A cluster of soft dinner rolls",
    tags: ["rolls", "dinner", "pack"],
    variants: one("pack-6", "Pack of 6", 24),
  },
  {
    slug: "sweet-bread-rolls",
    name: "Sweet Bread Rolls",
    category: "bread",
    description: "Six lightly sweet rolls with a soft, enriched dough.",
    details:
      "Smaller than the milk loaf and sold in a pack of six. A simple sweet roll for breakfast or a child’s snack.",
    imageAlt: "Soft sweet bread rolls with golden tops",
    bestseller: true,
    tags: ["rolls", "sweet", "pack"],
    variants: one("pack-6", "Pack of 6", 28),
  },
  {
    slug: "fruit-loaf",
    name: "Fruit Loaf",
    category: "bread",
    description: "A lightly sweet loaf studded with dried fruit.",
    details:
      "Dried fruit through an enriched dough. Slice it and butter it. It keeps a little longer than a plain white loaf.",
    imageAlt: "Fruit loaf with dried fruit in the crumb",
    tags: ["fruit", "dried fruit", "loaf"],
    variants: one("loaf", "Loaf", 34),
  },
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    category: "pastries",
    description: "A laminated butter croissant with a shatteringly flaky edge.",
    details:
      "All butter, baked until the layers separate. Best the morning it is collected.",
    imageAlt: "Golden butter croissant with visible flaky layers",
    featured: true,
    bestseller: true,
    tags: ["croissant", "butter", "breakfast", "laminated"],
    variants: one("each", "Each", 14),
  },
  {
    slug: "chocolate-croissant",
    name: "Chocolate Croissant",
    category: "pastries",
    description: "A butter croissant with dark chocolate folded inside.",
    details:
      "The same laminated dough as the plain croissant, with two lines of chocolate. It is a pastry, not a cake slice.",
    imageAlt: "Chocolate croissant with dark chocolate visible at the ends",
    bestseller: true,
    tags: ["croissant", "chocolate", "breakfast"],
    variants: one("each", "Each", 16),
  },
  {
    slug: "cinnamon-roll",
    name: "Cinnamon Roll",
    category: "pastries",
    description: "A soft roll with cinnamon sugar and a light glaze.",
    details:
      "Baked in a spiral and glazed while warm. Larger than a dinner roll, and meant to be eaten as a pastry.",
    imageAlt: "Glazed cinnamon roll",
    featured: true,
    bestseller: true,
    tags: ["cinnamon", "glaze", "sweet"],
    variants: one("each", "Each", 18),
  },
  {
    slug: "apple-turnover",
    name: "Apple Turnover",
    category: "pastries",
    description: "Flaky pastry folded around spiced apple.",
    details:
      "A hand-held turnover with a cooked apple filling. The pastry is laminated enough to flake, and the apple is not a jam.",
    imageAlt: "Golden apple turnover with a flaky crust",
    tags: ["apple", "turnover", "fruit"],
    variants: one("each", "Each", 16),
  },
  {
    slug: "fruit-danish",
    name: "Fruit Danish",
    category: "pastries",
    description: "A laminated danish with a fruit centre.",
    details:
      "Buttery danish pastry with a spoon of fruit. The fruit changes with what is baking well, and the pastry stays the constant.",
    imageAlt: "Fruit danish with a glazed pastry edge",
    tags: ["danish", "fruit", "laminated"],
    variants: one("each", "Each", 16),
  },
  {
    slug: "chocolate-eclair",
    name: "Chocolate Éclair",
    category: "pastries",
    description: "Choux pastry filled with cream and topped with chocolate.",
    details:
      "A classic éclair: light choux, cream filling, and a chocolate cap. Keep it cool and eat it the day you collect it.",
    imageAlt: "Chocolate éclair with a glossy chocolate topping",
    tags: ["eclair", "choux", "chocolate", "cream"],
    variants: one("each", "Each", 18),
  },
  {
    slug: "cream-puff",
    name: "Cream Puff",
    category: "pastries",
    description: "A small choux bun filled with sweet cream.",
    details:
      "Lighter than an éclair and sold singly or as a box of four. The shell should be tender, not dry.",
    imageAlt: "Cream puffs dusted lightly and filled with cream",
    tags: ["choux", "cream", "profiterole"],
    variants: [
      { id: "each", label: "Each", priceGhs: 12 },
      { id: "box-4", label: "Box of 4", priceGhs: 44 },
    ],
  },
  {
    slug: "blueberry-muffin",
    name: "Blueberry Muffin",
    category: "pastries",
    description: "A tall muffin with blueberries through the crumb.",
    details:
      "Domed muffin, not a cupcake. The berries sit in the batter so the crumb stains purple in places.",
    imageAlt: "Blueberry muffin with berries in the crumb",
    tags: ["muffin", "blueberry", "breakfast"],
    variants: one("each", "Each", 14),
  },
  {
    slug: "chocolate-muffin",
    name: "Chocolate Muffin",
    category: "pastries",
    description: "A chocolate muffin with a cracked, tender top.",
    details:
      "Closer to a snack cake than to a frosted cupcake. There is no buttercream swirl on this one.",
    imageAlt: "Chocolate muffin with a cracked top",
    tags: ["muffin", "chocolate"],
    variants: one("each", "Each", 14),
  },
  {
    slug: "chocolate-chip-cookie",
    name: "Chocolate Chip Cookie",
    category: "pastries",
    description: "A thick cookie with chocolate pieces and a soft middle.",
    details:
      "Baked so the centre stays soft. Sold singly or in a box of six for a gift or a meeting.",
    imageAlt: "Thick chocolate chip cookies",
    bestseller: true,
    tags: ["cookie", "chocolate chip"],
    variants: [
      { id: "each", label: "Each", priceGhs: 8 },
      { id: "box-6", label: "Box of 6", priceGhs: 42 },
    ],
  },
  {
    slug: "brownie",
    name: "Brownie",
    category: "pastries",
    description: "A fudgy chocolate brownie with a shiny top.",
    details:
      "Cut in squares from a tray. The middle is dense. A box of four is enough for a small dessert plate.",
    imageAlt: "Fudgy chocolate brownies cut into squares",
    featured: true,
    tags: ["brownie", "chocolate", "fudge"],
    variants: [
      { id: "each", label: "Square", priceGhs: 15 },
      { id: "box-4", label: "Box of 4", priceGhs: 54 },
    ],
  },
  {
    slug: "lemon-tart",
    name: "Lemon Tart",
    category: "pastries",
    description: "A crisp pastry shell filled with lemon curd.",
    details:
      "Sharp lemon curd in a sweet crust. It is a single tart, finished with a little zest.",
    imageAlt: "Lemon tart with a golden crust and bright lemon filling",
    tags: ["lemon", "tart", "curd"],
    variants: one("each", "Each", 18),
  },
  {
    slug: "mini-fruit-tart",
    name: "Mini Fruit Tart",
    category: "pastries",
    description: "A small tart shell with cream and fresh fruit.",
    details:
      "Pastry, a little cream, and fruit on top. Sold singly or as a box of four. The fruit is arranged, not buried in glaze.",
    imageAlt: "Mini fruit tarts topped with fresh fruit",
    tags: ["tart", "fruit", "cream"],
    variants: [
      { id: "each", label: "Each", priceGhs: 16 },
      { id: "box-4", label: "Box of 4", priceGhs: 58 },
    ],
  },
  {
    slug: "sausage-roll",
    name: "Sausage Roll",
    category: "pastries",
    description: "Seasoned sausage wrapped in flaky pastry.",
    details:
      "A savoury roll with a golden pastry jacket. It is lunch food, not a sweet pastry. Best eaten the day it is baked.",
    imageAlt: "Golden sausage rolls, one broken open to show the filling",
    tags: ["sausage", "savoury", "pastry"],
    variants: one("each", "Each", 12),
  },
  {
    slug: "meat-pie",
    name: "Meat Pie",
    category: "pastries",
    description: "A hand pie with a savoury minced filling and a flaky lid.",
    details:
      "A proper meat pie with a lid that flakes. The filling is seasoned mince. It is sold as a single pie.",
    imageAlt: "Golden meat pie with a flaky pastry lid",
    bestseller: true,
    tags: ["meat", "savoury", "pie"],
    variants: one("each", "Each", 18),
  },
  {
    slug: "buttercream-recipe-book",
    name: "Buttercream Recipe Book",
    category: "recipe-book",
    description: "A recipe book of bakery-inspired bakes, tips, and home-kitchen notes.",
    details:
      "A dependable vanilla buttercream, soft milk bread, chocolate fudge cake notes, finishing a bento cake, and butter croissant tips.",
    imageAlt: "Recipe book cover for Buttercream Bakery",
    featured: true,
    tags: ["recipe", "book", "gift"],
    sample: true,
    variants: one("edition", "Recipe book", 95),
  },
];

export const products: Product[] = seeds.map(product);

function assertCatalogue(items: Product[]) {
  const expected: Record<string, number> = {
    cakes: 15,
    cupcakes: 15,
    bread: 15,
    pastries: 15,
  };
  for (const [category, count] of Object.entries(expected)) {
    const actual = items.filter((item) => item.category === category).length;
    if (actual !== count) {
      throw new Error(`${category} has ${actual} products; expected ${count}.`);
    }
  }
  if (!items.some((item) => item.subcategory === "bento")) {
    throw new Error("Bento cakes are missing.");
  }
  if (!items.some((item) => item.subcategory === "sheet")) {
    throw new Error("Sheet cakes are missing.");
  }
  const slugs = new Set(items.map((item) => item.slug));
  if (slugs.size !== items.length) throw new Error("Duplicate product slug.");
  const images = new Set(items.map((item) => item.image));
  if (images.size !== items.length) throw new Error("Duplicate product image.");
}

assertCatalogue(products);

export const primaryProducts = products.filter((item) => item.category !== "recipe-book");

export function getProduct(idOrSlug: string) {
  return products.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
}

export function minPrice(item: Product) {
  return Math.min(...item.variants.map((variant) => variant.priceGhs));
}

export function getVariant(item: Product, variantId: string) {
  return item.variants.find((variant) => variant.id === variantId) ?? item.variants[0];
}

export function relatedProducts(item: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.category === item.category && candidate.id !== item.id)
    .slice(0, limit);
}

export const categoryMeta: Record<
  Exclude<CategoryId, "recipe-book"> | "bento" | "sheet",
  { title: string; description: string; href: string; image: string; imageAlt: string }
> = {
  cakes: {
    title: "Cakes",
    description: "Celebration layers for birthdays, gatherings, and the middle of the table.",
    href: "/products?category=cakes",
    image: "/images/products/classic-vanilla-celebration-cake.jpg",
    imageAlt: "Vanilla celebration cake",
  },
  bento: {
    title: "Bento cakes",
    description: "Small cakes, boxed and finished, for one or two people.",
    href: "/products?category=cakes&sub=bento",
    image: "/images/products/bento-birthday-cake.jpg",
    imageAlt: "Pink bento birthday cake",
  },
  cupcakes: {
    title: "Cupcakes",
    description: "Buttercream swirls, sold singly or packed in boxes.",
    href: "/products?category=cupcakes",
    image: "/images/products/vanilla-buttercream-cupcake.jpg",
    imageAlt: "Vanilla buttercream cupcake",
  },
  sheet: {
    title: "Sheet cakes",
    description: "Rectangular cakes sliced for a fuller room.",
    href: "/products?category=cakes&sub=sheet",
    image: "/images/products/celebration-sheet-cake.jpg",
    imageAlt: "Blush celebration sheet cake",
  },
  bread: {
    title: "Bread",
    description: "Loaves and rolls for breakfast, lunch, and the week.",
    href: "/products?category=bread",
    image: "/images/products/milk-bread.jpg",
    imageAlt: "Soft milk bread",
  },
  pastries: {
    title: "Pastries",
    description: "Morning pastry, cookies, tarts, and a few savoury bakes.",
    href: "/products?category=pastries",
    image: "/images/products/butter-croissant.jpg",
    imageAlt: "Butter croissant",
  },
};
