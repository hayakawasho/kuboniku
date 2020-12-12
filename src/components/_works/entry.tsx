import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './entry.module.scss'
import Utils from '~/foundation/utils/Utils'

import { useDispatch } from 'react-redux'
import { SET_THEME_COLOR } from '~/state/ui'

const Component = React.memo(({ data, index }: { data; index }) => {
  const dispatch = useDispatch()

  return (
    <>
      <article className="o-grid__item" data-smooth-item>
        <Link href={'/works/' + data.node.slug}>
          <a className={styles.entry}>
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
          </a>
        </Link>
      </article>
    </>
  )
})

export default Component
