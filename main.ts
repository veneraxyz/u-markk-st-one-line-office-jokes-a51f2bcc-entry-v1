import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const JOKE =
  "I told the printer it was doing a great job, and it jammed anyway — even office equipment hates performance reviews.";

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

// Validation guard: the entry must be exactly one non-blank line, 1–199 chars.
const lines = JOKE.split("\n");
if (lines.length !== 1) {
  throw new Error(`entry must be exactly one line, got ${lines.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`entry must be 1–199 chars, got ${JOKE.length}`);
}
if (Buffer.from(JOKE, "utf8").toString("utf8") !== JOKE) {
  throw new Error("entry must be valid UTF-8");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
console.log(`Wrote entry.txt (${JOKE.length} chars) to ${outDir}`);
