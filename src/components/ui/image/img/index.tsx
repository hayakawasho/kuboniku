// import Image, { ImageProps } from 'next/image';

const Component = props => {
  return (
    <img
      src={props.src}
      loading="lazy"
      decoding="async"
      width={props.width}
      height={props.height}
    />
  );
};

export default Component;
