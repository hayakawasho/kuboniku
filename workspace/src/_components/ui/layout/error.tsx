import { PageLayout } from "~/_components/ui/layout";
import Styles from "./error.module.scss";

export const Component: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <PageLayout header={<></>} namespace={"error"}>
      <main className="flex items-center justify-center h-svh">
        <div className="text-center">
          <h1 className={Styles.heading}>{message}</h1>
          <a
            className={`${Styles.sub} inline-block mt-[1.8em] underline hover:no-underline`}
            data-cursor="scale"
            href="/"
          >
            Back to Top
          </a>
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
