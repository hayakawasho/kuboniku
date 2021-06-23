import React from 'react';
import Link from 'next/link';
import { Layout } from '~/components/layouts';

const Component: React.FC = () => (
  <Layout title="500 - Server-side error occurred">
    <div className="u-fit u-flex u-flex--c">
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
