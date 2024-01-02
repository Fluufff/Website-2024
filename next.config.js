const withMDX = require('@next/mdx')();
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withMDX(withNextIntl(nextConfig));
