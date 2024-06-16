// Calculate the modulo of the dividend and divisor while keeping the result within the same sign as the divisor
// https://anguscroll.com/just/just-modulo

export const modulo = (n: number, d: number) => {
  return ((n % d) + d) % d;
};
