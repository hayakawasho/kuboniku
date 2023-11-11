import * as styles from "./menu.css";

type Props = {
  current: "WORKS" | "WORKS_DETAIL" | "PROFILE";
};

export const NavMenu = ({ current }: Props) => {
  return (
    <nav css={styles.menu} data-ref="menuBody">
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
  );
};
