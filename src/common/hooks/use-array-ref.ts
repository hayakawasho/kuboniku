import { useRef } from 'react';

// https://greensock.com/react-advanced/#useArrayRef
// TODO: 型
const useArrayRef = () => {
  const refs: any = useRef([]);
  refs.current = [];
  return [refs, (ref: any) => ref && refs.current.push(ref)];
};

export { useArrayRef };
