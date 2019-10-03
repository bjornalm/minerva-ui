import Point from "./graphic-models/Point";
import RectanglePrimitive from "./graphic-models/RectanglePrimitive";
import CirclePrimitive from "./graphic-models/CirclePrimitive";
import LinePrimitive from "./graphic-models/LinePrimitive";
import Outline from "./graphic-models/Outline";
import Color from "./graphic-models/Color";
import Stroke from "./graphic-models/Stroke";
import Solid from "./graphic-models/Solid";

import { MINERVA } from "./helpers";
import MinervaForm from "./MinervaForm";
import MinervaTuple from "./MinervaTuple";
import PositionedComponentPrimitive from "./graphic-models/PositionedComponentPrimitive";
import PositionedComponentShape from "./graphic-models/PositionedComponentShape";

export default class MinervaParser {
  static buildDragDropQuery(original, modified) {
    // TODO: generate the queris here
    switch (original.form.type) {
      case MINERVA.PRIMITIVES.CIRCLE:
        return { circle: modified };
      case MINERVA.PRIMITIVES.RECTANGLE:
        return { rectangle: modified };
      case MINERVA.PRIMITIVES.LINE:
        return { line: modified };
      default:
        return;
    }
  }

  static buildShapes(rawdata) {
    // console.log(rawdata);
    const parsed = rawdata.response.map(ft => ({
      form: new MinervaForm(ft.form),
      tuples: ft.tuples.map(rawTuple => new MinervaTuple(rawTuple))
    }));

    // console.info(parsed);

    const colors = createColorsMap(parsed);
    const strokes = createStrokesMap(parsed, colors);
    const solids = createSolidsMap(parsed, colors);
    const outlines = createOutlinesMap(parsed, strokes);
    const points = createPointsMap(parsed);
    const primitives = createPrimitives(parsed, points, outlines, solids);
    const primitivesMap = {};
    primitives.forEach(primitive => {
      primitivesMap[primitive.atomId] = primitive;
    });

    const psp = createPositionedComponentPrimitives(
      parsed,
      points,
      primitivesMap
    );

    const pcs = createPositionedComponentShapes(parsed, points, primitivesMap);

    const shapes = createShapes(parsed, points, primitivesMap);

    console.info(shapes);

    return primitives;
  }
}

function createShapes(responseObjs, pointMap, primitivesMap) {
  const shapeIds = {};
  const componentIds = {};
  const compositeShapeIds = [];

  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        const shapeId = tuple.getAttributeValue(MINERVA.SHAPES.SHAPE, ft.form);

        shapeIds[shapeId] = true;
        const componentId = tuple.getAttributeValue(
          MINERVA.SHAPES.COMPONENT,
          ft.form
        );

        console.info("shape tuple", tuple);
      });
    }
  });
}

function createPositionedComponentShapes(responseObjs, points, primitives) {
  const COMPONENT = MINERVA.SHAPES.COMPONENT;
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        const componentID = tuple.getAttributeValue(COMPONENT, ft.form);
        if (!primitives[componentID]) {
          const pcp = PositionedComponentShape.create({
            form: ft.form,
            tuple,
            points
          });
          result.push(pcp);
        }
      });
    }
  });
  return result;
}

function createPositionedComponentPrimitives(responseObjs, points, primitives) {
  const COMPONENT = MINERVA.SHAPES.COMPONENT;
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        const componentID = tuple.getAttributeValue(COMPONENT, ft.form);
        if (primitives[componentID]) {
          const pcp = PositionedComponentPrimitive.create({
            form: ft.form,
            tuple,
            points,
            primitives
          });
          result.push(pcp);
        }
      });
    }
  });
  return result;
}

function createPrimitives(responseObjs, pointMap, outlines, solids) {
  const primitives = [];
  responseObjs.forEach(ft => {
    ft.tuples.forEach(tuple => {
      switch (ft.form.type) {
        case MINERVA.PRIMITIVES.RECTANGLE:
          primitives.push(
            RectanglePrimitive.create(
              ft.form,
              tuple,
              pointMap,
              outlines,
              solids
            )
          );
          break;
        case MINERVA.PRIMITIVES.CIRCLE:
          primitives.push(
            CirclePrimitive.create(ft.form, tuple, pointMap, outlines, solids)
          );
          break;
        case MINERVA.PRIMITIVES.LINE:
          primitives.push(
            LinePrimitive.createLine(ft.form, tuple, pointMap, outlines)
          );
          break;
        default:
          break;
      }
    });
  });

  return primitives;
}

function createSolidsMap(responseObjs, colors) {
  const solids = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.SOLID) {
      ft.tuples.forEach(tuple => {
        const solidId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.SOLID,
          ft.form
        );

        solids[solidId] = Solid.createSolid(ft.form, tuple, colors);
      });
    }
  });

  return solids;
}

function createStrokesMap(responseObjs, colors) {
  const strokes = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.STROKE) {
      ft.tuples.forEach(tuple => {
        const strokeId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.STROKE,
          ft.form
        );

        strokes[strokeId] = Stroke.createStroke(ft.form, tuple, colors);
      });
    }
  });

  return strokes;
}

function createColorsMap(responseObjs) {
  const colors = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.COLOR) {
      ft.tuples.forEach(tuple => {
        const colorId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.COLOR,
          ft.form
        );
        colors[colorId] = Color.createColor(ft.form, tuple);
      });
    }
  });

  return colors;
}

function createOutlinesMap(responseObjs, strokes) {
  const outlines = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.OUTLINE) {
      ft.tuples.forEach(tuple => {
        const shapeId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.OUTLINE,
          ft.form
        );
        outlines[shapeId] = Outline.createOutline(ft.form, tuple, strokes);
      });
    }
  });

  return outlines;
}

function createPointsMap(responseObjs) {
  const points = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.POINT) {
      ft.tuples.forEach(tuple => {
        const pointId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.POINT,
          ft.form
        );
        points[pointId] = Point.createPoint(ft.form, tuple);
      });
    }
  });

  return points;
}
