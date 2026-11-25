// The Excuse That Almost Works — entry writer (v1).
// Writes a single line — the excuse a gamer texts the boss to skip work
// on GTA 6 launch week — to /output/entry.txt, deterministically.
//
// The line: HR moved the gamer's annual leave to today by mistake and
// payroll already locked it, so the day off is the system's own doing.
// A tired manager cannot argue with payroll. Boring office detail,
// funny from its own logic, one hurried line, no setup, no signature.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "boss, hr moved my annual leave to today by mistake and payroll already locked it, see you monday";

const OUT_PATH = "/output/entry.txt";

// Gate self-check: the sealed scorer only judges entries of 1-140
// characters, not only whitespace, at most 20 words. Fail loudly here
// instead of shipping an entry the gate would refuse.
const words = ENTRY.trim().split(/\s+/);
if (
  ENTRY.length < 1 ||
  ENTRY.length > 140 ||
  ENTRY.trim().length === 0 ||
  words.length > 20 ||
  ENTRY.includes("\n")
) {
  throw new Error(
    `entry fails gate: ${ENTRY.length} chars, ${words.length} words`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");
