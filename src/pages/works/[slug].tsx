import Layout from '../../components/Layout'
import Link from 'next/link'
import styles from './index.module.scss'

const Component: React.FC = () => {
  return (
    <Layout title={` | KuboNiku.com`}>
      <div data-controller="skew">

        <div className={styles.kv}>
          <div className={styles.kv__cont}>
            <p className="num">01<span>Project</span></p>
            <h1 className={styles.heading}>Test</h1>
            <p></p>
          </div>
          <div className={styles.kv__img}>

          </div>
          <div className={styles.kv__foot}>
            <span>scroll</span>
          </div>
        </div>

        <div className={styles.content}>

          <div className={styles.intro}>
            <div className={styles.intro__info}>
              <dl className={styles.dl}>
                <dt>Year</dt>
                <dd></dd>
              </dl>
              <dl className={styles.dl}>
                <dt>Role</dt>
                <dd className="u-uppercase"></dd>
              </dl>
            </div>
            <div className={styles.intro__p}>
              <a className="c-link" href="#" target="_blank" rel="noopener">View website
                <div className="c-link__hr"></div>
              </a>
            </div>
          </div>

          <div className={styles.captcha}>

          </div>

          <aside className={`${styles.kv} is-next`}>
            <div className={styles.kv__cont}>
              <h2 className={styles.heading}>Next Project</h2>
              <p></p>
            </div>
            <div className={styles.kv__img}>

            </div>
          </aside>

        </div>
      </div>
    </Layout>
  )
}

export default Component;
