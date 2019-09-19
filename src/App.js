import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";

class App extends Component {
  render() {
    httpService
      .executeQuery({
        title: "foo",
        body: "bar",
        userId: 1
      })
      .then(data => {
        MinervaParser.buildPrimitives(data);
      });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
