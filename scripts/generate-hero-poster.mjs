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
  { width: 480, quality: 66 },
  { width: 640, quality: 68 },
  { width: 828, quality: 65 },
  { width: 1080, quality: 72 },
];

execFileSync("ffmpeg", [
  "-y", "-ss", "2", "-i", input, "-frames:v", "1", "-update", "1",
  "-vf", "scale=1080:-2", "-q:v", "2", frame,
], { stdio: "inherit" });

const source = await readFile(frame);
for (const { width, quality } of sizes) {
  const name = `hero-poster-${width}.webp`;
  const buf = await sharp(source).resize(width).webp({ quality, effort: 6 }).toBuffer();
  await sharp(buf).toFile(path.join(assets, name));
  console.log(`${name}: ${(buf.length / 1024).toFixed(1)} KB`);
}
await unlink(frame).catch(() => {});
