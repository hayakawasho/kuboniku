import React from 'react';
import { Layout } from '~/components/layouts';
import { ErrorScreen } from '~/components/ui';

const Component = () => (
  <Layout title="500 - Server-side error occurred">
    <ErrorScreen title="500 - Server-side error occurred" />
  </Layout>
);

export default Component;
