import * as styles from "./header.css";
import { NavMenu } from "./nav-menu";
import { Sns } from "./sns";
import { Link } from "../ui/link";

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

        <Sns />

        <small css={styles.copyright}>@KuboNiku.com</small>
      </header>

      <NavMenu current={current} />
    </>
  );
};
