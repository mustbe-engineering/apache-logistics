import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = path.join(process.cwd(), "public/images/assets");

async function toWebp(input, output, width, quality) {
  const buf = await sharp(await readFile(input))
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  await writeFile(output, buf);
  console.log(`${path.basename(output)}: ${(buf.length / 1024).toFixed(1)} KB (max ${width}px)`);
}

await toWebp(
  path.join(assets, "about-us-bk.jpg"),
  path.join(assets, "about-us-bk.webp"),
  1280,
  72,
);
await toWebp(
  path.join(assets, "worker.png"),
  path.join(assets, "worker.webp"),
  1200,
  78,
);
