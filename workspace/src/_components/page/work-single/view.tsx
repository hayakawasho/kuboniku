import { WorkIntro } from "~/_components/model/work/work-intro";
import { WorkKv } from "~/_components/model/work/work-kv";
import { WorkNextKv } from "~/_components/model/work/work-kv/next-kv";
import { WorkScreenshots } from "~/_components/model/work/work-screenshots";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import Styles from "./style.module.scss";
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
        <WorkKv post={post} projectNumber={projectNumber} />
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
          {nextPost && <WorkNextKv post={nextPost} />}
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
