import { Header } from "@/_components/header/index.view";
import { PageWrapper } from "@/_components/page-wrapper.view";
import { Link } from "@/_components/ui/link";
import { selectYear } from "@/_components/work/selector";
import { cloudinaryAPIConverter } from "@/_foundation/converter";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "@/_components/work";
import type { RouteName } from "@/_foundation/type";

type Props = {
  posts: WorkMetadata[];
  namespace: RouteName;
  perPage: number;
};

const separator = (src: string) => {
  return " " + src;
};

const Component: React.FC<Props> = props => {
  const { posts, namespace, perPage } = props;

  return (
    <PageWrapper header={<Header current={namespace} />} namespace={namespace}>
      <main
        className="h-full"
        data-component="Home"
        data-images={`${posts.map((item, i) => {
          const imgSrc = cloudinaryAPIConverter(item.eyecatch!.url, "f_auto,q_auto,w_840,h_1050");
          return i === 0 ? imgSrc : separator(imgSrc);
        })}`}
      >
        <div aria-hidden="true" className={Styles.splash} data-index={-1} data-ref="splash">
          <ul className="relative w-full text-center">
            {posts.map(post => (
              <li className={Styles.splash__projectItem} key={post.id}>
                {post.title} - {selectYear(post)}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="sr-only">KuboNiku.com Portfolio</h1>
        <div className={Styles.projectsWrap}>
          <ul className={Styles.projects} data-ref="grid">
            {posts.map((post, index) => (
              <Thumbnail index={index} post={post} />
            ))}
            {posts.map((post, index) => (
              <Thumbnail aria-hidden="true" index={index + perPage} post={post} />
            ))}
            {posts.map((post, index) => (
              <Thumbnail aria-hidden="true" index={index + perPage * 2} post={post} />
            ))}
            {posts.map((post, index) => (
              <Thumbnail aria-hidden="true" index={index + perPage * 3} post={post} />
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
    <li className={Styles.project} data-ref="scrollItem" data-speed={speed}>
      <Link
        className={`${Styles.project__eyecatch}`}
        data-cursor="scale"
        data-ref="gridItem"
        to={`/work/${post.slug}/`}
      >
        <img
          alt=""
          className="w-full h-full _invisible"
          data-height={1050}
          data-ref="plane"
          data-speed={speed}
          data-width={840}
          height={1050}
          src={cloudinaryAPIConverter(eyecatch.url, "f_auto,q_auto,w_840,h_1050")}
          width={1050}
        />
        <span className="sr-only">{post.title}</span>
      </Link>
    </li>
  );
};

export default Component;
