import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export type IntersectionChangeHandler = (
  entry: IntersectionObserverEntry
) => void;

export type IntersectionOptions = {
  root?: React.RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  defaultIntersecting?: boolean;
};

export const useSkew = (
  target: React.RefObject<Element> | Element | null,
  options: IntersectionOptions = {},
  callback?: IntersectionChangeHandler
) => {
  const { defaultIntersecting, ...opts } = options;
  const optsRef = useRef(opts);
  const [intersecting, setIntersecting] = useState(
    defaultIntersecting === true
  );
  const intersectedRef = useRef(false);

  const [ref, inView] = useInView({
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (target == null) {
      return;
    }

    const element = target instanceof Element ? target : target.current;
    if (element == null) {
      return;
    }

    if (intersectedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[entries.length - 1];
        setIntersecting(entry.isIntersecting);

        if (callback != null) {
          callback(entry);
        }

        if (entry.isIntersecting) {
          intersectedRef.current = true;
        }

        if (entry.isIntersecting && element != null) {
          observer.unobserve(element);
        }
      },
      {
        ...optsRef.current,
        root:
          optsRef.current.root != null ? optsRef.current.root.current : null,
      }
    );

    observer.observe(element);

    return () => {
      if (intersectedRef.current) {
        return;
      }

      if (element != null) {
        observer.unobserve(element);
      }
    };
  }, [optsRef.current, target]);

  return intersecting;
};
