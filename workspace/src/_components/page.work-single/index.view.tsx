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
      <main data-color={post.theme} data-component="WorkSingle">
        <div className={Styles.kv}>
          <div className={Styles.kv__cont}>
            <p className={Styles.project}>
              {zeroPadding(projectNumber)}
              <span className="ml-[.8rem]">Project</span>
            </p>
            <h1 className={Styles.heading}>{selectTitle(post)}</h1>
            <p className={Styles.sub}>
              <span className="inline-block origin-right">{post.category}</span>
            </p>
          </div>
          <ResponsiveImage
            alt=""
            className="opacity-40 object-cover h-full absolute inset-0 m-auto"
            mob={cloudinaryAPIConverter(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
            mobSize={[post.mv["pc"].width, post.mv["pc"].height]}
            size={[post.mv["pc"].width, post.mv["pc"].height]}
            src={cloudinaryAPIConverter(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
          />
        </div>

        <div className={Styles.body}>
          <div className={`${Styles.introLayout} my-[6rem] pc:my-[9rem]`}>
            <div className={Styles.intro}>
              <div className={Styles.intro__info}>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Year</dt>
                  <dd className={Styles.dd}>{selectYear(post)}</dd>
                </dl>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Role</dt>
                  <dd className={`${Styles.dd} uppercase`}>{selectRole(post)}</dd>
                </dl>
              </div>
              <div className={Styles.intro__desc}>
                {post.description && <p className={Styles.intro__desc}>{post.description}</p>}
                {post.siteUrl && (
                  <a
                    className={Styles.viewLink}
                    data-cursor="scale"
                    href={post.siteUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    View website
                    <div className={Styles.viewLink__line} />
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

          {nextPost && (
            <aside className={`${Styles.kv} !h-screen`}>
              <div className="h-full absolute inset-0 m-auto z-10">
                <Link
                  className={Styles.kv__cont}
                  data-cursor="scale"
                  to={`/work/${nextPost.slug}/`}
                >
                  <h2 className={Styles.heading}>Next Project</h2>
                  <p className={Styles.sub}>{selectTitle(nextPost)}</p>
                </Link>
                <ResponsiveImage
                  alt=""
                  className={Styles.kv__nextImg}
                  mob={cloudinaryAPIConverter(nextPost.mv["pc"].url, "f_auto,q_auto,w_1440")}
                  mobSize={[nextPost.mv["pc"].width, nextPost.mv["pc"].height]}
                  size={[nextPost.mv["pc"].width, nextPost.mv["pc"].height]}
                  src={cloudinaryAPIConverter(nextPost.mv["pc"].url, "f_auto,q_auto,w_1440")}
                />
              </div>
            </aside>
          )}
        </div>
      </main>
    </PageWrapper>
  );
};

export default Component;
