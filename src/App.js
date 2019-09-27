import React, { Component } from "react";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";
import Rect from "./components/Rect";
import Circle from "./components/Circle";
import Line from "./components/Line";

class App extends Component {
  state = {};

  shapeDragDropped = move => {
    console.info(move);
    MinervaParser.buildDragDropQuery(move.original, move.modified);
    this.setState({
      ...this.state,
      circle: move.modified
    });
  };

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
          line: primitives[1],
          circle: primitives[2]
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
          <Circle
            onDragDropped={this.shapeDragDropped}
            shape={this.state.circle}
          ></Circle>
          <Rect shape={this.state.rectangle}></Rect>
          <Line shape={this.state.line}></Line>
        </svg>
      </div>
    );
  }
}

export default App;
