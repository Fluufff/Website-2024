import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import illustrationImage from '@/assets/fluufff-3d.png';
import headerImage from '@/assets/headers/about.jpg';
import lineImage from '@/assets/lines-1.png';
import { AccentImage } from '@/components/AccentImage';
import { Header } from '@/components/Header';
import { PropsWithLocale } from '@/helpers/localization';
import { Link } from '@/helpers/navigation';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: t('header.title'),
  };
}

export default async function About({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('About');
  const tGeneral = await getTranslations('general');

  return (
    <>
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <AccentImage src={lineImage} />
        <div className="o-section__content m-about">
          <div className="m-about__image">
            <Image src={illustrationImage} alt="" />
          </div>
          <div className="m-about__content">
            <h3>{t('about.title')}</h3>
            <p>{t('about.description.p0_fluufff')}</p>
            <p>{t('about.description.p1_contents')}</p>

            <div className="u-margin-top-lg">
              <div className="m-button-group">
                <Link href="/about/charity" className="a-button">
                  {tGeneral('buttons.charity')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="o-section">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              <h4>{t('furry_fandom.title')}</h4>
              <p>{t('furry_fandom.description.p0_furries')}</p>
              <p>{t('furry_fandom.description.p1_fandom')}</p>
              <p>{t('furry_fandom.description.p2_fursona')}</p>
              <p>{t('furry_fandom.description.p3_fursuits')}</p>
              <p>{t('furry_fandom.description.p4_conventions')}</p>
            </div>
            <div className="u-col-sm-6">
              <h4>{t('help.title')}</h4>
              <p>{t('help.description')}</p>
              <h4>
                {t('rules.title')}{' '}
                <a href="/terms">{tGeneral('labels.here')}</a>
              </h4>
              <p>{t('rules.description')}</p>
              <h4>{t('previous_editions.title')}</h4>
              <ul>
                <li>
                  <a href="https://2017.fluufff.org">Flüüfff 2017</a>
                </li>
                <li>
                  <a href="https://2018.fluufff.org">Flüüfff 2018</a>
                </li>
                <li>
                  <a href="https://2019.fluufff.org">Flüüfff 2019</a>
                </li>
                <li>
                  <a href="https://2021.fluufff.org">Flüüfff 2021</a>
                </li>
                <li>
                  <a href="https://2022.fluufff.org">Flüüfff 2022</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="o-section o-section--dark">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-6">
              <h4>{t('npo.title')}</h4>
              <p>{t('npo.description.p0_npo')}</p>
              <p>{t('npo.description.p1_admins')}</p>
            </div>
            <div className="u-col-sm-6">
              <p>
                <i>{t('npo.address')}</i>
              </p>
              <p>
                <i>{t('npo.revenue')}</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
