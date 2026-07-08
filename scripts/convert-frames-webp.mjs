import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const framesDir = path.join(process.cwd(), "public/images/frames");
const files = (await readdir(framesDir)).filter((f) => f.endsWith(".jpg")).sort();

let saved = 0;
for (const file of files) {
  const input = path.join(framesDir, file);
  const output = path.join(framesDir, file.replace(/\.jpg$/, ".webp"));
  const before = (await sharp(input).metadata()).size ?? 0;
  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(output);
  const after = (await sharp(output).metadata()).size ?? 0;
  saved += before - after;
  await unlink(input);
}

console.log(`Converted ${files.length} frames. Saved ~${(saved / 1024 / 1024).toFixed(1)} MB.`);
