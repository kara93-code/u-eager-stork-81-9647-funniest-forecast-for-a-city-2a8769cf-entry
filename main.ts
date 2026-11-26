// Funniest Forecast for a City That Isn't — Solmaris, moonburn after dark.
// Chosen version (specialist pick): the joke is one invented word, "moonburn" —
// sunburn from the moon, after dark — and the advice it forces, sunscreen to bed.
// A real bulletin shape ("expect a high of ...") that never breaks character.
// Writes the single forecast line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CITY = "Solmaris";
const CONDITION = "a high of 34 degrees with moonburn after dark";
const ADVICE = "wear sunscreen to bed";

function forecastLine(city: string, condition: string, advice: string): string {
  const head = `In ${city}, expect ${condition}, so ${advice}.`;
  return head;
}

const entryLine = forecastLine(CITY, CONDITION, ADVICE);
const glyphs = Array.from(entryLine);

if (entryLine.trim().length === 0) {
  console.error("forecast must not be blank");
  process.exit(1);
}
if (/\r|\n/.test(entryLine)) {
  console.error("forecast must be exactly one line");
  process.exit(1);
}
if (glyphs.length < 1 || glyphs.length > 120) {
  console.error(`forecast is ${glyphs.length} characters, limit is 1-120`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const targetPath = join(outputDir, "entry.txt");
writeFileSync(targetPath, `${entryLine}\n`, "utf8");
chmodSync(targetPath, 0o644);

const writtenBack = readFileSync(targetPath, "utf8").replace(/\n$/, "");
if (writtenBack !== entryLine) {
  console.error("written forecast does not match the line");
  process.exit(1);
}
console.log(`wrote ${targetPath} (${glyphs.length} characters, 1 line)`);
