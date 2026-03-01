import sharp from "sharp";
import { readdir, mkdir, writeFile } from "fs/promises";
import { join, basename, extname } from "path";

const SOURCE_DIRS = [
  {
    path: "/Users/dalexeenko/Downloads/NAS/Photos-RAW-2025/Algarve Racing School Sepember",
    album: "algarve",
  },
  {
    path: "/Users/dalexeenko/Downloads/NAS/Photos-RAW-2025/Estoril Photos",
    album: "estoril",
  },
  {
    path: "/Users/dalexeenko/Downloads/NAS/Photos-RAW-2025/Gt4",
    album: "gt4",
  },
  {
    path: "/Users/dalexeenko/Downloads/Personal/Photos/Porsche Photos",
    album: "pacific",
  },
];

const FULL_DIR = "public/photos/full";
const THUMB_DIR = "public/photos/thumb";
const MANIFEST_PATH = "src/data/photos.json";

function slugify(filename) {
  const name = basename(filename, extname(filename));
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function processImage(filePath, album, index) {
  const slug = slugify(basename(filePath));
  const outName = `${slug}.jpg`;

  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Full size: 1920px wide
  await sharp(filePath)
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(join(FULL_DIR, outName));

  // Thumbnail: 800px wide
  await sharp(filePath)
    .resize(800, null, { withoutEnlargement: true })
    .jpeg({ quality: 75 })
    .toFile(join(THUMB_DIR, outName));

  // Blur placeholder: 20px wide base64
  const blurBuffer = await sharp(filePath)
    .resize(20, null, { withoutEnlargement: true })
    .jpeg({ quality: 50 })
    .toBuffer();
  const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString("base64")}`;

  // Calculate output dimensions
  const fullMeta = await sharp(join(FULL_DIR, outName)).metadata();

  return {
    id: slug,
    src: `/photos/full/${outName}`,
    thumb: `/photos/thumb/${outName}`,
    blurDataURL,
    width: fullMeta.width,
    height: fullMeta.height,
    album,
  };
}

async function main() {
  await mkdir(FULL_DIR, { recursive: true });
  await mkdir(THUMB_DIR, { recursive: true });

  const photos = [];
  let total = 0;

  for (const { path: dirPath, album } of SOURCE_DIRS) {
    const files = (await readdir(dirPath))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();

    console.log(`\n${album}: ${files.length} photos`);

    for (const file of files) {
      total++;
      const filePath = join(dirPath, file);
      console.log(`  [${total}] Processing ${file}...`);
      const entry = await processImage(filePath, album, total);
      photos.push(entry);
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(photos, null, 2));
  console.log(`\nDone! ${photos.length} photos processed.`);
  console.log(`Manifest written to ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
