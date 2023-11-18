import * as styles from "./header.css";
import { Sns } from "./sns";
import { Link } from "../ui/link";
import type { RouteName } from "@/_foundation/type";

type Props = {
  current: RouteName;
};

export const Header = ({ current }: Props) => {
  return (
    <div data-component="NavMenu">
      <header className="">
        <Link css={styles.brandLogo} to="/">
          <i className="icon-logo"></i>
          <span className="sr-only">Kuboniku.com</span>
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

        <Sns />

        <small css={styles.copyright}>@KuboNiku.com</small>
      </header>

      <div css={styles.menu} data-ref="menu">
        <div className="w-full h-full relative">
          <div className="pc:hidden" css={styles.menu__mask} data-ref="mask" />
          <div className="pc:hidden" css={styles.menu__bg} data-ref="menuBg" />
          <div
            css={styles.menu__content}
            data-ref="menuContent"
            data-current={current}
          />
        </div>
      </div>
    </div>
  );
};
