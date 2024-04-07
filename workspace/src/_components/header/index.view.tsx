import Styles from "./index.module.scss";
import { Sns } from "./sns.view";
import { Link } from "../ui/link";
import noiseImg from "@/assets/noise_512x341.png";
import type { RouteName } from "@/_foundation/type";

type Props = {
  current: RouteName;
};

export const Header = ({ current }: Props) => {
  return (
    <div data-component="NavMenu">
      <header className="">
        <Link className={Styles.brandLogo} data-cursor="scale" to="/">
          <i className="icon-logo"></i>
          <span className="sr-only">Kuboniku.com</span>
        </Link>
        <button aria-label="menu" className={`${Styles.burger} | pc:hidden`} data-ref="menuTrigger">
          <div className="w-full h-full relative my-0 mx-auto transform-gpu flex items-center justify-center flex-col z-10">
            <div className={Styles.burger__line} data-ref="burgerTL"></div>
            <div className={Styles.burger__line} data-ref="burgerBL"></div>
          </div>
        </button>
        <Sns />
        <small className={Styles.copyright}>@KuboNiku.com</small>
      </header>
      <div className={Styles.menu} data-ref="menu">
        <div className="w-full h-full relative">
          <div aria-hidden="true" className={`${Styles.menu__mask} | pc:hidden`} data-ref="mask" />
          <div aria-hidden="true" className={`${Styles.menu__bg} | pc:hidden`} data-ref="menuBg">
            <div
              className="absolute inset-0 opacity-20 bg-repeat"
              style={{ backgroundImage: `url(${noiseImg.src})` }}
            ></div>
          </div>
          <div className={Styles.menu__content} data-current={current} data-ref="menuContent" />
        </div>
      </div>
    </div>
  );
};
