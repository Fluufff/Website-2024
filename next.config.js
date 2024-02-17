/* eslint-disable import/order */
const withMDX = require('@next/mdx')();
const withNextIntl = require('next-intl/plugin')();

const jiti = require('jiti')(__filename);

// important: we load this so that validation errors are raised at build time
const { env } = jiti('./src/env.ts');

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

  webpack: (config) => {
    config.module.rules.push(rawAssetWebpackRule);

    return config;
  },
};

module.exports = withMDX(withNextIntl(nextConfig));
