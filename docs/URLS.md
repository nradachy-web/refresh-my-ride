# Addresses

Every address the old WordPress site answered on still answers on the new one,
with a real page, so nothing breaks at cutover: not a ranking, not an ad's
final URL, not the quote form's redirect.

| Old address | New site | Note |
|---|---|---|
| `/` | Home | |
| `/ceramic-coating/` | Ceramic coating | |
| `/window-tint-clinton-township-mi/` | Window tint | Kept as the main tint page |
| `/car-detailing-services-clinton-township-mi/` | Auto detailing | Kept as the main detailing page |
| `/car-detailing-shelby-township-mi/` | Detailing in Shelby Township | Same address, new page |
| `/about-us/` | About | |
| `/contact-us/` | Contact | |
| `/get-a-quote/` | Get a quote | |
| `/gift-cards/` | Gift cards | |
| `/grandopening/` | Grand opening | Retires its own specials after October 30, 2026 |
| `/privacy-policy/` | Privacy policy | |
| `/thank-you-submission-received/` | Thank you | The quote form redirects here. Not indexed. |

The old menu linked to five town pages that did not exist (404): Sterling
Heights, Rochester Hills, Troy, Birmingham and West Bloomfield under
`/car-detailing-<town>-mi`. All five now exist at exactly those addresses.

## New addresses

- `/paint-correction/`, `/paint-protection-film/` (added 2026-10-14), `/mobile-detailing/`,
  `/reviews/`, `/service-areas/`
- Town hubs: `/service-areas/<town>/` for the nine towns in `src/data/cities.ts`
- One service in one town: `/<service>-<town>-mi/`, for ceramic coating, window
  tint, car detailing and paint correction in the eight towns other than
  Clinton Township. Clinton Township is home, so its service pages are the main
  service pages.

GitHub Pages redirects `/page` to `/page/`, so old links without the trailing
slash still arrive.
