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
                  data-ref="projectItem"
                  to={`/work/${item.slug}/`}
                >
                  <div aria-hidden="true" className={Styles.aspect}></div>
                  <div className={Styles.entry__g}>
                    <figure className={Styles.thumb}>
                      <img
                        alt=""
                        className="_img"
                        data-ref="thumb"
                        decoding="async"
                        height={item.mv["pc"].height}
                        src={cloudinaryAPIConverter(
                          item.mv["pc"].url,
                          "f_auto,q_auto,w_630,e_grayscale"
                        )}
                        width={item.mv["pc"].width}
                      />
                    </figure>
                    <div className={Styles.entry__hgroup} data-ref="hgroup">
                      <p className={`${Styles.num} | mb-[1.2rem] | pc:mb-[1.5rem]`}>
                        {zeroPadding(total - index)}
                        <span className="ml-[.8em]">Project</span>
                      </p>
                      <h2 className={Styles.entry__heading}>{selectTitle(item)}</h2>
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
