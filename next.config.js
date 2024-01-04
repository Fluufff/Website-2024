const withMDX = require('@next/mdx')();
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STANDALONE_OUTPUT ? 'standalone' : undefined,
};

module.exports = withMDX(withNextIntl(nextConfig));
