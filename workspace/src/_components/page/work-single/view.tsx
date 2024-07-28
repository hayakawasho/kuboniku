import React from "react";
import { mapWorkTitle } from "~/(work)/model/mapper";
import { WorkIntro } from "~/_components/model/work/work-intro";
import { WorkKv } from "~/_components/model/work/work-kv";
import { WorkScreenshots } from "~/_components/model/work/work-screenshots";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { Link } from "~/_components/ui/link";
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
          <WorkKv className="" mv={post.mv} />
        </div>

        <div className={Styles.body} data-ref="content">
          <div className={`${Styles.introLayout} my-[6rem] pc:my-[9rem]`}>
            <WorkIntro post={post} />
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
                <Link className={Styles.kv__cont} data-cursor="scale" to={`/work/${nextPost.slug}/`}>
                  <h2 className={Styles.heading}>Next Project</h2>
                  <p className={Styles.sub}>{mapWorkTitle(nextPost)}</p>
                </Link>
                <WorkKv className="saturate-0 brightness-[0.8]" mv={nextPost.mv} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
