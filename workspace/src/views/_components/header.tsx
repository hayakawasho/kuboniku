import * as styles from "./header.css";

type Props = {
  current: "WORKS" | "WORKS_DETAIL" | "PROFILE";
};

export const Header = ({ current }: Props) => {
  return (
    <>
      <header className="">
        <a css={styles.brandLogo} href="/">
          <i className="icon-logo"></i>
          <span className="sr-only">KuboNiku.com</span>
        </a>

        <button
          aria-label="menu"
          className="u-sp"
          css={styles.burger}
          data-ref="menuTrigger"
          id="js-menu__onOff"
        >
          <div className="u-in my-0 mx-auto transform-gpu flex items-center justify-center flex-col z-10">
            <div css={styles.burger__line} data-ref="burgerTL"></div>
            <div css={styles.burger__line} data-ref="burgerBL"></div>
          </div>
        </button>

        <div css={styles.sns} data-component="Sns">
          <ul className="mb-[2rem] sm:mb-[3rem] text-center">
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
                Tw
              </a>
            </li>
          </ul>

          <button aria-label="sns" css={styles.plus} data-ref="toggleTrigger">
            <div className="u-in">
              <div css={styles.plus__x}></div>
              <div css={styles.plus__y}></div>
            </div>
          </button>
        </div>

        <small css={styles.copyright}>@KuboNiku.com</small>
      </header>

      <nav css={styles.menu} data-ref="menuBody" role="navigation">
        <div className="u-in">
          <div className="u-sp" css={styles.menu__mask} data-ref="menuMask" />
          <div className="u-sp" css={styles.menu__bg} data-ref="menuBg" />
          <ul
            css={styles.menu__links}
            data-current={current}
            data-ref="menuLinks"
          ></ul>
        </div>
      </nav>
    </>
  );
};
