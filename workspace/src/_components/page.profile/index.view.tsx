import Styles from "./index.module.scss";
import { Header } from "../../_components/header/index.view";
import ImgGrad from "../../assets/grad.jpg";
import { PageWrapper } from "../page-wrapper/index.view";
import type { RouteName } from "@/_foundation/type";

const Component: React.FC<{
  namespace: RouteName;
}> = ({ namespace }) => {
  return (
    <PageWrapper header={<Header current={namespace} />} namespace={namespace}>
      <main className="overflow-hidden" data-component="Profile">
        <h1 className="sr-only">Profile</h1>
        <div className="relative">
          <i
            className={`${Styles.logo} | icon-logo | sp:hidden`}
            style={{
              backgroundImage: `url(${ImgGrad.src})`,
            }}
          ></i>
          <i
            className={`${Styles.logo} | icon-logo_sp | pc:hidden`}
            style={{
              backgroundImage: `url(${ImgGrad.src})`,
            }}
          ></i>
          <div className={Styles.container}>
            <div className={Styles.container__in}>
              <h2 className={`${Styles.heading} mb-[.8rem]`}>Nagisa Kubo</h2>
              <p className={`${Styles.sub} mb-[2.4rem] pc:mb-[3rem]`}>Art Director & Designer</p>
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
    </PageWrapper>
  );
};

export default Component;
