import { renderToStaticMarkup as r } from "react-dom/server";
import { zeroPadding } from "@/_foundation/utils";
import { cloudinaryApiConverter } from "@/_models/image/conveter";
import { selectTitle } from "@/_models/works/selector";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import { Link } from "./_components/ui/link";
import { ImagePreloader } from "./_components/ui/image-preloader";
import * as styles from "./index.css";
import type { WorkMetadata } from "@/_models/works";

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: "posts",
        data: "wp.works",
        size: 99,
      },
    };
  }

  render(props: any) {
    const posts = props.posts as WorkMetadata[];
    const total = props.wp.totalCount;

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="WORKS" />}
        namespace="WORKS"
        seo={
          <Seo
            permalink=""
            prepend={
              <>
                <ImagePreloader
                  href={cloudinaryApiConverter(
                    posts[0].thumb["pc"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  key={posts[0].id}
                />
                <ImagePreloader
                  href={cloudinaryApiConverter(
                    posts[1].thumb["pc"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  key={posts[1].id}
                />
              </>
            }
            title="Works"
          />
        }
      >
        <main data-component="Works">
          <div className="pt-[10rem] mb-[6rem] pc:pt-[14.4rem] pc:mb-[3rem]">
            <h1 css={styles.heading}>
              Works
              <sup css={styles.heading__total}>{total}</sup>
            </h1>
          </div>

          <div css={styles.entries} data-ref="index" data-total={total}>
            {posts.map((item, index: number) => {
              return (
                <article css={styles.entryWrap} key={item.id}>
                  <Link
                    css={styles.entry}
                    data-color={item.theme}
                    data-ref="project"
                    to={`./works/${item.slug}/`}
                  >
                    <div css={styles.aspect}></div>
                    <div css={styles.entry__g}>
                      <figure css={styles.eyecatch}>
                        <img
                          alt=""
                          className="_img"
                          decoding="auto"
                          height={item.thumb["pc"].height}
                          src={cloudinaryApiConverter(
                            item.thumb["pc"].url,
                            "f_auto,q_auto,w_750"
                          )}
                          width={item.thumb["pc"].width}
                        />
                      </figure>
                      <div css={styles.entry__hgroup}>
                        <p
                          className="mb-[1.2rem] | pc:mb-[1.5rem]"
                          css={styles.num}
                        >
                          {zeroPadding(total - index)}
                          <span className="ml-[.8em]">Project</span>
                        </p>
                        <h2 css={styles.entry__heading}>{selectTitle(item)}</h2>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

module.exports = Component;
