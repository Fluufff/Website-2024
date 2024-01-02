import * as R from 'remeda';

import { fetchCmsSiteData } from '../util';

import { NewsItem, parseNewsItems } from './data';

// TODO: move and assert
const contentType = process.env.CMS_CONTENT_TYPE_NEWS_ITEM!;

/** Fetches and parses the news data for one given language. */
async function getNewsForLanguage(language: string): Promise<NewsItem[]> {
  const queryString = new URLSearchParams({
    lang: language,
    pagesize: '-1',
    contentTypes: contentType,
  });

  const res = await fetchCmsSiteData('content?' + queryString, {
    next: { tags: ['cms', 'cms.news'] },
  });
  return parseNewsItems(await res.json());
}

/** Fetches and parses the schedule data, using English as fallback.
 *
 * The items are returned sorted by creation date, most recent first.
 */
export async function getNews(language: string): Promise<NewsItem[]> {
  const itemLists = await Promise.all(
    R.uniq([language, 'en']).map(getNewsForLanguage),
  );

  return R.pipe(
    itemLists,
    R.flatten(),
    R.uniqBy((item) => item.slug),
    R.sortBy([(item) => item.creationDate, 'desc']),
  );
}
