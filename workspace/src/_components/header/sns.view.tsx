import Styles from "./sns.module.scss";

export const Sns = () => {
  return (
    <details className={Styles.sns} data-component="Sns">
      <ul className="mb-[2rem] pc:mb-[3rem] text-center">
        <li className="overflow-hidden mb-[2rem]">
          <a
            className={Styles.snsLabel}
            data-ref="snsLabel"
            href="https://www.facebook.com/k.b.nagisa"
            rel="noopener"
            target="_blank"
            data-cursor="scale"
          >
            <span>Fb</span>
          </a>
        </li>
        <li className="overflow-hidden">
          <a
            className={Styles.snsLabel}
            data-ref="snsLabel"
            href="https://twitter.com/p3b9lwry"
            rel="noopener"
            target="_blank"
            data-cursor="scale"
          >
            <span>X</span>
          </a>
        </li>
      </ul>

      <summary className={Styles.plus} data-ref="plus" data-cursor="scale">
        <div className="relative w-full h-full">
          <div className={Styles.plus__front}>
            <div className={Styles.plus__x}>
              <span className="origin-right" data-ref="frontPlusX"></span>
            </div>
            <div className={Styles.plus__y}>
              <span className="origin-left" data-ref="frontPlusY"></span>
            </div>
          </div>
          <div className={Styles.plus__back}>
            <div className={Styles.plus__x}>
              <span className="origin-left" data-ref="backPlusX"></span>
            </div>
            <div className={Styles.plus__y}>
              <span className="origin-right" data-ref="backPlusY"></span>
            </div>
          </div>
        </div>
      </summary>
    </details>
  );
};
