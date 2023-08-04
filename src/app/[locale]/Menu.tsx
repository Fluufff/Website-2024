'use client';

import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';
import { useEffect, useState } from 'react';

import { languages } from '@/config';

export default function Menu() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const currentLanguage = useLocale();
  const t = useTranslations();

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
                  {t('MENU.ITEMS.HOME')}
                </Link>
              </li>

              {/* <li>
                <Link className="m-menu__link" href="/news">
                  {t('MENU.ITEMS.NEWS')}
                </Link>
              </li> */}

              {/* <li>
                <div className="m-menu__sub-menu">
                  <Link className="m-menu__link" href="/about">
                    {t('MENU.ITEMS.ABOUT')}
                  </Link>
                  <div className="m-menu__sub-menu__wrapper">
                    <div className="m-menu__sub-menu__content">
                      <ul>
                        <li>
                          <Link
                            className="m-menu__sub-link"
                            href="/about/fluufff">
                            {t('MENU.ITEMS.ABOUT_FLÜÜFFF')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="m-menu__sub-link"
                            href="/about/charity">
                            {t('MENU.ITEMS.CHARITY')}
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
										{t('MENU.ITEMS.VENUE')}
									</Link>
									<div className="m-menu__sub-menu__wrapper">
										<div className="m-menu__sub-menu__content">
											<ul>
												<li>
													<Link className="m-menu__sub-link" href="/venue/hotel">
														{t('MENU.ITEMS.HOTEL')}
													</Link>
												</li>
												<li>
													<Link className="m-menu__sub-link" href="/venue/rooms">
														{t('MENU.ITEMS.ROOMS')}
													</Link>
												</li>
												<li>
													<Link className="m-menu__sub-link" href="/venue/getting-there">
														{t('MENU.ITEMS.GETTING_THERE')}
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</li> */}

              <li>
                <Link className="m-menu__link" href="/timetable">
                  {t('MENU.ITEMS.SCHEDULE')}
                </Link>
              </li>

              {/* <li>
                <Link className="m-menu__link" href="/contact-us">
                  {t('MENU.ITEMS.CONTACT')}
                </Link>
              </li> */}

              {/* <li>
								<Link
									href="/tickets"
									className="m-menu__link m-menu__link-button a-button a-button--small">
									{t('MENU.ITEMS.TICKETS')}
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
                    {t('MENU.ITEMS.LOGIN')}
                  </a>
                </li>
              )} */}

              <li>
                <div className="m-menu__sub-menu m-menu__languages">
                  <a href="#" className="m-menu__link">
                    <span className="uil uil-globe"></span>{' '}
                    {languages[currentLanguage]?.name}
                  </a>
                  <div className="m-menu__sub-menu__wrapper">
                    <div className="m-menu__sub-menu__content">
                      <ul>
                        {Object.entries(languages).map(
                          ([languageKey, language]) => (
                            <li key={languageKey}>
                              <Link
                                className={classNames({
                                  'm-menu__sub-link': true,
                                  'm-menu__sub-link--selected':
                                    currentLanguage === languageKey,
                                })}
                                href={location}
                                locale={languageKey}>
                                {language.name}
                              </Link>
                            </li>
                          ),
                        )}
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
