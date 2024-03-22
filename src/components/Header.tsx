import { StaticImageData, getImageProps } from 'next/image';

export function Header(props: {
  image: StaticImageData | undefined;
  title: string;
  subtitle: string;
}) {
  const { image, title, subtitle } = props;

  const { props: imageProps } = image
    ? getImageProps({ src: image, alt: '' })
    : { props: undefined };

  return (
    <div
      className="o-header"
      style={
        imageProps && {
          backgroundImage: `url(${imageProps.src})`,
        }
      }>
      <div className="u-container">
        <h1 className="o-header__title">{title}</h1>
        <p className="o-header__sub-title">{subtitle}</p>
      </div>
    </div>
  );
}
