import tw, { css } from 'twin.macro';

interface IPicture {
  src: string;
  srcSet: string;
  mobile?: string;
  importance?: 'low' | 'high';
}

const Picture = ({ src, srcSet, mobile }: IPicture) => {
  return (
    <picture css={picture}>
      {mobile && <source media="(max-width: 639px)" srcSet={mobile} />}
      <img
        src={src}
        srcSet={srcSet}
        alt=""
        decoding="async"
        css={picture__img}
      />
    </picture>
  );
};

export { Picture };

const picture = css`
  ${tw`absolute w-full h-full top-0 left-0 opacity-80`}
  z-index: 1;
  backface-visibility: hidden;
`;

const picture__img = css`
  ${tw`absolute w-full h-full top-0 left-0 object-cover object-center`}
`;
