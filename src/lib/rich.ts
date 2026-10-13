/* Content strings may carry two bits of inline markup and nothing else:
     **bold**            and            [link text](/site/path/)
   Everything else is escaped. Links get the base path, and outside links open
   in a new tab. */

import { href, isExternal } from './paths';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function rich(text: string): string {
  let out = escape(text);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, target: string) => {
    const url = target.replace(/&amp;/g, '&');
    const attrs = isExternal(url) ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${escape(href(url))}"${attrs}>${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

/** Plain text for meta descriptions and schema: markup stripped. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
}
