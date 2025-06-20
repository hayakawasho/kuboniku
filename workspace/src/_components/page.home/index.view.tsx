import { Header } from "@/_components/header/index.view";
import { PageWrapper } from "@/_components/page-wrapper/index.view";
import { Link } from "@/_components/ui/link";
import { cloudinaryAPIConverter } from "@/_foundation/converter";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "@/_components/work";
import type { RouteName } from "@/_foundation/type";

type Props = {
  posts: WorkMetadata[];
  namespace: RouteName;
  perPage: number;
};

const Component: React.FC<Props> = props => {
  const { posts, namespace, perPage } = props;

  const images = posts.map((post, index) => {
    const separator = index > 0 ? " " : "";
    return separator + cloudinaryAPIConverter(post.eyecatch!.url, "f_auto,q_auto,w_840,h_1050");
  });

  return (
    <PageWrapper header={<Header current={namespace} />} namespace={namespace}>
      <main className="h-full" data-component="Home">
        <canvas aria-hidden="true" className="glCanvas | opacity-90" data-ref="canvas"></canvas>
        <div
          className="pointer-events-none fixed inset-0 m-auto w-full h-full z-10"
          data-images={`${images}`}
          data-ref="splash"
        ></div>
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
                <Thumbnail index={index + perPage} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + perPage * 2} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.project} key={post.id}>
                <Thumbnail index={index + perPage * 3} post={post} />
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
    0: 0.7,
    1: 0.85,
    2: 1,
    3: 0.85,
    4: 0.7,
  }[index % 5];

  const eyecatch = post.eyecatch!;

  return (
    <Link
      className={`${Styles.project__eyecatch}`}
      data-cursor="scale"
      data-ref="gridItem"
      to={`/work/${post.slug}/`}
    >
      <img
        alt=""
        className="w-full h-full invisible"
        data-h={1050}
        data-ref="plane"
        data-speed={speed}
        data-src={cloudinaryAPIConverter(eyecatch.url, "f_auto,q_auto,w_840,h_1050")}
        data-w={840}
        height={1050}
        width={1050}
      />
      <span className="sr-only">{post.title}</span>
    </Link>
  );
};

export default Component;
