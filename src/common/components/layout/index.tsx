import Head from "next/head"
import React from "react"

interface IProps {
  title: string
  description?: string
  children: React.ReactNode
  shouldScrollItem?: boolean
}

const Layout = ({
  children,
  title,
  description,
  shouldScrollItem = true,
}: IProps) => {
  const siteName = "KUBONIKU.COM | WEB DESIGNER"
  const metaTitle = `${title ? `${title} | ` : ""}` + siteName
  const metaDescription =
    description ?? "WEB DESIGNER NAGISA KUBO 久保渚 portfolio site"

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main id="xhr" data-scroll-item={shouldScrollItem}>
        {children}
      </main>
    </>
  )
}

export { Layout }
