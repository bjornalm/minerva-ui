import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";

class Circle extends Component {
  getX() {
    const shape = this.props.shape;
    return shape.center.horizontal;
  }

  getY() {
    const shape = this.props.shape;
    return shape.center.vertical;
  }

  render() {
    const circle = this.props.shape;
    if (!circle) {
      return null;
    }

    return (
      <circle
        cx={this.getX()}
        cy={this.getY()}
        r={circle.radius}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
      />
    );
  }
}

export default withSVGPropsHOC(Circle);
