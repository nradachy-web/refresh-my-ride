# Going live

The preview at https://nradachy-web.github.io/refresh-my-ride/ is hidden from
search (every page is noindex and robots.txt disallows everything). Nothing
below has been done. Do it in this order.

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
4. **Sort out which Google Ads account is which.** His old site's code names
   two: `AW-17086544723` (written into the page, with the phone tap conversion
   label) and `AW-17899745818`, which is what his Google tag `GT-TX96W5HG` is
   actually linked to, along with Analytics property `G-LCQ74N2KFP`. Page views
   and events go to the second; only the phone tap goes to the first. Find out
   which account runs the campaigns and put its ID in `TRACKING` in
   `src/data/site.ts`.
5. **Add a "Quote form" conversion** in that account and paste its `send_to`
   value into `TRACKING.leadConversion`. It then fires on the thank-you page
   (`/thank-you-submission-received/`) beside the `generate_lead` Analytics
   event. Today the only conversion his setup records is a tap on the phone
   number, and the new site sends that on touch devices only, once per tap.
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

## The switch

8. In `.github/workflows/deploy.yml`: delete the `env:` and `BASE_PATH` lines.
9. Add `public/CNAME` containing `refreshmyrideauto.com`. Commit and push.
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
15. In Google Ads, confirm the tag is firing (Tag Assistant) and that final
    URLs resolve. The addresses his ads use today all still exist.
16. Submit `https://refreshmyrideauto.com/sitemap.xml` in Search Console.
17. Point new ad groups at the town pages: an ad for "ceramic coating troy mi"
    lands on `/ceramic-coating-troy-mi/`.

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
