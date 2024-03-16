import { Header } from "@/_components/header/index.view";
import { PageWrapper } from "@/_components/page-wrapper/index.view";
import { Link } from "@/_components/ui/link";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "@/_components/works";

type Props = {
  posts: WorkMetadata[];
};

const Component: React.FC<Props> = props => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="home">
      <div></div>
    </PageWrapper>
  );
};

export default Component;
