import { Header } from "@/_components/header/index.view";
import { PageWrapper } from "@/_components/page-wrapper/index.view";
import { Link } from "@/_components/ui/link";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "@/_components/works";

type Props = {
  posts: WorkMetadata[];
};

const PER_PAGE = 10;

const Component: React.FC<Props> = props => {
  const { posts } = props;

  return (
    <PageWrapper header={<Header current="home" />} namespace="home">
      <main className="h-full" data-component="Home">
        <h1 className="sr-only">KuboNiku.com Portfolio</h1>
        <div className={Styles.projectsWrap}>
          <ul className={Styles.projects} data-ref="grid">
            {posts.map((post, index) => (
              <li className={Styles.project} key={post.id}>
                <Thumbnail index={index} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 2} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 3} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 4} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 5} post={post} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </PageWrapper>
  );
};

const Thumbnail = ({ post, index }: { post: WorkMetadata; index: number }) => {
  const speed = {
    0: 0.8,
    1: 1,
    2: 0.8,
  }[index % 3];

  return (
    <div className={Styles.project__eyecatch} data-ref="gridItem">
      <img
        alt=""
        className="w-full h-full"
        data-h={post.thumb["pc"].height}
        data-ref="plane"
        data-speed={speed}
        data-src={post.thumb["pc"].url}
        data-w={post.thumb["pc"].width}
        height={post.thumb["pc"].height}
        width={post.thumb["pc"].width}
      />
      <Link
        className="absolute inset-0 block pointer-events-auto"
        data-ref="link"
        to={`/works/${post.id}/`}
      >
        <span className="sr-only">{post.title}</span>
      </Link>
    </div>
  );
};

export default Component;
