import React, { Component } from "react";
import { MINERVA } from "../helpers";
import Rect from "./Rect";
import Circle from "./Circle";
import Line from "./Line";
import PositionedComponentPrimitive from "../graphic-models/PositionedComponentPrimitive";

class Icon extends Component {
  createSymbols() {
    const primitives = getUniquePrimitives(this.props.icon);
    const svgSymbols = primitives.map(primitive => {
      const primitiveComponent = renderPrimitive(
        primitive,
        this.props.shapeDragDropped
      );

      return <symbol id={primitive.atomId}>{primitiveComponent}</symbol>;
    });
    return svgSymbols;
  }

  createSymbolInstances() {
    const positionedShapes = this.props.icon.shapes;
    const positionedPrimitives = positionedShapes.map(shape => {
      if (shape instanceof PositionedComponentPrimitive) {
        const x = shape.position.horizontal;
        const y = shape.position.vertical;
        return <use href={`#${shape.componentId}`} x={x} y={y} />;
      }
    });

    return positionedPrimitives;
  }

  render() {
    if (!this.props.icon) {
      return null;
    }

    return (
      <>
        {this.createSymbols()} {this.createSymbolInstances()}
      </>
    );
  }
}

export default Icon;

function getUniquePrimitives(iconModel) {
  const allPrimitives = iconModel.shapes
    .filter(shape => shape instanceof PositionedComponentPrimitive)
    .map(shape => shape.primitive);
  return [...new Set(allPrimitives)];
}

function renderPrimitive(primitive, dragDropped) {
  const key = primitive.atomId;
  let renderedPrimitive;
  switch (primitive.form.type) {
    case MINERVA.PRIMITIVES.CIRCLE:
      renderedPrimitive = (
        <Circle
          key={key}
          onDragDropped={dragDropped}
          shape={primitive}
        ></Circle>
      );
      break;
    case MINERVA.PRIMITIVES.RECTANGLE:
      renderedPrimitive = (
        <Rect key={key} onDragDropped={dragDropped} shape={primitive}></Rect>
      );
      break;
    case MINERVA.PRIMITIVES.LINE:
      renderedPrimitive = (
        <Line key={key} onDragDropped={dragDropped} shape={primitive}></Line>
      );
      break;
    default:
      console.error("Shape could not be rendered", primitive);
      break;
  }

  return renderedPrimitive;
}
