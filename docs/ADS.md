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
2. **Cutover:** after the new site answers on the domain (`docs/LAUNCH.md`),
   `cutover.py --apply` checks that every address it needs is the new site,
   then points the paint correction and PPF ads at their pages, gives the 24
   town keywords their town pages, adds two sitelinks and turns the two
   ad groups on.

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
