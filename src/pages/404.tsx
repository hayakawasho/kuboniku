import { Layout } from '@/app/components/layout';
import { ErrorScreen } from '@/app/components/ui';

const Component = () => (
  <Layout title="404 Not found">
    <ErrorScreen title="NOT FOUND" />
  </Layout>
);

export default Component;
