import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import EllipsePrimitive from "../graphic-models/CirclePrimitiveModel";

class Ellipse extends Component {
  getX() {
    return Ellipse.getX(this.props.shape);
  }

  getY() {
    return Ellipse.getY(this.props.shape);
  }

  static getX(shape) {
    return shape.center.horizontal;
  }

  static getY(shape) {
    return shape.center.vertical;
  }

  static getShapeWithNewPosition(shape, newX, newY) {
    const modifiedShape = EllipsePrimitive.clone(shape);
    modifiedShape.center.horizontal = newX;
    modifiedShape.center.vertical = newY;
    modifiedShape.center.atomId = undefined;
    return modifiedShape;
  }

  render() {
    const ellipse = this.props.shape;
    if (!ellipse) {
      return null;
    }

    return (
      <ellipse
        style={this.props.style}
        cx={this.props.dragX || this.getX()}
        cy={this.props.dragY || this.getY()}
        rx={ellipse.xRadius}
        ry={ellipse.yRadius}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onPointerUp={this.props.onPointerUp}
        onPointerDown={this.props.onPointerDown}
        onPointerMove={this.props.onPointerMove}
      />
    );
  }
}

export default withSVGPropsHOC(Ellipse);
