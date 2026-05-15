/**
 * Enrich src/data/photos.json in place: dominantColor from each thumbnail (Sharp stats).
 * Run after adding photos: `npm run enrich-photos`
 */
import sharp from "sharp";
import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const manifestPath = join(root, "src/data/photos.json");

async function main() {
  const raw = await readFile(manifestPath, "utf8");
  /** @type {Array<Record<string, unknown>>} */
  const photos = JSON.parse(raw);

  for (const p of photos) {
    const thumb = String(p.thumb || "").replace(/^\//, "");
    const thumbPath = join(root, "public", thumb);
    const { channels } = await sharp(thumbPath).stats();
    const r = Math.round(channels[0].mean);
    const g = channels[1] ? Math.round(channels[1].mean) : r;
    const b = channels[2] ? Math.round(channels[2].mean) : r;
    p.dominantColor = `rgb(${r},${g},${b})`;
  }

  await writeFile(manifestPath, JSON.stringify(photos, null, 2));
  console.log(`Updated ${photos.length} entries with dominantColor.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
