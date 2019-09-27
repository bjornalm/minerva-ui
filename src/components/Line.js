import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";

class Line extends Component {
  getX() {
    const shape = this.props.shape;
    return shape.point1.horizontal;
  }

  getY() {
    const shape = this.props.shape;
    return shape.point1.vertical;
  }

  getX2() {
    const shape = this.props.shape;
    return shape.point2.horizontal;
  }

  getY2() {
    const shape = this.props.shape;
    return shape.point2.vertical;
  }

  onClick() {
    console.info("click");
  }

  render() {
    const line = this.props.shape;
    if (!line) {
      return null;
    }
    return (
      <line
        onClick={this.onClick}
        x1={this.getX()}
        y1={this.getY()}
        x2={this.getX2()}
        y2={this.getY2()}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
      />
    );
  }
}

export default withSVGPropsHOC(Line);
