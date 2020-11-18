import Link from 'next/link'
import styles from './detail.module.scss'
import Image from 'next/image';

const Component: React.FC = () => {
  return (
    <>
      <div data-controller="skew">
        <div className={styles.kv} data-smooth-item>
          <div className={styles.kv__cont}>
            <p className="num">01<span>Project</span></p>
            <h1 className={styles.heading}>Potanini</h1>
            <p>Official website</p>
          </div>
          <div className={styles.kv__img} data-target="skew.item">
            <Image
              src={"/img/works1/kv1.jpg"}
              alt=""
              width={2535}
              height={1538}
            />
          </div>
          <div className={styles.kv__foot}>
            <span>scroll</span>
          </div>
        </div>

        <div className={styles.content} data-target="skew.item">

          <div className={styles.intro} data-smooth-item>
            <div className={styles.intro__info}>
              <dl className={styles.dl}>
                <dt>Year</dt>
                <dd>March 1, 2019</dd>
              </dl>
              <dl className={styles.dl}>
                <dt>Role</dt>
                <dd className="u-uppercase">ART DIRECTION</dd>
                <dd className="u-uppercase">WEB DESIGN</dd>
              </dl>
            </div>
            <div className={styles.intro__p}>
              <p data-controller="splitText">2018年、MASTER WORKSは世に「傑作」を送るべく、ここ日本で生まれました。<br />
              ブランド由来は、MASTER（＝匠） WORKS（＝作品）。世界各地の優れた工房、メーカーを見出しそれぞれから素材、商品供給、支援を受けた職人たちのマスターピース。<br />
              それらを集め、最高レベルのジャパンクォリティで生み出すことMASTER WORKS。</p>
              <a className="c-link" href="#" target="_blank" rel="noopener">View website
                <div className="c-link__hr"></div>
              </a>
            </div>
          </div>

          <div className={styles.captcha} data-smooth-item>
            <ul className="blocks-gallery-grid">
              <li>
                <Image
                  src={"/img/works1/img1.jpg"}
                  alt=""
                  width={2192}
                  height={1380}
                />
              </li>
              <li>
                <Image
                  src={"/img/works1/img2.jpg"}
                  alt=""
                  width={2192}
                  height={1380}
                />
              </li>
            </ul>
          </div>

          <aside className={`${styles.kv} is-next`} data-smooth-item>
            <div className={styles.kv__cont}>
              <h2 className={styles.heading}>Next Project</h2>
              <p>PONCOTAN</p>
            </div>
            <div className={styles.kv__img}>
              <Image
                src={"/img/works2/kv1.jpg"}
                alt=""
                width={2535}
                height={1538}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Component;
