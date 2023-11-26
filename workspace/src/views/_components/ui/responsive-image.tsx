import { mq } from "@/_foundation/mq";

type Props = {
  src: string;
  size: [number, number];
  mob: string;
  mobSize: [number, number];
  className?: string;
  alt: string;
};

export function ResponsiveImage(props: Props) {
  return (
    <picture>
      <source
        height={props.size[1]}
        media={mq.pc}
        srcSet={props.src}
        width={props.size[0]}
      />
      <source
        height={props.mobSize[1]}
        media={mq.sp}
        srcSet={props.mob}
        width={props.mobSize[0]}
      />
      <img
        alt={props.alt}
        className={props.className}
        decoding="async"
        height={props.mobSize[1]}
        src={props.mob}
        width={props.mobSize[0]}
      />
    </picture>
  );
}
