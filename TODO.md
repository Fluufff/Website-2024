Incoherent bits and bobs:

- fonts: font-face definitions refer to assets that do not exist, commented out
- 3d background fallback image not imported yet
- bits of leftover boilerplate:
  - metadata
  - readme (settle on one package manager)

Work in progress -- timetable:

- Test with client and server in different timezones. The "current time" line shouldn't be done server-side.

Work in progress -- I18n:

- Settle on file format, keys (TMS?).
- I18n on meta
- I18n on html lang

Work in progress -- homepage:

- there is a bunch of unused "loading" CSS
- images are very heavy! one of them is 6 megs
- 3d:
  - static 3d image missing for now. In the previous edition's website, it contained the sky and the scene.

Work in progress -- fonts:

- Figure out what other fonts we might use (do we even use Broken at all?).

Layout:

- Page shell (header, header image, section?, footer) as a separate shared component.
- Menu from header as a client component (active route).

General:

- Figure out client-side vs. server-side language?
- Replace background-image with object-fit on Image tag, for optimization.
- Vendored draco loader is apache 2 licensed
  - I looked on npm, but the wasm wrapper doesn't seem to be part of the draco3d package.
  - Loading directly from the CDN is not something we want
  - Create license file. I grabbed the two files from https://github.com/google/draco/tree/1.5.6
- Add a humans.txt!


Unit testing:

- The timetable would be nice. If we format times and dates client-side, we
  should make sure we use con-local time.
  - Strong conventions around UTC and formatting needed. "2023-01-01T00:00Z" or
    the same without the Z doesn't parse the same way.
  - Intentionality on the "now" bar in the schedule. Most useful on-site, so
    maybe we can assume the user is in the local timezone. But if someone is
    checking the site from abroad to see what their friend is up to, perhaps we
    should consider making it zone-aware. `date-fns-tz` has everything we need.
