import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";

class Polyline extends Component {
  getPointsString() {
    const polylinePrimtive = this.props.shape;
    return polylinePrimtive.points
      .map(point => `${point.horizontal},${point.vertical}`)
      .join(" ");
  }

  render() {
    const polyline = this.props.shape;
    if (!polyline) {
      return null;
    }

    return (
      <polyline
        style={this.props.style}
        points={this.getPointsString()}
        stroke={this.props.stroke}
        fill={this.props.fill}
        strokeWidth={this.props.strokeWidth}
        onPointerUp={this.props.onPointerUp}
        onPointerDown={this.props.onPointerDown}
        onPointerMove={this.props.onPointerMove}
      />
    );
  }
}

export default withSVGPropsHOC(Polyline);
