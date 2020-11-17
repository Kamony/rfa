import React from "react";

export const useIntersectionObserver = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const ref = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1], rootMargin: `-1px 0px 150px 0px` }
      );

    observer.observe(cachedRef);

    // unmount
    return function () {
      observer.unobserve(cachedRef);
    };
  }, [ref]);

  return {
    isSticky,
    ref,
  };
};
