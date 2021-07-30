import Image, { ImageProps } from 'next/image';
import { withOrientationChange } from 'react-device-detect';

interface IProps {
  src: string;
  mobile: string;
  priority?: ImageProps['priority'];
  alt?: string;
  isLandscape?: boolean;
  isPortrait?: boolean;
}

const Component = (props: IProps) => {
  const newProps = {
    layout: 'fill' as ImageProps['layout'],
    priority: props.priority,
    loading: props.priority ? 'eager' : ('lazy' as ImageProps['loading']),
    alt: props.alt,
  };

  return (
    <>
      {
        // props.isPortrait && <Image {...newProps} src={props.mobile} />}
      }
      {
        // props.isLandscape && <Image {...newProps} src={props.src} />}
      }
    </>
  );
};

export default withOrientationChange(Component);
