import { renderToStaticMarkup as r } from "react-dom/server";
import { zeroPadding } from "@/_foundation/utils";
import { selectTitle } from "@/_works/selector";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import * as styles from "./index.css";

module.exports = class {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: "posts",
        data: "wp.works.items",
        size: 40,
      },
    };
  }

  render(props: any) {
    const posts = props.posts;
    const total = props.wp.works.total;

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="WORKS" />}
        namespace="WORKS"
        seo={<Seo permalink="" title="WORKS" />}
      >
        <main data-component="Works">
          <div className="pt-[10rem] mb-[6rem] pc:mb-[3.6rem]">
            <h1 css={styles.heading}>
              Works
              <sup css={styles.heading__total}>{total}</sup>
            </h1>
          </div>

          <div css={styles.entries} data-ref="index" data-total={total}>
            {posts.map((item: any, index: number) => {
              return (
                <article
                  className="mb-[4rem] pc:mb-[6.4rem]"
                  css={styles.entryWrap}
                  key={index}
                >
                  <a
                    css={styles.entry}
                    data-color={item.color}
                    data-ref="project"
                    href={`./works/${item.slug}/`}
                  >
                    <div css={styles.aspect}></div>
                    <div css={styles.entry__g}>
                      <div css={styles.eyecatch} data-ref="clipTarget">
                        <img
                          alt=""
                          className="_img"
                          decoding="async"
                          height={item.eyecatch.height}
                          src={item.eyecatch.src}
                          width={item.eyecatch.width}
                        />
                      </div>
                      <div css={styles.entry__hgroup}>
                        <p
                          className="mb-[1.2rem] | pc:mb-[2rem]"
                          css={styles.num}
                        >
                          {zeroPadding(total - index)}
                          <span className="ml-[.8em]">Project</span>
                        </p>
                        <h2 css={styles.entry__heading}>{selectTitle(item)}</h2>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
};
