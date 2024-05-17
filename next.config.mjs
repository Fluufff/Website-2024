import { fileURLToPath } from 'url';

import nextMDX from '@next/mdx';
import jiti from 'jiti';
import nextIntl from 'next-intl/plugin';
import remarkHeadingId from 'remark-heading-id';

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkHeadingId],
  },
});
const withNextIntl = nextIntl();

const jitiRequire = jiti(fileURLToPath(import.meta.url));

// important: we load this so that validation errors are raised at build time
const { env } = jitiRequire('./src/env.ts');

// we also do a little check against a common issue
if (env.APP_ENV !== 'development' && !env.METADATA_BASE) {
  console.warn(
    'Warning: Environment variable METADATA_BASE must be set for Open Graph image URLs to be correct.',
  );
}

const isProd = process.env.NODE_ENV === 'production';

/** Webpack rule alllowing to bundle a file as-is by importing it with suffix
 * `?raw`.
 *
 * @example
 * import path from '@/app/foo.txt?raw';
 * // or
 * const path = require('@/app/foo.txt?raw');
 *
 * <a href={path}>magnificent text file</a>
 */
const rawAssetWebpackRule = {
  resourceQuery: /raw/,
  type: 'asset/resource',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: env.STANDALONE_OUTPUT ? 'standalone' : undefined,
  assetPrefix: isProd ? env.NEXT_PUBLIC_ASSET_PREFIX || undefined : undefined,

  webpack: (config) => {
    config.module.rules.push(rawAssetWebpackRule);

    return config;
  },
};

export default withMDX(withNextIntl(nextConfig));
