import React, { useEffect, Suspense, useMemo, useRef } from 'react';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import tw, { css } from 'twin.macro';
import * as THREE from 'three';

const dpr = 2;

const Component: React.FC = () => {
  return (
    <div css={canvas}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true }}
        camera={{
          fov: 45,
          near: 1,
          far: 1000,
          position: [
            0,
            0,
            (window.innerHeight * 0.5) / Math.tan(((45 * Math.PI) / 180) * 0.5),
          ],
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Component;

const Scene: React.FC = () => {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, '/name_sp.png');

  const [width, height] = useMemo(() => {
    const w = texture.image.naturalWidth;
    const h = texture.image.naturalHeight;

    return [w / dpr, h / dpr];
  }, []);

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[width, height]} />
        <meshBasicMaterial attach="material" map={texture} alphaTest={0.5} />
      </mesh>
    </>
  );
};

const canvas = css`
  ${tw`fixed top-0 left-0 w-full h-full pointer-events-none`}
`;
