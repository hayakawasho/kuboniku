import { BREAK_POINTS } from "~/_foundation/const";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  size: [number, number];
  mob: string;
  mobSize: [number, number];
  className?: string;
  alt: string;
};

export const ResponsiveImage: React.FC<Props> = ({ size, src, mob, mobSize, alt, ...props }) => {
  return (
    <picture>
      <source height={size[1]} media={BREAK_POINTS["pc"]} srcSet={src} width={size[0]} />
      <source height={mobSize[1]} media={BREAK_POINTS["sp"]} srcSet={mob} width={mobSize[0]} />
      <img {...props} alt={alt} decoding="async" height={mobSize[1]} src={mob} width={mobSize[0]} />
    </picture>
  );
};
