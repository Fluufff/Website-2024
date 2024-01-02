import classNames from 'classnames';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import headerImage from '@/assets/headers/hotel.jpg';
import ScrollLink from '@/helpers/ScrollLink';
import { PropsWithLocale } from '@/helpers/localization';
import { Link } from '@/helpers/navigation';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Hotel' });
  return {
    title: t('header.title'),
  };
}

export default async function HotelPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Hotel');
  const tButtons = await getTranslations('2022_msg.general.buttons');

  return (
    <>
      <div
        className="o-header"
        style={{ backgroundImage: `url(${headerImage.src})` }}>
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.subtitle')}</p>
        </div>
      </div>

      <RowSection>
        <div className="u-col-sm-5">
          <img src="hotelImage" alt="hotel image" />
        </div>
        <div className="u-col-sm-7">
          <h3>{t('hotel.title')}</h3>
          <p>{t('hotel.description.p0')}</p>
          <p>{t('hotel.description.p1')}</p>
          <p>{t('hotel.description.p2')}</p>
          <p>{t('hotel.description.p3')}</p>
          <div className="m-button-group">
            <Link href="/venue/getting-there" className="a-button">
              {tButtons('getting_there')}
            </Link>
            <ScrollLink
              to="restaurant"
              className="a-button a-button--secondary"
              smooth={true}>
              {tButtons('the_restaurant')}
            </ScrollLink>
            <Link href="/venue/rooms" className="a-button a-button--secondary">
              {tButtons('hotel_rooms')}
            </Link>
          </div>
        </div>
      </RowSection>

      <RowSection alt>
        <div className="u-col-sm-6" id="restaurant">
          <img src="restaurantImage" alt="restaurant image" />
          <h4>{t('restaurant.title')}</h4>
          <p>{t('restaurant.description.p0')}</p>
          <p>{t('restaurant.description.p1')}</p>
          <p>
            {t.rich('restaurant.description.p2', {
              a: (chunks) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={t('restaurant.menu_href')}>
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
        <div className="u-col-sm-6">
          <img src="brusselsImage" alt="image of brussels" />
          <h4>{t('surroundings.title')}</h4>
          <p>{t('surroundings.description')}</p>
          <ul>
            <li>{t('surroundings.food.kebab')}</li>
            <li>{t('surroundings.food.pasta')}</li>
            <li>{t('surroundings.food.vietnamese')}</li>
            <li>{t('surroundings.food.mcdonalds')}</li>
          </ul>
        </div>
      </RowSection>
    </>
  );
}

function RowSection({
  alt,
  children,
}: React.PropsWithChildren<{ alt?: boolean }>) {
  return (
    <div className={classNames('o-section', { 'o-section--alt': alt })}>
      <div className="o-section__content">
        <div className="u-row">{children}</div>
      </div>
    </div>
  );
}
