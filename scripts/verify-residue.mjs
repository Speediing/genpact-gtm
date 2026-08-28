import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const self = "scripts/verify-residue.mjs";
const extensions = new Set([
  ".css",
  ".example",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".wgsl",
]);
const priorCustomerOne = ["data", "dog"].join("");
const priorCustomerTwo = ["sea", "gate"].join("");
const sampleCompany = ["ac", "me"].join("");
const fakeBuyers = [
  [["made", "line"].join(""), ["ingle", "by"].join("")].join(" "),
  [["jor", "dan"].join(""), ["ha", "le"].join("")].join(" "),
  [["pri", "ya"].join(""), ["sh", "ah"].join("")].join(" "),
  [["ch", "ris"].join(""), ["okon", "kwo"].join("")].join(" "),
].join("|");
const unsupportedLabel = ["what", "we", "heard"].join(" ");
const priorColors = [
  ["632", "ca6"].join(""),
  ["4c1", "d82"].join(""),
  ["c6a", "7ea"].join(""),
  ["d9b", "8ff"].join(""),
  ["a25", "9ff"].join(""),
].join("|");
const checks = [
  ["prior customer name", new RegExp(`\\b${priorCustomerOne}\\b`, "i")],
  ["prior customer name", new RegExp(`\\b${priorCustomerTwo}\\b`, "i")],
  ["sample company name", new RegExp(`\\b${sampleCompany}\\b`, "i")],
  ["invented buyer name", new RegExp(`\\b(${fakeBuyers})\\b`, "i")],
  ["unsupported artifact label", new RegExp(unsupportedLabel, "i")],
  [
    "forbidden deployment",
    new RegExp(`${priorCustomerOne}-gtm\\.vercel\\.app`, "i"),
  ],
  ["prior brand color", new RegExp(`#(${priorColors})\\b`, "i")],
  [
    "prior brand asset",
    new RegExp(
      `\\b(${priorCustomerOne}-wordmark|dd_(horizontal|vertical|logo))\\b`,
      "i",
    ),
  ],
  ["em dash", /\u2014/],
];

const files = execFileSync("git", ["ls-files"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)
  .filter((file) => file !== self && extensions.has(extname(file)));

const violations = [];
for (const file of files) {
  const absolute = resolve(root, file);
  if (!existsSync(absolute)) continue;
  const lines = readFileSync(absolute, "utf8").split("\n");
  for (const [label, pattern] of checks) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        violations.push(`${file}:${index + 1} ${label}`);
      }
    });
  }
}

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log(`Residue check passed across ${files.length} tracked text files.`);
