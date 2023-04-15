type Props = {
  pcSrc: string
  spSrc: string
  pcW: number | string
  pcH: number | string
  spW: number | string
  spH: number | string
  className?: string
  alt?: string
}

export const Picture = (props: Props) => {
  return (
    <picture>
      <source
        srcSet={props.pcSrc}
        media="(min-width: 640px)"
        width={props.pcW}
        height={props.pcH}
      />
      <source srcSet={props.spSrc} width={props.spW} height={props.spH} />
      <img src={props.spSrc} className={props.className} alt={props.alt} decoding="async" />
    </picture>
  )
}
