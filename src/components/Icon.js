import React, { Component } from "react";
import { MINERVA } from "../helpers";
import Rect from "./Rect";
import Circle from "./Circle";
import Ellipse from "./Ellipse";
import Line from "./Line";
import Polygon from "./Polygon";
import Polyline from "./Polyline";
import ShapeModel from "../graphic-models/ShapeModel";
import CompositeModel from "../graphic-models/CompositeModel";

class Icon extends Component {
  createSymbols() {
    const primitiveSymbols = this.createPrimitivesInSymbols();
    const composites = getUniqueComposites(this.props.icon.shapes);

    const compositeSymbols = [];
    composites.forEach(composite => {
      const symbolContent = createCompositeIntances(composite);
      const symbol = (
        <symbol
          key={composite.uniqueKey}
          id={composite.componentId}
          overflow="visible"
        >
          {symbolContent}
        </symbol>
      );
      compositeSymbols.push(symbol);
    });

    return [...primitiveSymbols, ...compositeSymbols];
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

function createCompositeIntances(cShape) {
  let symbolContents = [];
  if (cShape.shapes) {
    symbolContents = cShape.shapes.map(shape => {
      const href =
        shape instanceof CompositeModel
          ? `#${shape.componentId}`
          : `#${shape.primitive.atomId}`;
      return renderInstanceRef(shape, href);
    });
  }
  return symbolContents;
}

function renderInstanceRef(shape, href) {
  return (
    <use
      key={shape.uniqueKey}
      href={href}
      x={shape.position.horizontal}
      y={shape.position.vertical}
      overflow="visible"
    />
  );
}

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
    case MINERVA.PRIMITIVES.ELLIPSE:
      renderedPrimitive = (
        <Ellipse
          key={key}
          onDragDropped={dragDropped}
          shape={primitive}
        ></Ellipse>
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
    case MINERVA.PRIMITIVES.POLYGON:
      renderedPrimitive = (
        <Polygon
          key={key}
          onDragDropped={dragDropped}
          shape={primitive}
        ></Polygon>
      );
      break;
    case MINERVA.PRIMITIVES.POLYLINE:
      renderedPrimitive = (
        <Polyline
          key={key}
          onDragDropped={dragDropped}
          shape={primitive}
        ></Polyline>
      );
      break;
    default:
      console.error("Shape could not be rendered", primitive);
      break;
  }

  return renderedPrimitive;
}
