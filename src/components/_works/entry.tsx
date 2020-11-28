import React from 'react'
import Link from 'next/link'
import styles from './entry.module.scss'

import loadable from '@loadable/component'

const Img = loadable(() => import('~/components/img'))

import Utils from '~/foundation/utils/Utils'

const Component = React.memo((props: { data, index }) => {
  const { data, index } = props
  return (
    <>
      <article className="o-grid__item" data-smooth-item>
        <Link href={'/works/' + data.node.slug}>
          <a className={styles.entry}>
            <div className="c-aspect" style={{ backgroundColor: `${data.node.acf.themeColor}` }} />
            <div className="u-abs u-pos-tl u-fit">
              <div className={styles.eyecatch}>
                <Img src={data.node.acf.eyecatch.sourceUrl} />
              </div>
              <div className={styles.entry__hgroup}>
                <p className={styles.index}>{Utils.zeroPadding(index, 2)}<span>Project</span></p>
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
