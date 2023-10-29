import { renderToStaticMarkup as r } from "react-dom/server";
import { zeroPadding } from "@/_foundation/utils";
import { selectRole, selectYear, selectTitle } from "@/_works/selector";
import * as styles from "./[slug].css";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import { ResponsiveImage } from "../_components/ui/responsive-image";

module.exports = class {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: true,
        alias: "post",
        data: "wp.works.items",
        size: 1,
      },
      permalink: (context: any) => `works/${context.post.slug}/index.html`,
    };
  }

  render(props: any) {
    const post = props.post;
    const page = props.pagination.page;
    const nextPost =
      page.last.id === post.id ? { ...page.first } : { ...page.next };

    const projectNumber = props.wp.works.total - props.pagination.pageNumber;
    const pageTitle = selectTitle(post) as string;

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="WORKS_DETAIL" />}
        namespace="WORKS_DETAIL"
        seo={<Seo permalink={`/works/${post.slug}/`} title={pageTitle} />}
      >
        <main data-color={post.color} data-component="Work">
          <div data-ref="progressBar"></div>
          <div css={styles.kv}>
            <div css={styles.kv__cont}>
              <p css={styles.project}>
                {zeroPadding(projectNumber)}
                <span className="ml-[.8rem]">Project</span>
              </p>
              <h1 className="pl-[1.1rem] pr-[.5em]" css={styles.heading}>
                {pageTitle}
              </h1>
              <p
                className="pl-[1.3rem] mt-[.8rem] overflow-hidden"
                css={styles.sub}
              >
                <span className="inline-block origin-right">
                  {post.category}
                  <i className="icon-arrow_right ml-[.8rem]" />
                </span>
              </p>
            </div>
            <ResponsiveImage
              alt=""
              className="opacity-40 object-cover fit2parent"
              pcSize={[post.eyecatch.width, post.eyecatch.height]}
              pcSrc={post.eyecatch.src}
              spSize={[post.eyecatchMobile.width, post.eyecatchMobile.height]}
              spSrc={post.eyecatchMobile.src}
            />
            <div css={styles.kv__scrollDown}>
              <div className="relative w-full h-full overflow-hidden">
                <div css={styles.kv__scrollLabel} data-text="scroll">
                  scroll
                </div>
              </div>
              <i className="icon-arrow_down | block mt-[1.4rem] text-[1.2rem] text-center" />
            </div>
          </div>

          <div css={styles.body}>
            <div
              className="my-[6rem] | pc:mt-[10rem] pc:mb-[9rem]"
              css={styles.introLayout}
            >
              <div css={styles.intro}>
                <div css={styles.intro__info}>
                  <dl css={styles.dl}>
                    <dt css={styles.dt}>Year :</dt>
                    <dd css={styles.dd}>{selectYear(post)}</dd>
                  </dl>
                  <dl css={styles.dl}>
                    <dt css={styles.dt}>Role :</dt>
                    <dd css={styles.dd}>{selectRole(post)}</dd>
                  </dl>
                </div>
                {post.siteUrl && (
                  <a
                    className="mt-[2rem] | pc:mt-0"
                    css={styles.intro__viewLink}
                    href={post.siteUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    View website
                    <div css={styles.intro__viewLinkLine} />
                  </a>
                )}
              </div>
            </div>

            {
              <div
                className="mb-[10.5rem] | pc:mx-auto pc:mb-[18.2rem]"
                css={styles.captchaItems}
              >
                {post.gallery.length > 0 && (
                  <ul>
                    {post.gallery.map((item: any, index: number) => {
                      return (
                        <li className="mb-[2rem] pc:mb-[6rem]" key={index}>
                          <img
                            alt=""
                            decoding="async"
                            height={item.height}
                            src={item.src}
                            width={item.width}
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
            }

            <aside css={[styles.kv, styles.kvNext]}>
              <a className="fit2parent z-10" href={`../${nextPost.slug}/`}>
                <div css={styles.kv__cont}>
                  <h2 className="pl-[1.1rem] pr-[.5em]" css={styles.heading}>
                    Next Project
                  </h2>
                  <p
                    className="pl-[1.3rem] mt-[.8rem] overflow-hidden"
                    css={styles.sub}
                  >
                    {selectTitle(nextPost)}
                    <i className="icon-arrow_right ml-[.8rem]" />
                  </p>
                </div>
                <ResponsiveImage
                  alt=""
                  className="opacity-40 filter grayscale-100 object-cover fit2parent"
                  pcSize={[nextPost.eyecatch.width, nextPost.eyecatch.height]}
                  pcSrc={nextPost.eyecatch.src}
                  spSize={[
                    nextPost.eyecatchMobile.width,
                    nextPost.eyecatchMobile.height,
                  ]}
                  spSrc={nextPost.eyecatchMobile.src}
                />
              </a>
            </aside>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
};
