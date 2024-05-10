import { env } from '@/env';

// The DRACOLoader from three.js generates its own URLs at runtime. This forces
// us to put the files in the `public` assets directory instead of bundling them
// (with content hashes) in webpack using a raw asset rule (see next.config.js).
//
// We therefore also need to point to the CDN ourselves. If this stops working
// the 3D scene on the home page will not work, so the likelihood of silent
// breakage is low.
export const DRACO_FOLDER = `${env.NEXT_PUBLIC_ASSET_PREFIX ?? ''}/draco/`;
