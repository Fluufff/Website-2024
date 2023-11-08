import classNames from 'classnames';
import React from 'react';
import sanitizeHtml from 'sanitize-html';

import Link from '../../NextIntlLink';
import ScrollLink from '../../ScrollLink';

import { getHotelPage } from './fetch';

const t = (s: string) => s;

export default async function HotelPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const pageContent = await getHotelPage(locale);

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
          <RichText content={pageContent.hotel.body} />
          <div className="m-button-group">
            <Link href="/venue/getting-there" className="a-button">
              {t('GENERAL.BUTTONS.GETTING_THERE')}
            </Link>
            <ScrollLink
              to="restaurant"
              className="a-button a-button--secondary"
              smooth={true}>
              {t('GENERAL.BUTTONS.THE_RESTAURANT')}
            </ScrollLink>
            <Link href="/venue/rooms" className="a-button a-button--secondary">
              {t('GENERAL.BUTTONS.HOTEL_ROOMS')}
            </Link>
          </div>
        </div>
      </RowSection>

      <RowSection alt>
        <div className="u-col-sm-6" id="restaurant">
          <img src="restaurantImage" alt="restaurant image" />
          <h4>{pageContent.restaurant.title}</h4>
          <RichText content={pageContent.restaurant.body} />
        </div>
        <div className="u-col-sm-6">
          <img src="brusselsImage" alt="image of brussels" />
          <h4>{pageContent.surroundings.title}</h4>
          <RichText content={pageContent.surroundings.body} />
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

interface RichTextProps {
  as?: 'div';
  className?: string;
  content: string;
}

function RichText({
  as: Component = 'div',
  className,
  content,
}: RichTextProps) {
  const safeContent = sanitizeHtml(content, {
    allowedAttributes: {
      a: sanitizeHtml.defaults.allowedAttributes.a.concat(['rel']),
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noreferrer' }),
    },
  });

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  );
}
