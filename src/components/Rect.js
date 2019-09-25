import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";

class Rect extends Component {
  getHeight() {
    const rectangle = this.props.shape;
    return rectangle.topRight.vertical - rectangle.bottomLeft.vertical;
  }

  getWidth() {
    const rectangle = this.props.shape;
    return rectangle.topRight.horizontal - rectangle.bottomLeft.horizontal;
  }

  getX() {
    const rectangle = this.props.shape;
    return rectangle.topRight.horizontal;
  }

  getY() {
    const rectangle = this.props.shape;
    return rectangle.topRight.vertical;
  }

  render() {
    const rectangle = this.props.shape;
    if (!rectangle) {
      return null;
    }

    console.info(this.props);

    return (
      <rect
        width={this.getWidth()}
        height={this.getHeight()}
        x={this.getX()}
        y={this.getY()}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        fill={this.props.fill}
      />
    );
  }
}

export default withSVGPropsHOC(Rect);
