import React from 'react';

// to reintroduce content, remove the reason here and follow the compiler errors
type ExcludeReason = 'charity' | 'news' | 'schedule' | 'panel-form';

/** Utility to temporarily exclude content from the site without commenting it
 * out. */
export const exclude = (
  reason: ExcludeReason,
  child: React.JSX.Element,
  otherwise: React.JSX.Element | null = null,
) => otherwise;
