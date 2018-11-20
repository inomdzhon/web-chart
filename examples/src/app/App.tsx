// libs
import * as React from "react";

import { Application, WebGLApplication } from "../../../src";

// styles
import "./App.scss";

const application = new Application();
const webGLApplication = new WebGLApplication();
export default class App extends React.Component {

  componentDidMount(): void {
    webGLApplication.start("chart");
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <canvas id="chart" />
      </div>
    );
  }
}
