/* The photo library. Every image is Refresh My Ride's own work, from their
   media library or sent by Josh. `alt` says what is in the frame; `caption` is what may be
   printed under it. A vehicle is only named when their own site named it or the
   badge is plain in the photo.

   Add a photo: put the original in _source/media, add it to scripts/photos.py,
   run `npm run photos`, then describe it here. */

import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,png}', { eager: true });

const byId: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) {
  byId[path.split('/').pop()!.replace(/\.(jpg|png)$/, '')] = mod.default;
}

export const PHOTOS = {
  // people at work
  'josh-polishing-corvette': { alt: 'A Refresh My Ride technician machine polishing the rear of a black Corvette inside the shop', caption: 'Polishing a Corvette in the shop' },
  'team-polishing-mercury': { alt: 'Two Refresh My Ride technicians machine polishing the trunk of a classic black Mercury', caption: 'Two technicians, one classic Mercury' },
  'tech-polishing-mustang': { alt: 'Technician machine polishing the striped hood of a Mustang', caption: 'Polishing a Mustang hood' },
  'josh-portrait': { alt: 'Josh Meller, owner of Refresh My Ride, standing beside a black coupe outside the shop', caption: 'Josh Meller, owner' },
  // the shop
  'shop-interior': { alt: 'Inside the Refresh My Ride shop with a gray Corvette parked in the bay', caption: 'Inside the Louise Ave shop' },
  'shop-grand-opening': { alt: 'The Refresh My Ride shop front with a grand opening banner, purple balloons and a gray Corvette', caption: 'The Louise Ave shop front' },
  'corvette-purple-shop': { alt: 'Purple Corvette parked in front of the shop bay doors', caption: 'Corvette' },
  // finished vehicles
  'bmw-x6-blue': { alt: 'Dark blue BMW SUV with a deep gloss finish', caption: 'BMW' },
  'silverado-black': { alt: 'Black Chevrolet Silverado pickup with a deep gloss finish', caption: 'Chevrolet Silverado' },
  'bentley-flying-spur': { alt: 'Dark Bentley sedan with a mirror finish', caption: 'Bentley sedan' },
  'ferrari-roma': { alt: 'White Ferrari Roma in a driveway after ceramic coating', caption: 'Ferrari Roma, ceramic coated' },
  'porsche-suv-blue': { alt: 'Blue Porsche SUV in front of the shop bay doors', caption: 'Porsche, ceramic coated' },
  'corvette-gray': { alt: 'Gray Corvette parked outside', caption: 'Corvette' },
  'tesla-model-y': { alt: 'Gray Tesla Model Y outside the shop door', caption: 'Tesla Model Y' },
  'gmc-truck-white': { alt: 'White GMC pickup parked outside', caption: 'GMC pickup' },
  'cadillac-sedan-black': { alt: 'Black Cadillac sedan outside the shop', caption: 'Cadillac sedan' },
  'chevy-suv-black': { alt: 'Black Chevrolet SUV outside the shop', caption: 'Chevrolet SUV' },
  'bmw-sedan-white': { alt: 'White BMW sedan parked outside', caption: 'BMW sedan' },
  'bmw-7-series': { alt: 'Dark gray BMW sedan parked outside the shop', caption: 'BMW sedan' },
  'ram-truck-white': { alt: 'White Ram pickup outside the shop', caption: 'Ram pickup' },
  'escalade-black': { alt: 'Black Cadillac SUV parked outside', caption: 'Cadillac SUV' },
  'jeep-grand-cherokee': { alt: 'Dark Jeep SUV parked outside', caption: 'Jeep' },
  'ford-super-duty-white': { alt: 'White Ford pickup with black wheels', caption: 'Ford pickup' },
  cybertruck: { alt: 'Black Tesla Cybertruck parked outside', caption: 'Tesla Cybertruck' },
  'porsche-wheel': { alt: 'Clean Porsche wheel and tire', caption: 'Wheels and tires' },
  // sent by Josh on 2026-10-14
  'corvette-black-front': { alt: 'Black mid-engine Corvette with black wheels parked outside', caption: 'Corvette' },
  'corvette-black-rear': { alt: 'Rear three quarter view of a black mid-engine Corvette with yellow brake calipers', caption: 'Corvette' },
  'corvette-gray-garage': { alt: 'Gray mid-engine Corvette parked on a speckled garage floor', caption: 'Corvette' },
  'cadillac-sedan-orange': { alt: 'Orange Cadillac sedan with dark wheels parked in the sun', caption: 'Cadillac sedan' },
  'hummer-pickup': { alt: 'Blue gray GMC Hummer pickup parked outside the shop', caption: 'GMC Hummer' },
  'jeep-black': { alt: 'Black four door Jeep on all terrain tires under a blue sky', caption: 'Jeep' },
  'jeep-rubicon-white': { alt: 'White four door Jeep Rubicon with a front winch, freshly washed', caption: 'Jeep Rubicon' },
  'mustang-black-bay': { alt: 'Black Ford Mustang parked in a bright white bay inside the shop', caption: 'Mustang, inside the shop' },
  'mustang-foam-wash': { alt: 'A Refresh My Ride technician foam washing a black Mustang', caption: 'Foam wash on a Mustang' },
  'interior-jeep-red': { alt: 'Clean Jeep interior with red leather seats, seen through the open driver door', caption: 'Jeep interior' },
  'interior-bentley-red': { alt: 'Detailed Bentley interior with a suede steering wheel, red leather trim and a quilted floor mat, seen through the open door in the shop', caption: 'Bentley interior' },
  'tech-polishing-white-car': { alt: 'A Refresh My Ride technician in a branded shirt machine polishing a white car', caption: 'On the job' },
  // mobile and valet
  'mobile-van': { alt: 'The white Refresh My Ride mobile detailing van at a customer’s home, beside a sign reading Auto detailing in progress', caption: 'The mobile van' },
  'mobile-bmw-driveway': { alt: 'BMW being detailed in a customer’s driveway, doors open', caption: 'A mobile detail at a customer’s home' },
  'accord-trunk-kit': { alt: 'The trunk of a Honda Accord packed with detailing equipment', caption: 'Where it started: a full kit in one trunk' },
  // interiors
  'interior-alfa-red': { alt: 'Detailed Alfa Romeo interior with red leather seats', caption: 'Alfa Romeo interior' },
  'interior-shelby': { alt: 'Detailed Shelby interior with a suede steering wheel', caption: 'Shelby interior' },
  'interior-convertible': { alt: 'Detailed convertible interior with black and red leather', caption: 'Convertible interior' },
  'interior-bmw': { alt: 'Detailed BMW interior with a protective cover on the steering wheel', caption: 'BMW interior, finished and covered' },
  'interior-ford': { alt: 'Clean Ford interior after an interior detail', caption: 'Interior detail' },
  // before and after pairs
  'ba-silverado-before': { alt: 'Chevrolet Silverado hood before paint correction, dull with water spots', caption: 'Before' },
  'ba-silverado-after': { alt: 'The same Silverado hood after paint correction and ceramic coating, reflecting the sky', caption: 'After' },
  'ba-miata-before': { alt: 'Mazda Miata bumper before paint correction, heavily oxidized', caption: 'Before' },
  'ba-miata-after': { alt: 'The same Miata after a two step paint correction and ceramic coating', caption: 'After' },
  'ba-corvette-before': { alt: 'Corvette paint under an inspection light before correction, showing swirl marks', caption: 'Before' },
  'ba-corvette-after': { alt: 'The same Corvette paint under an inspection light after correction and coating', caption: 'After' },
  'ba-seat-before': { alt: 'Stained cloth rear seat before an interior detail', caption: 'Before' },
  'ba-seat-after': { alt: 'The same rear seat after extraction and steam cleaning', caption: 'After' },
} as const;

export type PhotoId = keyof typeof PHOTOS;

export const PHOTO_IDS = Object.keys(PHOTOS) as PhotoId[];

export function photo(id: PhotoId) {
  const src = byId[id];
  if (!src) throw new Error(`Photo "${id}" has no file in src/assets/photos`);
  return { id, src, ...PHOTOS[id] };
}

/** The before and after pairs, with the captions their own site gave them. */
export const PAIRS = {
  silverado: { before: 'ba-silverado-before', after: 'ba-silverado-after', title: '2021 Chevy Silverado 2500HD', note: 'Heavy oxidation and water spots polished out, then a 5 year ceramic coating on top.' },
  miata: { before: 'ba-miata-before', after: 'ba-miata-after', title: '1990 Mazda Miata', note: 'A severely oxidized bumper and hood took a two step paint correction, then a 3 year ceramic coating.' },
  corvette: { before: 'ba-corvette-before', after: 'ba-corvette-after', title: '2019 Corvette Z06', note: 'Years of abuse removed in a few hours, with a 5 year ceramic coating on top for maximum protection.' },
  seat: { before: 'ba-seat-before', after: 'ba-seat-after', title: 'Same seat, one appointment', note: 'What hot water extraction and steam pull out of a seat that was neglected for years.' },
} as const;

export type PairId = keyof typeof PAIRS;
