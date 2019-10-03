import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import RectanglePrimitive from "../graphic-models/RectanglePrimitive";

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
    return Rect.getX(this.props.shape);
  }

  getY() {
    return Rect.getY(this.props.shape);
  }

  static getX(shape) {
    return shape.topRight.horizontal;
  }

  static getY(shape) {
    return shape.topRight.vertical;
  }

  static getShapeWithNewPosition(shape, newX, newY) {
    const modifiedShape = RectanglePrimitive.clone(shape);
    const xDiff = modifiedShape.topRight.horizontal - newX;
    const yDiff = modifiedShape.topRight.vertical - newY;
    modifiedShape.topRight.horizontal = newX;
    modifiedShape.topRight.vertical = newY;
    modifiedShape.topRight.atomId = undefined;
    modifiedShape.bottomLeft.horizontal =
      modifiedShape.bottomLeft.horizontal - xDiff;
    modifiedShape.bottomLeft.vertical =
      modifiedShape.bottomLeft.vertical - yDiff;
    modifiedShape.bottomLeft.atomId = undefined;
    return modifiedShape;
  }

  render() {
    const rectangle = this.props.shape;
    if (!rectangle) {
      return null;
    }

    return (
      <rect
        style={this.props.style}
        width={this.getWidth()}
        height={this.getHeight()}
        x={this.props.dragX || this.getX()}
        y={this.props.dragY || this.getY()}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        fill={this.props.fill}
        onPointerUp={this.props.onPointerUp}
        onPointerDown={this.props.onPointerDown}
        onPointerMove={this.props.onPointerMove}
      >
        <title>{this.props.shape.atomId}</title>
      </rect>
    );
  }
}

export default withSVGPropsHOC(Rect);
