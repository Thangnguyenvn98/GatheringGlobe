// import { useState, useEffect, useRef } from 'react';
// import { useInView } from 'react-intersection-observer';

// interface UseFixedOnScrollProps {
//   root?: HTMLElement | null;
//   threshold?: number;
// }

// export const useFixedOnScroll = (props: UseFixedOnScrollProps = {}): boolean => {
//   const [isFixed, setIsFixed] = useState(false);
//   const ref = useRef<HTMLElement>(null);
//   const { inView } = useInView({
//     root: props.root,
//     threshold: props.threshold || 0.1, // Adjust threshold as needed
//   });

//   useEffect(() => {
//     setIsFixed(inView);
//   }, [inView]);

//   return isFixed;
// };
