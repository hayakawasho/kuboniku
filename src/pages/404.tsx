import React from 'react'
import SEO from '~/foundation/seo'

const Component: React.FC = () => (
  <>
    <SEO title="404 NOT FOUND" />
    <div data-smooth-item>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </>
)

export default Component
