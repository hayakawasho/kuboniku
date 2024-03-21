import React from "react";
import { Header } from "@/_components/header/index.view";
import { Link } from "@/_components/ui/link";
import { ResponsiveImage } from "@/_components/ui/responsive-image";
import { selectRole, selectYear, selectTitle } from "@/_components/work/selector";
import { cloudinaryAPIConverter } from "@/_foundation/converter";
import { zeroPadding } from "@/_foundation/utils";
import Styles from "./index.module.scss";
import { PageWrapper } from "../page-wrapper/index.view";
import type { WorkMetadata } from "@/_components/work";
import type { RouteName } from "@/_foundation/type";

type Props = {
  post: WorkMetadata;
  nextPost: WorkMetadata;
  projectNumber: number;
  namespace: RouteName;
};

const Component: React.FC<Props> = props => {
  const { post, nextPost, projectNumber, namespace } = props;

  return (
    <PageWrapper header={<Header current={namespace} />} namespace={namespace}>
      <main data-color={post.theme} data-component="WorksSingle">
        <div data-ref="progressBar"></div>
        <div className={Styles.kv}>
          <div className={Styles.kv__cont}>
            <p className={Styles.project}>
              {zeroPadding(projectNumber)}
              <span className="ml-[.8rem]">Project</span>
            </p>
            <h1 className={`${Styles.heading} pl-[1.1rem] pr-[.5em]`}>{selectTitle(post)}</h1>
            <p className={`${Styles.sub} pl-[1.3rem] mt-[.8rem] overflow-hidden`}>
              <span className="inline-block origin-right">
                {post.category}
                <i className="icon-arrow_right | ml-[.8rem]" />
              </span>
            </p>
          </div>
          <ResponsiveImage
            alt=""
            className="opacity-40 object-cover h-full absolute inset-0 m-auto"
            mob={cloudinaryAPIConverter(post.mv["sp"].url, "f_auto,q_auto,w_750")}
            mobSize={[post.mv["sp"].width, post.mv["sp"].height]}
            size={[post.mv["pc"].width, post.mv["pc"].height]}
            src={cloudinaryAPIConverter(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
          />
          <div className={Styles.kv__scrollDown}>
            <div className="relative w-full h-full overflow-hidden">
              <div className={Styles.kv__scrollLabel} data-text="scroll">
                scroll
              </div>
            </div>
            <i className="icon-arrow_down | block mt-[1.4rem] text-[1.2rem] text-center" />
          </div>
        </div>

        <div className={Styles.body}>
          <div className={`${Styles.introLayout} my-[6rem] pc:mt-[10rem] pc:mb-[9rem]`}>
            <div className={Styles.intro}>
              <div className={Styles.intro__info}>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Year :</dt>
                  <dd className={Styles.dd}>{selectYear(post)}</dd>
                </dl>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Role :</dt>
                  <dd className={Styles.dd}>{selectRole(post)}</dd>
                </dl>
              </div>
              <div className={Styles.intro__desc}>
                {post.description && <p className={Styles.intro__desc}>{post.description}</p>}
                {post.siteUrl && (
                  <a
                    className="relative"
                    data-cursor="scale"
                    href={post.siteUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    View website
                    <div className={Styles.intro__viewLinkLine} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={`${Styles.captchaItems} mb-[10.5rem] pc:mx-auto pc:mb-[18.2rem]`}>
            {post.screenshots && (
              <ul>
                {post.screenshots.map((item, index: number) => {
                  return (
                    <li className="mb-[2rem] pc:mb-[6rem]" key={index}>
                      <ResponsiveImage
                        alt=""
                        className="w-full"
                        mob={cloudinaryAPIConverter(item.url, "f_auto,q_auto,w_750")}
                        mobSize={[item.width, item.height]}
                        size={[item.width, item.height]}
                        src={cloudinaryAPIConverter(item.url, "f_auto,q_auto,w_1440")}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            {post.showreel && (
              <video
                autoPlay
                className="w-full"
                loop
                muted
                playsInline
                preload="none"
                src={post.showreel.url}
              ></video>
            )}
          </div>

          <aside className={`${Styles.kv} !h-screen`}>
            <Link className="h-full absolute inset-0 m-auto z-10" to={`/work/${nextPost.slug}/`}>
              <div className={Styles.kv__cont}>
                <h2 className={`${Styles.heading} pl-[1.1rem] pr-[.5em]`}>Next Project</h2>
                <p className={`${Styles.sub} pl-[1.3rem] mt-[.8rem] overflow-hidden`}>
                  {selectTitle(nextPost)}
                  <i className="icon-arrow_right | ml-[.8rem]" />
                </p>
              </div>
              <ResponsiveImage
                alt=""
                className="opacity-40 filter grayscale-100 object-cover h-full absolute inset-0 m-auto"
                mob={cloudinaryAPIConverter(nextPost.mv["sp"].url, "f_auto,q_auto,w_750")}
                mobSize={[nextPost.mv["sp"].width, nextPost.mv["sp"].height]}
                size={[nextPost.mv["pc"].width, nextPost.mv["pc"].height]}
                src={cloudinaryAPIConverter(nextPost.mv["pc"].url, "f_auto,q_auto,w_1440")}
              />
            </Link>
          </aside>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Component;
