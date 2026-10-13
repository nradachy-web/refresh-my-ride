/* ============================================================================
   CONTENT SHAPES

   Page copy lives in JSON under src/content. Every file is checked against the
   shapes below, at build time (src/content.config.ts) and on demand
   (`node scripts/check-content.mjs <file>`), so a page cannot ship with a field
   missing, a photo that does not exist or a review nobody wrote.

   Inline markup allowed inside any text field: **bold** and [label](/path/).
   No em or en dashes anywhere.

   services/<service-id>.json                 the five service pages
   towns/<service-id>--<city-id>.json         one service in one town
   cities/<city-id>.json                      the town hubs
   ========================================================================== */

/**
 * @param {typeof import('astro/zod').z} z
 * @param {{ photos: string[], pairs: string[], reviews: string[], services: string[], cities: string[] }} ids
 */
export function makeSchemas(z, ids) {
  const noDash = (s) => !/[–—]/.test(s);
  const text = (min = 1, max = 2000) => z.string().min(min).max(max).refine(noDash, 'no em or en dashes');

  const photoId = z.enum(ids.photos);
  const pairId = z.enum(ids.pairs);
  const reviewId = z.enum(ids.reviews);
  const serviceId = z.enum(ids.services);
  const cityId = z.enum(ids.cities);
  const plane = z.enum(['paper', 'white', 'ink']).default('paper');

  const meta = z.object({
    /** Browser title. 30 to 62 characters, keyword first, brand last. */
    title: text(30, 62),
    /** Search snippet. 110 to 160 characters. */
    description: text(110, 160),
  });

  const hero = z.object({
    /** The keyword line inside the h1: "Ceramic coating in Troy, MI". */
    kicker: text(10, 90),
    /** The display line. Short. Wrap one phrase in ** for the violet accent. */
    title: text(8, 70),
    lede: text(80, 330),
    chips: z.array(text(3, 40)).min(2).max(4),
    photo: photoId,
  });

  const cta = z.object({ label: text(3, 40), href: z.string().min(1) });
  const faq = z.array(z.object({ q: text(8, 140), a: text(40, 1100) }));

  const headFields = {
    plane,
    eyebrow: text(2, 40).optional(),
    title: text(6, 110),
    intro: text(20, 520).optional(),
  };

  const block = z.discriminatedUnion('type', [
    /** Words beside a photo, with optional ticks. */
    z.object({
      type: z.literal('intro'),
      ...headFields,
      body: z.array(text(20, 900)).max(4).default([]),
      checks: z.array(text(8, 240)).max(7).default([]),
      photo: photoId.optional(),
      flip: z.boolean().default(false),
      cta: cta.optional(),
    }),
    /** A grid of short cards. */
    z.object({
      type: z.literal('cards'),
      ...headFields,
      columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
      items: z.array(z.object({ tag: text(2, 40).optional(), title: text(3, 70), body: text(20, 420) })).min(2).max(8),
    }),
    /** Package tiers side by side. */
    z.object({
      type: z.literal('tiers'),
      ...headFields,
      tiers: z
        .array(
          z.object({
            label: text(2, 40).optional(),
            name: text(3, 50),
            price: text(2, 30).optional(),
            priceNote: text(2, 60).optional(),
            bestFor: text(10, 260).optional(),
            features: z.array(text(4, 160)).min(2).max(8),
            featured: z.boolean().default(false),
          }),
        )
        .min(2)
        .max(4),
      included: z.array(z.object({ title: text(3, 40), body: text(3, 80) })).max(4).default([]),
      footnote: text(10, 520).optional(),
      cta: cta.optional(),
    }),
    /** Price lists, grouped. */
    z.object({
      type: z.literal('prices'),
      ...headFields,
      groups: z
        .array(
          z.object({
            label: text(2, 40).optional(),
            name: text(3, 60),
            blurb: text(10, 260).optional(),
            featured: z.boolean().default(false),
            rows: z.array(z.object({ name: text(2, 60), price: text(2, 40), time: text(2, 40).optional(), body: text(10, 320).optional(), tag: text(2, 30).optional() })).min(1).max(6),
            points: z.array(text(4, 160)).max(6).default([]),
          }),
        )
        .min(1)
        .max(4),
      footnote: text(10, 700).optional(),
      cta: cta.optional(),
    }),
    /** A small comparison: options across, qualities down. */
    z.object({
      type: z.literal('compare'),
      ...headFields,
      columns: z.array(text(2, 40)).min(2).max(4),
      /** Index of the column that is "what we do". */
      highlight: z.number().int().min(0).max(3).optional(),
      rows: z.array(z.object({ label: text(2, 40), values: z.array(text(1, 90)).min(2).max(4) })).min(2).max(6),
    }),
    /** A numbered process. */
    z.object({
      type: z.literal('steps'),
      ...headFields,
      steps: z.array(z.object({ title: text(3, 60), body: text(20, 360), note: text(2, 40).optional() })).min(3).max(6),
      footnote: text(10, 400).optional(),
    }),
    /** Before and after sliders. */
    z.object({
      type: z.literal('beforeAfter'),
      ...headFields,
      pairs: z.array(pairId).min(1).max(3),
      checks: z.array(text(8, 200)).max(5).default([]),
    }),
    /** Finished work, with captions. */
    z.object({
      type: z.literal('gallery'),
      ...headFields,
      photos: z.array(photoId).min(3).max(8),
    }),
    /** Google reviews by id (see src/data/reviews.ts). */
    z.object({
      type: z.literal('reviews'),
      ...headFields,
      ids: z.array(reviewId).min(2).max(6),
    }),
    /** Tint shade preview. */
    z.object({
      type: z.literal('shades'),
      ...headFields,
      shades: z.array(z.object({ pct: z.enum(['05', '20', '35', '50', '75']), label: text(2, 20), name: text(3, 40), body: text(10, 200), privacy: text(2, 20), seeingOut: text(2, 20) })).length(5),
      note: text(20, 400),
    }),
    /** Shop, mobile or valet. Shared wording, no fields beyond the heading. */
    z.object({ type: z.literal('ways'), ...headFields }),
    /** The towns, as links. */
    z.object({ type: z.literal('areas'), ...headFields }),
    /** Questions (the page's main FAQ uses the top-level `faq` field instead). */
    z.object({ type: z.literal('faq'), ...headFields, items: faq.min(2).max(12) }),
  ]);

  const services = z.object({
      service: serviceId,
      meta,
      hero,
      blocks: z.array(block).min(3).max(12),
      faq: faq.min(4).max(12),
      faqIntro: text(10, 240).optional(),
      quote: z.object({ title: text(10, 90), lede: text(40, 320) }).optional(),
      /** The short version of what this service is and costs, reused on every town page. */
      summary: z.object({
        title: text(10, 90),
        intro: text(40, 420),
        items: z.array(z.object({ name: text(2, 60), detail: text(8, 200), price: text(2, 40).optional() })).min(2).max(6),
        footnote: text(10, 420).optional(),
      }),
    });

  const towns = z.object({
      service: serviceId,
      city: cityId,
      meta,
      hero,
      /** Why this service matters in this town. Grounded in docs/research/<city>.md. */
      local: z.object({
        eyebrow: text(2, 40).optional(),
        title: text(10, 110),
        intro: text(60, 520),
        points: z.array(z.object({ title: text(4, 70), body: text(40, 380) })).min(3).max(5),
      }),
      /** How a customer from this town actually gets it done: the drive, mobile, valet. */
      logistics: z.object({
        title: text(10, 110),
        body: z.array(text(40, 600)).min(1).max(3),
        facts: z.array(z.object({ label: text(2, 40), value: text(2, 90) })).min(2).max(4),
      }),
      photo: photoId,
      faq: faq.min(3).max(5),
      reviews: z.array(reviewId).min(2).max(3),
    });

  const cities = z.object({
      city: cityId,
      meta,
      hero,
      about: z.object({
        eyebrow: text(2, 40).optional(),
        title: text(10, 110),
        body: z.array(text(40, 700)).min(1).max(3),
        points: z.array(z.object({ title: text(4, 70), body: text(40, 380) })).min(3).max(5),
        photo: photoId,
      }),
      logistics: z.object({
        title: text(10, 110),
        body: z.array(text(40, 600)).min(1).max(3),
        facts: z.array(z.object({ label: text(2, 40), value: text(2, 90) })).min(2).max(4),
      }),
      faq: faq.min(3).max(6),
      reviews: z.array(reviewId).min(2).max(3),
      /** Nearby towns to link to, by id. */
      neighbors: z.array(cityId).min(2).max(4),
    });

  return { block, services, towns, cities };
}
