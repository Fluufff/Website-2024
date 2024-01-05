// Image optimization is not supported with the custom loader in static exports.
// In practice, the `next/image` component produces an `img` tag that points to
// a URL that is not part of the static export.
//
// We therefore use this dummy loader that does not optimize images, to point
// those `img` tags to the unoptimized source image, which does exist in the
// static export.

export default function noopLoader({ src }) {
  return src;
}
