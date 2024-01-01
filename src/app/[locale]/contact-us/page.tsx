import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/contact.jpg';
import accentImage from '@/assets/hibiscus.png';
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
      <div
        className="o-header"
        style={{
          backgroundImage: `url(${headerImage.src})`,
        }}>
        <div className="u-container">
          <h1 className="o-header__title">{t('header.title')}</h1>
          <p className="o-header__sub-title">{t('header.subtitle')}</p>
        </div>
      </div>
      <div className="o-section o-section--alt">
        <Image src={accentImage} alt="" className="o-section__accent-image" />
        <div className="o-section__content">
          <h3>{t('question.title')}</h3>
          <p>{t('question.description')}</p>

          <div className="m-closed-frame">
            The contact form for this edition has been closed.
          </div>
          {/* <iframe
            className="tickets-iframe"
            frameBorder="0"
            scrolling="yes"
            title="Registration"
            width="100%"
            height={iFrameHeight + 'px'}
            onLoad={() => {
              // eslint-disable-next-line react/no-find-dom-node
              const object: HTMLIFrameElement = document.querySelector(
                '.tickets-iframe',
              )! as HTMLIFrameElement;
              setIFrameHeight(
                object?.contentWindow?.document.body.scrollHeight || 0,
              );
            }}
            src="/contact?iframe"
          /> */}
        </div>
      </div>
    </>
  );
}
