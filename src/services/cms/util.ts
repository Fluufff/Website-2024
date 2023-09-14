const cmsRoot = process.env.CMS_API_ROOT;
const cmsSite = process.env.CMS_SITE_ID;

export function fetchCmsSiteData(path: string, requestInit?: RequestInit) {
  return fetch(`${cmsRoot}/sites/${cmsSite}/${path}`, requestInit);
}
