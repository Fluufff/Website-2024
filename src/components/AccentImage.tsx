import classNames from 'classnames';
import Image from 'next/image';

type ImageProps = React.ComponentProps<typeof Image>;

type Props = {
  variant?: 'alt' | 'top';
  src: ImageProps['src'];
};

/** Deocrative image for section elements (`o-section`).
 *
 * Note: avoid using outside of sections. Correct positioning relies on a
 * position:relative parent.
 */
export function AccentImage({ variant, src }: Props) {
  return (
    <div
      className={classNames(
        'o-section__accent-image',
        variant && `o-section__accent-image--${variant}`,
      )}>
      <Image src={src} alt="" />
    </div>
  );
}
