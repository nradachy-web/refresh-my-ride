import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SERVICES } from '../data/services';
import { CITIES, TOWN_PAGES, hubPath } from '../data/cities';

/* Every indexable page, by its production address. Built from the same data
   that builds the pages, so it cannot list a page that does not exist. */
const STATIC = ['/', '/service-areas/', '/about-us/', '/contact-us/', '/get-a-quote/', '/reviews/', '/gift-cards/', '/grandopening/', '/privacy-policy/'];

export const GET: APIRoute = async () => {
  const [services, towns, cities] = await Promise.all([getCollection('services'), getCollection('towns'), getCollection('cities')]);
  const paths = [
    ...STATIC,
    ...services.map((e) => SERVICES.find((s) => s.id === e.data.service)!.path),
    ...cities.map((e) => hubPath(CITIES.find((c) => c.id === e.data.city)!)),
    ...towns.flatMap((e) => {
      const page = TOWN_PAGES.find((p) => p.service.id === e.data.service && p.city.id === e.data.city);
      return page ? [`/${page.slug}/`] : [];
    }),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...new Set(paths)].map((p) => `  <url><loc>https://refreshmyrideauto.com${p}</loc></url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
