import React from 'react'
import Image from 'next/image'

const Component = ({ src }) => {
  return (
    <>
      <Image
        src={src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </>
  )
}

export default Component
