import React from 'react';

// to reintroduce content, remove the reason here and follow the compiler errors
type ExcludeReason =
  | 'about'
  | 'charity'
  | 'tickets'
  | 'news'
  | 'schedule'
  | 'panel-form'
  | 'contact-us';

/** Utility to temporarily exclude content from the site without commenting it
 * out. */
export const exclude = (reason: ExcludeReason, child: React.JSX.Element) =>
  null;
