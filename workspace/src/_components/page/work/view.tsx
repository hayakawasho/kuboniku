import { WorkList } from "~/_components/model/work/work-list";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import Styles from "./style.module.scss";
import type { WorkMetadata } from "~/(work)/model";
import type { RouteName } from "~/_foundation/types";

type Props = {
  posts: WorkMetadata[];
  total: number;
  namespace: RouteName;
};

const Component: React.FC<Props> = props => {
  const { posts, total, namespace } = props;

  return (
    <PageLayout header={<Header current={namespace} />} namespace={namespace}>
      <main className="relative z-[2]" data-component="Works">
        <div className="pt-[10rem] mb-[6rem] pc:pt-[14.4rem] pc:mb-[3rem]">
          <h1 className={Styles.heading} data-ref="h1">
            Work
            <sup className={Styles.heading__total}>{total}</sup>
          </h1>
        </div>
        <WorkList posts={posts} total={total} />
      </main>
    </PageLayout>
  );
};

export default Component;
