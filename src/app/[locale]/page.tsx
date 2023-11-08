import Image from 'next/image';

import ScrollLink from './ScrollLink';
import HomepageScene from './_scene';

import danceImage from '@/assets/dance.jpg';
import logoImage from '@/assets/full-logo.png';
import panelsImage from '@/assets/panels.jpg';
import showNightImage from '@/assets/shownight.jpg';
import Link from '@/helpers/NextIntlLink';

const t = (key: string) => key;

export default function IndexPage() {
  return (
    <main>
      <div className="o-header o-header--big">
        <HomepageScene />

        <div className="o-header__overlay">
          <div className="m-hero">
            <div className="m-hero__logo">
              <Image src={logoImage} alt="Flüüfff logo" />
            </div>
            <h1 className="m-hero__title">{t('PAGES.INDEX.HERO.TITLE')}</h1>
            <p className="m-hero__intro">{t('PAGES.INDEX.HERO.DESCRIPTION')}</p>
            <p className="m-hero__subtitle">
              {t('PAGES.INDEX.HERO.SUB_TITLE')}
            </p>
            <h2 className="m-hero__date">{t('PAGES.INDEX.HERO.DATE')}</h2>
            <div className="u-margin-top">
              {/* registration status & CTA goes here */}
            </div>
          </div>
          <ScrollLink to="main" smooth={true} style={{ pointerEvents: 'all' }}>
            <div className="o-canvas__scroll">
              <span className="uil uil-angle-down"></span>
            </div>
          </ScrollLink>
        </div>
      </div>

      <div className="o-section" id="main">
        <div className="o-section__content">
          <div className="m-activities">
            <div className="m-activities__item">
              <div
                className="m-activities__item__image"
                style={{
                  backgroundImage: `url(${danceImage.src})`,
                }}
              />
              <h3>{t('PAGES.INDEX.ACTIVITIES.DANCES.TITLE')}</h3>
              <p>{t('PAGES.INDEX.ACTIVITIES.DANCES.DESCRIPTION')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('GENERAL.BUTTONS.DISCOVER')}
              </Link>
            </div>
            <div className="m-activities__item">
              <div
                className="m-activities__item__image"
                style={{
                  backgroundImage: `url(${panelsImage.src})`,
                }}
              />
              <h3>{t('PAGES.INDEX.ACTIVITIES.PANELS.TITLE')}</h3>
              <p>{t('PAGES.INDEX.ACTIVITIES.PANELS.DESCRIPTION')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('GENERAL.BUTTONS.MORE_INFO')}
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfbhSAz-w9qpCFMfNFvnb9E5IjvEPtzlZHkl-TmVadYRIbMqQ/viewform"
                target="_blank"
                className="a-button a-button--tertiary u-margin-top u-margin-left-xs"
                rel="noreferrer">
                {t('GENERAL.BUTTONS.SUBMIT_PROPOSAL')}
              </a>
            </div>
            <div className="m-activities__item">
              <div
                className="m-activities__item__image"
                style={{
                  backgroundImage: `url(${showNightImage.src})`,
                }}
              />
              <h3>{t('PAGES.INDEX.ACTIVITIES.SHOW_NIGHT.TITLE')}</h3>
              <p>{t('PAGES.INDEX.ACTIVITIES.SHOW_NIGHT.DESCRIPTION')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('GENERAL.BUTTONS.VIEW_MORE')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <div className="m-about">
            <div className="m-about__content">
              <h3>{t('PAGES.INDEX.WELCOME.TITLE')}</h3>
              <p>{t('PAGES.INDEX.WELCOME.DESCRIPTION')}</p>
              <Link href="/about" className="a-button a-button--secondary">
                {t('GENERAL.BUTTONS.ABOUT_FLÜÜFFF')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
