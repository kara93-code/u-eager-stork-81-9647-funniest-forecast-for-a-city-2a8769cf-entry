// Funniest Forecast for a City That Isn't — Sunspire, snow in 34-degree heat.
// A real bulletin shape ("expect ... today") until the contradiction lands:
// snow that has to be enjoyed before noon, while it is 34 degrees.
// Writes the single forecast line to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output).
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

function buildForecast(): string {
  const city = "Sunspire";
  const line =
    `In ${city}, expect 20 centimetres of snow in 34-degree heat today, ` +
    `so build your snowman before noon.`;
  return line;
}

const entryLine = buildForecast();
const glyphs = [...entryLine];

if (entryLine.length === 0 || entryLine.trim().length === 0) {
  console.error("forecast must not be blank");
  process.exit(1);
}
if (entryLine.includes("\n") || entryLine.includes("\r")) {
  console.error("forecast must be exactly one line");
  process.exit(1);
}
if (glyphs.length > 120) {
  console.error(`forecast is ${glyphs.length} characters, limit is 120`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const targetPath = join(outputDir, "entry.txt");
writeFileSync(targetPath, entryLine + "\n", "utf8");
chmodSync(targetPath, 0o644);

const writtenBack = readFileSync(targetPath, "utf8").replace(/\n$/, "");
if (writtenBack !== entryLine) {
  console.error("written forecast does not match the line");
  process.exit(1);
}
console.log(`wrote ${targetPath} (${glyphs.length} characters, 1 line)`);
