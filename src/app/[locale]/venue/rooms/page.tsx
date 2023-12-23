import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import businessRoomImage from '@/assets/rooms/business-room.jpg';
import headerImage from '@/assets/rooms/header.jpg';
import standardRoomImage from '@/assets/rooms/standard-room.jpg';

interface Props {
  params: {
    locale: string;
  };
}

export default async function RoomsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Rooms');
  const tGeneral = await getTranslations('general');

  return (
    <>
      <div
        className="o-header"
        style={{
          backgroundImage: `url(${headerImage.src})`,
        }}>
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.sub_title')}</p>
        </div>
      </div>
      <div className="o-section o-section--alt">
        {/* <img src={accentImage} className="o-section__accent-image o-section__accent-image--top" /> */}
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              {/* <Image src={standardRoomImage} alt="standard room image" /> */}
              <img src={standardRoomImage.src} alt="standard room image" />
              <h4>{t('standard_rooms.title')}</h4>
              <p>{t('standard_rooms.description')}</p>
              <ul>
                <li>{t('standard_rooms.soft_duvets')}</li>
                <li>{t('standard_rooms.air_conditioning')}</li>
                <li>{t('standard_rooms.bathtub_with_shower')}</li>
                <li>{t('standard_rooms.hairdryer')}</li>
                <li>{t('standard_rooms.inroom_safe')}</li>
                <li>{t('standard_rooms.mini_fridge')}</li>
                <li>{t('standard_rooms.dry_cleaning')}</li>
                <li>{t('standard_rooms.fitness_centre')}</li>
                <li>{t('standard_rooms.free_luggage_storage')}</li>
              </ul>
              <h5>{t('variants')}:</h5>
              <ul>
                <li>{tGeneral('labels.single')}</li>
                <li>{tGeneral('labels.double')}</li>
                <li>{tGeneral('labels.twin')}</li>
                <li>{tGeneral('labels.triple')}</li>
                <li>{tGeneral('labels.quadruple')}</li>
                <li>{tGeneral('labels.superior_twin')}</li>
              </ul>
              <Link href="/tickets#standard-pricing" className="a-button">
                {tGeneral('buttons.tickets_and_pricing')}
              </Link>
            </div>
            <div className="u-col-sm-6">
              <Image src={businessRoomImage} alt="business room image" />
              <h4>{t('business_rooms.title')}</h4>
              <p>{t('business_rooms.description')}</p>
              <ul>
                <li>{t('business_rooms.seating_area')}</li>
                <li>{t('business_rooms.extra_living_space')}</li>
                <li>{t('business_rooms.wooden_desk')}</li>
                <li>{t('business_rooms.everything_in_standard')}</li>
              </ul>
              <h5>{t('variants')}:</h5>
              <ul>
                <li>{tGeneral('labels.double')}</li>
                <li>{tGeneral('labels.twin')}</li>
                <li>{tGeneral('labels.superior_double')}</li>
                <li>{tGeneral('labels.superior_twin')}</li>
              </ul>
              <Link href="/tickets#business-pricing" className="a-button">
                {tGeneral('buttons.tickets_and_pricing')}
              </Link>
            </div>
          </div>
        </div>
        <div className="u-margin-top-xl">
          <p className="u-text-center u-text-light">
            <i>{t('superior_hint')}</i>
          </p>
        </div>
      </div>
    </>
  );
}
