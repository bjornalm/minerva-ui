import React, { Component } from "react";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";
import Rect from "./components/Rect";
import Circle from "./components/Circle";

class App extends Component {
  state = {};

  componentDidMount() {
    httpService
      .executeQuery({
        title: "foo",
        body: "bar",
        userId: 1
      })
      .then(data => {
        const primitives = MinervaParser.buildPrimitives(data);
        this.setState({
          rectangle: primitives[0],
          circle: primitives[1]
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Minerva</h1>
        <svg
          version="1.1"
          baseProfile="full"
          width="800"
          height="800"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" fill="black" />
          <Circle shape={this.state.circle}></Circle>
          <Rect shape={this.state.rectangle}></Rect>
        </svg>
      </div>
    );
  }
}

export default App;
