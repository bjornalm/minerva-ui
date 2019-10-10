import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import CirclePrimitive from "../graphic-models/CirclePrimitiveModel";

class Circle extends Component {
  getX() {
    return Circle.getX(this.props.shape);
  }

  getY() {
    return Circle.getY(this.props.shape);
  }

  static getX(shape) {
    return shape.center.horizontal;
  }

  static getY(shape) {
    return shape.center.vertical;
  }

  static getShapeWithNewPosition(shape, newX, newY) {
    const modifiedShape = CirclePrimitive.clone(shape);
    modifiedShape.center.horizontal = newX;
    modifiedShape.center.vertical = newY;
    modifiedShape.center.atomId = undefined;
    return modifiedShape;
  }

  render() {
    const circle = this.props.shape;
    if (!circle) {
      return null;
    }

    return (
      <circle
        style={this.props.style}
        cx={this.props.dragX || this.getX()}
        cy={this.props.dragY || this.getY()}
        r={circle.radius}
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

export default withSVGPropsHOC(Circle);
