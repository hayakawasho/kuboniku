import React from 'react';
import Link from 'next/link';

interface IProps {
  scroll: boolean;
  href: string;
  children: React.ReactNode;
}

const Component = ({ children, href, scroll = false }: IProps) => {
  return (
    <Link scroll={scroll} href={href}>
      {children}
    </Link>
  );
};

export default Component;
