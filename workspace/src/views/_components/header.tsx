import * as styles from "./header.css";
import { Link } from "../_components/ui/link";

type Props = {
  current: "WORKS" | "WORKS_DETAIL" | "PROFILE";
};

export const Header = ({ current }: Props) => {
  return (
    <>
      <header className="">
        <Link css={styles.brandLogo} to="/">
          <i className="icon-logo"></i>
          <span className="sr-only">KuboNiku.com</span>
        </Link>

        <button
          aria-label="menu"
          className="pc:hidden"
          css={styles.burger}
          data-ref="menuTrigger"
          id="js-menu__onOff"
        >
          <div className="w-full h-full relative my-0 mx-auto transform-gpu flex items-center justify-center flex-col z-10">
            <div css={styles.burger__line} data-ref="burgerTL"></div>
            <div css={styles.burger__line} data-ref="burgerBL"></div>
          </div>
        </button>

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
                Tw
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

        <small css={styles.copyright}>@KuboNiku.com</small>
      </header>

      <nav css={styles.menu} data-ref="menuBody" role="navigation">
        <div className="w-full h-full relative">
          <div
            className="pc:hidden"
            css={styles.menu__mask}
            data-ref="menuMask"
          />
          <div className="pc:hidden" css={styles.menu__bg} data-ref="menuBg" />
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
