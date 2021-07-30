import { Fragment } from 'react';
import { Layout, ErrorScreen } from '@/foundation/components';

const Component = () => (
  <Layout title="500 Internal Server Error">
    <ErrorScreen headingNode={<Fragment>500 Internal Server Error</Fragment>} />
  </Layout>
);

export default Component;
