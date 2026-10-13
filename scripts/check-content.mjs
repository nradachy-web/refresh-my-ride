/* Check content files against the rules, without building the site.

     node scripts/check-content.mjs src/content/towns/ceramic-coating--troy.json
     node scripts/check-content.mjs            (every content file)

   It reads only the files you name (plus the others in the same folder, to
   catch copy that was pasted between town pages), writes nothing, and exits 1
   on any problem. Safe to run while other people are editing other files. */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'astro/zod';
import { makeSchemas } from '../src/content.schema.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

// ids, read from the data files so there is one source of truth
const photosTs = read('src/data/photos.ts');
const ids = {
  photos: [...photosTs.matchAll(/^\s*'?([a-z0-9-]+)'?: \{ alt:/gm)].map((m) => m[1]),
  pairs: [...photosTs.matchAll(/^\s*(\w+): \{ before:/gm)].map((m) => m[1]),
  reviews: [...read('src/data/reviews.ts').matchAll(/^\s*id: '([a-z0-9-]+)'/gm)].map((m) => m[1]),
  services: [...read('src/data/services.ts').matchAll(/^\s*id: '([a-z-]+)',\n\s*name:/gm)].map((m) => m[1]),
  cities: [...read('src/data/cities.ts').matchAll(/\{ id: '([a-z-]+)', name: '([^']+)'/g)].map((m) => m[1]),
};
const cityNames = Object.fromEntries([...read('src/data/cities.ts').matchAll(/\{ id: '([a-z-]+)', name: '([^']+)'/g)].map((m) => [m[1], m[2]]));
const homeCity = (read('src/data/cities.ts').match(/\{ id: '([a-z-]+)'[^}]*home: true/) || [])[1];
const servicesTs = read('src/data/services.ts');
const servicePaths = [...servicesTs.matchAll(/path: '([^']+)'/g)].map((m) => m[1]);
const townSlugs = [...servicesTs.matchAll(/townSlug: '([^']+)'/g)].map((m) => m[1]);

const schemas = makeSchemas(z, ids);

const validPaths = new Set([
  '/', '/service-areas/', '/about-us/', '/contact-us/', '/get-a-quote/', '/gift-cards/', '/grandopening/', '/privacy-policy/', '/reviews/',
  ...servicePaths,
  ...ids.cities.map((c) => `/service-areas/${c}/`),
  ...ids.cities.filter((c) => c !== homeCity).flatMap((c) => townSlugs.map((s) => `/${s}-${c}-mi/`)),
]);

const FORBIDDEN = [
  [/[–—]/, 'an en or em dash'],
  [/100% five[- ]star/i, '"100% five star"'],
  [/before October 1\b|by October 1\b/i, 'the expired October 1 offer'],
  [/#1\b|number one\b|\bthe best\b|best in (michigan|macomb|oakland|town)|top[- ]rated|award[- ]winning/i, 'a ranking or superlative claim'],
  [/ceramic coating[^.]{0,80}\$(449|549)|\$(449|549)[^.]{0,80}ceramic coating/i, 'a ceramic coating price their own pages disagree on'],
  [/guarantee(d|s)?\b/i, 'a guarantee (their site promises warranties, not guarantees)'],
  [/\b(cheap|cheapest|lowest price|unbeatable)\b/i, 'a price boast'],
  [/lorem ipsum|TODO|TBD\b|XXX/i, 'placeholder text'],
  [/\bPPF\b|paint protection film (install|package|service)/i, 'paint protection film as a service (they do not list it)'],
  [/same[- ]day ceramic|ceramic[^.]{0,40}same day/i, 'a same-day ceramic coating promise'],
  [/\bfree (estimate|inspection)s?\b/i, '"free estimate" (their wording is "free quote")'],
];

const strings = (node, out = []) => {
  if (typeof node === 'string') out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => strings(n, out));
  else if (node && typeof node === 'object') Object.values(node).forEach((n) => strings(n, out));
  return out;
};
const sentences = (s) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 70);

const args = process.argv.slice(2);
const kinds = ['services', 'towns', 'cities'];
const all = kinds.flatMap((k) => {
  const dir = join(ROOT, 'src/content', k);
  return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => join(dir, f)) : [];
});
const targets = args.length ? args.map((a) => resolve(a)) : all;

let failed = 0;
for (const file of targets) {
  const problems = [];
  const warn = [];
  const kind = basename(dirname(file));
  const name = basename(file, '.json');
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    console.log(`FAIL ${file}\n  not valid JSON: ${e.message}`);
    failed++;
    continue;
  }
  if (!schemas[kind]) {
    console.log(`FAIL ${file}\n  not inside src/content/{services,towns,cities}`);
    failed++;
    continue;
  }
  const parsed = schemas[kind].safeParse(data);
  if (!parsed.success) for (const issue of parsed.error.issues) problems.push(`${issue.path.join('.')}: ${issue.message}`);

  // file name agrees with what is inside
  if (kind === 'services' && data.service !== name) problems.push(`file is ${name}.json but service is "${data.service}"`);
  if (kind === 'cities' && data.city !== name) problems.push(`file is ${name}.json but city is "${data.city}"`);
  if (kind === 'towns' && `${data.service}--${data.city}` !== name) problems.push(`file is ${name}.json but inside it says ${data.service}--${data.city}`);

  const texts = strings(data);
  const joined = texts.join('\n');

  for (const [re, what] of FORBIDDEN) {
    const m = joined.match(re);
    if (m) problems.push(`contains ${what}: "…${joined.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\s+/g, ' ')}…"`);
  }

  // links
  for (const m of joined.matchAll(/\]\(([^)\s]+)\)/g)) {
    const url = m[1];
    if (/^(tel:\+15864001303|sms:\+15864001303|#quote)$/.test(url)) continue;
    if (/^https?:/.test(url)) {
      problems.push(`outside link ${url}: link only to pages on this site`);
      continue;
    }
    if (!validPaths.has(url)) problems.push(`link to ${url}, which is not a page on this site`);
  }

  // town and city pages must name the town where a search looks for it
  const town = cityNames[data.city];
  if ((kind === 'towns' || kind === 'cities') && town) {
    if (!data.meta?.title?.includes(town)) problems.push(`meta.title does not name ${town}`);
    if (!data.hero?.kicker?.includes(town)) problems.push(`hero.kicker does not name ${town}`);
    const words = joined.split(/\s+/).length;
    if (words < 420) problems.push(`only ${words} words: too thin to be worth a page`);
    const mentions = (joined.match(new RegExp(town, 'g')) || []).length;
    if (mentions > 26) warn.push(`${town} is named ${mentions} times: reads stuffed, cut some`);
  }

  // copy pasted between pages of the same kind
  if (kind !== 'services') {
    const mine = new Set(texts.flatMap(sentences));
    const dir = dirname(file);
    for (const other of readdirSync(dir).filter((f) => f.endsWith('.json') && join(dir, f) !== file)) {
      let theirs;
      try {
        theirs = strings(JSON.parse(readFileSync(join(dir, other), 'utf8'))).flatMap(sentences);
      } catch {
        continue;
      }
      const shared = theirs.filter((s) => mine.has(s));
      if (shared.length) problems.push(`${shared.length} sentence(s) identical to ${other}, e.g. "${shared[0].slice(0, 90)}…"`);
    }
  }

  if (problems.length) {
    failed++;
    console.log(`FAIL ${file}\n` + problems.map((p) => '  ' + p).join('\n'));
  } else {
    console.log(`ok   ${file}`);
  }
  if (warn.length) console.log(warn.map((w) => '  note: ' + w).join('\n'));
}
process.exit(failed ? 1 : 0);
