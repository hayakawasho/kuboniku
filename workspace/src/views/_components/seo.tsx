import type { FC } from "react";

const SITE_TITLE = "KUBONIKU.COM | WEB DESIGNER";
const DESCRIPTION = "WEB DESIGNER NAGISA KUBO 久保渚 portfolio site";
const SITE_URL = "https://kuboniku.com";

export const Seo: FC<{
  title: string;
  permalink: string;
  prepend?: React.ReactNode;
}> = (props) => {
  const title = props.title ? props.title + " | " + SITE_TITLE : SITE_TITLE;
  const description = DESCRIPTION;

  return (
    <>
      {props.prepend}
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="telephone=no" name="format-detection" />
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta
        content={props.permalink ? "article" : "website"}
        property="og:type"
      />
      <meta content={description} property="og:description" />
      <meta content={SITE_URL + props.permalink} property="og:url" />
      <meta content={SITE_TITLE} property="og:site_name" />
      <meta content={SITE_URL + "/ogp.jpg"} property="og:image" />
    </>
  );
};
