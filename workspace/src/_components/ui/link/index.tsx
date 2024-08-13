type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  swap?: string;
  href: string;
};

export const Link: React.FC<Props> = ({ className = "", href, children, swap = "swap:520ms", ...props }) => {
  return (
    <a
      {...props}
      className={`${className} cursor-pointer`}
      data-astro-prefetch="hover"
      hx-get={href}
      hx-push-url="true"
      hx-select="[data-xhr]"
      hx-swap={`${swap}`}
      hx-target="#main"
    >
      {children}
    </a>
  );
};
