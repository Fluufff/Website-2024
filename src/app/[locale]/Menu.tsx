'use client';

import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { locales } from '@/config';
import { Link, usePathname } from '@/helpers/navigation';

export default function Menu() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('2022_msg.menu');

  useEffect(() => {
    const onScroll = (e: Event) => {
      setScrolled((e.target as Document)?.documentElement.scrollTop > 0);
    };

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
              Home
              {/* <img src={scrolled || open ? logoDarkImage : logoImage} alt="" /> */}
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

              {/* <li>
                <Link className="m-menu__link" href="/news">
                  {t('items.news')}
                </Link>
              </li> */}

              {/* <li>
                <div className="m-menu__sub-menu">
                  <Link className="m-menu__link" href="/about">
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
                </div>
              </li> */}

              {/* <li>
								<div className="m-menu__sub-menu">
									<Link className="m-menu__link" href="/venue">
										{t('items.venue')}
									</Link>
									<div className="m-menu__sub-menu__wrapper">
										<div className="m-menu__sub-menu__content">
											<ul>
												<li>
													<Link className="m-menu__sub-link" href="/venue/hotel">
														{t('items.hotel')}
													</Link>
												</li>
												<li>
													<Link className="m-menu__sub-link" href="/venue/rooms">
														{t('items.rooms')}
													</Link>
												</li>
												<li>
													<Link className="m-menu__sub-link" href="/venue/getting-there">
														{t('items.getting_there')}
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</li> */}

              <li>
                <Link className="m-menu__link" href="/timetable">
                  {t('items.schedule')}
                </Link>
              </li>

              {/* <li>
                <Link className="m-menu__link" href="/contact-us">
                  {t('items.contact')}
                </Link>
              </li> */}

              {/* <li>
								<Link
									href="/tickets"
									className="m-menu__link m-menu__link-button a-button a-button--small">
									{t('items.tickets')}
								</Link>
							</li> */}

              {/* {user ? (
                <li>
                  <a className="m-menu__link m-menu__link-user" href="/profile">
                    <div
                      className="m-menu__link-avatar"
                      style={{
                        backgroundImage: `url(/${user.avatar.thumbnail}?${user.avatar.thumbnail})`,
                      }}
                    />
                    {user.username}
                  </a>
                </li>
              ) : (
                <li>
                  <a className="m-menu__link" href="/profile/login">
                    {t('items.login')}
                  </a>
                </li>
              )} */}

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
