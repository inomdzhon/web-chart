// libs
import * as React from "react";

import { Application } from "../../../src";

// styles
import "./App.scss";

const application = new Application();
export default class App extends React.Component {

  componentDidMount(): void {
    application.start("chart");
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <canvas id="chart" />
      </div>
    );
  }
}
