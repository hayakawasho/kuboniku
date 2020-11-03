import Link from 'next/link'
import Layout from '../components/Layout'

const Component: React.FC = () => {
  return (
    <Layout>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/works">
          <a>works</a>
        </Link>
      </p>
    </Layout>
  )
}

export default Component;
