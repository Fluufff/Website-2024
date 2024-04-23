'use client';

import format from 'date-fns/format';

import { getDateLocale } from '@/helpers/localization';
import { useHydrated } from '@/helpers/useMounted';

export function ClientLocalTime(props: {
  relative?: boolean;
  locale: string;
  format: string;
  date: number;
}) {
  const hydrated = useHydrated();

  // This suuuuuucks. But I really need to render this time on the client side
  // to use the local timezone. Doing something that also renders on the
  // server-side would be possible, but the SSR state would flash briefly.
  return (
    hydrated && (
      <time>
        {format(props.date, props.format, {
          locale: getDateLocale(props.locale),
        })}
      </time>
    )
  );
}
