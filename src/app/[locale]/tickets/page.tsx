import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { TicketsFrame } from './TicketsFrame';

import headerImage from '@/assets/headers/tickets.png';
import lineImage from '@/assets/lines-1.png';
import { Header } from '@/components/Header';
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
      <Header
        image={headerImage}
        title={t('header.title')}
        subtitle={t('header.subtitle')}
      />
      <div className="o-section o-section--alt">
        <Image src={lineImage} alt="" className="o-section__accent-image" />
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
          <TicketsFrame />
        </div>
      </div>
      <div className="o-section o-section--alt">
        <div className="o-section__content">
          <div className="u-row">
            <div className="u-col-sm-5">
              <h4 id="residential-tickets">{t('residential.title')}</h4>
              <p>{t('residential.description.p0')}</p>
              <p>{t('residential.description.p1')}</p>
              <p>{t('residential.description.p2')}</p>
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
              <p className="u-pre-wrap-p">
                {t('residential.info.check_in_out')}
              </p>
              <p>{t('residential.info.room_types')}</p>
              <p>{t('residential.info.extra_days')}</p>
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
                    <td className="m-pricing-table__price">€ 99.25</td>
                    <td className="m-pricing-table__price">€ 537.00</td>
                    <td className="m-pricing-table__price">€ 99.25</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('double')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 54.63</td>
                    <td className="m-pricing-table__price">€ 358.50</td>
                    <td className="m-pricing-table__price">€ 54.63</td>
                  </tr>
                  <tr className="m-pricing-table__row m-pricing-table__row--before-divide">
                    <td>
                      {tLabels('twin')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_person')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 54.63</td>
                    <td className="m-pricing-table__price">€ 358.50</td>
                    <td className="m-pricing-table__price">€ 54.63</td>
                  </tr>

                  {/* above: per person; below: per room */}

                  <tr className="m-pricing-table__row m-pricing-table__row--after-divide">
                    <td>
                      {tLabels('triple')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_room')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 129.25</td>
                    <td className="m-pricing-table__price">€ 937.00</td>
                    <td className="m-pricing-table__price">€ 129.25</td>
                  </tr>
                  <tr>
                    <td>
                      {tLabels('quadruple')}
                      <br />
                      <small className="u-text-light">
                        {tLabels('per_room')}
                      </small>
                    </td>
                    <td className="m-pricing-table__price">€ 159.25</td>
                    <td className="m-pricing-table__price">€ 1,197.00</td>
                    <td className="m-pricing-table__price">€ 159.25</td>
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
                    <td className="m-pricing-table__price">€ 30</td>
                    <td className="m-pricing-table__price">€ 40</td>
                    <td className="m-pricing-table__price">€ 40</td>
                    <td className="m-pricing-table__price">€ 40</td>
                    <td className="m-pricing-table__price m-pricing-table__price--na">
                      -
                    </td>
                  </tr>
                  <tr>
                    <td>{tLabels('weekend')}</td>
                    <td
                      className="m-pricing-table__price m-pricing-table__price--na"
                      colSpan={3}>
                      -
                    </td>
                    <td className="m-pricing-table__price" colSpan={2}>
                      € 60
                    </td>
                  </tr>
                  <tr>
                    <td>{tLabels('full_con')}</td>
                    <td className="m-pricing-table__price" colSpan={5}>
                      € 150
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>
                  {t.rich('day.sales_open_later', {
                    b: (x) => <strong>{x}</strong>,
                  })}
                </p>
              </div>
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
