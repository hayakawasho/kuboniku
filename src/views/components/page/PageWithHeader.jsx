// @ts-nocheck
import { Global, css } from '@emotion/react'
import { Head } from '../Head'
import { Header } from '../Header'

const TITLE = 'KUBONIKU.COM | WEB DESIGNER'
const DESCRIPTION = 'WEB DESIGNER NAGISA KUBO 久保渚 portfolio site'
const SITE_URL = 'https://kuboniku.com'

export const PageWithHeader = props => {
  const title = props.title + '| ' + TITLE
  const description = DESCRIPTION
  const pagePath = ''

  return (
    <html lang="ja">
      <Head {...props} />
      <body data-component="Menu">
        <Header />
        {props.children}
        <div data-component="Gl"></div>
      </body>
    </html>
  )
}
