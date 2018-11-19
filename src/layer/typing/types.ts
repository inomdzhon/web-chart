export type IdType = string | number;
export type HashType = {
  [key: string]: number;
};

export type ListenersType<T> = {
  add: ((items: T[]) => void)[];
  remove: ((items: T[]) => void)[];
};
