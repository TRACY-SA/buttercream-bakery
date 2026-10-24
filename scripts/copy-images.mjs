import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const stock = path.join(root, "brand-images");
const assets = "C:/Users/akoto/.cursor/projects/c-Users-akoto-OneDrive-Desktop-Websites-Buttercream-Bakery/assets";
const productsDir = path.join(root, "public", "images", "products");
const brandDir = path.join(root, "public", "images", "brand");
fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

const brand = {
  "hero.jpg": path.join(assets, "hero-cake.jpg"),
  "bag.jpg": path.join(assets, "bag-blank.jpg"),
  "about.jpg": path.join(stock, "1509365465985-25d11c17e812.jpg"),
};

const products = {
  "classic-vanilla-celebration-cake.jpg": path.join(assets, "vanilla-celebration-cake.jpg"),
  "rich-chocolate-fudge-cake.jpg": path.join(assets, "chocolate-fudge-cake-photo.jpg"),
  "red-velvet-cake.jpg": path.join(assets, "red-velvet-cake.jpg"),
  "strawberry-shortcake.jpg": path.join(stock, "1565958011703-44f9829ba187.jpg"),
  "lemon-drizzle-cake.jpg": path.join(assets, "lemon-drizzle.jpg"),
  "carrot-cake.jpg": path.join(assets, "carrot-cake.jpg"),
  "black-forest-cake.jpg": path.join(assets, "black-forest.jpg"),
  "coconut-cream-cake.jpg": path.join(assets, "coconut-cream-cake-photo.jpg"),
  "cookies-and-cream-cake.jpg": path.join(assets, "cookies-cream-cake.jpg"),
  "salted-caramel-cake.jpg": path.join(assets, "salted-caramel-cake-photo.jpg"),
  "marble-cake.jpg": path.join(assets, "marble-cake.jpg"),
  "pineapple-upside-down-cake.jpg": path.join(assets, "pineapple-cake.jpg"),
  "bento-birthday-cake.jpg": path.join(assets, "bento-birthday-photo.jpg"),
  "chocolate-bento-cake.jpg": path.join(assets, "chocolate-bento-photo.jpg"),
  "celebration-sheet-cake.jpg": path.join(assets, "sheet-celebration-photo.jpg"),
  "vanilla-buttercream-cupcake.jpg": path.join(assets, "vanilla-cupcake-photo.jpg"),
  "chocolate-fudge-cupcake.jpg": path.join(assets, "choc-fudge-cupcake-photo.jpg"),
  "red-velvet-cupcake.jpg": path.join(assets, "redvelvet-cupcake-photo.jpg"),
  "strawberry-cupcake.jpg": path.join(assets, "strawberry-cupcake-photo.jpg"),
  "lemon-cupcake.jpg": path.join(assets, "lemon-cupcake-photo.jpg"),
  "cookies-and-cream-cupcake.jpg": path.join(assets, "cookies-cupcake-photo.jpg"),
  "salted-caramel-cupcake.jpg": path.join(assets, "salted-cupcake-photo.jpg"),
  "coconut-cupcake.jpg": path.join(assets, "coconut-cupcake-photo.jpg"),
  "coffee-mocha-cupcake.jpg": path.join(assets, "mocha-cupcake-photo.jpg"),
  "funfetti-cupcake.jpg": path.join(assets, "funfetti-cupcake-photo.jpg"),
  "double-chocolate-cupcake.jpg": path.join(assets, "double-choc-cupcake-photo.jpg"),
  "banana-cupcake.jpg": path.join(stock, "1563729784474-d77dbb933a9e.jpg"),
  "carrot-cake-cupcake.jpg": path.join(assets, "carrot-cupcake-photo.jpg"),
  "raspberry-cupcake.jpg": path.join(assets, "raspberry-cupcake-photo.jpg"),
  "celebration-sprinkle-cupcake.jpg": path.join(stock, "1621303837174-89787a7d4729.jpg"),
  "classic-white-loaf.jpg": path.join(assets, "white-loaf-photo.jpg"),
  "soft-butter-bread.jpg": path.join(assets, "butter-bread-photo.jpg"),
  "whole-wheat-bread.jpg": path.join(assets, "wheat-bread-photo.jpg"),
  "milk-bread.jpg": path.join(assets, "milk-bread-photo.jpg"),
  "brioche-loaf.jpg": path.join(assets, "brioche-photo.jpg"),
  "banana-bread.jpg": path.join(assets, "banana-bread-photo.jpg"),
  "cinnamon-swirl-bread.jpg": path.join(assets, "cinnamon-swirl-loaf.jpg"),
  "garlic-bread.jpg": path.join(assets, "garlic-bread.jpg"),
  "coconut-bread.jpg": path.join(assets, "coconut-bread.jpg"),
  "cheese-bread.jpg": path.join(assets, "cheese-bread.jpg"),
  "chocolate-swirl-bread.jpg": path.join(assets, "chocolate-swirl-loaf.jpg"),
  "french-baguette.jpg": path.join(assets, "baguette-photo.jpg"),
  "soft-dinner-rolls.jpg": path.join(assets, "dinner-rolls.jpg"),
  "sweet-bread-rolls.jpg": path.join(assets, "sweet-bread-rolls.jpg"),
  "fruit-loaf.jpg": path.join(assets, "fruit-loaf.jpg"),
  "butter-croissant.jpg": path.join(stock, "1555507036-ab1f4038808a.jpg"),
  "chocolate-croissant.jpg": path.join(stock, "1530610476181-d83430b64dcd.jpg"),
  "cinnamon-roll.jpg": path.join(assets, "cinnamon-roll-photo.jpg"),
  "apple-turnover.jpg": path.join(assets, "apple-turnovers.jpg"),
  "fruit-danish.jpg": path.join(assets, "fruit-danish.jpg"),
  "chocolate-eclair.jpg": path.join(assets, "eclair.jpg"),
  "cream-puff.jpg": path.join(assets, "cream-puffs.jpg"),
  "blueberry-muffin.jpg": path.join(assets, "blueberry-muffins.jpg"),
  "chocolate-muffin.jpg": path.join(assets, "chocolate-muffins.jpg"),
  "chocolate-chip-cookie.jpg": path.join(assets, "choc-chip-cookies.jpg"),
  "brownie.jpg": path.join(assets, "brownies.jpg"),
  "lemon-tart.jpg": path.join(assets, "lemon-tart.jpg"),
  "mini-fruit-tart.jpg": path.join(assets, "mini-fruit-tarts.jpg"),
  "sausage-roll.jpg": path.join(assets, "sausage-roll-photo.jpg"),
  "meat-pie.jpg": path.join(assets, "meat-pie.jpg"),
  "buttercream-recipe-book.jpg": path.join(assets, "bag-blank.jpg"),
};

const used = new Set();
function copyMap(map, destDir) {
  for (const [name, source] of Object.entries(map)) {
    if (!fs.existsSync(source)) throw new Error(`Missing source ${source}`);
    if (used.has(source) && !name.startsWith("buttercream-recipe")) {
      throw new Error(`Reused source ${source} for ${name}`);
    }
    used.add(source);
    fs.copyFileSync(source, path.join(destDir, name));
  }
}

copyMap(brand, brandDir);
copyMap(products, productsDir);
console.log(`Copied ${Object.keys(brand).length + Object.keys(products).length} images`);
