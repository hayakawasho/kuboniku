import { Layout } from '@/components/site-parts/layout';
import { ErrorScreen } from '@/components/ui';

const Component = () => (
  <Layout title="500 Internal Server Error">
    <ErrorScreen title="SEEVER SIDE ERROR" />
  </Layout>
);

export default Component;
