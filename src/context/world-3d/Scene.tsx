import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const vertexShader = require('./shaders/vert.glsl').default;
const fragmentShader = require('./shaders/frag.glsl').default;

const Scene = ({ uniforms }) => {
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
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[size.width, size.height]} />
      <shaderMaterial
        attach="material"
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export { Scene };
