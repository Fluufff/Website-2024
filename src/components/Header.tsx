import { StaticImageData } from 'next/image';

export function Header(props: {
  image: StaticImageData | undefined;
  title: string;
  subtitle: string;
}) {
  const { image, title, subtitle } = props;

  return (
    <div
      className="o-header"
      style={
        image && {
          backgroundImage: `url(${image.src})`,
        }
      }>
      <div className="u-container">
        <h1 className="o-header__title">{title}</h1>
        <p className="o-header__sub-title">{subtitle}</p>
      </div>
    </div>
  );
}
