import React, { useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import tw, { css } from 'twin.macro';
import * as THREE from 'three'
const vertexShader = require('./shaders/vert.glsl').default;
const fragmentShader = require('./shaders/frag.glsl').default;

const dpr = window.devicePixelRatio >= 2 ? 1.5 : 1

const Webgl: React.FC = () => {
  return (
    <div css={canvas}>
      <Canvas
        dpr={dpr}
        orthographic={true}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
};

export { Webgl };

const Scene: React.FC = () => {
  const mesh = useRef<any>()
  const { size } = useThree()

  useEffect(() => {
    uniforms.uAmount.value = 0.16
    uniforms.uAlpha.value = 0.12
    uniforms.uBlur.value = .12
    uniforms.uRad.value = 1.0
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const time = clock.getElapsedTime()
    mesh.current.material.uniforms.uTime.value = Math.sin(time);
  })

  useEffect(() => {
    uniforms.uResolution.value.x = size.width
    uniforms.uResolution.value.y = size.height
  }, [size])

  return (
    <>
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[size.width, size.height]}
        />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </mesh>
    </>
  )
}

const uniforms = {
  uResolution: {
    type: 'v2',
    value: new THREE.Vector2(),
  },
  uCol: {
    type: 'v3',
    value: new THREE.Color('#1793a9'),
  },
  uAmount: {
    type: 'f',
    value: 0.2,
  },
  uAlpha: {
    type: 'f',
    value: 0.2,
  },
  uTime: {
    type: 'f',
    value: 0.2,
  },
  uBlur: {
    type: 'f',
    value: 0.,
  },
  uRad: {
    type: 'f',
    value: 0.,
  },
}

const canvas = css`
  ${tw`fixed top-0 left-0 w-screen h-screen pointer-events-none`}
`;
