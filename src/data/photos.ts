/* The photo library. Every image is Refresh My Ride's own work, from their
   media library. `alt` says what is in the frame; `caption` is what may be
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
  'josh-polishing-corvette': { alt: 'Josh machine polishing the rear of a black Corvette inside the shop', caption: 'Josh polishing a Corvette in the shop' },
  'team-polishing-mercury': { alt: 'Two Refresh My Ride technicians machine polishing the trunk of a classic black Mercury', caption: 'Two technicians, one classic Mercury' },
  'tech-polishing-mustang': { alt: 'Technician polishing the striped hood of a Shelby Mustang', caption: 'Polishing a Shelby hood' },
  'josh-portrait': { alt: 'Josh Meller, owner of Refresh My Ride, standing beside a black coupe outside the shop', caption: 'Josh Meller, owner' },
  // the shop
  'shop-interior': { alt: 'Inside the Refresh My Ride shop with a gray Corvette parked in the bay', caption: 'Inside the Louise Ave shop' },
  'shop-grand-opening': { alt: 'The Refresh My Ride shop front with a grand opening banner, purple balloons and a gray Corvette', caption: 'The Louise Ave shop, dressed for the grand opening' },
  'corvette-purple-shop': { alt: 'Purple Corvette parked in front of the shop bay doors', caption: 'Corvette, ceramic coated' },
  // finished vehicles
  'bmw-x6-blue': { alt: 'Dark blue BMW X6 with a deep gloss finish', caption: 'BMW X6' },
  'silverado-black': { alt: 'Black Chevrolet Silverado HD gleaming after an exterior detail', caption: 'Chevrolet Silverado' },
  'bentley-flying-spur': { alt: 'Dark blue Bentley Flying Spur with a mirror finish', caption: 'Bentley Flying Spur' },
  'ferrari-roma': { alt: 'White Ferrari Roma in a driveway after ceramic coating', caption: 'Ferrari Roma, ceramic coated' },
  'porsche-suv-blue': { alt: 'Blue Porsche SUV in front of the shop after ceramic coating', caption: 'Porsche, ceramic coated' },
  'corvette-gray': { alt: 'Gray Corvette Stingray with dark tinted windows', caption: 'Corvette Stingray' },
  'tesla-model-y': { alt: 'Gray Tesla Model Y outside the shop door', caption: 'Tesla Model Y' },
  'gmc-truck-white': { alt: 'White GMC pickup after a detail', caption: 'GMC pickup' },
  'cadillac-sedan-black': { alt: 'Black Cadillac sedan after a detail', caption: 'Cadillac sedan' },
  'chevy-suv-black': { alt: 'Black Chevrolet SUV after a detail', caption: 'Chevrolet SUV' },
  'bmw-sedan-white': { alt: 'White BMW sedan after an exterior detail', caption: 'BMW sedan' },
  'bmw-7-series': { alt: 'Dark gray BMW 7 Series parked outside the shop', caption: 'BMW 7 Series' },
  'ram-truck-white': { alt: 'White Ram pickup after a detail', caption: 'Ram pickup' },
  'escalade-black': { alt: 'Black Cadillac Escalade after a detail', caption: 'Cadillac Escalade' },
  'jeep-grand-cherokee': { alt: 'Dark Jeep Grand Cherokee after a detail', caption: 'Jeep Grand Cherokee' },
  'ford-super-duty-white': { alt: 'White Ford Super Duty pickup with black wheels after a detail', caption: 'Ford Super Duty' },
  cybertruck: { alt: 'Black Tesla Cybertruck after a detail', caption: 'Tesla Cybertruck' },
  'porsche-wheel': { alt: 'Clean Porsche wheel and tire after a wheel deep clean', caption: 'Wheels and tires, deep cleaned' },
  // mobile and valet
  'mobile-van': { alt: 'The white Refresh My Ride mobile detailing van parked at a customer’s home', caption: 'The mobile van' },
  'mobile-bmw-driveway': { alt: 'BMW X6 being detailed in a customer’s driveway', caption: 'A mobile detail at a customer’s home' },
  'accord-trunk-kit': { alt: 'The trunk of a Honda Accord packed with detailing equipment', caption: 'Where it started: a full kit in one trunk' },
  // interiors
  'interior-alfa-red': { alt: 'Detailed Alfa Romeo interior with red leather seats', caption: 'Alfa Romeo interior' },
  'interior-shelby': { alt: 'Detailed Shelby Mustang interior with suede steering wheel', caption: 'Shelby interior' },
  'interior-convertible': { alt: 'Detailed convertible interior with black and red leather', caption: 'Convertible interior' },
  'interior-bmw': { alt: 'Detailed BMW interior with protective covers on the wheel and floor', caption: 'BMW interior, finished and covered' },
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
  // tint shade preview (an illustration, not a customer car)
  'tint-05': { alt: 'Illustration of a sedan with 5% window tint', caption: '5%' },
  'tint-20': { alt: 'Illustration of a sedan with 20% window tint', caption: '20%' },
  'tint-35': { alt: 'Illustration of a sedan with 35% window tint', caption: '35%' },
  'tint-50': { alt: 'Illustration of a sedan with 50% window tint', caption: '50%' },
  'tint-75': { alt: 'Illustration of a sedan with 75% window tint', caption: '75%' },
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
  corvette: { before: 'ba-corvette-before', after: 'ba-corvette-after', title: '2019 Corvette Z06', note: 'Years of wash marks removed in a few hours, with a 5 year ceramic coating on top.' },
  seat: { before: 'ba-seat-before', after: 'ba-seat-after', title: 'Same seat, one appointment', note: 'What hot water extraction and steam pull out of a seat that was neglected for years.' },
} as const;

export type PairId = keyof typeof PAIRS;
