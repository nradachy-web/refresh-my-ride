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
3. **Check his GoHighLevel form has a `gclid` field** (a hidden field with query
   key `gclid`). The new site passes the Google click ID into the form address.
   The old site tried to and failed, because its script looked for the wrong
   form host. Without the hidden field the value is dropped on arrival.
4. **In Google Ads, add a "Quote form" conversion** on the thank-you page URL
   (`/thank-you-submission-received/`). The site already fires `generate_lead`
   to Google Analytics there. Today the only conversion his account records is
   a tap on the phone number.
5. Get access to wherever the domain's DNS is managed, and note every existing
   record first. Mail for `info@refreshmyrideauto.com` and the
   `go.refreshmyrideauto.com` subdomain (his forms) must not be touched.

## The switch

6. In `.github/workflows/deploy.yml`: delete the `env:` and `BASE_PATH` lines.
7. Add `public/CNAME` containing `refreshmyrideauto.com`. Commit and push.
8. DNS, web records only: apex `A` records to 185.199.108.153,
   185.199.109.153, 185.199.110.153 and 185.199.111.153, and `www` as a `CNAME`
   to `nradachy-web.github.io`. Leave MX, TXT and the `go` record alone.
9. After DNS has changed, set the custom domain in the repository's Pages
   settings (DNS first, then the domain: the other order stalls the
   certificate). Turn on Enforce HTTPS when it is offered.
10. Take WordPress offline only after the new site answers on the domain.

## After the switch

11. Load the home page, one service page and one town page on a phone. Tap the
    phone number, open the form, check the menu.
12. Run PageSpeed Insights on the real domain for the home page, a service
    page and a town page, phone and desktop. Record the scores with the date.
13. In Google Ads, confirm the tag is firing (Tag Assistant) and that final
    URLs resolve. The addresses his ads use today all still exist.
14. Submit `https://refreshmyrideauto.com/sitemap.xml` in Search Console.
15. Point new ad groups at the town pages: an ad for "ceramic coating troy mi"
    lands on `/ceramic-coating-troy-mi/`.

## Things that will age

- The grand opening strip and specials retire themselves after October 30, 2026.
  After that the page reads as a past event. Remove it from the sitemap when
  it stops being useful.
- The Google review count in `src/data/site.ts` is shown as "270+". Raise it
  when the real number passes the next round figure.
