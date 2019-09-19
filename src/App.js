import React, { Component } from "react";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";
import Rect from "./components/Rect";

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
        this.setState({
          rectangle: MinervaParser.buildPrimitives(data)
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
          <Rect rectangle={this.state.rectangle}></Rect>
        </svg>
      </div>
    );
  }
}

export default App;
