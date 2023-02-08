// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Head } from './Head'
import { Header } from './Header'

export const PageWithHeader = props => {
  return (
    <html lang="ja">
      <Head title={props.title} description={props.description} pagePath={props.pagePath} />
      <body data-component="Menu" data-ignore>
        <div
          className="fixed inset-0 w-screen h-screen pointer-events-none -z-1"
          data-component="Observer"
          data-ignore
          aria-hidden="true"
        ></div>
        <div id="js-gl" className="fixed inset-0 w-screen h-screen">
          <canvas className="w-full h-full" data-ref="canvas"></canvas>
        </div>
        <div data-component="Cursor" data-ignore className="u-pc"></div>
        {props.header}
        {props.children}
      </body>
    </html>
  )
}
