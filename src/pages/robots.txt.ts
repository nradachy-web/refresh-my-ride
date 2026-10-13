import type { APIRoute } from 'astro';

/* A preview build tells every crawler to stay out. Production lets them in. */
export const GET: APIRoute = () => {
  const preview = import.meta.env.BASE_URL !== '/';
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://refreshmyrideauto.com/sitemap.xml\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
