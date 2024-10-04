/** Move fields "label-*" into a single "labels" field containing a list of
 * labels whose value was true.
 *
 * This works around a restriction in DCM: the "select" field type and "multi"
 * option do not work, so we cannot provide a proper label multi-select input in
 * the CMS or produce such a list of label in the CMS API. Instead we use
 * checkboxes. Ideally this function would become unnecessary after DCM is
 * fixed.
 */
export function extractLabelsField<T extends {}>(
  fields: T,
): Omit<T, `label-${string}`> & { labels: string[] } {
  const prefix = 'label-';

  const entries = Object.entries(fields);
  const labels: string[] = entries
    .filter(
      ([labelKey, labelValue]) =>
        labelKey.startsWith(prefix) && labelValue === true,
    )
    .map(([labelKey]) => labelKey.substring(prefix.length));

  return Object.assign(
    Object.fromEntries(
      entries.filter(([labelKey]) => !labelKey.startsWith(prefix)),
    ) as Omit<T, `label-${string}`>,
    { labels },
  );
}
