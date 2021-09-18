import { Fragment } from 'react';
import { Layout, ErrorScreen } from '@/common/components';

const Component = () => (
  <Layout title="404 not found">
    <ErrorScreen headingNode={<Fragment>404 Not Found</Fragment>} />
  </Layout>
);

export default Component;
