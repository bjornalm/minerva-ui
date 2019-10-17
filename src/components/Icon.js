import React, { Component } from "react";
import { MINERVA } from "../helpers";
import Rect from "./Rect";
import Circle from "./Circle";
import Line from "./Line";
import ShapeModel from "../graphic-models/ShapeModel";
import CompositeModel from "../graphic-models/CompositeModel";

class Icon extends Component {
  createSymbols() {
    const primitiveSymbols = this.createPrimitivesInSymbols();
    const composites = getUniqueComposites(this.props.icon.shapes);

    const test = [];
    composites.forEach(composite => {
      const symbolContent = this.createCompositeSymbols(composite);
      const symbol = (
        <symbol
          key={composite.componentId}
          id={composite.componentId}
          overflow="visible"
        >
          {symbolContent}
        </symbol>
      );
      test.push(symbol);
    });

    return [...primitiveSymbols, ...test];
  }

  createCompositeSymbols(cShape) {
    const symbolContents = [];
    if (cShape.shapes) {
      cShape.shapes.forEach(shape => {
        if (shape instanceof CompositeModel) {
          // Recursive get childshapes
          symbolContents.push(
            <use
              key={shape.componentId}
              href={`#${shape.componentId}`}
              x={shape.position.horizontal}
              y={shape.position.vertical}
              overflow="visible"
            />
          );
          // const childComposites = this.createCompositeSymbols(shape);
          // symbolContents.push(childComposites);
        } else if (shape instanceof ShapeModel) {
          symbolContents.push(
            <use
              key={shape.componentId}
              href={`#${shape.primitive.atomId}`}
              x={shape.position.horizontal}
              y={shape.position.vertical}
              overflow="visible"
            />
          );
        }
      });
    }
    return symbolContents;
    // return (
    //   <symbol
    //     key={cShape.componentId}
    //     id={cShape.componentId}
    //     overflow="visible"
    //   >
    //     {symbolContents}
    //   </symbol>
    // );
  }

  createPrimitivesInSymbols() {
    const primitives = getUniquePrimitives(this.props.icon.shapes);
    const primitiveSymbols = primitives.map(primitive => {
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

    return primitiveSymbols;
  }

  createRootSymbolInstances() {
    const shapes = this.props.icon.shapes;
    const rootInstances = shapes.map(shape => {
      const x = shape.position.horizontal;
      const y = shape.position.vertical;
      return (
        <use key={shape.uniqueKey} href={`#${shape.componentId}`} x={x} y={y} />
      );
    });

    return rootInstances;
  }

  render() {
    if (!this.props.icon) {
      return null;
    }

    return (
      <>
        {this.createSymbols()} {this.createRootSymbolInstances()}
      </>
    );
  }
}

export default Icon;

function getUniqueComposites(shapes) {
  const allComposites = [];

  shapes.forEach(shape => {
    if (shape instanceof CompositeModel) {
      allComposites.push(shape);
      const childShapes = getUniqueComposites(shape.shapes);
      allComposites.push(...childShapes);
    }
  });

  return [...new Set(allComposites)];
}

function getUniquePrimitives(shapes) {
  const allPrimitives = [];

  shapes.forEach(shape => {
    if (shape instanceof ShapeModel) {
      allPrimitives.push(shape.primitive);
    } else if (shape instanceof CompositeModel) {
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
