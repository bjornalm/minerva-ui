import React, { Component } from "react";
import "./App.css";
import httpService from "./httpService";
import MinervaParser from "./MinervaParser";
// import Rect from "./components/Rect";
// import Circle from "./components/Circle";
// import Line from "./components/Line";
// import { MINERVA } from "./helpers";
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
        const graphics = MinervaParser.buildShapes(data);
        this.setState({
          primitives: graphics.primitives,
          icons: graphics.icons
        });
      });
  }

  // renderShapes() {
  //   if (!this.state.primitives) {
  //     return null;
  //   }

  //   const primitives = this.state.primitives.map(shape => {
  //     const key = shape.atomId;
  //     let renderedShape;
  //     switch (shape.form.type) {
  //       case MINERVA.PRIMITIVES.CIRCLE:
  //         renderedShape = (
  //           <Circle
  //             key={key}
  //             onDragDropped={this.shapeDragDropped}
  //             shape={shape}
  //           ></Circle>
  //         );
  //         break;
  //       case MINERVA.PRIMITIVES.RECTANGLE:
  //         renderedShape = (
  //           <Rect
  //             key={key}
  //             onDragDropped={this.shapeDragDropped}
  //             shape={shape}
  //           ></Rect>
  //         );
  //         break;
  //       case MINERVA.PRIMITIVES.LINE:
  //         renderedShape = (
  //           <Line
  //             key={key}
  //             onDragDropped={this.shapeDragDropped}
  //             shape={shape}
  //           ></Line>
  //         );
  //         break;
  //       default:
  //         console.error("Shape could not be rendered", shape);
  //         break;
  //     }

  //     return renderedShape;
  //   });

  //   return primitives;
  // }

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
      </div>
    );
  }
}

export default App;
