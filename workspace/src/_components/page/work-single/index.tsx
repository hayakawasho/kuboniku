import { mapWorkTitle, mapWorkRole, mapWorkCreateAt } from "~/(work)/model/mapper";
import { WorkScreenshots } from "~/_components/model/work/work-screenshots";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { Link } from "~/_components/ui/link";
import { ResponsiveImage } from "~/_components/ui/responsive-image";
import { formatCloudinary } from "~/_foundation/cloudinary";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/(work)/model";
import type { RouteName } from "~/_foundation/types";

type Props = {
  post: WorkMetadata;
  nextPost: WorkMetadata;
  projectNumber: number;
  namespace: RouteName;
};

const Component: React.FC<Props> = props => {
  const { post, nextPost, projectNumber, namespace } = props;

  return (
    <PageLayout header={<Header current={namespace} />} namespace={namespace}>
      <main className="" data-color={post.theme} data-component="WorkSingle">
        <div className={Styles.kv} data-ref="kv">
          <div className={Styles.kv__cont}>
            <p className={Styles.project}>
              {zeroPadding(projectNumber)}
              <span className="ml-[.8rem]">Project</span>
            </p>
            <h1 className={Styles.heading}>{mapWorkTitle(post)}</h1>
            <p className={Styles.sub}>
              <span className="inline-block origin-right">{post.category}</span>
            </p>
          </div>
          <ResponsiveImage
            alt=""
            className="object-cover h-full absolute inset-0 m-auto opacity-40"
            mob={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
            mobSize={[post.mv["pc"].width, post.mv["pc"].height]}
            size={[post.mv["pc"].width, post.mv["pc"].height]}
            src={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
          />
        </div>
        <div className={Styles.body} data-ref="content">
          <div className={`${Styles.introLayout} my-[6rem] pc:my-[9rem]`}>
            <div className={Styles.intro}>
              <div className={Styles.intro__info}>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Year</dt>
                  <dd className={Styles.dd}>{mapWorkCreateAt(post)}</dd>
                </dl>
                <dl className={Styles.dl}>
                  <dt className={Styles.dt}>Role</dt>
                  <dd className={`${Styles.dd} uppercase`}>{mapWorkRole(post)}</dd>
                </dl>
              </div>
              <div className={Styles.intro__desc}>
                {post.description && <p className={Styles.intro__desc}>{post.description}</p>}
                {post.siteUrl && (
                  <a className={Styles.viewLink} data-cursor="scale" href={post.siteUrl} rel="noopener" target="_blank">
                    View website
                    <div className={Styles.viewLink__line} />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={`${Styles.captchaItems} mb-[10.5rem] pc:mx-auto pc:mb-[18.2rem]`}>
            {post.screenshots && <WorkScreenshots screenshots={post.screenshots} />}
            {post.showreel && (
              <video autoPlay className="w-full" loop muted playsInline preload="none" src={post.showreel.url}></video>
            )}
          </div>
          {nextPost && (
            <aside className={`${Styles.kv} !h-screen`}>
              <div className="h-full absolute inset-0 m-auto z-10">
                <Link className={Styles.kv__cont} data-cursor="scale" href={`/work/${post.slug}/`}>
                  <h2 className={Styles.heading}>Next Project</h2>
                  <p className={Styles.sub}>{mapWorkTitle(post)}</p>
                </Link>
                <ResponsiveImage
                  alt=""
                  className="object-cover h-full absolute inset-0 m-auto opacity-40 saturate-0 brightness-[0.8]"
                  mob={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
                  mobSize={[post.mv["pc"].width, post.mv["pc"].height]}
                  size={[post.mv["pc"].width, post.mv["pc"].height]}
                  src={formatCloudinary(post.mv["pc"].url, "f_auto,q_auto,w_1440")}
                />
              </div>
            </aside>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
