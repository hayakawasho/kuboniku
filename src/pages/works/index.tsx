import Link from 'next/link'
import styles from './index.module.scss'
import Image from 'next/image';

const Component: React.FC = () => {
  return (
    <>
      <div data-controller="skew">

        <h1 id="js-headingWorks" className={styles.heading} data-target="skew.item">Works
          <sup>2</sup>
        </h1>
        <div className={`${styles.entryList} o-grid`}>
          <article className="o-grid__item || js-entryWorks" data-smooth-item>
            <Link href="/works/sample">
              <a className={styles.entry}>
                <div className="u-abs u-pos-tl u-fit" data-scroll-skew>
                  <div className={styles.eyecatch}>
                    <Image
                      src={"/img/works1/kv1.jpg"}
                      alt=""
                      width={2535}
                      height={1538}
                    />
                  </div>
                  <div className={styles.entry__hgroup}>
                    <p>01<span>Project</span></p>
                    <h2>Potanini</h2>
                  </div>
                </div>
              </a>
            </Link>
          </article>
        </div>
        <div className={styles.loader} />
      </div>
    </>
  )
}

export default Component
