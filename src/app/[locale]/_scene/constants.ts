// The DRACOLoader from three.js generates its own URLs at runtime. This forces
// us to put the files in the `public` assets directory instead of bundling them
// (with content hashes) in webpack. See next.config.js.
export const DRACO_FOLDER = '/draco/';
