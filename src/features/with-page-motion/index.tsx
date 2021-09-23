import React from 'react';
import { motion } from 'framer-motion';
import { transition } from '@/common/animations';

type TWithPageMotionProps = {
  [key: string]: unknown;
};

const withPageMotion = <P extends TWithPageMotionProps = TWithPageMotionProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Component: React.VFC<P> = allProps => {
    const { ...props } = allProps;

    return (
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <WrappedComponent {...(props as P)} />
      </motion.div>
    );
  };

  return Component;
};

export type { TWithPageMotionProps };
export { withPageMotion };
