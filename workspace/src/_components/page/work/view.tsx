import { mapWorkTitle } from "~/(work)/model/mapper";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { Link } from "~/_components/ui/link";
import { formatCloudinaryAPI } from "~/_foundation/cloudinary";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/(work)/model";
import type { RouteName } from "~/_foundation/types";

type Props = {
  posts: WorkMetadata[];
  total: number;
  namespace: RouteName;
};

const Component: React.FC<Props> = props => {
  const { posts, total, namespace } = props;

  return (
    <PageLayout header={<Header current={namespace} />} namespace={namespace}>
      <main className="relative z-[2]" data-component="Works">
        <div className="pt-[10rem] mb-[6rem] pc:pt-[14.4rem] pc:mb-[3rem]">
          <h1 className={Styles.heading} data-ref="h1">
            Work
            <sup className={Styles.heading__total}>{total}</sup>
          </h1>
        </div>
        <div className={Styles.entries} data-ref="index" data-total={total}>
          {posts.map((item, index: number) => {
            return (
              <article className={Styles.entryWrap} key={item.id}>
                <Link
                  className={Styles.entry}
                  data-color={item.theme}
                  data-cursor="scale"
                  data-ref="projectItem"
                  to={`/work/${item.slug}/`}
                >
                  <div aria-hidden="true" className={Styles.aspect}></div>
                  <div className={Styles.entry__g}>
                    <div aria-hidden="true" className={Styles.poster}></div>
                    <div
                      aria-label=""
                      className={Styles.thumb}
                      data-height={item.mv["pc"].height}
                      data-ref="thumb"
                      data-src={formatCloudinaryAPI(item.mv["pc"].url, "f_auto,q_auto,w_1440")}
                      data-visible="false"
                      data-width={item.mv["pc"].width}
                      role="img"
                    ></div>
                    <div className={Styles.entry__hgroup}>
                      <p className={`${Styles.num} mb-[1.2rem] pc:mb-[1.5rem] italic`}>
                        {zeroPadding(total - index)}
                        <span className={`${Styles.num__txt} ml-[.8em]`}>Project</span>
                      </p>
                      <h2 className={Styles.entry__heading} data-ref="title">
                        {mapWorkTitle(item)}
                      </h2>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
