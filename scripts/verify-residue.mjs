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

function fail(message) {
  console.error(message);
  process.exit(1);
}

const heroJobsPath = "src/data/hero-jobs.ts";
const heroDemoPath = "src/components/HeroDemo.tsx";
const pagePath = "src/app/(protected)/page.tsx";
const cssPath = "src/app/globals.css";

for (const file of [heroJobsPath, heroDemoPath]) {
  if (!existsSync(resolve(root, file))) {
    fail(`missing ${file}`);
  }
}

const heroJobsSource = readFileSync(resolve(root, heroJobsPath), "utf8");
if (!heroJobsSource.includes("HERO_JOBS")) {
  fail(`${heroJobsPath} must define HERO_JOBS`);
}

const heroJobEntries = heroJobsSource.match(/\bid:\s*["'`]/g) ?? [];
if (heroJobEntries.length !== 8) {
  fail(
    `${heroJobsPath} must contain exactly 8 HERO_JOBS entries, found ${heroJobEntries.length}`,
  );
}

const pageSource = readFileSync(resolve(root, pagePath), "utf8");
const normalizedPage = pageSource.replace(/\s+/g, "");
if (!normalizedPage.includes('<sectionclassName="hero"><HeroDemo/></section>')) {
  fail(
    `${pagePath} hero section must be exactly <section className="hero"><HeroDemo /></section>`,
  );
}

const requiredClasses = [
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone",
  "hero-phone-notch",
  "hero-phone-header",
  "hero-phone-back",
  "hero-phone-agent",
  "hero-phone-desktop",
  "hero-phone-thread",
  "hero-phone-work",
  "hero-phone-work-label",
  "hero-phone-work-meta",
  "hero-phone-work-copy",
  "hero-phone-message",
  "is-user",
  "is-bot",
  "hero-phone-composer",
];

const heroDemoSource = readFileSync(resolve(root, heroDemoPath), "utf8");
const cssSource = readFileSync(resolve(root, cssPath), "utf8");
const missing = requiredClasses.filter(
  (name) => !heroDemoSource.includes(name) || !cssSource.includes(name),
);
if (missing.length) {
  fail(`hero markup or CSS is missing: ${missing.join(", ")}`);
}

console.log(`Residue check passed across ${files.length} tracked text files.`);
