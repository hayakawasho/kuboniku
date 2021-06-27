import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import Seo from '~/components/Seo';

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
