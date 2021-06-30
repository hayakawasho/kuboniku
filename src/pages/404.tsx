import { Layout } from '@/components/layouts';
import { ErrorScreen } from '@/components/pages/error';

const Component = () => (
  <Layout title="404 Not found">
    <ErrorScreen title="NOT FOUND" />
  </Layout>
);

export default Component;
