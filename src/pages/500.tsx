import { Layout } from '~/components/layouts';
import { ErrorScreen } from '~/components/pages/error';

const Component = () => (
  <Layout title="500 Internal Server Error">
    <ErrorScreen title="SEEVER SIDE ERROR" />
  </Layout>
);

export default Component;
