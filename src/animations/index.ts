export const transition = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.23, 0.06, 0.1, 1],
    },
  },
  pageExit: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.23, 0.06, 0.1, 1],
    },
  },
};
