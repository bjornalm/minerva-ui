import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import RectanglePrimitiveModel from "../graphic-models/RectanglePrimitiveModel";

class Rect extends Component {
  getHeight() {
    const rectangle = this.props.shape;
    return rectangle.bottomRight.vertical - rectangle.topLeft.vertical;
  }

  getWidth() {
    const rectangle = this.props.shape;
    return rectangle.bottomRight.horizontal - rectangle.topLeft.horizontal;
  }

  getX() {
    return Rect.getX(this.props.shape);
  }

  getY() {
    return Rect.getY(this.props.shape);
  }

  static getX(shape) {
    return shape.topLeft.horizontal;
  }

  static getY(shape) {
    return shape.topLeft.vertical;
  }

  static getShapeWithNewPosition(shape, newX, newY) {
    const modifiedShape = RectanglePrimitiveModel.clone(shape);
    const xDiff = modifiedShape.topLeft.horizontal - newX;
    const yDiff = modifiedShape.topLeft.vertical - newY;
    modifiedShape.topLeft.horizontal = newX;
    modifiedShape.topLeft.vertical = newY;
    modifiedShape.topLeft.atomId = undefined;
    modifiedShape.bottomRight.horizontal =
      modifiedShape.bottomRight.horizontal - xDiff;
    modifiedShape.bottomRight.vertical =
      modifiedShape.bottomRight.vertical - yDiff;
    modifiedShape.bottomRight.atomId = undefined;
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
