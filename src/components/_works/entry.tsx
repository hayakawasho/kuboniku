import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './entry.module.scss'
import Utils from '~/foundation/utils/Utils'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 40,
  (x - window.innerWidth / 2) / 40,
  1.06,
]

const trans: any = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Component = React.memo(({ data, index }: { data; index }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }))

  return (
    <>
      <article className="o-grid__item" data-smooth-item>
        <Link href={'/works/' + data.node.slug}>
          <animated.a
            className={styles.entry}
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
          >
            <div
              className="c-aspect"
              style={{ backgroundColor: `${data.node.acf.themeColor}` }}
            />
            <div className="u-abs u-pos-tl u-fit">
              <div className={styles.eyecatch}>
                <Image
                  src={data.node.acf.eyecatch.sourceUrl}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </div>
              <div className={styles.entry__hgroup}>
                <p className={styles.num}>
                  {Utils.zeroPadding(index, 2)}
                  <span>Project</span>
                </p>
                <h2 className={styles.heading}>{data.node.title}</h2>
              </div>
            </div>
          </animated.a>
        </Link>
      </article>
    </>
  )
})

export default Component
