import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import PolygonPrimitiveModel from "../graphic-models/LinePrimitiveModel";

class Polygon extends Component {
  getPointsString() {
    const polygonPrimtive = this.props.shape;
    return polygonPrimtive.points
      .map(point => `${point.horizontal}, ${point.vertical}`)
      .join(" ");
  }

  render() {
    const polygon = this.props.shape;
    if (!polygon) {
      return null;
    }

    return (
      <polygon
        style={this.props.style}
        points={this.getPointsString()}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onPointerUp={this.props.onPointerUp}
        onPointerDown={this.props.onPointerDown}
        onPointerMove={this.props.onPointerMove}
      />
    );
  }
}

export default withSVGPropsHOC(Polygon);
