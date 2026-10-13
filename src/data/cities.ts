/* The towns the site has pages for. Clinton Township is home, so its service
   pages ARE the main service pages; every other town gets a hub plus one page
   per service at /{service}-{town}-mi/, the pattern the old site already used
   (/car-detailing-shelby-township-mi/, /window-tint-clinton-township-mi/).

   The list is the service areas Refresh My Ride names on its own site. */

import { TOWN_SERVICES, type Service } from './services';

export interface City {
  id: string;
  name: string;
  county: 'Macomb' | 'Oakland';
  home?: boolean;
}

export const CITIES: City[] = [
  { id: 'clinton-township', name: 'Clinton Township', county: 'Macomb', home: true },
  { id: 'sterling-heights', name: 'Sterling Heights', county: 'Macomb' },
  { id: 'shelby-township', name: 'Shelby Township', county: 'Macomb' },
  { id: 'macomb-township', name: 'Macomb Township', county: 'Macomb' },
  { id: 'rochester-hills', name: 'Rochester Hills', county: 'Oakland' },
  { id: 'troy', name: 'Troy', county: 'Oakland' },
  { id: 'birmingham', name: 'Birmingham', county: 'Oakland' },
  { id: 'royal-oak', name: 'Royal Oak', county: 'Oakland' },
  { id: 'west-bloomfield', name: 'West Bloomfield', county: 'Oakland' },
];

export const city = (id: string) => CITIES.find((c) => c.id === id)!;

export const hubPath = (c: City) => `/service-areas/${c.id}/`;

/** The page for one service in one town. Home town points at the main service page. */
export function townPath(s: Service, c: City): string {
  if (c.home) return s.path;
  return `/${s.townSlug}-${c.id}-mi/`;
}

/** Every service and town pair that gets its own page. */
export const TOWN_PAGES = CITIES.filter((c) => !c.home).flatMap((c) =>
  TOWN_SERVICES.map((s) => ({ service: s, city: c, slug: `${s.townSlug}-${c.id}-mi`, key: `${s.id}--${c.id}` })),
);
