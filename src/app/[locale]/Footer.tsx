import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import lineImage from '@/assets/lines-1.png';
import { Link } from '@/helpers/navigation';

export default async function Footer({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Footer');

  return (
    <>
      <div className="o-section o-section--small o-section--center">
        <Image
          src={lineImage}
          alt=""
          className="o-section__accent-image o-section__accent-image--alt"
        />
        <h3>{t('follow_us')}</h3>
        <div className="o-section__content">
          <div className="m-socials">
            <a
              className="m-socials__item"
              href="https://twitter.com/FluufffCon"
              title="Twitter"
              target="_blank"
              rel="noreferrer">
              <span className="uil uil-twitter"></span>
            </a>
            <a
              className="m-socials__item"
              href="http://www.furaffinity.net/user/fluufff/"
              title="Furaffinity"
              target="_blank"
              rel="noreferrer">
              <span className="uil uil-link"></span>
            </a>
            <a
              className="m-socials__item"
              href="https://www.facebook.com/fluufff/"
              title="Facebook"
              target="_blank"
              rel="noreferrer">
              <span className="uil uil-facebook"></span>
            </a>
            <a
              className="m-socials__item"
              href="https://beta.furrynetwork.com/fluufff/"
              title="FurryNetwork"
              target="_blank"
              rel="noreferrer">
              <span className="uil uil-link"></span>
            </a>
            <a
              className="m-socials__item"
              href="https://t.me/fluufff_announcements"
              title="Telegram"
              target="_blank"
              rel="noreferrer">
              <span className="uil uil-telegram-alt"></span>
            </a>
          </div>
        </div>
      </div>
      <div className="o-section o-section--x-small o-section--dark o-section--center">
        <div className="o-section__content">
          <div className="m-credits u-margin-bottom">
            {t('site_credits')}{' '}
            <a
              href="https://twitter.com/FelikxVanSaet"
              target="_blank"
              rel="noreferrer">
              Felikx
            </a>
          </div>
          <div className="m-credits m-credits--muted">
            {t('translation_credits')}{' '}
            <a
              href="https://twitter.com/Tachillobator"
              target="_blank"
              rel="noreferrer">
              Tach
            </a>
            ,{' '}
            <a
              href="https://twitter.com/VrydiFur"
              target="_blank"
              rel="noreferrer">
              Vrydi
            </a>{' '}
            &amp;{' '}
            <a
              href="https://twitter.com/Goomuin"
              target="_blank"
              rel="noreferrer">
              Goomuin
            </a>
          </div>
          <div className="m-credits m-credits--muted">
            {t('picture_credits')}{' '}
            <a
              href="https://twitter.com/AxelTheStallion"
              target="_blank"
              rel="noreferrer">
              Axel
            </a>
            ,{' '}
            <a
              href="https://twitter.com/cheetah_chip"
              target="_blank"
              rel="noreferrer">
              Chip
            </a>{' '}
            &amp;{' '}
            <a
              href="https://twitter.com/Silou_Atien"
              target="_blank"
              rel="noreferrer">
              Atien
            </a>
          </div>
        </div>
      </div>
      <div className="o-section o-section--x-small o-section--center">
        <div className="o-section__content">
          <Link href="/terms" className="u-text-small">
            {t('terms_and_conditions')}
          </Link>
        </div>
      </div>
    </>
  );
}
