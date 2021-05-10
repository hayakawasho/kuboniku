import React, {
  useEffect,
  Suspense,
  useMemo,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import tw, { css } from 'twin.macro';
import * as THREE from 'three';
import { gsap } from 'gsap';
const vert = require('./shaders/vert.glsl').default;
const frag = require('./shaders/frag.glsl').default;

interface IProps {
  domRef: React.MutableRefObject<HTMLElement>;
}

const dpr = window.devicePixelRatio >= 2 ? 1.5 : window.devicePixelRatio;

const Component: React.FC<IProps> = ({ domRef }) => {
  const posZ = useMemo(() => {
    const fovInRadians = (45 * Math.PI) / 180;
    return (window.innerHeight * 0.5) / Math.tan(fovInRadians * 0.5);
  }, []);

  useEffect(() => {
    document.body.classList.add('is-home');
  }, []);

  return (
    <div css={canvas}>
      <Canvas
        dpr={dpr}
        camera={{
          fov: 45,
          near: 1,
          far: 1000,
          position: [0, 0, posZ],
        }}
      >
        <Suspense fallback={null}>
          <PlaneGroup
            plane={Array.from(
              domRef.current.querySelectorAll('[data-gl-texture]')
            )}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Component;

const progress = {
  current: 0,
};

const PlaneGroup: React.FC<{ plane: HTMLElement[] }> = ({ plane }) => {
  const isPointerDown = useRef(false);
  const val = useRef(0);
  const [moveY, setMoveY] = useState(0);
  const [progressY, setProgressY] = useState(0);

  useEffect(() => {
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchmove', onMove, {
      passive: true,
    });
    window.addEventListener('touchend', pointerUp);
  }, []);

  const pointerDown = (scrollY: number) => {
    isPointerDown.current = true;
  };

  const pointerMove = (scrollY: number) => {
    if (!isPointerDown.current) return;

    val.current = scrollY;
  };

  const pointerUp = () => {
    isPointerDown.current = false;
  };

  const onDown = e => {
    pointerDown(e.changedTouches[0].clientY);
  };

  const onMove = e => {
    pointerMove(e.changedTouches[0].clientY);
  };

  useFrame(() => {
    setMoveY(val.current);
  });

  return (
    <>
      <group>
        {plane.map((item, i) => {
          const { top, height } = item.getBoundingClientRect();
          return (
            <Plane
              key={i}
              src={item.dataset.glTexture}
              index={i}
              height={height}
              posY={top}
              progress={progress.current}
            />
          );
        })}
      </group>
    </>
  );
};

interface IPlane {
  src: string;
  index: number;
  posY: number;
  height: number;
  progress: number;
}

const Plane: React.FC<IPlane> = ({ src, index, height, posY, progress }) => {
  const { size } = useThree();
  const texture = useLoader(THREE.TextureLoader, src);

  useEffect(() => {
    if (!texture) return;

    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }, [texture]);

  const uniforms = useMemo(() => {
    const { naturalWidth, naturalHeight } = texture.image as HTMLImageElement;
    return {
      uTexture: {
        value: texture,
      },
      uMeshSize: {
        value: new THREE.Vector2(size.width, size.height),
      },
      uImageSize: {
        value: new THREE.Vector2(naturalWidth, naturalHeight),
      },
      uMaxDistance: {
        value: 0,
      },
      uMagnitude: {
        value: 1,
      },
      uProgress: {
        value: 0,
      },
    };
  }, [texture]);

  return (
    <>
      <mesh position={[0, -posY + progress, 0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[size.width, height, 32, 32]}
        />
        <shaderMaterial
          transparent={true}
          attach="material"
          uniforms={uniforms}
          fragmentShader={frag}
          vertexShader={vert}
        />
      </mesh>
    </>
  );
};

const canvas = css`
  ${tw`fixed top-0 left-0 w-screen h-screen pointer-events-none`}
  filter: grayscale(1);
`;
