import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import LinePrimitiveModel from "../graphic-models/LinePrimitiveModel";

class Line extends Component {
  getX() {
    return Line.getX(this.props.shape);
  }

  getY() {
    return Line.getY(this.props.shape);
  }

  static getX(shape) {
    return shape.point1.horizontal;
  }

  static getY(shape) {
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

  getAllCoordinates() {
    const shape = this.props.shape;
    let x1, y1, x2, y2;

    if (this.props.isDragged) {
      x1 = this.props.dragX;
      y1 = this.props.dragY;
      x2 = shape.point2.horizontal - (shape.point1.horizontal - x1);
      y2 = shape.point2.vertical - (shape.point1.vertical - y1);
    } else {
      x1 = this.getX();
      y1 = this.getY();
      x2 = this.getX2();
      y2 = this.getY2();
    }

    return { x1, y1, x2, y2 };
  }

  static getShapeWithNewPosition(shape, newX, newY) {
    const modifiedShape = LinePrimitiveModel.clone(shape);
    const xDiff = modifiedShape.point1.horizontal - newX;
    const yDiff = modifiedShape.point1.vertical - newY;
    modifiedShape.point1.horizontal = newX;
    modifiedShape.point1.vertical = newY;
    modifiedShape.point1.atomId = undefined;
    modifiedShape.point2.horizontal = modifiedShape.point2.horizontal - xDiff;
    modifiedShape.point2.vertical = modifiedShape.point2.vertical - yDiff;
    modifiedShape.point2.atomId = undefined;
    return modifiedShape;
  }

  render() {
    const line = this.props.shape;
    if (!line) {
      return null;
    }

    const { x1, y1, x2, y2 } = this.getAllCoordinates();
    return (
      <line
        style={this.props.style}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onPointerUp={this.props.onPointerUp}
        onPointerDown={this.props.onPointerDown}
        onPointerMove={this.props.onPointerMove}
      />
    );
  }
}

export default withSVGPropsHOC(Line);
