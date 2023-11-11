import * as styles from "./sns.css";

export const Sns = () => {
  return (
    <div css={styles.sns} data-component="Sns">
      <ul className="mb-[2rem] pc:mb-[3rem] text-center">
        <li className="overflow-hidden mb-[2rem]">
          <a
            css={styles.snsLabel}
            data-ref="icon"
            href="https://www.facebook.com/k.b.nagisa"
            rel="noopener"
            target="_blank"
          >
            Fb
          </a>
        </li>
        <li className="overflow-hidden">
          <a
            css={styles.snsLabel}
            data-ref="icon"
            href="https://twitter.com/p3b9lwry"
            rel="noopener"
            target="_blank"
          >
            X
          </a>
        </li>
      </ul>

      <button aria-label="sns" css={styles.plus} data-ref="toggleTrigger">
        <div className="w-full h-full relative">
          <div css={styles.plus__x}></div>
          <div css={styles.plus__y}></div>
        </div>
      </button>
    </div>
  );
};
