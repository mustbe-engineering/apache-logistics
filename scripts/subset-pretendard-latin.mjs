import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,;:!?¡¿«»\"'—–-()/%+&@#áéíóúüñÑÁÉÍÓÚÜ";
const root = process.cwd();
const src = path.join(root, "node_modules/pretendard/dist/web/static/woff2-subset/Pretendard-Regular.subset.woff2");
const outDir = path.join(root, "app/fonts/pretendard");

const weights = [
  { file: "Pretendard-Regular.subset.woff2", weight: "400" },
  { file: "Pretendard-Medium.subset.woff2", weight: "500" },
  { file: "Pretendard-SemiBold.subset.woff2", weight: "600" },
];

await mkdir(outDir, { recursive: true });
for (const { file, weight } of weights) {
  const input = path.join(root, "node_modules/pretendard/dist/web/static/woff2-subset", file);
  const buffer = await subsetFont(await readFile(input), chars, { targetFormat: "woff2" });
  const name = `Pretendard-${weight}.woff2`;
  await writeFile(path.join(outDir, name), buffer);
  console.log(`${name}: ${(buffer.length / 1024).toFixed(1)} KB`);
}
