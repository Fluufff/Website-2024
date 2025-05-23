import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { localeKeys } from '@/config';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: Object.keys(localeKeys) });
