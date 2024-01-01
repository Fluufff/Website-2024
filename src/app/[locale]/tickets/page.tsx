import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import headerImage from '@/assets/headers/tickets.png';
import palmTreeImage from '@/assets/palm-tree.png';
import ScrollLink from '@/helpers/ScrollLink';
import { PropsWithLocale } from '@/helpers/localization';

type Props = PropsWithLocale;

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Tickets' });
  return {
    title: t('header.title'),
  };
}

export default async function Tickets({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Tickets');
  const tButtons = await getTranslations('general.buttons');
  const tLabels = await getTranslations('general.labels');

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
        <Image src={palmTreeImage} alt="" className="o-section__accent-image" />
        <div className="o-section__content">
          <h3 className="u-text-center u-margin-bottom">
            {t('tickets.title')}
          </h3>
          <div className="m-button-group m-button-group--center u-margin-bottom">
            <ScrollLink
              to="residential-tickets"
              smooth={true}
              className="a-button">
              {tButtons('residential_tickets')}
            </ScrollLink>
            <ScrollLink to="day-tickets" smooth={true} className="a-button">
              {tButtons('day_tickets')}
            </ScrollLink>
            <ScrollLink
              to="goodies"
              smooth={true}
              className="a-button a-button--secondary">
              {tButtons('goodies_and_extras')}
            </ScrollLink>
          </div>
        </div>
      </div>
      <div className="o-section">
        <div className="o-section__content">
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
            src="/register?iframe"
          /> */}
        </div>
      </div>
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-5">
              <h4 id="residential-tickets">{t('residential.title')}</h4>
              <p>{t('residential.description')}</p>
              <p>
                <b>{t('residential.include')}</b>
              </p>
              <ul>
                <li>{t('residential.con_access')}</li>
                <li>{t('residential.events_access')}</li>
                <li>{t('residential.sleeping')}</li>
                <li>{t('residential.brekky')}</li>
                <li>{t('residential.cleaning')}</li>
              </ul>
              <p>{t('residential.info')}</p>
            </div>
            <div className="u-col-sm-7">
              <table className="m-pricing-table u-margin-bottom-lg">
                <thead>
                  <tr>
                    <td style={{ width: '40%' }}>
                      <b>{tLabels('standard_room')}</b>
                    </td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('early_arrival')})
                      </small>
                    </td>
                    <td>{tLabels('5_days')}</td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('late_departure')})
                      </small>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {tLabels('single')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 74.50</td>
                    <td className="m-pricing-table__price">€ 410.00</td>
                    <td className="m-pricing-table__price">€ 74.50</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('double')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 41.00</td>
                    <td className="m-pricing-table__price">€ 276.00</td>
                    <td className="m-pricing-table__price">€ 41.00</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('twin')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 41.00</td>
                    <td className="m-pricing-table__price">€ 276.00</td>
                    <td className="m-pricing-table__price">€ 41.00</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('triple')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 35.50</td>
                    <td className="m-pricing-table__price">€ 255.00</td>
                    <td className="m-pricing-table__price">€ 35.50</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('quadruple')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 33.00</td>
                    <td className="m-pricing-table__price">€ 245.00</td>
                    <td className="m-pricing-table__price">€ 33.00</td>
                  </tr>
                </tbody>
              </table>
              <table className="m-pricing-table u-margin-bottom-lg">
                <thead>
                  <tr>
                    <td style={{ width: '40%' }}>
                      <b>{tLabels('superior_standard_room')}</b>
                    </td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('early_arrival')})
                      </small>
                    </td>
                    <td>{tLabels('5_days')}</td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('late_departure')})
                      </small>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {tLabels('twin')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 48.50</td>
                    <td className="m-pricing-table__price">€ 306.00</td>
                    <td className="m-pricing-table__price">€ 48.50</td>
                  </tr>
                </tbody>
              </table>
              <table className="m-pricing-table u-margin-bottom-lg">
                <thead>
                  <tr>
                    <td style={{ width: '40%' }}>
                      <b>{tLabels('business_room')}</b>
                    </td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('early_arrival')})
                      </small>
                    </td>
                    <td>{tLabels('5_days')}</td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('late_departure')})
                      </small>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {tLabels('double')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 53.50</td>
                    <td className="m-pricing-table__price">€ 326.00</td>
                    <td className="m-pricing-table__price">€ 53.50</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('twin')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 53.50</td>
                    <td className="m-pricing-table__price">€ 326.00</td>
                    <td className="m-pricing-table__price">€ 53.50</td>
                  </tr>
                </tbody>
              </table>
              <table className="m-pricing-table u-margin-bottom">
                <thead>
                  <tr>
                    <td style={{ width: '40%' }}>
                      <b>{tLabels('superior_business_room')}</b>
                    </td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('early_arrival')})
                      </small>
                    </td>
                    <td>{tLabels('5_days')}</td>
                    <td>
                      {tLabels('plus_1_day')}
                      <br />
                      <small className="u-text-light">
                        ({tLabels('late_departure')})
                      </small>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {tLabels('double')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 61.00</td>
                    <td className="m-pricing-table__price">€ 356.00</td>
                    <td className="m-pricing-table__price">€ 61.00</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('twin')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 61.00</td>
                    <td className="m-pricing-table__price">€ 356.00</td>
                    <td className="m-pricing-table__price">€ 61.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="u-row">
            <div className="u-col-sm-5">
              <h4 id="day-tickets">{t('day.title')}</h4>
              <p>{t('day.description')}</p>
              <p>
                <b>{t('day.include')}</b>
              </p>
              <ul>
                <li>{t('day.con_access')}</li>
                <li>{t('day.events_on_chosen_day')}</li>
              </ul>
              <p>{t('day.info')}</p>
            </div>
            <div className="u-col-sm-7">
              <table className="m-pricing-table u-margin-top">
                <thead>
                  <tr>
                    <td></td>
                    <td>{tLabels('wednesday_short')}</td>
                    <td>{tLabels('thursday_short')}</td>
                    <td>{tLabels('friday_short')}</td>
                    <td>{tLabels('saturday_short')}</td>
                    <td>{tLabels('sunday_short')}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{tLabels('1_day')}</td>
                    <td className="m-pricing-table__price">€ 25</td>
                    <td className="m-pricing-table__price">€ 28</td>
                    <td className="m-pricing-table__price">€ 28</td>
                    <td className="m-pricing-table__price">€ 28</td>
                    <td className="m-pricing-table__price">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="u-row">
            <div className="u-col-sm-5">
              <h4 id="goodies">{t('extras.title')}</h4>
              <p>{t('extras.description')}</p>
              <p>
                <b>{t('extras.includes')}</b>
              </p>
              <ul>
                <li>{t('extras.t_shirt')}</li>
                <li>{t('extras.custom_badge_art')}</li>
                <li>{t('extras.custom_lanyard')}</li>
                <li>{t('extras.bonus_goodies')}</li>
                <li>{t('extras.eternal_gratitude')}</li>
              </ul>
            </div>
            <div className="u-col-sm-7">
              <table className="m-pricing-table u-margin-top">
                <thead>
                  <tr>
                    <td>{tLabels('item')}</td>
                    <td>{tLabels('t_shirt')}</td>
                    <td>{tLabels('sponsor_pack')}</td>
                    <td>{tLabels('parking_ticket')}*</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{tLabels('price')}</td>
                    <td className="m-pricing-table__price">€ 15</td>
                    <td className="m-pricing-table__price">€ 35</td>
                    <td className="m-pricing-table__price">€ 13 / day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
