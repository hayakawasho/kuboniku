const expoOut = [0.19, 1, 0.22, 1];

export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    skewY: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    skewY: 0,
    transition: {
      duration: 1.5,
      ease: expoOut,
    },
  },
};
