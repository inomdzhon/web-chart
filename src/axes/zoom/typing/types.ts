export type ZoomType = {
  diff: number;
  minDiff: number;
  maxDiff: number;
  k: number;
};

export type OptionsType = {
  domain: {
    defaultDiff: number;
    minDiff: number;
    maxDiff: number;
  };
};
