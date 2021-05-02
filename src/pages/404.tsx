import React from 'react';
import Link from 'next/link';
import Layout from '~/layouts/Layout';
import Seo from '~/foundation/components/Seo';

const Component: React.FC = () => (
  <Layout>
    <Seo title="404 NOT FOUND" />
    <div data-smooth-item className="u-fit u-flex u-flex--c">
      <div>
        <h1>NOT FOUND</h1>
        <Link scroll={false} href="/">
          <a>BACK TO TOP</a>
        </Link>
      </div>
    </div>
  </Layout>
);

export default Component;
