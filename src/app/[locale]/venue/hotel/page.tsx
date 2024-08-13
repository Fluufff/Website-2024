import classNames from 'classnames';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import brusselsImage from '@/assets/brussels.jpg';
import headerImage from '@/assets/headers/hotel.jpg';
import hotelImage from '@/assets/hotel-exterior.jpg';
import restaurantImage from '@/assets/hotel-restaurant.jpg';
import lineImage from '@/assets/lines-3.png';
import { Header } from '@/components/Header';
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

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <RowSection withAccent>
        <div className="u-col-sm-5">
          <Image src={hotelImage} alt="hotel" />
        </div>
        <div className="u-col-sm-7">
          <h3>{t('hotel.title')}</h3>
          <p>{t('hotel.description.p0')}</p>
          <p>{t('hotel.description.p1')}</p>
          <p>{t('hotel.description.p2')}</p>
          <p>{t('hotel.description.p3')}</p>
          <div className="m-button-group">
            <Link href="/venue/getting-there" className="a-button">
              {t('hotel.buttons.getting_there')}
            </Link>
            <ScrollLink
              to="restaurant"
              className="a-button a-button--secondary"
              smooth={true}>
              {t('hotel.buttons.the_restaurant')}
            </ScrollLink>
            <Link href="/venue/rooms" className="a-button a-button--secondary">
              {t('hotel.buttons.hotel_rooms')}
            </Link>
          </div>
        </div>
      </RowSection>

      <RowSection alt>
        <div className="u-col-sm-6" id="restaurant">
          <Image src={restaurantImage} alt="restaurant" />
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
          <Image src={brusselsImage} alt="brussels" />
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
  withAccent,
  children,
}: React.PropsWithChildren<{ alt?: boolean; withAccent?: boolean }>) {
  return (
    <div className={classNames('o-section', { 'o-section--alt': alt })}>
      {withAccent && (
        <div className="o-section__accent-image">
          <Image src={lineImage} alt="" />
        </div>
      )}
      <div className="o-section__content">
        <div className="u-row">{children}</div>
      </div>
    </div>
  );
}
