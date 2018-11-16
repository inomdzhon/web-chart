// core
import { Platform, Chart } from "./core";

// mock
import { Point } from "./Point";

// utils
import { debounce, ts } from "./utils";

export class Application {
  start(canvasId: string): void {
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    setTimeout(() => {
      this.chartInit(context);
    }, 200);
  }

  chartInit(context: CanvasRenderingContext2D): void {
    const app = document.querySelector(".app");
    if (!app) {
      return;
    }
    const { clientWidth: width, clientHeight: height } = app;
    const point = new Point();
    const chart = new Chart(new Platform(context));

    chart.setSize(width, height);

    chart.setPoints(point.array(1000));

    // add new point every seconds
    setInterval(() => {
      chart.addPoint(point.single(ts()));
    }, 1000);

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
