import React from 'react';
import Layout from '~/components/layout';
import Seo from '~/components/seo';

const Component: React.FC = () => (
  <Layout>
    <Seo title="404 NOT FOUND" />
    <div data-smooth-item>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default Component;
