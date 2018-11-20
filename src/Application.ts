// core
import { Chart } from "./core";

// mock
import { Point } from "./Point";

// utils
import { debounce, now } from "./utils";

export class Application {
  start(canvasId: string): void {
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    setTimeout(() => {
      this.chartInit(canvas);
    }, 200);
  }

  chartInit(canvas: HTMLCanvasElement): void {
    const app = document.querySelector(".app");
    if (!app) {
      return;
    }
    const { clientWidth: width, clientHeight: height } = app;
    const point = new Point();
    const chart = new Chart(canvas);

    chart.setSize(width, height);

    chart.setPoints(point.array(1000));

    // add new point every seconds
    setInterval(() => {
      chart.addPoint(point.single(now()));
    }, 500);

    function loop(): void {
      chart.update();
      window.requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener(
      "resize",
      debounce(() => {
        chart.setSize(app.clientWidth, app.clientHeight);
      }, 200),
    );
  }
}
