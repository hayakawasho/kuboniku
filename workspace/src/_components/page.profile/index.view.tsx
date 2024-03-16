import Styles from "./index.module.scss";
import { Header } from "../../_components/header/index.view";
import { PageWrapper } from "../page-wrapper/index.view";
import ImgGrad from "../../assets/grad.jpg";

const Component: React.FC = () => {
  return (
    <PageWrapper header={<Header current="profile" />} namespace="profile">
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
              <h2 className={`${Styles.heading} mb-[.8rem] pc:mb-[.3rem]`}>Nagisa Kubo</h2>
              <p className={`${Styles.sub} mb-[2.4rem] pc:mb-[3rem]`}>Art Director & Designer</p>
              <div className={Styles.about}>
                <p>
                  1989年10月5日生まれ。京丹後という海近くで生まれる。
                  <br />
                  辻製菓専門学校卒。パティシエとして東京に就職するもその3年後、2013年より都内のweb制作会社へ就職。そして2016年、今の株式会社パノラマに就職。主にアートディレクション、web/logoデザインの制作を担う。自分の武器としてはスピードに加え、コーポレートサイト/ブランドサイト/ゲームサイトなど幅広い分野にて100%の課題解決を目指したデザインをお客様へ提供すること。お肉がとにかく好き。焼肉を食べることと、お笑い、アニメを見ることがライフワーク。
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
