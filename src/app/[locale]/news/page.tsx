import format from 'date-fns/format';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/news.jpg';
import lineImage from '@/assets/lines-1.png';
import { AccentImage } from '@/components/AccentImage';
import { Header } from '@/components/Header';
import CmsRichText from '@/helpers/CmsRichText';
import { getDateLocale, PropsWithLocale } from '@/helpers/localization';
import { Link } from '@/helpers/navigation';
import { getNews } from '@/services/cms/news';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'News' });
  return {
    title: t('header.title'),
  };
}

export default async function News({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('News');

  const newsItems = await getNews(locale);

  const dateLocale = getDateLocale(locale);

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <AccentImage variant="top" src={lineImage} />
        <div className="o-section__content">
          <div className="m-news">
            {newsItems.map((newsItem) => (
              <div key={newsItem.slug} className="m-news__item">
                <h2 id={newsItem.slug} className="m-news__title">
                  <Link href={`#${newsItem.slug}`}>{newsItem.title}</Link>
                </h2>
                <small className="m-news__date">
                  {format(newsItem.creationDate, 'PPP', { locale: dateLocale })}
                </small>
                <CmsRichText dirtyHtml={newsItem.text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
