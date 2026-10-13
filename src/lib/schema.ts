/* JSON-LD builders. Facts come from data/site.ts. There is deliberately no
   aggregateRating: Google does not accept a business marking up its own
   reviews on its own site, and the count would go stale. */

import { BRAND, HOURS, LINKS } from '../data/site';
import { CITIES } from '../data/cities';
import { plain } from './rich';

const ORIGIN = 'https://refreshmyrideauto.com';
export const BUSINESS_ID = `${ORIGIN}/#business`;

export function business() {
  return {
    '@type': ['AutomotiveBusiness', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: `${ORIGIN}/`,
    telephone: '+15864001303',
    email: BRAND.email,
    image: `${ORIGIN}/og-image.jpg`,
    logo: `${ORIGIN}/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.street,
      addressLocality: BRAND.city,
      addressRegion: BRAND.state,
      postalCode: BRAND.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: BRAND.geo.lat, longitude: BRAND.geo.lng },
    hasMap: LINKS.googleProfile,
    openingHoursSpecification: HOURS.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, MI` })),
    sameAs: [LINKS.instagram, LINKS.facebook, LINKS.tiktok, LINKS.linkedin],
    founder: { '@type': 'Person', name: BRAND.owner },
  };
}

/* No offers: their prices are "from" prices for a coupe or sedan, and an Offer
   would state them as the price. The description carries them in words. */
export function serviceSchema(opts: { name: string; type: string; description: string; url: string; area?: string; areas?: string[] }) {
  const areas = opts.areas ?? CITIES.map((c) => `${c.name}, MI`);
  return {
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.type,
    description: plain(opts.description),
    url: opts.url,
    provider: { '@id': BUSINESS_ID },
    areaServed: opts.area ? { '@type': 'City', name: opts.area } : areas.map((name) => ({ '@type': 'City', name })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(i.a) },
    })),
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${ORIGIN}${t.path}`,
    })),
  };
}

export function graph(nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
