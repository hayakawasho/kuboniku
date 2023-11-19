import { Fragment } from "react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { zeroPadding } from "@/_foundation/utils";
import { cloudinaryAPIConverter } from "@/_models/image/conveter";
import { selectTitle } from "@/_models/works/selector";
import { validateHasPermalink } from "@/_models/works/validator";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import { Link } from "./_components/ui/link";
import * as styles from "./index.css";
import type { EleventyProps } from "./_components/const";
import type { WorkMetadata } from "@/_models/works";

type Props = EleventyProps<WorkMetadata[]> & {
  posts: WorkMetadata[];
  wp: {
    totalCount: number;
  };
};

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: "posts",
        data: "wp.allWorks",
        size: 99,
      },
    };
  }

  render({ posts, ...props }: Props) {
    const total = props.wp.totalCount;

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="works" />}
        namespace="works"
        seo={
          <Seo
            permalink=""
            prepend={
              <>
                <link
                  as="image"
                  href={cloudinaryAPIConverter(
                    posts[0].thumb["pc"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  key={posts[0].id}
                  rel="preload"
                />
                <link
                  as="image"
                  href={cloudinaryAPIConverter(
                    posts[1].thumb["pc"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  key={posts[1].id}
                  rel="preload"
                />
              </>
            }
            title="Works"
          />
        }
      >
        <main data-component="Works">
          <div className="pt-[10rem] mb-[6rem] pc:pt-[14.4rem] pc:mb-[3rem]">
            <h1 css={styles.heading} data-ref="h1">
              Works
              <sup css={styles.heading__total}>{total}</sup>
            </h1>
          </div>

          <div css={styles.entries} data-ref="index" data-total={total}>
            {posts.map((item, index: number) => {
              return (
                <Fragment key={item.id}>
                  {validateHasPermalink(item) ? (
                    <article css={styles.entryWrap}>
                      <Link
                        css={styles.entry}
                        data-color={item.theme}
                        data-ref="projectItem"
                        to={`./works/${item.slug}/`}
                      >
                        <ProjectItem metadata={item} num={total - index} />
                      </Link>
                    </article>
                  ) : (
                    <article css={styles.entryWrap}>
                      <div
                        className="-disabled"
                        css={styles.entry}
                        data-color={item.theme}
                        data-ref="projectItem"
                      >
                        <ProjectItem metadata={item} num={total - index} />
                      </div>
                    </article>
                  )}
                </Fragment>
              );
            })}
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

const ProjectItem = ({
  metadata,
  num,
}: {
  metadata: WorkMetadata;
  num: number;
}) => {
  return (
    <>
      <div aria-hidden="true" css={styles.aspect} />
      <div css={styles.entry__g}>
        <figure css={styles.eyecatch} data-ref="eyecatch">
          <img
            alt=""
            className="_img"
            decoding="auto"
            height={metadata.thumb["pc"].height}
            src={cloudinaryAPIConverter(
              metadata.thumb["pc"].url,
              "f_auto,q_auto,w_750"
            )}
            width={metadata.thumb["pc"].width}
          />
        </figure>
        <div css={styles.entry__hgroup} data-ref="hgroup">
          <p className="mb-[1.2rem] | pc:mb-[1.5rem]" css={styles.num}>
            {zeroPadding(num)}
            <span className="ml-[.8em]">Project</span>
          </p>
          <h2 css={styles.entry__heading}>{selectTitle(metadata)}</h2>
        </div>
      </div>
    </>
  );
};

module.exports = Component;
