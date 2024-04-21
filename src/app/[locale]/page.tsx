import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import HomepageScene from './_scene';

import danceImage from '@/assets/dance.jpg';
import logoImage from '@/assets/full-logo.png';
import panelsImage from '@/assets/panels.jpg';
import showNightImage from '@/assets/shownight.jpg';
import ScrollLink from '@/helpers/ScrollLink';
import { Link } from '@/helpers/navigation';
import { exclude } from '@/helpers/exclude';

export default async function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Index');

  return (
    <main>
      <div className="o-header o-header--big">
        <HomepageScene />

        <div className="o-header__overlay">
          <div className="m-hero">
            <div className="m-hero__logo">
              <Image src={logoImage} alt="Flüüfff logo" />
            </div>
            <h1 className="m-hero__title">{t('hero.title')}</h1>
            <p className="m-hero__intro">{t('hero.description.p0')}</p>
            <p className="m-hero__intro">{t('hero.description.p1')}</p>
            <p className="m-hero__subtitle">{t('hero.subtitle')}</p>
            <h2 className="m-hero__date">{t('hero.date')}</h2>
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
              <div className="m-activities__item__image">
                <Image fill alt="" src={danceImage} />
              </div>
              <h3>{t('activities.dances.title')}</h3>
              <p>{t('activities.dances.description')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('activities.dances.discover')}
              </Link>
            </div>
            <div className="m-activities__item">
              <div className="m-activities__item__image">
                <Image fill alt="" src={panelsImage} />
              </div>
              <h3>{t('activities.panels.title')}</h3>
              <p>{t('activities.panels.description.p0')}</p>
              <p>{t('activities.panels.description.p1')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('activities.panels.more_info')}
              </Link>
              {exclude(
                'panel-form',
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfbhSAz-w9qpCFMfNFvnb9E5IjvEPtzlZHkl-TmVadYRIbMqQ/viewform"
                  target="_blank"
                  className="a-button a-button--primary u-margin-top u-margin-left-xs"
                  rel="noreferrer">
                  {t('activities.panels.submit_proposal')}
                </a>,
              )}
            </div>
            <div className="m-activities__item">
              <div className="m-activities__item__image">
                <Image fill alt="" src={showNightImage} />
              </div>
              <h3>{t('activities.show_night.title')}</h3>
              <p>{t('activities.show_night.description')}</p>
              <Link
                href="/timetable"
                className="a-button a-button--secondary u-margin-top">
                {t('activities.show_night.view_more')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <div className="m-about">
            <div className="m-about__content">
              <h3>{t('welcome.title')}</h3>
              <p>{t('welcome.description.p0')}</p>
              <p>{t('welcome.description.p1')}</p>
              {exclude(
                'about',
                <Link
                  href="/about/fluufff"
                  className="a-button a-button--secondary">
                  {t('welcome.about_fluufff')}
                </Link>,
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
