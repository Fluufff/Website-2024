import { cache } from 'react';

export const getMessages = cache(async (locale: string) => {
  const poModule = await import(`./loader!@/messages/${locale}.po`);
  return poModule.strings;
});
