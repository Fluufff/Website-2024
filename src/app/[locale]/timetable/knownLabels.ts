const knownLabelStrings = [
  'nsfw',
  'workshop',
  'educational',
  'fursuit-friendly',
  'sporty',
  'flashing-lights',
  'charity',
  'open-door',
] as const;

export type KnownLabel = (typeof knownLabelStrings)[number];

export function isKnownLabel(s: string): s is KnownLabel {
  return (knownLabelStrings as readonly string[]).includes(s);
}

export type KnownLabelItem = {
  /** color code for .a-badge--color-X classes */
  color: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

// weird type i just came up with, but it works
export type KnownLabelDict = Record<KnownLabel, KnownLabelItem> &
  Partial<Record<string, KnownLabelItem>>;

export const knownLabels: KnownLabelDict = {
  nsfw: {
    color: 1,
  },
  workshop: {
    color: 2,
  },
  educational: {
    color: 3,
  },
  'fursuit-friendly': {
    color: 4,
  },
  sporty: {
    color: 5,
  },
  'flashing-lights': {
    color: 6,
  },
  charity: {
    color: 7,
  },
  'open-door': {
    color: 8,
  },
};
