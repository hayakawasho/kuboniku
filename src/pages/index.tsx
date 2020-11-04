import Link from 'next/link'

const Component: React.FC = () => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/works">
          <a>works</a>
        </Link>
      </p>
    </>
  )
}

export default Component;
