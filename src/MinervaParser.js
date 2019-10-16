import PointModel from "./graphic-models/PointModel";
import RectanglePrimitiveModel from "./graphic-models/RectanglePrimitiveModel";
import CirclePrimitiveModel from "./graphic-models/CirclePrimitiveModel";
import LinePrimitiveModel from "./graphic-models/LinePrimitiveModel";
import OutlineModel from "./graphic-models/OutlineModel";
import ColorModel from "./graphic-models/ColorModel";
import StrokeModel from "./graphic-models/StrokeModel";
import SolidModel from "./graphic-models/SolidModel";

import { MINERVA } from "./helpers";
import MinervaForm from "./MinervaForm";
import MinervaTuple from "./MinervaTuple";
import PositionedShapeModel from "./graphic-models/PositionedShapeModel";
import PositionedCompositeShapeModel from "./graphic-models/PositionedCompositeShapeModel";
import IconModel from "./graphic-models/IconModel";

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

    const positionedShapes = createPositionedShapeModels(
      parsed,
      points,
      primitivesMap
    );

    const positionedShapesMap = {};
    positionedShapes.forEach(positionedShape => {
      if (!positionedShapesMap[positionedShape.shapeId]) {
        positionedShapesMap[positionedShape.shapeId] = [];
      }
      positionedShapesMap[positionedShape.shapeId].push(positionedShape);
    });

    const positionedCompositeShapes = getPositionedCompositeShapesTree(
      parsed,
      points,
      primitivesMap,
      positionedShapesMap
    );
    const atomNames = createAtomNameMap(parsed);
    const icons = createIcons({
      responseObjs: parsed,
      atomNames,
      positionedShapes,
      positionedCompositeShapes
    });

    // console.info(positionedComponentPrimitives);
    // console.info(atomNames);
    // console.info(icons);
    // console.info(positionedCompositeShapes);

    return { primitives, icons };
  }
}

function createIcons(params) {
  const result = [];
  params.responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.ICON) {
      ft.tuples.forEach(tuple => {
        const iconParams = { ...params };
        iconParams.form = ft.form;
        iconParams.tuple = tuple;
        const icon = IconModel.create(iconParams);
        result.push(icon);
      });
    }
  });
  return result;
}

function createAtomNameMap(responseObjs) {
  const ATOM = MINERVA.TUPLE_ATTR_TYPE.ATOM;
  const map = {};
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.NAMED_ATOM) {
      ft.tuples.forEach(tuple => {
        const atomId = tuple.getAttributeValue(ATOM, ft.form);
        const name = tuple.getAttributeValue(MINERVA.NAME, ft.form);
        map[atomId] = name;
      });
    }
  });
  return map;
}

function getPositionedCompositeShapesTree(
  responseObjs,
  points,
  primitives,
  positionedShapesMap
) {
  const posCompShapes = createPositionedCompositeShapes(
    responseObjs,
    points,
    primitives
  );

  addShapesToComposites(posCompShapes, positionedShapesMap);

  // 1. Add positionedShapes belonging to this composite
  const posCompShapesMap = {};
  posCompShapes.forEach(posCompShape => {
    posCompShapesMap[posCompShape.shapeId] = posCompShape;
  });

  const childShapes = [];
  posCompShapes.forEach(posCompShape => {
    const nestedChildShape = posCompShapesMap[posCompShape.componentId];
    if (nestedChildShape) {
      posCompShape.addChildShape(nestedChildShape);
      childShapes.push(nestedChildShape);
    }
  });

  const rootShapes = posCompShapes.filter(
    shape => !childShapes.includes(shape)
  );

  console.info(rootShapes);
  return rootShapes;
}

function addShapesToComposites(composites, shapesMap) {
  composites.forEach(composite => {
    const childShapeId = composite.componentId;
    if (shapesMap[childShapeId]) {
      composite.addChildShapes(shapesMap[childShapeId]);
    }
  });
}

function createPositionedCompositeShapes(responseObjs, points, primitives) {
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        if (!tupleHasPrimitive(tuple, ft.form, primitives)) {
          const pcp = PositionedCompositeShapeModel.create({
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

function createPositionedShapeModels(responseObjs, points, primitives) {
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        if (tupleHasPrimitive(tuple, ft.form, primitives)) {
          const pcp = PositionedShapeModel.create({
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

function tupleHasPrimitive(tuple, form, primitives) {
  const componentID = tuple.getAttributeValue(MINERVA.SHAPES.COMPONENT, form);
  return !!primitives[componentID];
}

function createPrimitives(responseObjs, pointMap, outlines, solids) {
  const primitives = [];
  responseObjs.forEach(ft => {
    ft.tuples.forEach(tuple => {
      switch (ft.form.type) {
        case MINERVA.PRIMITIVES.RECTANGLE:
          primitives.push(
            RectanglePrimitiveModel.create(
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
            CirclePrimitiveModel.create(
              ft.form,
              tuple,
              pointMap,
              outlines,
              solids
            )
          );
          break;
        case MINERVA.PRIMITIVES.LINE:
          primitives.push(
            LinePrimitiveModel.createLine(ft.form, tuple, pointMap, outlines)
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

        solids[solidId] = SolidModel.createSolid(ft.form, tuple, colors);
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

        strokes[strokeId] = StrokeModel.createStroke(ft.form, tuple, colors);
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
        colors[colorId] = ColorModel.createColor(ft.form, tuple);
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
        outlines[shapeId] = OutlineModel.createOutline(ft.form, tuple, strokes);
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
        points[pointId] = PointModel.createPoint(ft.form, tuple);
      });
    }
  });

  return points;
}
