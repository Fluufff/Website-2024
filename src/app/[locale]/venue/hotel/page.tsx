import classNames from 'classnames';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import ScrollLink from '../../ScrollLink';

import { getHotelPage } from './fetch';

import CmsRichText from '@/helpers/CmsRichText';
import { Link } from '@/helpers/navigation';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: (await getHotelPage(locale)).title,
  };
}

export default async function HotelPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const pageContent = await getHotelPage(locale);
  const t = await getTranslations('2022_msg');

  return (
    <>
      <div
        className="o-header"
        style={
          {
            // backgroundImage: `url(${headerImage})`,
          }
        }>
        <div className="u-container">
          <h1 className="o-header__title">{pageContent.title}</h1>
          <p className="o-header__sub-title">{pageContent.subtitle}</p>
        </div>
      </div>

      <RowSection>
        <div className="u-col-sm-5">
          <img src="hotelImage" alt="hotel image" />
        </div>
        <div className="u-col-sm-7">
          <h3>{pageContent.hotel.title}</h3>
          <CmsRichText dirtyHtml={pageContent.hotel.body} />
          <div className="m-button-group">
            <Link href="/venue/getting-there" className="a-button">
              {t('general.buttons.getting_there')}
            </Link>
            <ScrollLink
              to="restaurant"
              className="a-button a-button--secondary"
              smooth={true}>
              {t('general.buttons.the_restaurant')}
            </ScrollLink>
            <Link href="/venue/rooms" className="a-button a-button--secondary">
              {t('general.buttons.hotel_rooms')}
            </Link>
          </div>
        </div>
      </RowSection>

      <RowSection alt>
        <div className="u-col-sm-6" id="restaurant">
          <img src="restaurantImage" alt="restaurant image" />
          <h4>{pageContent.restaurant.title}</h4>
          <CmsRichText dirtyHtml={pageContent.restaurant.body} />
        </div>
        <div className="u-col-sm-6">
          <img src="brusselsImage" alt="image of brussels" />
          <h4>{pageContent.surroundings.title}</h4>
          <CmsRichText dirtyHtml={pageContent.surroundings.body} />
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
