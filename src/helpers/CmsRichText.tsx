import {
  convertHtmlToReact,
  convertNodeToReactElement,
} from '@hedgedoc/html-to-react';
import { isTag } from 'domhandler';
import React from 'react';
import { useMemo } from 'react';
import sanitize from 'sanitize-html';

import { Link } from '@/helpers/navigation';

/** Processes an unsanitized HTML string into a React tree, with node
 * replacement.
 *
 * - `a` tags are processed into `next-intl/link` Link elements to enable SPA
 *   routing. Preserves children, and attributes href/target. Because we use
 *   `next-intl/link`, links that omit the locale prefix point to the locale
 *   currently in use.
 *
 * Compatible with SSR.
 */
export default function CmsRichText({
  dirtyHtml,
}: {
  /** Unsanitized HTML from the CMS. */
  dirtyHtml: string;
}): React.ReactNode {
  const sanitizedHtml = useMemo(
    () => sanitize(dirtyHtml, sanitizeOptions),
    [dirtyHtml],
  );

  return convertHtmlToReact(sanitizedHtml, {
    transform(node, index) {
      if (isTag(node) && node.name === 'a') {
        const { href, rel, target } = node.attribs;
        return (
          <Link key={index} {...{ href, rel, target }}>
            {node.children.map((child, index) =>
              convertNodeToReactElement(child, index),
            )}
          </Link>
        );
      }
    },
  });
}

const sanitizeOptions: sanitize.IOptions = {
  allowedAttributes: {
    a: sanitize.defaults.allowedAttributes.a.concat(['rel']),
  },
  transformTags: {
    // Avoid pitfalls by forcing noreferrer for all links, assuming we accept
    // this strictness on internal links.
    a: sanitize.simpleTransform('a', { rel: 'noreferrer' }),
  },
};
