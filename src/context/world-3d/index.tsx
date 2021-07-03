import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { useUiColorContext } from '@/context';
import tw from 'twin.macro';
import * as THREE from 'three';
import { gsap } from 'gsap';

const dpr = window.devicePixelRatio >= 2 ? 1.5 : window.devicePixelRatio;

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

const Webgl = () => {
  const { uiColor } = useUiColorContext();

  useEffect(() => {
    const { r, g, b } = new THREE.Color(uiColor);
    gsap.to(uniforms.uColor.value, 0.8, {
      g,
      r,
      b,
    });
  }, [uiColor]);

  return (
    <div tw="fixed top-0 left-0 w-full h-full pointer-events-none">
      <Canvas dpr={dpr} orthographic={true}>
        <Suspense fallback={null}>
          <Scene uniforms={uniforms} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export { Webgl };
