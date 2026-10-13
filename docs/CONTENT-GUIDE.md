# Writing for this site

Read `docs/FACTS.md` first. This file is how to turn those facts into pages.

## Where copy lives

| Page type | File | Shape |
|---|---|---|
| Service page | `src/content/services/<service-id>.json` | `services` in `src/content.schema.mjs` |
| One service in one town | `src/content/towns/<service-id>--<city-id>.json` | `towns` |
| Town hub | `src/content/cities/<city-id>.json` | `cities` |

Worked examples to match in depth and tone:

- `src/content/services/ceramic-coating.json`
- `src/content/towns/ceramic-coating--sterling-heights.json`
- `src/content/cities/sterling-heights.json`

Check your work, and only your work, with:

```
node scripts/check-content.mjs src/content/towns/<your-file>.json
```

It prints `ok` or the exact problems. Fix until it prints `ok`. Do NOT run
`npm run build`, `astro` or any dev server: other writers are working in this
folder at the same time and a build would collide. Do not edit any file you
were not asked to write. Do not touch `src/data`, `src/components` or
`src/templates`.

Ids: services are `ceramic-coating`, `window-tint`, `car-detailing`,
`paint-correction`, `mobile-detailing`. Cities are `clinton-township` (home),
`sterling-heights`, `shelby-township`, `macomb-township`, `rochester-hills`,
`troy`, `birmingham`, `royal-oak`, `west-bloomfield`. Photo ids and what each
photo shows are in `src/data/photos.ts`. Review ids and text are in
`src/data/reviews.ts`.

## Voice

Refresh My Ride is a young, straight-talking shop. Their own copy says things
like "we'll tell you straight" and "not upsell you into the longest one". Write
like the owner explaining it across the counter.

- Sentence case everywhere, headings included.
- **No em dashes or en dashes.** Use a period, a comma or a colon.
- No exclamation marks. No rhetorical question openers. No "Whether you are X or Y".
- Short declarative sentences. Concrete nouns. Say what happens to the car.
- "We" is the shop, "you" is the driver. Contractions are fine but not required.
- Banned words: premier, top-notch, unmatched, unparalleled, state of the art,
  elevate, pristine, meticulous, passion, world-class, luxury (unless naming the
  Luxury Refresh package), transform, revolutionary, seamless, hassle-free,
  one-stop, look no further, second to none, nestled, bustling, vibrant.
- Their wording: "free quote" (never "free estimate"), "ceramic coating" (never
  "ceramic pro" or a brand), "window tint", "auto detailing" or "detailing",
  "paint correction", "pick-up and drop-off valet", "mobile detailing".
- Prices exactly as in FACTS.md, always with "from" and, on first use in a
  page, the coupe or sedan condition.

## Inline markup

Text fields accept `**bold**` and `[label](/path/)`. Nothing else. Links must
go to pages on this site (the checker knows the list), `#quote`,
`tel:+15864001303` or `sms:+15864001303`. Use 2 to 4 links per page, where a
reader would want them. Town page URLs are `/<service-slug>-<city-id>-mi/`
(`/window-tint-troy-mi/`, `/car-detailing-royal-oak-mi/`). Clinton Township has
no town pages: link to the service page instead. Service pages are
`/ceramic-coating/`, `/window-tint-clinton-township-mi/`,
`/car-detailing-services-clinton-township-mi/`, `/paint-correction/`,
`/mobile-detailing/`. Hubs are `/service-areas/<city-id>/`.

## Local facts: the rule

A town page earns its place by being about that town. Every local statement
must be (a) a plain, checkable fact about the place and (b) connected to what
it does to a car or how the customer gets the work done.

Good material: the roads people actually drive and what gets put on them in
winter; whether the town is driveways, condos or parking decks; gravel or tree
cover; lakes and parks that put sand, mud or sap in a car; big employers and
commutes; car events (Woodward Dream Cruise); how far the shop is.

Not allowed:
- Anything you cannot source. Each town has `docs/research/<city-id>.md`; a
  local claim that is not in that file does not go on the page.
- Statistics, rankings, income, demographics or "affluent" characterisations.
- Customer counts, customer stories, "our Troy customers love".
- Naming other businesses as places to avoid or compare (car washes, dealers,
  other detailers). Public landmarks, parks, roads, malls and plants are fine.
- Weather numbers. "Michigan winters" and "road salt and brine" are enough.

Distance and drive time come from `docs/research/drive-times.json` and nowhere
else. Write them as "about N miles from central <town>" and "roughly N minutes
without traffic", rounded like this:

| Town | Miles | Minutes |
|---|---|---|
| Sterling Heights | about 7 | roughly 15 |
| Shelby Township | about 13 | roughly 25 |
| Macomb Township | about 15 | roughly 30 |
| Rochester Hills | about 19 | roughly 30 |
| Troy | about 14 | roughly 25 |
| Birmingham | about 17 | roughly 30 |
| Royal Oak | about 14 | roughly 25 |
| West Bloomfield | about 25 | roughly 45 |

Route descriptions ("take 14 Mile Road east") only if the research file
confirms the route. The shop is on the north side of 14 Mile Road, just east of
Kelly Road.

Mobile and valet: every listed town is in their service area. Detailing can be
mobile. Coating, tint and paint correction are shop only, so those pages sell
the drive, the valet pickup and (coating only) the covered Uber. For West
Bloomfield, do not promise a mobile visit: say to tell us where you are and we
will confirm what can come to you.

## Making 32 town pages different

The same service in two towns must not read like a find and replace. The
checker fails any sentence of 70+ characters that appears in another town file.
Beyond that, vary the angle: what about THIS town changes the job?

- Ceramic coating: what attacks paint here (salt routes, gravel dust, tree sap,
  lake air, long highway commutes), and who keeps vehicles a long time.
- Window tint: sun exposure on the commute, parking in open lots or decks,
  glare, privacy in dense downtowns, heat in a car parked all day at work.
- Detailing: what ends up inside the car (kids, dogs, parks, beach sand,
  construction dust, office commute coffee), and whether mobile fits the
  housing (driveway yes, parking deck maybe not).
- Paint correction: what marks the paint (tunnel washes, tree debris, street
  parking), and car-culture reasons to want it right (shows, cruises, resale).

Vary the display line (`hero.title`) too: no two pages may share one. Keep it
under about 34 characters so it sets in two lines, with one phrase in `**`.

## Photos

Use only ids from `src/data/photos.ts`. `hero.photo` must be one of these (the
rest are too small or the wrong shape for a hero):

- Ceramic coating: `silverado-black`, `bentley-flying-spur`, `bmw-x6-blue`,
  `porsche-suv-blue`, `cybertruck`, `cadillac-sedan-black`, `bmw-7-series`,
  `josh-polishing-corvette`
- Window tint: `corvette-gray`, `tesla-model-y`, `bmw-7-series`,
  `cadillac-sedan-black`, `chevy-suv-black`, `escalade-black`, `cybertruck`
- Detailing: `interior-alfa-red`, `interior-shelby`, `interior-convertible`,
  `interior-bmw`, `ford-super-duty-white`, `jeep-grand-cherokee`,
  `escalade-black`, `chevy-suv-black`, `porsche-wheel`
- Paint correction: `team-polishing-mercury`, `josh-polishing-corvette`,
  `silverado-black`, `bmw-x6-blue`, `bentley-flying-spur`
- Town hubs: any of the above, plus `shop-interior`

Within one town, the four service pages and the hub must each use a different
hero photo. The second photo on a page (`photo`, or `about.photo`) must differ
from that page's hero and can be any id that fits, including `mobile-van`,
`mobile-bmw-driveway`, `gmc-truck-white`, `ram-truck-white`, `interior-ford`,
`ferrari-roma`, `tech-polishing-mustang`, `shop-interior`, `josh-portrait`.
Never caption or describe a photo as being from the town: none of them are
labelled by town.

## Reviews

Pick 2 or 3 review ids per page that are about the page's service. Prefer one
whose `town` matches the page (`april-g` Sterling Heights, `sydney-k`
Rochester Hills, `alexis-p` Macomb Township, `sabrina-k` Shelby Township,
`fahad-a` Troy, `chris-d` Clinton Township). Never write or edit review text.

## Titles and descriptions

- `meta.title`: 30 to 62 characters. Keyword and town first. Add
  " | Refresh My Ride" only if it still fits.
- `meta.description`: 110 to 160 characters. Service, town, one concrete
  fact (a price, a duration, the drive), and "Free quote" if there is room.
- `hero.kicker`: the plain keyword line, e.g. "Window tint in Troy, MI".
