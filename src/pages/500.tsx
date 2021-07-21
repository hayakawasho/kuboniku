import { Layout } from '@/app/components/layout';
import { ErrorScreen } from '@/app/components/ui';

const Component = () => (
  <Layout title="500 Internal Server Error">
    <ErrorScreen title="SEEVER SIDE ERROR" />
  </Layout>
);

export default Component;
