import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

import lineImage from '@/assets/lines-2.png';
import headerImage from '@/assets/rooms/header.jpg';
import standardRoomImage from '@/assets/rooms/standard-room.jpg';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';
import { Link } from '@/helpers/navigation';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Rooms' });
  return {
    title: t('header.title'),
  };
}

export default async function RoomsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Rooms');
  const tGeneral = await getTranslations('general');

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <Image
          src={lineImage}
          alt=""
          className="o-section__accent-image o-section__accent-image--top"
        />
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              <Image src={standardRoomImage} alt="standard room image" />
              <h4>{t('standard_rooms.title')}</h4>
              <p>{t('standard_rooms.description')}</p>
              <ul>
                <li>{t('standard_rooms.soft_duvets')}</li>
                <li>{t('standard_rooms.air_conditioning')}</li>
                <li>{t('standard_rooms.bathtub_with_shower')}</li>
                <li>{t('standard_rooms.hairdryer')}</li>
                <li>{t('standard_rooms.inroom_safe')}</li>
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
              </ul>
              {
                <Link href="/tickets#standard-pricing" className="a-button">
                  {tGeneral('buttons.tickets_and_pricing')}
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
