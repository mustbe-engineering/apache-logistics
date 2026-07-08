import { execFileSync } from "node:child_process";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const input = path.join(root, "public/videos/apache-optimized.mp4");
const output = path.join(root, "public/images/assets/hero-poster.webp");
const frame = path.join(tmpdir(), "apache-hero-frame.jpg");

execFileSync("ffmpeg", [
  "-y", "-ss", "2", "-i", input, "-frames:v", "1", "-update", "1",
  "-vf", "scale=1280:-2", "-q:v", "2", frame,
], { stdio: "inherit" });

const webp = await sharp(await readFile(frame)).webp({ quality: 82 }).toBuffer();
await writeFile(output, webp);
await unlink(frame).catch(() => {});
console.log(`Wrote ${output} (${(webp.length / 1024).toFixed(1)} KB)`);
