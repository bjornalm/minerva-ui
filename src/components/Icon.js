import React, { Component } from "react";
import { MINERVA } from "../helpers";
import Rect from "./Rect";
import Circle from "./Circle";
import Line from "./Line";
import PositionedShapeModel from "../graphic-models/PositionedShapeModel";
import PositionedCompositeShapeModel from "../graphic-models/PositionedCompositeShapeModel";

class Icon extends Component {
  createSymbols() {
    const primitives = getUniquePrimitives(this.props.icon.shapes);
    // console.info(this.props.icon.shapes);
    // console.info(primitives);
    const primtiveSymbols = primitives.map(primitive => {
      const primitiveComponent = renderPrimitive(
        primitive,
        this.props.shapeDragDropped
      );

      return (
        <symbol key={primitive.atomId} id={primitive.atomId} overflow="visible">
          {primitiveComponent}
        </symbol>
      );
    });

    const compositeShapes = getUniqueCompositeShapes(this.props.icon.shapes);
    const compositeShapesSymbols = compositeShapes.map(cshape => {
      const positionedShapes = cshape.shapes
        .filter(shape => shape.primitive)
        .map(shape => {
          return (
            <use
              key={shape.componentId}
              href={`#${shape.primitive.atomId}`}
              x={shape.position.horizontal}
              y={shape.position.vertical}
              overflow="visible"
            />
          );
        });

      return (
        <symbol
          key={cshape.componentId}
          id={cshape.componentId}
          overflow="visible"
        >
          {positionedShapes}
        </symbol>
      );
    });

    // console.info(compositeShapes);

    return [...primtiveSymbols, ...compositeShapesSymbols];
  }

  createSymbolInstances() {
    const positionedShapes = this.props.icon.shapes;
    const positionedPrimitives = positionedShapes
      .filter(
        shape =>
          shape instanceof PositionedShapeModel ||
          shape instanceof PositionedCompositeShapeModel
      )
      .map(shape => {
        const x = shape.position.horizontal;
        const y = shape.position.vertical;
        return (
          <use
            key={shape.uniqueKey}
            href={`#${shape.componentId}`}
            x={x}
            y={y}
          />
        );
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

function getUniqueCompositeShapes(shapes) {
  const allCompositeShapes = [];

  shapes.forEach(shape => {
    if (shape instanceof PositionedCompositeShapeModel) {
      allCompositeShapes.push(shape);
      const childShapes = getUniqueCompositeShapes(shape.shapes);
      allCompositeShapes.push(...childShapes);
    }
  });

  return [...new Set(allCompositeShapes)];
}

function getUniquePrimitives(shapes) {
  const allPrimitives = [];

  shapes.forEach(shape => {
    if (shape instanceof PositionedShapeModel) {
      allPrimitives.push(shape.primitive);
    } else if (shape instanceof PositionedCompositeShapeModel) {
      const childShapes = getUniquePrimitives(shape.shapes);
      allPrimitives.push(...childShapes);
    }
  });

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
