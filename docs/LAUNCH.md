# Going live

The preview at https://nradachy-web.github.io/refresh-my-ride/ is hidden from
search (every page is noindex and robots.txt disallows everything). Nothing
below has been done unless it says so. Do it in this order.

## Before the switch

1. **Josh reads the site and answers `docs/OPEN-QUESTIONS.md`.** Fix what he flags.
2. **Send one real quote request from the preview** (phone, not a script) and
   confirm it lands in his GoHighLevel pipeline and redirects to the thank-you
   page. The form is his existing one, so this should just work, but nobody has
   seen it work from the new pages yet.
3. **Check his GoHighLevel form has hidden fields for `gclid`, `gbraid` and
   `wbraid`** (query keys of the same names), and the five `utm_` tags if he
   wants them. The new site passes the Google click ID into the form address.
   The old site tried to and failed, because its script looked for the wrong
   form host. Without the hidden field the value is dropped on arrival.
4. **Done 2026-10-14: the Ads account is settled.** The account that runs his
   campaigns is `9277490191` ("Refresh My Ride", under our manager account).
   Its conversion tracking id is `17086544723`, the same `AW-17086544723` the
   page code uses. `AW-17899745818`, which his Google tag `GT-TX96W5HG` is
   linked to, is not the campaign account.
5. **Done 2026-10-14: the form conversion is wired.** His account already has
   "Lead Form - Thank You Page" (primary) and the old WordPress thank-you page
   fires it. Its `send_to` is now `TRACKING.leadConversion`, so the new
   thank-you page fires the same action, once per visit.
6. **In his GoHighLevel form, fix the footer links.** "Privacy Policy" and
   "Terms Of Service" under the text-message consent point at
   `refreshmyride.xyz`, which redirects to the home page. Point Privacy Policy
   at `https://refreshmyrideauto.com/privacy-policy/` and remove Terms Of
   Service or publish terms. Check the RSVP form too. Carriers look at this
   link when they review SMS registration.
   While in the form builder: turn on visible field labels (today the fields
   are named only by placeholder text that vanishes on typing), add a heading
   above the service checkboxes, and darken the fields so typed text reaches
   4.5:1 contrast (black on the grey field measures 4.0:1).
7. Get access to wherever the domain's DNS is managed, and note every existing
   record first. Mail for `info@refreshmyrideauto.com` and the
   `go.refreshmyrideauto.com` subdomain (his forms) must not be touched.
   Read from public DNS on 2026-10-14: registrar and DNS at **Porkbun**. Apex
   `A` 75.98.175.105 (the WordPress host), `www` CNAME to the apex, `MX` 1
   smtp.google.com (Google mail), `TXT` google-site-verification and an SPF
   record, `go` CNAME brand.ludicrous.cloud (GoHighLevel), `_dmarc` TXT. Only
   the apex `A` and the `www` record change.

## The switch

8. and 9. **Staged 2026-10-14 on the `go-live` branch:** `deploy.yml` without
   `BASE_PATH` and `public/CNAME` with `refreshmyrideauto.com`. Merge it into
   main right after the DNS change in item 10, not before: until the domain is
   set, a production build breaks the github.io preview.
10. DNS, web records only: apex `A` records to 185.199.108.153,
   185.199.109.153, 185.199.110.153 and 185.199.111.153, and `www` as a `CNAME`
   to `nradachy-web.github.io`. Leave MX, TXT and the `go` record alone.
11. After DNS has changed, set the custom domain in the repository's Pages
   settings (DNS first, then the domain: the other order stalls the
   certificate). Turn on Enforce HTTPS when it is offered.
12. Take WordPress offline only after the new site answers on the domain.

## After the switch

13. Load the home page, one service page and one town page on a phone. Tap the
    phone number, open the form, check the menu.
14. Run PageSpeed Insights on the real domain for the home page, a service
    page and a town page, phone and desktop. Record the scores with the date.
    Run each a few times: phone Performance moves between 98 and 100 from run
    to run on pages with a hero photo (see the end of `docs/DESIGN.md`).
15. In Google Ads, confirm the tag is firing (Tag Assistant) and that final
    URLs resolve. The addresses his ads use today all still exist.
    Then run the cutover step of the new Search campaign (see
    `docs/ADS.md`): it points the paint correction and PPF ads at their new
    pages, gives the town keywords their town pages and turns those two ad
    groups on.
16. Submit `https://refreshmyrideauto.com/sitemap.xml` in Search Console.
17. Town keywords land on town pages ("ceramic coating troy" lands on
    `/ceramic-coating-troy-mi/`). The cutover step in item 15 does this.

## Worth knowing about measurement

- An ordinary visit loads the Google tag on the visitor's first touch, scroll
  or key press. A visit that arrives with a Google click ID loads it at once,
  and so does the thank-you page. A visitor from organic search who reads the
  first screen and leaves without touching anything is not counted.
- Safari limits cookies set by a page's own script to 7 days, and to 24 hours
  when the visit arrived with a click ID. An iPhone visitor who comes back a
  week later and then submits the form will arrive in the CRM without a click
  ID. That is the browser, not a bug.
- A booking finished inside Urable is invisible to Google Ads. The site counts
  the click on Book online as an Analytics event only.

## Things that will age

- The grand opening strip and specials retire themselves after October 30, 2026.
  After that the page reads as a past event. Remove it from the sitemap when
  it stops being useful.
- The Google review count in `src/data/site.ts` is shown as "270+". Raise it
  when the real number passes the next round figure.
