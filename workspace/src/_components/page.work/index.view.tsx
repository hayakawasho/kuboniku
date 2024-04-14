import { Header } from "@/_components/header/index.view";
import { PageWrapper } from "@/_components/page-wrapper/index.view";
import { Link } from "@/_components/ui/link";
import { selectTitle } from "@/_components/work/selector";
import { cloudinaryAPIConverter } from "@/_foundation/converter";
import { zeroPadding } from "@/_foundation/utils";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "@/_components/work";
import type { RouteName } from "@/_foundation/type";

type Props = {
  posts: WorkMetadata[];
  total: number;
  namespace: RouteName;
};

const Component: React.FC<Props> = props => {
  const { posts, total, namespace } = props;

  return (
    <PageWrapper header={<Header current={namespace} />} namespace={namespace}>
      <main data-component="Works">
        <canvas
          aria-hidden="true"
          className="glCanvas | opacity-80 backface-hidden"
          data-ref="canvas"
        ></canvas>
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
                    <div className={Styles.poster} aria-hidden="true"></div>
                    <div
                      data-visible="false"
                      className={Styles.thumb}
                      data-ref="thumb"
                      data-src={cloudinaryAPIConverter(item.mv["pc"].url, "f_auto,q_auto,w_1440")}
                      role="img"
                    ></div>
                    <div className={Styles.entry__hgroup}>
                      <p className={`${Styles.num} mb-[1.2rem] pc:mb-[1.5rem] italic`}>
                        {zeroPadding(total - index)}
                        <span className={`${Styles.num__txt} ml-[.8em]`}>Project</span>
                      </p>
                      <h2 className={Styles.entry__heading} data-ref="title">
                        {selectTitle(item)}
                      </h2>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </PageWrapper>
  );
};

export default Component;
