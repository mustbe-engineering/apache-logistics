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
  console.log(`${path.basename(output)}: ${(buf.length / 1024).toFixed(1)} KB`);
}

await toWebp(
  path.join(assets, "about-us-bk.jpg"),
  path.join(assets, "about-us-bk.webp"),
  1280,
  72,
);

const workerSrc = path.join(assets, "worker.png");
for (const { width, quality, name } of [
  { width: 300, quality: 70, name: "worker-300.webp" },
  { width: 600, quality: 72, name: "worker-600.webp" },
  { width: 760, quality: 74, name: "worker-760.webp" },
]) {
  await toWebp(workerSrc, path.join(assets, name), width, quality);
}
