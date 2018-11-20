import { random } from "utils";
import { number } from "prop-types";

/**
 * Вершинный шейдер отвечает за координаты и размер
 */
const vertexShader = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

/**
 * Фрагментный Шейдер отвечает за цвет
 */
const fragmentShader = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
`;

export class WebGLApplication {
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
    canvas.width = width;
    canvas.height = height;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      throw new Error("Not supported");
    }

    const glProgram = this.initShaders(gl);
    const a_Position = gl.getAttribLocation(glProgram, "a_Position");

    const points: {
      x: number;
      radius: number;
      y: number;
      angle: number;
    }[] = [];

    function computeX(radius: number, angle: number): number {
      return radius * Math.cos((angle * Math.PI) / 180);
    }

    function computeY(radius: number, angle: number): number {
      return radius * Math.sin((angle * Math.PI) / 180);
    }

    for (let i = 0; i < 10000; i += 1) {
      const point = {
        x: 0,
        y: 0,
        angle: random(0, 360),
        radius: Math.random(),
      };
      point.x = computeX(point.radius, point.angle);
      point.y = computeY(point.radius, point.angle);
      points.push(point);
    }

    function animation(): void {
      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (let i = 0; i < points.length; i += 1) {
          gl.vertexAttrib3f(a_Position, points[i].x, points[i].y, 1.0);
          gl.drawArrays(gl.POINTS, 0, 1);
          points[i].angle += 1;
          if (points[i].angle > 360) {
            points[i].angle = 0;
          }
          points[i].x = computeX(points[i].radius, points[i].angle);
          points[i].y = computeY(points[i].radius, points[i].angle);
        }
      }
      requestAnimationFrame(animation);
    }
    animation();
  }

  private initShaders(gl: WebGLRenderingContext): WebGLProgram {
    // создать шейдерную программу
    const program = gl.createProgram();
    if (!program) {
      throw new Error("program not created");
    }
    const vertex = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertex) {
      throw new Error("program not created");
    }
    gl.attachShader(program, this.createShader(gl, "vertex"));
    gl.attachShader(program, this.createShader(gl, "fragment"));
    gl.linkProgram(program);

    // Если создать шейдерную программу не удалось, вывести предупреждение
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }
    gl.useProgram(program);
    return program;
  }

  private createShader(
    gl: WebGLRenderingContext,
    type: "vertex" | "fragment",
  ): WebGLShader {
    let shader: WebGLShader | null = null;
    switch (type) {
      case "vertex":
        shader = gl.createShader(gl.VERTEX_SHADER);
        if (shader) {
          gl.shaderSource(shader, vertexShader);
        }
        break;
      case "fragment":
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        if (shader) {
          gl.shaderSource(shader, fragmentShader);
        }
        break;
    }
    if (!shader) {
      throw new Error("shader not created");
    }
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(`Shader compile error ${gl.getShaderInfoLog(shader)}`);
    }
    return shader;
  }
}
