import type { APIRoute } from 'astro';
import { BRAND } from '../data/site';

/* Calendar file for the grand opening: Monday October 19, 2026, 10am to 6pm Eastern. */
export const GET: APIRoute = () => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Refresh My Ride//Grand Opening//EN',
    'BEGIN:VEVENT',
    'UID:grand-opening-2026@refreshmyrideauto.com',
    'DTSTAMP:20261013T000000Z',
    'DTSTART:20261019T140000Z',
    'DTEND:20261019T220000Z',
    'SUMMARY:Refresh My Ride grand opening',
    `LOCATION:${BRAND.street}\\, ${BRAND.city}\\, ${BRAND.state} ${BRAND.zip}`,
    'DESCRIPTION:Ribbon cutting at the new 2\\,000 sq ft detailing facility. Free and open to everyone.',
    'URL:https://refreshmyrideauto.com/grandopening/',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Response(lines.join('\r\n') + '\r\n', { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
