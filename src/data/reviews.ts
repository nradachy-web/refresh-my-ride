/* Google reviews, as Refresh My Ride quotes them on its own site or as the
   Google Business Profile returned them on 2026-10-13. Text is the customer's
   own, typos included. Two edits only: a long review may be cut at a sentence
   end (marked excerpt), and one dash was swapped for a comma.

   Names are first name and last initial, the way their site shows them.
   `job` and `town` are the labels their site put on the review. */

import type { Service } from './services';

export interface Review {
  id: string;
  name: string;
  text: string;
  excerpt?: boolean;
  job?: string;
  town?: string;
  services: Service['id'][];
}

export const REVIEWS: Review[] = [
  {
    id: 'tom-k',
    name: 'Tom K.',
    text: 'I took my 2021 Ram 1500 to Refresh my ride for a complete detail including a 3 year ceramic coating. Josh and Ben did an amazing job. The truck looks like it did 5 years ago when I drove it off the lot. As the company name says, my ride is refreshed.',
    excerpt: true,
    job: '2021 Ram 1500, 3 year ceramic coating',
    services: ['ceramic-coating', 'car-detailing'],
  },
  {
    id: 'judy-j',
    name: 'Judy J.',
    text: 'My Corvette looks great, beautiful and shiny, had 3 year ceramic coating done. This company was easy to deal with and responsive. Finished in one day. Price was reasonable.',
    job: 'Corvette, 3 year ceramic coating',
    services: ['ceramic-coating'],
  },
  {
    id: 'john-b',
    name: 'John B.',
    text: 'Refresh My Ride did a great job with my Yukon. After six years of regular car washes and me vacuuming it out, it was time for some extra attention and I now love my car again. They cleaned everything. I appreciate that they came to my house to pick up and return the car, so there was no real impact on my day. The ceramic coating looks great. Thank you!',
    job: '2019 GMC Yukon Denali, ceramic coating',
    services: ['ceramic-coating', 'mobile-detailing', 'car-detailing'],
  },
  {
    id: 'scott-w',
    name: 'Scott W.',
    text: 'Josh and the team did an amazing job on my Silverado. It looks better than the day I bought it. Amazing young men working hard and taking pride in their work. Thank you guys.',
    job: '2026 Silverado 1500, ceramic coating',
    services: ['ceramic-coating'],
  },
  {
    id: 'norman-r',
    name: 'Norman R.',
    text: 'My car looks very good, the ceramic coating made a big difference to it. Josh and his team did a great job.',
    job: '2022 BMW 740i, 2 step paint correction and ceramic coating',
    services: ['ceramic-coating', 'paint-correction'],
  },
  {
    id: 'don-p',
    name: 'Don P.',
    text: 'Josh did a great job on my Silverado. He did an exterior detailing & ceramic coating. He was promt & professional. Will use him again in the future.',
    job: '2026 Silverado 1500, paint correction and coating',
    services: ['ceramic-coating', 'paint-correction'],
  },
  {
    id: 'jake-m',
    name: 'Jake M.',
    text: 'These guys did an amazing job with my car, tint is perfect and the paint, it looks better than it would have in the showroom. 100% recommend this shop and the people who work on the car great job. Exceeded my expectations by leaps and bounds',
    services: ['window-tint', 'paint-correction'],
  },
  {
    id: 'karen-u',
    name: 'Karen U.',
    text: 'I had the exterior of my car detailed yesterday and I needed special attention done to the wax left behind from having the car undercoated 2 years ago. Let me tell you, Josh and Matt did not disappoint! I was elated when they showed me my car upon completion!',
    excerpt: true,
    services: ['car-detailing', 'paint-correction'],
  },
  {
    id: 'caitlin-d',
    name: 'Caitlin D.',
    text: 'Cannot wait to be a repeat customer, but truthfully won’t even need to be back for quite some time because of how thorough and well done my detailing was. I do not believe my car was even this clean when I picked it up from the dealership. Every person I worked with was kind, accommodating, and informative.',
    excerpt: true,
    services: ['car-detailing'],
  },
  {
    id: 'angie-l',
    name: 'Angie L.',
    text: 'Wow is all I can say they took the time to clean everything so well. I mentioned that there was a streak in my window. He sent somebody out to redo my windows and make it right. We’ll definitely use them again.',
    services: ['car-detailing'],
  },
  {
    id: 'sydney-k',
    name: 'Sydney K.',
    text: 'Refresh My Ride did an amazing job detailing the inside of my car! Every surface was spotless, every crevice was cleaned, and the whole interior looked and smelled like new. I was seriously impressed by how thorough and careful they were, they didn’t miss a thing. You can tell they take pride in their work and truly care about the final result.',
    excerpt: true,
    job: 'Signature Refresh, mobile',
    town: 'Rochester Hills',
    services: ['car-detailing', 'mobile-detailing'],
  },
  {
    id: 'alexis-p',
    name: 'Alexis P.',
    text: 'This is my second time returning to them for a detail of my very toddler + dog friendly suv - it came back looking brand new both times. Very happy & will continue to use their services!! They even came and picked my car up/dropped it back off to my house. Top notch service! Very happy with service',
    job: 'Full detail, Chevrolet Equinox',
    town: 'Macomb Township',
    services: ['car-detailing', 'mobile-detailing'],
  },
  {
    id: 'chris-d',
    name: 'Chris D.',
    text: 'From start to finish, Refesh My Ride was perfect. Great price, great communication, and great service/finished product. Matt Bodo was out detailer, and I certainly will ask for him again. Could not be more happy with how the project went.',
    job: 'Wash & Seal',
    town: 'Clinton Township',
    services: ['car-detailing'],
  },
  {
    id: 'april-g',
    name: 'April G.',
    text: 'Ashton was great! He was able to remove the smell in my car he was very detailed with cleaning too and the carpet was great even if i have a lighter carpet he was able to make them very clean! Please please book them! They do great with their business!!',
    excerpt: true,
    job: 'Executive Interior Detail',
    town: 'Sterling Heights',
    services: ['car-detailing'],
  },
  {
    id: 'sabrina-k',
    name: 'Sabrina K.',
    text: 'Had them come out to do a full clean inside and outside ceramic coating and buff a couple scratches. My car looks beautiful! Anthony worked so hard on my car and she just looks so pretty! Appreciate it so much!',
    job: 'Luxury Refresh',
    town: 'Shelby Township',
    // Describes a call-out that included coating and scratch buffing, which is shop work today.
    // Keep it to detailing pages so it never sits beside a "shop only" line.
    services: ['car-detailing'],
  },
  {
    id: 'fahad-a',
    name: 'Fahad A.',
    text: 'Josh is a great guy and takes care of all my vehicles on a great monthly plan. All my cars after his detailing are as good as new, will recommend him to anyone looking for a professional detail cleaning job.',
    job: 'Maintenance plan',
    town: 'Troy',
    services: ['car-detailing'],
  },
  {
    id: 'matt-h',
    name: 'Matt H.',
    text: 'Great service from start to finish. Communication was excellent and the cost was fair. The detail in their detailing service is second to none. Definitely will be using them again.',
    services: ['car-detailing'],
  },
];

export const review = (id: string) => REVIEWS.find((r) => r.id === id);

/** Reviews for a service, town matches first. */
export function reviewsFor(serviceId: Service['id'], town?: string, limit = 3): Review[] {
  const pool = REVIEWS.filter((r) => r.services.includes(serviceId));
  const local = town ? pool.filter((r) => r.town === town) : [];
  const rest = pool.filter((r) => !local.includes(r));
  return [...local, ...rest].slice(0, limit);
}
