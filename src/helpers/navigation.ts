import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { languageKeys } from '@/config';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: Object.keys(languageKeys) });
