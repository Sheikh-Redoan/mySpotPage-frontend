export const slideInFromRight = (i = 0) => ({
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

export const slideInFromLeft = (i = 0) => ({
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

export const slideInFromBottom = (i = 0) => ({
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});
export const collapseVariants = (i = 0) => ({
  hidden: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
  },
  visible: (i = 0) => ({
    height: "auto",
    opacity: 1,
    overflow: "hidden",
    transition: {
      duration: 0.3,
      delay: i * 0.2,
      ease: "easeInOut",
    },
  }),
  exit: (i = 0) => ({
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: {
      duration: 0.3,
      delay: i * 0.2,
      ease: "easeInOut",
    },
  }),
});
