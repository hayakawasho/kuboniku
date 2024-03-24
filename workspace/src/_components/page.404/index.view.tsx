import Styles from "./index.module.scss";
import { PageWrapper } from "../page-wrapper/index.view";
import { Header } from "../header/index.view";
import type { RouteName } from "@/_foundation/type";

const Component: React.FC<{
  namespace: RouteName;
}> = ({ namespace }) => {
  return (
    <PageWrapper header={<Header current="404" />} namespace={namespace}>
      <main className="flex items-center justify-center h-svh">
        <div className="text-center">
          <h1 className={Styles.heading}>404 Not found</h1>
          <a
            href="/"
            className={`${Styles.sub} inline-block mt-[1.8em] underline hover:no-underline`}
            data-cursor="scale"
          >
            Back to top
          </a>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Component;
