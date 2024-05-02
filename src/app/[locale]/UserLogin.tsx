'use client';

import { useTranslations } from 'next-intl';

import { env } from '@/env';
import { useCurrentUser } from '@/services/reg/user';

export function UserLogin() {
  const t = useTranslations('Menu.items');

  const { data: user, error, isLoading } = useCurrentUser();

  if (isLoading) {
    return '...';
  } else if (user) {
    return (
      <a
        className="m-menu__link m-menu__link-user"
        href={env.NEXT_PUBLIC_REG_ROOT + '/profile'}>
        <div
          className="m-menu__link-avatar"
          style={{
            backgroundImage: `url(${env.NEXT_PUBLIC_REG_ROOT}/${user.avatarThumbnail})`,
          }}
        />
        {user.name}
      </a>
    );
  } else {
    return (
      <a
        className="m-menu__link"
        href={env.NEXT_PUBLIC_REG_ROOT + '/profile/login'}>
        {t('login')}
      </a>
    );
  }
}
