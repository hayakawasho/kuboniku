import React from 'react';
import { Layout } from '~/components/layouts';
import { ErrorScreen } from '~/components/ui';

const Component = () => (
  <Layout title="404 Not found">
    <ErrorScreen title="NOT FOUND" />
  </Layout>
);

export default Component;
