class Left<E, T = never> {
  readonly value: E;
  readonly __tag = 'left' as const;

  constructor(value: E) {
    this.value = value;
  }

  isLeft(): this is Left<E, T> {
    return true;
  }

  isRight(): this is Right<T, E> {
    return false;
  }
}

class Right<T, E = never> {
  readonly value: T;
  readonly __tag = 'right' as const;

  constructor(value: T) {
    this.value = value;
  }

  isLeft(): this is Left<E, T> {
    return false;
  }

  isRight(): this is Right<T, E> {
    return true;
  }
}

type Either<L, R> = Left<L, R> | Right<R, L>;

const left = <E, T = never>(value: E): Either<E, T> => {
  return new Left(value);
};

const right = <T, E = never>(value: T): Either<E, T> => {
  return new Right(value);
};

export { left, right };
export type { Either };
