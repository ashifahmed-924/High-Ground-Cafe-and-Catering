import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "high-ground");

const images = [
  { name: "hero-coffee.jpg", label: "COFFEE POUR", c1: [22, 60, 67], c2: [36, 40, 39] },
  { name: "hero-breakfast.jpg", label: "BREAKFAST", c1: [221, 109, 85], c2: [242, 232, 213] },
  { name: "hero-catering.jpg", label: "CATERING", c1: [16, 43, 49], c2: [169, 198, 200] },
  { name: "big-breakfast.jpg", label: "BIG BREAKFAST", c1: [244, 162, 97], c2: [36, 40, 39] },
  { name: "smashed-avocado.jpg", label: "SMASHED AVO", c1: [139, 144, 139], c2: [242, 232, 213] },
  { name: "omelette.jpg", label: "OMELETTE", c1: [247, 203, 120], c2: [221, 109, 85] },
  { name: "coffee-small.jpg", label: "COFFEE S", c1: [36, 40, 39], c2: [22, 60, 67] },
  { name: "coffee-medium.jpg", label: "COFFEE M", c1: [36, 40, 39], c2: [16, 43, 49] },
  { name: "coffee-large.jpg", label: "COFFEE L", c1: [22, 60, 67], c2: [36, 40, 39] },
  { name: "burger.jpg", label: "BURGER", c1: [221, 109, 85], c2: [36, 40, 39] },
  { name: "chicken-burger.jpg", label: "CHICKEN BURGER", c1: [244, 162, 97], c2: [22, 60, 67] },
  { name: "focaccia.jpg", label: "FOCACCIA", c1: [169, 198, 200], c2: [242, 232, 213] },
  { name: "wrap.jpg", label: "WRAP", c1: [139, 144, 139], c2: [22, 60, 67] },
  { name: "pastry.jpg", label: "PASTRY", c1: [247, 203, 120], c2: [242, 232, 213] },
  { name: "cake.jpg", label: "CAKE / SLICE", c1: [221, 109, 85], c2: [242, 232, 213] },
  { name: "hot-meal.jpg", label: "HOT MEAL", c1: [22, 60, 67], c2: [244, 162, 97] },
  { name: "catering-morning.jpg", label: "MORNING TEA", c1: [242, 232, 213], c2: [221, 109, 85] },
  { name: "catering-finger-food.jpg", label: "FINGER FOOD", c1: [16, 43, 49], c2: [244, 162, 97] },
  { name: "catering-lunch.jpg", label: "COLD LUNCH", c1: [169, 198, 200], c2: [22, 60, 67] },
  { name: "catering-package.jpg", label: "PACKAGE", c1: [244, 162, 97], c2: [221, 109, 85] },
  { name: "fruit-box.jpg", label: "FRUIT BOX", c1: [169, 198, 200], c2: [247, 203, 120] },
  { name: "milk-delivery.jpg", label: "MILK", c1: [251, 247, 238], c2: [169, 198, 200] },
  { name: "interior.jpg", label: "INTERIOR", c1: [22, 60, 67], c2: [36, 40, 39] },
  { name: "counter.jpg", label: "COUNTER", c1: [16, 43, 49], c2: [242, 232, 213] },
  { name: "storefront.jpg", label: "STOREFRONT", c1: [36, 40, 39], c2: [22, 60, 67] },
];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(width, height, paint) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = paint(x, y, width, height);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function mix(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

fs.mkdirSync(outDir, { recursive: true });

for (const img of images) {
  const w = 1200;
  const h = 1500;
  const png = createPng(w, h, (x, y) => {
    const t = (x / w) * 0.55 + (y / h) * 0.45;
    let color = mix(img.c1, img.c2, t);
    // subtle tray/grid marks
    if (x % 80 < 1 || y % 80 < 1) color = mix(color, [251, 247, 238], 0.12);
    if ((x - w / 2) ** 2 + (y - h / 2.2) ** 2 < 90000) color = mix(color, [251, 247, 238], 0.08);
    // label band
    if (y > h * 0.78 && y < h * 0.88) color = mix(color, [16, 43, 49], 0.55);
    return color;
  });
  // write as .jpg extension but PNG bytes — Next/Image accepts by content; better write .png and copy
  const base = img.name.replace(/\.jpg$/, "");
  const pngPath = path.join(outDir, `${base}.png`);
  const jpgPath = path.join(outDir, img.name);
  fs.writeFileSync(pngPath, png);
  fs.copyFileSync(pngPath, jpgPath);
  console.log("wrote", img.name);
}

console.log("Placeholders ready in", outDir);
