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
            <CreditsList
              furries={[
                { name: 'Felikx', url: 'https://twitter.com/FelikxVanSaet' },
                { name: 'Bleats', url: 'https://github.com/sugarbleat' },
              ]}
            />
          </div>
          <div className="m-credits m-credits--muted">
            {t('translation_credits')}{' '}
            <CreditsList
              furries={[
                { name: 'Aelkan' },
                { name: 'Alex', url: 'https://twitter.com/Bijensteek' },
                { name: 'Dacia', url: 'https://linktr.ee/Daciathedutchie' },
                { name: 'Jinx McKenzie' },
                { name: "Milo'Clock" },
                { name: 'Rune', url: 'https://t.me/Rune_the_dragon' },
                { name: 'Tach', url: 'https://twitter.com/Tachillobator' },
                // TODO: complete this
              ]}
            />
          </div>
          <div className="m-credits m-credits--muted">
            {t('picture_credits')}{' '}
            <CreditsList
              furries={[
                { name: 'Axel', url: 'https://twitter.com/AxelTheStallion' },
                { name: 'Chip', url: 'https://twitter.com/cheetah_chip' },
                { name: 'Atien', url: 'https://twitter.com/Silou_Atien' },
                {
                  name: 'Shiro',
                  url: 'https://bsky.app/profile/shirodoggo.bsky.social',
                },
              ]}
            />
          </div>
          <div className="m-credits m-credits--muted">
            {t('art_credits')}{' '}
            <CreditsList
              furries={[
                {
                  name: 'Felikx',
                  url: 'https://twitter.com/FelikxVanSaet',
                  specifics: t('specifics.3d_model'),
                },
                {
                  name: 'Vincent',
                  url: 'https://twitter.com/vincehooves',
                  specifics: t('specifics.social_media_preview'),
                },
              ]}
            />
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

type CreditsEntryProps = {
  name: string;
  url?: string;
  specifics?: string;
};

function CreditsList({ furries }: { furries: CreditsEntryProps[] }) {
  return furries.flatMap((props, idx) =>
    Array<React.ReactNode>(<CreditsEntry key={idx} {...props} />).concat(
      idx === furries.length - 1
        ? []
        : idx === furries.length - 2
        ? ' & '
        : ', ',
    ),
  );
}

function CreditsEntry({ name, url, specifics }: CreditsEntryProps) {
  return (
    <>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          {name}
        </a>
      ) : (
        name
      )}
      {!!specifics && ` (${specifics})`}
    </>
  );
}
