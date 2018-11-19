// types
export type ContentType = {
  width: number;
  height: number;
  margin: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
};

export type ScalesType = {
  xScale: {
    height: number;
  };
  yScale: {
    width: number;
  };
};

export class ViewArea {
  width: number = 390;
  height: number = 240;
  content: ContentType = {
    width: 300,
    height: 150,
    margin: {
      top: 20,
      left: 20,
      bottom: 20,
      right: 20,
    },
  };

  scales: ScalesType = {
    xScale: {
      height: 50,
    },
    yScale: {
      width: 50,
    },
  };

  update(width: number, height: number): void {
    const { content, scales } = this;
    this.width = width;
    this.height = height;
    this.content.width =
      width - scales.yScale.width - content.margin.left - content.margin.right;
    this.content.height =
      height -
      scales.xScale.height -
      content.margin.top -
      content.margin.bottom;
  }
}
