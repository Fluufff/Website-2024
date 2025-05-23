import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { RegistrationStatus } from './RegistrationStatus';
import HomepageScene from './_scene';

import danceImage from '@/assets/dance.jpg';
import logoImage from '@/assets/full-logo.png';
import panelsImage from '@/assets/panels.jpg';
import showNightImage from '@/assets/shownight.jpg';
import { Link } from '@/helpers/navigation';
import { getHasSchedule } from '@/services/cms/schedule';

export default async function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Index');

  const hasSchedule = await getHasSchedule(locale);

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
              <RegistrationStatus />
            </div>
          </div>
          <Link href="#main" style={{ pointerEvents: 'all' }}>
            <div className="o-canvas__scroll">
              <span className="uil uil-angle-down"></span>
            </div>
          </Link>
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
              {hasSchedule && (
                <Link
                  href="/timetable"
                  className="a-button a-button--secondary u-margin-top">
                  {t('activities.dances.discover')}
                </Link>
              )}
            </div>
            <div className="m-activities__item">
              <div className="m-activities__item__image">
                <Image fill alt="" src={panelsImage} />
              </div>
              <h3>{t('activities.panels.title')}</h3>
              <p>{t('activities.panels.description.p0')}</p>
              <p>{t('activities.panels.description.p1')}</p>
              {hasSchedule && (
                <Link
                  href="/timetable"
                  className="a-button a-button--secondary u-margin-top">
                  {t('activities.panels.more_info')}
                </Link>
              )}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScCMjm_v59my7QaELMsoTqarOeFFNlyQoSF6FowCT2Z4E120A/viewform"
                target="_blank"
                className="a-button a-button--primary u-margin-top u-margin-left-xs"
                rel="noreferrer">
                {t('activities.panels.submit_proposal')}
              </a>
            </div>
            <div className="m-activities__item">
              <div className="m-activities__item__image">
                <Image fill alt="" src={showNightImage} />
              </div>
              <h3>{t('activities.show_night.title')}</h3>
              <p>{t('activities.show_night.description')}</p>
              {hasSchedule && (
                <Link
                  href="/timetable"
                  className="a-button a-button--secondary u-margin-top">
                  {t('activities.show_night.view_more')}
                </Link>
              )}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdCBNJukZuSNNbpei6y3JkS0DM6gQsau9HuMhL8ejm9HUnm4g/viewform"
                target="_blank"
                className="a-button a-button--primary u-margin-top u-margin-left-xs"
                rel="noreferrer">
                {t('activities.show_night.submit_proposal')}
              </a>
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
              {
                <Link
                  href="/about/fluufff"
                  className="a-button a-button--secondary">
                  {t('welcome.about_fluufff')}
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
