import Document, { Head, Html, Main, NextScript } from 'next/document';
import { NextPageContext } from 'next';
import {
  DocumentInitialProps,
  RenderPage,
} from 'next/dist/next-server/lib/utils';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';
import { extractCritical } from '@emotion/server';
class MyDocument extends Document {
  static async getInitialProps(
    ctx: NextPageContext & { renderPage: RenderPage }
  ): Promise<DocumentInitialProps> {
    if (ctx.req && ctx.res) {
      await basicAuthMiddleware(ctx.req, ctx.res, {
        realm: 'protected',
        users: [],
        includePaths: ['/'],
        excludePaths: [],
      });
    }

    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);

    return {
      ...initialProps,
      ...page,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
