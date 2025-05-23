import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/getting-there.jpg';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'GettingThere' });
  return {
    title: t('header.title'),
  };
}

export default async function GettingThere({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('GettingThere');
  const tLabels = await getTranslations('general.labels');

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section">
        <div className="o-section__content">
          <h3>{t('where.title')}</h3>
          <p>Bedford Hotel & Congress Center</p>
          <p>Zuidstraat 135, 1000 Brussel.</p>
          <p>Rue du Midi 135, 1000 Bruxelles.</p>
        </div>
      </div>
      <div className="o-map">
        <iframe
          height="100%"
          width="100%"
          src="https://www.openstreetmap.org/export/embed.html?bbox=4.344781637191773%2C50.84311881428597%2C4.349918067455293%2C50.845278193511966&amp;layer=mapnik&amp;marker=50.84419766957645%2C4.347348511219025"
        />
        <br />
        <small>
          <a href="https://www.openstreetmap.org/#map=19/50.84422/4.34709">
            View Larger Map
          </a>
        </small>
      </div>
      {/* <div ref={mapContainer} className="o-map" /> */}
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <div className="o-travel-method">
            <h3 className="o-travel-method__title">{t('plane.title')}</h3>
            <ol>
              <li>
                {t('plane.take_to_airport')}{' '}
                <a
                  href="https://goo.gl/maps/MP54bVm9ApHrFQMz5"
                  target="_blank"
                  rel="noreferrer">
                  Brussels Airport
                </a>
                .
              </li>
              <li>
                {t('plane.walk_to_station')}{' '}
                <a
                  href="https://goo.gl/maps/HmAERDN5fyXt77jh6"
                  target="_blank"
                  rel="noreferrer">
                  Brussels Airport-Zaventem station
                </a>
                .
              </li>
              <li>
                {t('plane.take_train')}{' '}
                <a
                  href="https://goo.gl/maps/HmAERDN5fyXt77jh6"
                  target="_blank"
                  rel="noreferrer">
                  Brussels Airport-Zaventem
                </a>{' '}
                {tLabels('to')}{' '}
                <a
                  href="https://goo.gl/maps/B6M2t9zzUwfWUeVa9"
                  target="_blank"
                  rel="noreferrer">
                  Brussels Central Station
                </a>
                . {t('plane.train_every_15_minutes')}
              </li>
              <li>
                {t('walk.walk_to_hotel')}{' '}
                <a
                  href="https://g.page/bedfordbrussels?share"
                  target="_blank"
                  rel="noreferrer">
                  Bedford Hotel &amp; Congress Centre
                </a>
                .
                <p>
                  <i className="u-text-light">
                    {t('train.actual_timetables')}{' '}
                    <a
                      href="https://www.belgiantrain.be/en"
                      target="_blank"
                      rel="noreferrer">
                      {t('train.belgian_train_website')}
                    </a>
                    .
                  </i>
                </p>
              </li>
            </ol>
          </div>
          <div className="o-travel-method">
            <h3 className="o-travel-method__title">{t('train.title')}</h3>
            <ol>
              <li>
                {t('train.take_train')}{' '}
                <a
                  href="https://goo.gl/maps/B6M2t9zzUwfWUeVa9"
                  target="_blank"
                  rel="noreferrer">
                  Brussels Central Station
                </a>
                .
              </li>
              <li>
                {t('walk.walk_to_hotel')}{' '}
                <a
                  href="https://g.page/bedfordbrussels?share"
                  target="_blank"
                  rel="noreferrer">
                  Bedford Hotel &amp; Congress Centre
                </a>
                .
                <p>
                  <i className="u-text-light">
                    {t('train.actual_timetables')}{' '}
                    <a
                      href="https://www.belgiantrain.be/en"
                      target="_blank"
                      rel="noreferrer">
                      {t('train.belgian_train_website')}
                    </a>
                    .
                  </i>
                </p>
              </li>
            </ol>
          </div>
          <div className="o-travel-method">
            <h3 className="o-travel-method__title">{t('car.title')}</h3>
            <ol>
              <li>
                {t('car.lez')}{' '}
                <a href="https://lez.brussels" target="_blank" rel="noreferrer">
                  lez.brussels
                </a>
                .
              </li>
              <li>
                {t('car.parking')}
                <p>
                  <i className="u-text-light">{t('car.notice.rules')}</i>
                </p>
                <p className="u-pre-wrap-p">
                  <i className="u-text-light">{t('car.notice.speed_limits')}</i>
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
