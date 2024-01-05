const withMDX = require('@next/mdx')();
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader-noop.js',
  },
};

module.exports = withMDX(withNextIntl(nextConfig));
