import React, { useEffect, useState, useRef } from 'react';
import { Seo } from '@/components/Seo';
// import { useRouter } from 'next/router';

interface IProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Layout = ({ children, title, description }: IProps) => {
  return (
    <>
      <Seo title={title} description={description} />
      <main id="xhr" data-smooth>
        {children}
      </main>
    </>
  );
};

export default Layout;
