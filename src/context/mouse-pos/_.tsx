import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
// import E from '~utils';
import { EVENTS } from '@/foundation/constants/const';

const Component: React.FC = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = {
    damping: 25,
    stiffness: 700,
  };

  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const moveCursor = e => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };

    // E.on(EVENTS.MOUSE_MOVE, moveCursor);

    return () => {
      // E.off(EVENTS.MOUSE_MOVE, moveCursor);
    };
  }, []);

  return (
    <div className="cursor">
      <motion.div
        className="cursor"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      ></motion.div>
    </div>
  );
};

export default Component;
