import React, { useRef, useEffect } from 'react';
import Gl from './gl';

const Component = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gl = new Gl();
    gl.setup(canvasRef.current);
  }, []);

  return <canvas className="gl" ref={canvasRef} />;
});

export default Component;
