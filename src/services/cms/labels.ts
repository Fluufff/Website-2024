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
        labelKey.startsWith(prefix) && isQuirkyLabelTrue(labelValue),
    )
    .map(([labelKey]) => labelKey.substring(prefix.length));

  return Object.assign(
    Object.fromEntries(
      entries.filter(([labelKey]) => !labelKey.startsWith(prefix)),
    ) as Omit<T, `label-${string}`>,
    { labels },
  );
}

/** (Taiga #23) lack of boolean field is compensated by using a text field with
 * special interpretation, which we parse here.
 *
 * We go for the classic: "no", "n", "false", "0", "", null, are all considered
 * false. The rest is considered true.
 *
 * We also return booleans as-is for forward compatibility.
 */
function isQuirkyLabelTrue(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    switch (value.toLowerCase()) {
      case '':
      case 'n':
      case 'no':
      case '0':
      case 'false':
        return false;
      default:
        return true;
    }
  } else {
    // we don't expect anything other than null here
    return false;
  }
}
