// Describe Your Ex in One Word — make.fun bounty
// u-puan-describe-your-ex-in-one-word-9fc6ebe7
//
// Writes exactly one word to entry.txt. The gate: /output/entry.txt must be
// UTF-8 text of 1 to 111 characters, not only white space.
//
// The word: "refund".
//   Criterion 1 — a verdict on an ex: "My ex? Refund." It frames the whole
//   relationship as a purchase to send back, instantly readable, no caption.
//   Criterion 2 — comic punch: demanding your time back like a faulty
//   product lands at a glance.
//   Criterion 3 — surprise: not the obvious "toxic"/"mistake"; a shop
//   counter word where a heartbreak word was expected.
//   Criterion 4 — craft: exactly one word, spelled correctly, letters only,
//   no punctuation tricks.
//   Criterion 5 — recognition: anyone who has had an ex has wanted the
//   receipt. Six letters, six bytes (also the smallest text on an exact
//   rate tie, which the rules break toward fewer bytes).
//
// Candidates weighed and rejected in-session:
//   "expired"   — good (spoiled goods), but a state, not a demand; less punch.
//   "lesson"    — clever ("my ex was a lesson") but reads earnest, not funny.
//   "downgrade" — solid verdict, but 9 letters and a tech word, less universal.
//   "mistake"   — the obvious choice; fails surprise outright.
//   "unsubscribed" — funny, modern, but 12 letters and a mouthful next to
//     the six-letter punch of "refund".

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY = "refund";

// Resolve the output file path. The harness sets $MAKEFUN_OUTPUT_DIR; the
// program never hardcodes /output first.
function resolveOutputPath(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    return join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt");
  }
  if (process.env.OUTPUT_PATH) {
    return process.env.OUTPUT_PATH.endsWith(".txt")
      ? process.env.OUTPUT_PATH
      : join(process.env.OUTPUT_PATH, "entry.txt");
  }
  if (process.env.MAKEFUN_BOT_DIR) return "/output/entry.txt";
  return join("output", "entry.txt");
}

// Gate enforced before writing: 1-111 chars, exactly one word, one line.
function validateEntry(text: string): void {
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 111) {
    throw new Error(`entry is ${text.length} chars, must be 1-111`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word (no spaces)");
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length !== 1) {
    throw new Error(`entry must be exactly one word, got ${words.length}`);
  }
  if (!/^[A-Za-z]+$/.test(text)) {
    throw new Error("entry must be letters only");
  }
}

validateEntry(ENTRY);

const OUT = resolveOutputPath();
mkdirSync(dirname(OUT), { recursive: true });
// No trailing newline: the entry is exactly the word, nothing else attached.
writeFileSync(OUT, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUT}`);
