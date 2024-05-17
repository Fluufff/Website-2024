'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { UserLogin } from './UserLogin';

import logoDarkImage from '@/assets/full-logo-dark.png';
import logoImage from '@/assets/full-logo.png';
import { locales } from '@/config';
import { exclude } from '@/helpers/exclude';
import { Link, usePathname } from '@/helpers/navigation';

export default function Menu() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('Menu');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(document?.documentElement.scrollTop > 0);
    };

    // Apply on first mount in case we have opened the page with an anchor or
    // refreshed it while scrolled. It's not pretty while it animates, but at
    // least it goes to a correct state.
    //
    // TODO: how do we make it pretty?
    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div
      className={classNames('m-menu', {
        'm-menu--scrolled': scrolled,
        'm-menu--open': open,
      })}>
      <div className="u-container">
        <div className="m-menu__content">
          <div className="m-menu__logo">
            <Link href="/">
              <Image
                src={scrolled || open ? logoDarkImage : logoImage}
                alt={t('items.home')}
              />
            </Link>
          </div>
          <button className="m-menu__hamburger" onClick={() => setOpen(!open)}>
            <span className="uil uil-bars"></span>
          </button>
          <div className="m-menu__links">
            <ul>
              <li>
                <Link className="m-menu__link" href="/">
                  {t('items.home')}
                </Link>
              </li>
              {exclude(
                'news',
                <li>
                  <Link className="m-menu__link" href="/news">
                    {t('items.news')}
                  </Link>
                </li>,
              )}
              <li>
                {exclude(
                  'charity',
                  <div className="m-menu__sub-menu">
                    <Link className="m-menu__link" href="/about/fluufff">
                      {t('items.about')}
                    </Link>
                    <div className="m-menu__sub-menu__wrapper">
                      <div className="m-menu__sub-menu__content">
                        <ul>
                          <li>
                            <Link
                              className="m-menu__sub-link"
                              href="/about/fluufff">
                              {t('items.about_fluufff')}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="m-menu__sub-link"
                              href="/about/charity">
                              {t('items.charity')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>,
                  <Link className="m-menu__link" href="/about/fluufff">
                    {t('items.about')}
                  </Link>,
                )}
              </li>

              <li>
                <div className="m-menu__sub-menu">
                  <Link className="m-menu__link" href="/venue/hotel">
                    {t('items.venue')}
                  </Link>
                  <div className="m-menu__sub-menu__wrapper">
                    <div className="m-menu__sub-menu__content">
                      <ul>
                        <li>
                          <Link
                            className="m-menu__sub-link"
                            href="/venue/hotel">
                            {t('items.hotel')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="m-menu__sub-link"
                            href="/venue/rooms">
                            {t('items.rooms')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="m-menu__sub-link"
                            href="/venue/getting-there">
                            {t('items.getting_there')}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              {exclude(
                'schedule',
                <li>
                  <Link className="m-menu__link" href="/timetable">
                    {t('items.schedule')}
                  </Link>
                </li>,
              )}

              <li>
                <Link className="m-menu__link" href="/contact-us">
                  {t('items.contact')}
                </Link>
              </li>

              {
                <li>
                  <Link
                    href="/tickets"
                    className="m-menu__link m-menu__link-button a-button a-button--small">
                    {t('items.tickets')}
                  </Link>
                </li>
              }

              <li>
                <UserLogin />
              </li>

              <li>
                <div className="m-menu__sub-menu m-menu__languages">
                  <a href="#" className="m-menu__link">
                    <span className="uil uil-globe"></span>{' '}
                    {locales[currentLocale]?.name}
                  </a>
                  <div className="m-menu__sub-menu__wrapper">
                    <div className="m-menu__sub-menu__content">
                      <ul>
                        {Object.entries(locales).map(([locale, localeInfo]) => (
                          <li key={locale}>
                            <Link
                              className={classNames({
                                'm-menu__sub-link': true,
                                'm-menu__sub-link--selected':
                                  currentLocale === locale,
                              })}
                              href={location}
                              locale={locale}>
                              {localeInfo.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
