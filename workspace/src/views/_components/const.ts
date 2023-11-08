export type EleventyProps<T> = {
  pagination: {
    items: T;
    page: {
      first: T;
      previous: T;
      next: T;
      last: T;
    };
    pageNumber: number;
  };
};
