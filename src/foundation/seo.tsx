import React from 'react'
import Head from 'next/head'

type Meta =
  | {
      name: string
      content: any
    }
  | {
      property: string
      content: any
    }

interface IProps {
  description?: string | null
  meta?: Meta[]
  title?: string | null
}

const SEO: React.FC<IProps> = ({ description, title }) => {
  const siteName = 'KUBONIKU.COM | WEB DESIGNER'
  const metaTitle = `${title ? `${title} | ` : ''}` + siteName
  const metaDescription =
    description ?? 'WEB DESIGNER NAGISA KUBO 久保渚 portfolio site'

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              WebFontConfig = {
                classes: false,
                google: {
                  families: ['Montserrat:500,700', 'Roboto+Condensed:400,700', 'Noto+Sans+JP:400,700&display=swap']
                },
                active: function () {
                  document.documentElement.classList.add('is-webfontLoaded')
                }
              };
              (function() {
                var wf = document.createElement('script');
                wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
              })();
            `,
          }}
        />
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          crossOrigin="anonymous"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
    </>
  )
}

SEO.defaultProps = {
  meta: [] as Meta[],
  description: ``,
  title: '',
}

export default SEO
