import React, { Component } from "react";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";
import testdata from "./testdata.json";
import Icon from "./components/Icon";

class App extends Component {
  state = {};

  shapeDragDropped = move => {
    // const update = MinervaParser.buildDragDropQuery(
    //   move.original,
    //   move.modified
    // );

    const { original, modified } = move;
    const shapesCopy = [...this.state.primitives];
    const shapeIndex = shapesCopy.indexOf(original);
    shapesCopy.splice(shapeIndex, 1, modified);

    this.setState({
      ...this.state,
      primitives: shapesCopy
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
        const graphics = MinervaParser.buildIcons(data);
        this.setState({
          primitives: graphics.primitives,
          icons: graphics.icons
        });
      });
  }

  renderIcons() {
    if (!this.state.icons) {
      return null;
    }
    const icons = this.state.icons.map(icon => {
      return (
        <Icon
          key={icon.atomId}
          onDragDropped={this.shapeDragDropped}
          icon={icon}
        ></Icon>
      );
    });

    // console.info(icons);
    return icons;
  }

  render() {
    // console.info(this.state);
    const containerStyle = {
      boxShadow: "5px 5px 10px -2px rgba(0,0,0,0.22)"
    };
    return (
      <div className="App">
        <h1>Minerva</h1>
        <svg
          version="1.1"
          width="800"
          height="800"
          xmlns="http://www.w3.org/2000/svg"
          style={containerStyle}
        >
          <rect width="100%" height="100%" fill="#eeeeee" />
          {this.renderIcons()}
        </svg>
        <div className="json">
          <textarea defaultValue={JSON.stringify(testdata)}></textarea>
        </div>
      </div>
    );
  }
}

export default App;
