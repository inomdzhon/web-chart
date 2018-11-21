
export type TextCommandType = {
  type: "text";
  value: string | number,
  position: {
    x: number;
    y: number;
  };
  style: {
    color: string;
    font: string;
  };
};

export type LineCommandType = {
  type: "line";
  position: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  style: {
    width: number;
    color: string;
    dash?: number[];
  };
};

export type CommandType = TextCommandType | LineCommandType;
