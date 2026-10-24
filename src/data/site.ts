/* ============================================================================
   THE RECORD

   Every business fact on the site comes from this file. Nothing here is
   invented: each value was read from Refresh My Ride's own website or their
   Google Business Profile on 2026-10-13. Where their own pages disagreed, the
   note says which source won and the question is listed in docs/OPEN-QUESTIONS.md
   for Josh to settle.
   ========================================================================== */

export const BRAND = {
  name: 'Refresh My Ride',
  legalName: 'Refresh My Ride Auto Detailing',
  owner: 'Josh Meller',
  founded: 2022, // headlight restorations; full detailing from summer 2023
  established: 2023, // the year their own site uses for "since"
  phone: '(586) 400-1303',
  phoneHref: 'tel:+15864001303',
  smsHref: 'sms:+15864001303',
  email: 'info@refreshmyrideauto.com',
  street: '33115 Louise Ave',
  city: 'Clinton Township',
  state: 'MI',
  stateName: 'Michigan',
  zip: '48035',
  // Their own wording on the grand opening page.
  crossStreets: 'North side of 14 Mile Road, just east of Kelly Road',
  geo: { lat: 42.539884, lng: -82.92629 }, // Google Business Profile
  shopSize: '2,000 square foot',
  vehiclesServiced: '1,000+',
  counties: ['Macomb', 'Oakland'],
  mobileRadius: 'about 30 to 40 minutes',
} as const;

/* Hours: footer, About, Contact and Get a quote all say Monday to Friday 9 to 5,
   appointment only. One block on the old detailing page said 9 to 6 plus Saturday,
   and the Google profile says open 24 hours. Four pages beat one. Open question 1. */
export const HOURS = {
  summary: 'Monday to Friday, 9am to 5pm',
  note: 'By appointment. Book online any time.',
  rows: [
    { days: 'Monday to Friday', hours: '9:00am to 5:00pm' },
    { days: 'Saturday', hours: 'Closed' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }],
} as const;

/* Google rating read from the Places API on 2026-10-13: 5.0 from 273 reviews.
   Shown rounded down so it stays true as the count grows. Never "100% five star":
   the profile has at least one one-star review. */
export const RATING = {
  value: '5.0',
  count: 273,
  countLabel: '270+',
  asOf: '2026-10-13',
  placeId: 'ChIJB1UwP3d7l44Rmww8WHUvZzs',
} as const;

export const LINKS = {
  // Urable is their booking system. Online booking and gift cards both live there.
  book: 'https://app.urable.com/virtual-shop/oedEhPEmvCU13dyvyVGn',
  giftCards: 'https://app.urable.com/virtual-shop/oedEhPEmvCU13dyvyVGn/12HDzWrfOmvcVuwvOT7D?jobType=shop',
  googleReviews: 'https://share.google/mdVUm5A65OAYlHL0z',
  googleProfile: 'https://maps.google.com/?cid=4280442151876955291',
  directions: 'https://maps.app.goo.gl/xarcopSLWTaMLpzN6',
  instagram: 'https://www.instagram.com/refresh.my.ride/',
  facebook: 'https://www.facebook.com/refreshmyride.mi',
  tiktok: 'https://www.tiktok.com/@refresh.my.ride',
  linkedin: 'https://www.linkedin.com/company/refreshmyride/',
  apex: 'https://modernapexstrategies.com',
} as const;

/* Their lead form is a GoHighLevel form on their own subdomain. It feeds the CRM
   they already work from, so the new site keeps it rather than replacing it. */
export const FORM = {
  origin: 'https://go.refreshmyrideauto.com',
  id: 'WS41SpgFJEZ50jNQXiFd',
  name: 'SL-Google Ads Form Submission',
  height: 820,
  rsvpId: 'GMaP1MsdGF8tgjpYzzYA',
  // His custom fields on the quote form, by their GoHighLevel ids (read from
  // the form on 2026-10-17). They name the parts of a request copied into the
  // lead ledger below.
  fields: {
    vehicle: 'BcF8xXstTndVFdqb4ibj',
    services: 'EpuUMCxvI4t4K3OswKvn',
    notes: 'ZeWuZyaaO3Pu0r9gOPrH',
  },
} as const;

/* Modern Apex's lead ledger. Every quote request sent on this site is copied
   there (QuoteForm.astro), so it shows in his Apex dashboard with the ad it came
   from and his Urable jobs can be matched back to it. The token only lets a
   site add leads to his ledger; it is meant to sit in the page. */
export const INTAKE = {
  endpoint: 'https://app.modernapexstrategies.com/api/lead-intake',
  token: 'e67e5aa59f709450de2e13e581b27344',
} as const;

/* Google tags copied from the live site. They only load on the production host
   (see components/Tracking.astro), never on a preview build. */
export const TRACKING = {
  productionHost: 'refreshmyrideauto.com',
  googleTag: 'GT-TX96W5HG',
  ads: 'AW-17086544723',
  // The one conversion action their site fires today: a tap on the phone number.
  phoneTapConversion: 'AW-17086544723/8kitCKryj_gcENP2v9M_',
  // "Lead Form - Thank You Page" in his Ads account 9277490191, whose conversion
  // tracking id is 17086544723 (read through the API on 2026-10-14). It is a
  // primary conversion and the old WordPress thank-you page fires this exact
  // send_to, so the count carries straight over at cutover.
  leadConversion: 'AW-17086544723/dXDNCPyByuscENP2v9M_',
  // googleTag above already sends to the GA4 property G-LCQ74N2KFP (read from
  // the tag on 2026-10-14). A second GA4 property, if one is made for us,
  // goes here as its G- measurement ID. Empty: nothing extra is sent.
  ga4: '',
  // CallRail company "Refresh My Ride" (set up 2026-10-15). One tracking
  // number, (586) 225-8361, shown only to visitors from Google paid search; it
  // rings the shop line, (586) 400-1303. Everyone else sees the shop number.
  callRail: 'https://cdn.callrail.com/companies/443790158/269d2dc6e115335c4099/12/swap.js',
} as const;

export const FINANCING = 'Financing through Affirm and Klarna: 3 to 24 months, as low as 0% interest.';

/* Grand opening of the Louise Ave shop. The banner and page retire themselves
   after the specials end. */
export const GRAND_OPENING = {
  date: '2026-10-19',
  dateLabel: 'Monday, October 19',
  hours: '10am to 6pm',
  specialsEnd: '2026-10-30',
  specialsEndLabel: 'October 30, 2026',
} as const;

/* Clinton Township Community TV's Clinton Currents feature on the grand
   opening, sent by Josh on 2026-10-23. Details read from YouTube that day. The
   thumbnail is our own copy (src/assets/video) so nothing loads from YouTube
   until a visitor presses play (components/Video.astro). */
export const VIDEO = {
  id: 'fsoZtf4MVD4',
  title: 'Clinton Currents: Refresh My Ride Auto Detailing',
  channel: 'Clinton Township Community TV',
  url: 'https://www.youtube.com/watch?v=fsoZtf4MVD4',
  uploaded: '2026-10-20T08:04:06-07:00',
  duration: 'PT4M21S',
  length: '4:21',
  lengthLabel: '4 minutes 21 seconds',
} as const;
