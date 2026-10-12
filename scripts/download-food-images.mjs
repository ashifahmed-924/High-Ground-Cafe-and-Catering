import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "high-ground");

/**
 * Curated Unsplash photos (https://unsplash.com/license).
 * Each id is the photo-{id} segment from images.unsplash.com.
 */
const images = [
  { name: "hero-coffee.jpg", id: "1495474472287-4d71bcdd2085", w: 1400 }, // coffee pour
  { name: "hero-breakfast.jpg", id: "1533089860892-a7c6f0a88666", w: 1400 }, // breakfast spread
  { name: "hero-catering.jpg", id: "1504674900247-0877df9cc836", w: 1400 }, // food platter
  { name: "big-breakfast.jpg", id: "1506084868230-bb9d95c24759", w: 1200 }, // pancakes breakfast
  { name: "smashed-avocado.jpg", id: "1525351484163-7529414344d8", w: 1200 }, // avocado toast
  // omelette.jpg is generated separately (see assets) — skipped here
  { name: "coffee-small.jpg", id: "1509042239860-f550ce710b93", w: 900 }, // latte
  { name: "coffee-medium.jpg", id: "1511920170033-f8396924c348", w: 900 }, // espresso
  { name: "coffee-large.jpg", id: "1447933601403-0c6688de566e", w: 900 }, // coffee
  { name: "burger.jpg", id: "1568901346375-23c9450c58cd", w: 1200 }, // burger
  { name: "chicken-burger.jpg", id: "1606755962773-d324e0a13086", w: 1200 }, // chicken burger
  { name: "focaccia.jpg", id: "1509440159596-0249088772ff", w: 1200 }, // artisan bread
  { name: "wrap.jpg", id: "1562059390-a761a084768e", w: 1200 }, // wrap
  { name: "pastry.jpg", id: "1718925830719-0f72c8544d03", w: 1200 }, // croissant / pastry
  { name: "cake.jpg", id: "1578985545062-69928b1d9587", w: 1200 }, // cake
  { name: "hot-meal.jpg", id: "1598515214211-89d3c73ae83b", w: 1200 }, // hot meal
  { name: "catering-morning.jpg", id: "1558961363-fa8fdf82db35", w: 1200 }, // pastries
  { name: "catering-finger-food.jpg", id: "1414235077428-338989a2e8c0", w: 1200 }, // restaurant plates
  { name: "catering-lunch.jpg", id: "1540189549336-e6e99c3679fe", w: 1200 }, // lunch plate
  { name: "catering-package.jpg", id: "1476224203421-9ac39bcb3327", w: 1200 }, // catering spread
  { name: "fruit-box.jpg", id: "1610832958506-aa56368176cf", w: 1200 }, // fruit
  { name: "milk-delivery.jpg", id: "1691751752386-29be1db57eb7", w: 1200 }, // milk glass
  { name: "interior.jpg", id: "1554118811-1e0d58224f24", w: 1400 }, // cafe interior
  { name: "counter.jpg", id: "1517248135467-4c7edcad34c4", w: 1400 }, // cafe counter / dining
  { name: "storefront.jpg", id: "1453614512568-c4024d13c247", w: 1400 }, // cafe storefront
];

function urlFor(id, w) {
  const h = Math.round(w * 0.75);
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;
}

async function downloadOne({ name, id, w }) {
  const dest = path.join(outDir, name);
  const url = urlFor(id, w);
  const res = await fetch(url, {
    headers: { "User-Agent": "HighGroundCafeSite/1.0 (image refresh)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("not a JPEG");
  fs.writeFileSync(dest, buf);
  const pngTwin = dest.replace(/\.jpg$/i, ".png");
  if (fs.existsSync(pngTwin)) fs.writeFileSync(pngTwin, buf);
  console.log(`✓ ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
}

fs.mkdirSync(outDir, { recursive: true });

let failed = 0;
for (const img of images) {
  try {
    await downloadOne(img);
  } catch (err) {
    failed += 1;
    console.error(`✗ ${img.name}: ${err.message}`);
  }
}

if (failed) {
  console.error(`\nFinished with ${failed} failure(s).`);
  process.exit(1);
}
console.log(`\nReplaced ${images.length} images in ${outDir}`);
