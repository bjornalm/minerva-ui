import React, { Component } from "react";

class Rect extends Component {
  constructor(props) {
    super(props);
  }

  getStrokeWidth() {
    const rectangle = this.props.rectangle;
    return rectangle.hasOutlineStroke()
      ? rectangle.getOutlineStrokeWidth()
      : "";
  }

  getStroke() {
    const rectangle = this.props.rectangle;
    return rectangle.hasOutlineStroke()
      ? rectangle.getOutlineStrokeColor()
      : "";
  }

  getHeight() {
    const rectangle = this.props.rectangle;
    return rectangle.topRight.vertical - rectangle.bottomLeft.vertical;
  }

  getWidth() {
    const rectangle = this.props.rectangle;
    return rectangle.topRight.horizontal - rectangle.bottomLeft.horizontal;
  }

  getX() {
    const rectangle = this.props.rectangle;
    return rectangle.topRight.horizontal;
  }

  getY() {
    const rectangle = this.props.rectangle;
    return rectangle.topRight.vertical;
  }

  render() {
    const rectangle = this.props.rectangle;
    if (!rectangle) {
      return null;
    }

    return (
      <rect
        width={this.getWidth()}
        height={this.getHeight()}
        x={this.getX()}
        y={this.getY()}
        stroke={this.getStroke()}
        strokeWidth={this.getStrokeWidth()}
      />
    );
  }
}

export default Rect;
