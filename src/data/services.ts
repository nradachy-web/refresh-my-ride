/* The service registry: names, URLs and the one-line facts that the header,
   cards, hero strip and town pages share. Page copy lives in src/content.

   URLs: the three service pages that already rank keep their exact old
   addresses so nothing breaks at cutover (see docs/URLS.md). */

import type { PhotoId } from './photos';

export interface Service {
  id: 'ceramic-coating' | 'window-tint' | 'car-detailing' | 'paint-correction' | 'paint-protection-film' | 'mobile-detailing';
  name: string;
  /** Lower case, for use mid sentence. */
  noun: string;
  nav: string;
  path: string;
  /** Slug used for the town pages: /{townSlug}-{city}-mi/. Empty when the service has none. */
  townSlug: string;
  photo: PhotoId;
  teaser: string;
  /** The short fact shown under the service name in the hero strip and cards. */
  fact: string;
  /** Where the work happens. */
  where: 'shop' | 'shop or mobile' | 'mobile';
}

export const SERVICES: Service[] = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic coating',
    noun: 'ceramic coating',
    nav: 'Ceramic coating',
    path: '/ceramic-coating/',
    townSlug: 'ceramic-coating',
    photo: 'ferrari-roma',
    teaser: 'The Refresh, The Revival and The Renewal: 1, 3 and 5 year coatings with paint correction included and a written warranty.',
    fact: '1, 3 or 5 years',
    where: 'shop',
  },
  {
    id: 'window-tint',
    name: 'Window tint',
    noun: 'window tint',
    nav: 'Window tint',
    path: '/window-tint-clinton-township-mi/',
    townSlug: 'window-tint',
    photo: 'corvette-gray',
    teaser: 'Geoshield C2 carbon and ceramic film, computer cut for your vehicle and backed by a lifetime warranty.',
    fact: 'From $99.99',
    where: 'shop',
  },
  {
    id: 'car-detailing',
    name: 'Auto detailing',
    noun: 'auto detailing',
    nav: 'Detailing',
    path: '/car-detailing-services-clinton-township-mi/',
    townSlug: 'car-detailing',
    photo: 'interior-bentley-red',
    teaser: 'Interior, exterior and full details with clear package pricing, at the shop, in your driveway or by valet.',
    fact: 'From $139.99',
    where: 'shop or mobile',
  },
  {
    id: 'paint-correction',
    name: 'Paint correction',
    noun: 'paint correction',
    nav: 'Paint correction',
    path: '/paint-correction/',
    townSlug: 'paint-correction',
    photo: 'team-polishing-mercury',
    teaser: 'Swirls, light scratches and oxidation machine polished out, on its own or before a coating.',
    fact: 'From $389.99',
    where: 'shop',
  },
  {
    id: 'paint-protection-film',
    name: 'Paint protection film',
    noun: 'paint protection film',
    nav: 'PPF',
    path: '/paint-protection-film/',
    townSlug: '',
    photo: 'porsche-suv-blue',
    teaser: 'Clear film on the panels that take the rock chips, quoted for exactly the coverage you want.',
    fact: 'Quoted per vehicle',
    where: 'shop',
  },
  {
    id: 'mobile-detailing',
    name: 'Mobile detailing',
    noun: 'mobile detailing',
    nav: 'Mobile and valet',
    path: '/mobile-detailing/',
    townSlug: '',
    photo: 'mobile-van',
    teaser: 'The same detail at your home or workplace, or we pick the vehicle up and bring it back.',
    fact: 'We come to you',
    where: 'mobile',
  },
];

/** The four services that get a page per town. */
export const TOWN_SERVICES = SERVICES.filter((s) => s.townSlug);

export const service = (id: Service['id']) => SERVICES.find((s) => s.id === id)!;
