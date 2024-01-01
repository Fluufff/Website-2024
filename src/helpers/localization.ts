import { localeKeys, SupportedLocale } from '@/config';

export type PropsWithLocale<P = {}> = P & { params: { locale: string } };

export type Messages = typeof import('@/messages/en.json');

export function isSupportedLocale(x: string): x is SupportedLocale {
  return (localeKeys as readonly string[]).includes(x);
}
