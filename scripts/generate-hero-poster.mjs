import { execFileSync } from "node:child_process";
import { readFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const input = path.join(root, "public/videos/apache-optimized.mp4");
const assets = path.join(root, "public/images/assets");
const frame = path.join(tmpdir(), "apache-hero-frame.jpg");
const sizes = [
  { width: 828, name: "hero-poster-828.webp" },
  { width: 1080, name: "hero-poster-1080.webp" },
];

execFileSync("ffmpeg", [
  "-y", "-ss", "2", "-i", input, "-frames:v", "1", "-update", "1",
  "-vf", "scale=1080:-2", "-q:v", "2", frame,
], { stdio: "inherit" });

const source = await readFile(frame);
for (const { width, name } of sizes) {
  const buf = await sharp(source).resize(width).webp({ quality: 74 }).toBuffer();
  const out = path.join(assets, name);
  await sharp(buf).toFile(out);
  console.log(`${name}: ${(buf.length / 1024).toFixed(1)} KB`);
}
await unlink(frame).catch(() => {});
