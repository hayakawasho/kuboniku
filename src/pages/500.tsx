import React from 'react';
import Link from 'next/link';
import Layout from '~/components/layouts/Layout';
import Seo from '~/components/Seo';

const Component: React.FC = () => (
  <Layout>
    <Seo title="500 - Server-side error occurred" />
    <div data-smooth-item className="u-fit u-flex u-flex--c">
      <div>
        <h1>500 - Server-side error occurred</h1>
        <Link scroll={false} href="/">
          <a>BACK TO TOP</a>
        </Link>
      </div>
    </div>
  </Layout>
);

export default Component;
