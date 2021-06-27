import React, { useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import tw, { css } from 'twin.macro';
import * as THREE from 'three';
const vertexShader = require('./shaders/vert.glsl').default;
const fragmentShader = require('./shaders/frag.glsl').default;
// import { useSelector } from 'react-redux';
// import { uiSelector } from '~/state/ui';
import { gsap } from 'gsap';

const dpr = window.devicePixelRatio >= 2 ? 1.5 : window.devicePixelRatio;

const Webgl: React.FC = () => {
  // const { uiColor } = useSelector(uiSelector);

  /*
  useEffect(() => {
    const { r, g, b } = new THREE.Color(uiColor);
    gsap.to(uniforms.uColor.value, 0.8, {
      g,
      r,
      b,
    });
  }, [uiColor]);
  */

  return (
    <div css={canvas}>
      <Canvas dpr={dpr} orthographic={true}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export { Webgl };

const Scene: React.FC = () => {
  const mesh = useRef<any>();
  const { size } = useThree();

  useEffect(() => {
    uniforms.uAmount.value = 0.16;
    uniforms.uAlpha.value = 0.2;
    uniforms.uBlur.value = 0.16;
    uniforms.uRad.value = 0.9;
  }, []);

  useEffect(() => {
    uniforms.uResolution.value.x = size.width;
  }, [size.width]);

  useEffect(() => {
    uniforms.uResolution.value.y = size.height;
  }, [size.height]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const time = clock.getElapsedTime();
    mesh.current.material.uniforms.uTime.value = Math.sin(time);
  });

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]}>
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
  );
};

const uniforms = {
  uResolution: {
    type: 'v2',
    value: new THREE.Vector2(),
  },
  uColor: {
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
    value: 0,
  },
  uRad: {
    type: 'f',
    value: 0,
  },
};

const canvas = css`
  ${tw`fixed top-0 left-0 w-full h-full pointer-events-none`}
`;
