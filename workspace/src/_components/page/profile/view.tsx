import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { ResponsiveImage } from "~/_components/ui/responsive-image";
import profileNameImg from "~/assets/profile.png";
import profileNameSpImg from "~/assets/profile_sp.png";
import Styles from "./style.module.scss";
import type { RouteName } from "~/_foundation/types";

const Component: React.FC<{
  namespace: RouteName;
}> = ({ namespace }) => {
  return (
    <PageLayout header={<Header current={namespace} />} namespace={namespace}>
      <main className="overflow-hidden" data-component="Profile">
        <h1 className="sr-only">Profile</h1>
        <div className="relative z-[2]">
          <img
            alt=""
            className={`${Styles.logo} opacity-0 sp:hidden`}
            data-height={profileNameImg.height}
            data-ref="profileLogo"
            data-src={profileNameImg.src}
            data-width={profileNameImg.width}
            height={profileNameImg.height}
            width={profileNameImg.width}
          />
          <ResponsiveImage
            alt=""
            className={`${Styles.logo} pc:hidden`}
            mob={profileNameSpImg.src}
            mobSize={[profileNameSpImg.width, profileNameSpImg.height]}
            size={[1, 1]}
            src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
          ></ResponsiveImage>
          <div className={Styles.textGroup}>
            <div className={Styles.textGroup__in}>
              <h2 className={`${Styles.heading} mb-[.8rem] | sp:mr-[-.4em]`}>Nagisa Kubo</h2>
              <p className={`${Styles.sub} mb-[2.4rem] pc:mb-[3rem]`}>Art Director & Designer & Management</p>
              <div className={Styles.about}>
                <p>
                  アートディレクター、Webデザイナー久保渚のポートフォリオサイトです。
                  <br className="sp:hidden" />
                  最高の価値体験を実現するために、私はデジタルデザインを通じて製品を作ることに情熱を注いでいます。株式会社パノラマでは、主にアートディレクション、Web/Logoデザインの制作を担っており、自分の武器としてはスピードに加え、コーポレートサイト/ブランドサイト/ゲームサイトなど幅広い分野にて100%以上の課題解決を目指したデザインをお客様へ提供することです。また、デザインチームのマネジメントも行っております。
                  <br className="sp:hidden" />
                  お肉がとにかく好き。焼肉を食べることと、お笑い、アニメを見ることがライフワーク。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
