import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ContactFrame } from './ContactFrame';

import headerImage from '@/assets/headers/contact.jpg';
import lineImage from '@/assets/lines-2.png';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('header.title'),
  };
}

export default async function Contact({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Contact');

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <Image src={lineImage} alt="" className="o-section__accent-image" />
        <div className="o-section__content">
          <h3>{t('question.title')}</h3>
          <p>{t('question.description')}</p>

          <ContactFrame />
        </div>
      </div>
    </>
  );
}
