import Document from 'next/document'
import basicAuthMiddleware from 'nextjs-basic-auth-middleware'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (ctx.req && ctx.res) {
      await basicAuthMiddleware(ctx.req, ctx.res, {
        realm: 'protected',
        users: [],
        includePaths: ['/'],
        excludePaths: [],
      })
    }

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
}

export default MyDocument
