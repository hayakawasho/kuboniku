// import Image, { ImageProps } from 'next/image';
// import { withOrientationChange } from 'react-device-detect';

interface IProps {
  src: string
  mobile?: string
  alt?: string
}

const Component = (props: IProps) => {
  // const newProps = {
  //   layout: 'fill' as ImageProps['layout'],
  //   priority: props.priority,
  //   loading: props.priority ? 'eager' : ('lazy' as ImageProps['loading']),
  //   alt: props.alt,
  // };

  return (
    <>
      <picture>
        <source srcSet={props.mobile} media="(max-width: 640px)" />
        <img src={props.src} alt="" decoding="async" />
      </picture>
      {
        // props.isPortrait && <Image {...newProps} src={props.mobile} />}
      }
      {
        // props.isLandscape && <Image {...newProps} src={props.src} />}
      }
    </>
  )
}

export default Component
