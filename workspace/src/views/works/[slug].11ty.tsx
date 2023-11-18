import { renderToStaticMarkup as r } from "react-dom/server";
import { mq } from "@/_foundation/mq";
import { zeroPadding } from "@/_foundation/utils";
import { cloudinaryAPIConverter } from "@/_models/image/conveter";
import { selectRole, selectYear, selectTitle } from "@/_models/works/selector";
import * as styles from "./[slug].css";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import { Link } from "../_components/ui/link";
import { ResponsiveImage } from "../_components/ui/responsive-image";
import type { EleventyProps } from "../_components/const";
import type { WorkMetadata } from "@/_models/works";

type Props = EleventyProps<WorkMetadata> & {
  post: WorkMetadata;
  wp: {
    totalCount: number;
  };
};

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: true,
        alias: "post",
        data: "wp.works",
        size: 1,
      },
      permalink: (context: any) => `works/${context.post.slug}/index.html`,
    };
  }

  render({ post, ...props }: Props) {
    const total = props.wp.totalCount;

    const { page, pageNumber } = props.pagination;
    const next = page.last.id === post.id ? page.first : page.next;

    const projectNumber = total - pageNumber;
    const pageTitle = selectTitle(post);

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="single" />}
        namespace="single"
        seo={
          <Seo
            permalink={`/works/${post.slug}/`}
            prepend={
              <>
                <link
                  as="image"
                  href={cloudinaryAPIConverter(
                    post.thumb["pc"].url,
                    "f_auto,q_auto,w_1680"
                  )}
                  media={mq.pc}
                  rel="preload"
                />
                <link
                  as="image"
                  href={cloudinaryAPIConverter(
                    post.thumb["sp"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  media={mq.sp}
                  rel="preload"
                />
              </>
            }
            title={pageTitle}
          />
        }
      >
        <main data-color={post.theme} data-component="Work">
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
              mob={cloudinaryAPIConverter(
                post.thumb["sp"].url,
                "f_auto,q_auto,w_750"
              )}
              mobSize={[post.thumb["sp"].width, post.thumb["sp"].height]}
              size={[post.thumb["pc"].width, post.thumb["pc"].height]}
              src={cloudinaryAPIConverter(
                post.thumb["pc"].url,
                "f_auto,q_auto,w_1680"
              )}
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
              className="my-[6rem] pc:mt-[10rem] pc:mb-[9rem]"
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
                <div css={styles.intro__desc}>
                  {post.description && (
                    <p css={styles.intro__desc}>{post.description}</p>
                  )}
                  {post.siteUrl && (
                    <a
                      className="relative"
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
            </div>

            <div
              className="mb-[10.5rem] pc:mx-auto pc:mb-[18.2rem]"
              css={styles.captchaItems}
            >
              {post.screenshots && (
                <ul>
                  {post.screenshots.map((item, index: number) => {
                    return (
                      <li className="mb-[2rem] pc:mb-[6rem]" key={index}>
                        <ResponsiveImage
                          alt=""
                          className="w-full"
                          mob={cloudinaryAPIConverter(
                            item.url,
                            "f_auto,q_auto,w_750"
                          )}
                          mobSize={[item.width, item.height]}
                          size={[item.width, item.height]}
                          src={cloudinaryAPIConverter(
                            item.url,
                            "f_auto,q_auto,w_1440"
                          )}
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

            <aside css={[styles.kv, styles.kvNext]}>
              <Link className="fit2parent z-10" to={`../${next.slug}/`}>
                <div css={styles.kv__cont}>
                  <h2 className="pl-[1.1rem] pr-[.5em]" css={styles.heading}>
                    Next Project
                  </h2>
                  <p
                    className="pl-[1.3rem] mt-[.8rem] overflow-hidden"
                    css={styles.sub}
                  >
                    {selectTitle(next)}
                    <i className="icon-arrow_right ml-[.8rem]" />
                  </p>
                </div>
                <ResponsiveImage
                  alt=""
                  className="opacity-40 filter grayscale-100 object-cover fit2parent"
                  mob={cloudinaryAPIConverter(
                    next.thumb["sp"].url,
                    "f_auto,q_auto,w_750"
                  )}
                  mobSize={[next.thumb["sp"].width, next.thumb["sp"].height]}
                  size={[next.thumb["pc"].width, next.thumb["pc"].height]}
                  src={cloudinaryAPIConverter(
                    next.thumb["pc"].url,
                    "f_auto,q_auto,w_1440"
                  )}
                />
              </Link>
            </aside>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

module.exports = Component;
