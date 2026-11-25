// Describe Your Ex in One Word — make.fun bounty entry.
//
// The entry is a single word: "Placeholder".
// The verdict: the ex was never the real thing — just someone filling the
// slot until the real one came along. A person reduced to a stand-in:
// precise, a little brutal, and instantly understood by anyone who has
// ever been one, or kept one around.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY = "Placeholder";

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ??
    process.env.OUTPUT_PATH ??
    (process.env.MAKEFUN_BOT_DIR ? "/output" : join(process.cwd(), "output"));
  return join(dir, "entry.txt");
}

const out = resolveOutputPath();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${out}`);
