# Google Ads

Built 2026-10-14. Scripts and every API response are in
`~/ads-fix-2026-10-14/refresh-my-ride/` (not in this repo).

## The account

- Josh's account: `9277490191` ("Refresh My Ride"), under our manager account.
  Conversion tracking id `17086544723`, the `AW-17086544723` in the page code.
- His old campaigns: `22712871041` (Performance Max, $15/day) and `22747811479`
  (Search, $15/day, Maximize Clicks with search partners on). Both still ENABLED
  until the switch below.
- Goals the account and the new campaign bid on (made to match on 2026-10-14):
  calls from ads over 60 seconds, the website quote form ("Lead Form - Thank You
  Page", fired by the thank-you page), Google-hosted lead forms and uploaded
  booked appointments.

## The new campaign

`24358772623` "Modern Apex Strategies - Refresh My Ride Core Services", created
PAUSED. Modeled on RPM Auto Lab's Core Services campaign, which ran a year at
the same $40 a day:

- Search only, Google search only (no partners, no display), Maximize
  Conversions with no target, presence-only geography (his own 35 locations),
  English.
- One ad group per service, each with exact and phrase keywords, one broad
  "near me" anchor or two (the RPM pattern), phrase keywords for the nine towns,
  and one responsive search ad with 15 headlines and 4 descriptions written only
  from `docs/FACTS.md`.
- Ceramic Coating and Window Tinting are ENABLED and land on
  `/ceramic-coating/` and `/window-tint-clinton-township-mi/`, which exist on
  his WordPress site today and on the new site after cutover.
- Paint Correction and Paint Protection Film (PPF) are PAUSED. Their pages only
  exist on the new site, so their ads point at `/ceramic-coating/` until the
  cutover step moves them.
- 91 phrase negatives. Each was checked against his own search terms from June
  2025 on; five were dropped because they would have blocked a search that
  converted.
- Assets: 6 sitelinks (the grand opening one ends October 30), 8 callouts, a
  Services snippet, a call asset on (586) 400-1303 shown Monday to Friday 8am to
  7pm and Saturday 8am to 5pm (his old ad schedule), a tint price list on the
  tint ad group, 10 photos from his own shop, business name and logo.

## Steps that are left

1. **Go:** `switch.py --apply` pauses both old campaigns and enables the new one
   in one request, so the account is never dark and never double-spending.
   Run it once the ads read APPROVED. They did on 2026-10-14 at 1:15pm ET (all
   four ads APPROVED, all 127 keywords approved, 16 of them rarely served for
   low volume).
   On 2026-10-14 at 4:40pm ET Nick paused both old campaigns himself in the
   Ads web interface; the new campaign was still PAUSED after that, so the
   account was dark until it is enabled. **Done:** Nick enabled the new
   campaign in the web interface at 6:16pm ET the same day (change history).
2. **Cutover, applied 2026-10-14 about 5:20pm ET** (`cutover-applied.json`):
   all four ad groups ENABLED, the paint correction and PPF ads re-entered
   review with their new final URLs, 24 town keywords got town pages, and the
   Paint Correction and Paint Protection Film sitelinks were added (8 in all).
   Original step: after the new site answers on the domain (`docs/LAUNCH.md`),
   `cutover.py --apply` checks that every address it needs is the new site,
   then points the paint correction and PPF ads at their pages, gives the 24
   town keywords their town pages, adds two sitelinks and turns the two
   ad groups on.

## Auto Detailing added, PPF paused (2026-10-15)

Josh asked by text at 2:30pm for a car detailing ad group "mostly for volume",
and to pause PPF "until we have the capacity and pricing for PPF fully". Script
and readback: `~/ads-fix-2026-10-15/refresh-my-ride/` (`change.py`, `readback.py`).

- New ad group **Auto Detailing**, ENABLED, landing on
  `/car-detailing-services-clinton-township-mi/`: 55 keywords taken from his own
  converting detailing searches (25 exact, 27 phrase, 3 broad "near me"); the
  18 town keywords land on their `/car-detailing-<town>-mi/` pages and the 7
  mobile keywords on `/mobile-detailing/`. One responsive search ad (15
  headlines, 4 descriptions, from `docs/FACTS.md`) and a price list of five
  packages, Wash & Seal $139.99 to Signature Refresh $319.99.
- Auto Detailing and Mobile Detailing sitelinks added; the Services snippet now
  lists Interior Detailing instead of Paint Protection Film.
- **Paint Protection Film (PPF)** ad group and its sitelink PAUSED. To bring PPF
  back, enable both and put Paint Protection Film back in the snippet.
- Why it matters: from June 2025 his detailing searches carried about $5,300 of
  $6,700 spend and about 177 of 210 conversions. At $40 a day, Maximize
  Conversions will likely shift spend toward detailing, which is cheaper per
  click; watch whether ceramic and tint still get enough.

## Tune-up after the first day (2026-10-15)

`tune.py` and `route.py` in the same folder:

- 8 phrase negatives from the first day's search terms: competitor names
  (shaders, b4 tintz, spotlight tint), mobile tint (tint is shop work: mobile
  tint, mobile tinting, mobile window tint), powder coating, car wrap. "mobile
  window tinting" was left off because one of his past searches with it
  converted.
- The account's "RMR CLINTON TWP" location group (only the Clinton Township
  listing) attached to the campaign, as his old Performance Max had it. Without
  it the ads could show his other Business Profile, "Refresh My Ride Mobile
  Detailing" at 145 S Livernois Rd, Rochester Hills.
- Ad group negatives detailing, detailer, detailers, detail in Ceramic Coating,
  Window Tinting and Paint Correction, so detailing searches reach the
  detailing ad and page (on day one the ceramic broad keyword was catching them).
- Checked and fine: Google search only, AI Max off, automatically created text
  off, account and campaign goals match, call reporting and auto-tagging on,
  enhanced conversions for leads on, the quote form forwards to
  `/thank-you-submission-received` through GoHighLevel's embed script.
- Open: about three quarters of eligible searches are lost to budget at $40 a
  day; calls from the website (the phone number on the page, CallRail for ad
  visitors) do not reach Google as conversions, so bidding learns only from
  forms and the ads' own call button.

## Call tracking (CallRail, set up 2026-10-15)

- CallRail company "Refresh My Ride" (`COM01a13dbbd4fb75558e6671d047c12374`),
  one source tracker "Website - calls only": (586) 225-8361, shown only to
  visitors from Google paid search, rings (586) 400-1303. Recording off. Texts
  to it forward to the shop line.
- The site loads CallRail's swap script (`TRACKING.callRail`, see
  `src/components/Tracking.astro`): at once on an ad visit, otherwise on first
  touch, so speed tests never load it.
- Calls reach our reporting portal through a CallRail webhook (integration
  2714331) and the portal's CallRail sync.
- Calls from the ads' own call button stay on Google's forwarding number to
  the shop line, so Google counts those and CallRail counts website calls from
  ad visitors. CallRail's own Google Ads integration stays off: it would send
  the same calls to Google a second time.

## Quality Score, honestly

Google gives a keyword a Quality Score only after it has had impressions, and
nobody can set it. It is built from three parts, and the build aims at each:

- **Ad relevance:** one service per ad group, the service's words in several
  headlines, a display path that names the service.
- **Landing page experience:** one page per service and per town, with the
  keyword in the title and heading. The new pages measured 98 to 100 on phone
  PageSpeed on the preview; his WordPress ceramic page measured 42.
- **Expected click-through rate:** every asset type a Search ad can carry.

On 2026-10-14 his own keywords read: brand 10, service keywords mostly 3 to 7,
with ad relevance and expected click-through the parts most often below average.
Read the new keywords' scores two to three weeks after the switch.
