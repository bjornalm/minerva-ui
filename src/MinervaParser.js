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
import ShapeModel from "./graphic-models/ShapeModel";
import CompositeModel from "./graphic-models/CompositeModel";
import IconModel from "./graphic-models/IconModel";
import PolygonPrimitiveModel from "./graphic-models/PolygonPrimitiveModel";
import PolylinePrimitiveModel from "./graphic-models/PolylinePrimitiveModel";
import EllipsePrimitiveModel from "./graphic-models/EllipsePrimitiveModel";
import TextPrimitiveModel from "./graphic-models/TextPrimitiveModel";

/**
 * The MinervaParser is used to transform the minerva relations delivered as forms and tuples in JSON
 * to object models that are easier to handle for the react components. It knows how to interpret the
 * Minerva specific graphic keywords, i.e. what icon, shape, position, color and all the primitives etc
 * means so when in the future these things change the parser must be updated or extended to reflect
 * the change. The parser uses a “MinervaForm” class and “MinervaTuple” class to wrap the raw forms and
 * tuples and make them easier to handle.
 */
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

  static buildIcons(rawdata) {
    const parsed = parseRawData(rawdata);

    const colors = createColorsMap(parsed);
    const strokes = createStrokesMap(parsed, colors);
    const solids = createSolidsMap(parsed, colors);
    const outlines = createOutlinesMap(parsed, strokes);
    const points = createPointsMap(parsed);
    const lists = createOrderedListsMap(parsed);

    const primitives = createPrimitives(
      parsed,
      points,
      outlines,
      solids,
      lists
    );

    const primitivesMap = generateMapUsingKey(primitives, "atomId");

    const shapes = createShapes(parsed, points, primitivesMap);
    const shapesMap = generateMapUsingKey(shapes, "shapeId", true);

    const compositesData = { parsed, points, primitivesMap, shapesMap };
    const composites = getCompositesTrees(compositesData);

    const atomNames = createAtomNameMap(parsed);
    const iconsData = { responseObjs: parsed, atomNames, shapes, composites };
    const icons = createIcons(iconsData);

    console.info(primitives);
    // console.info(icons);
    // console.info(composites);

    return { primitives, icons };
  }
}

function parseRawData(rawdata) {
  return rawdata.response.map(ft => ({
    form: new MinervaForm(ft.form),
    tuples: ft.tuples.map(rawTuple => new MinervaTuple(rawTuple))
  }));
}

function createOrderedListsMap(responseObjs) {
  const listsMap = Object.create(null);
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.COLLECTIONS.LIST) {
      ft.tuples.forEach(tuple => {
        const listId = tuple.getAttributeValue(
          MINERVA.COLLECTIONS.LIST,
          ft.form
        );
        const value = tuple.getAttributeValue(
          MINERVA.COLLECTIONS.ELEMENT,
          ft.form
        );
        const index = tuple.getAttributeValue(
          MINERVA.COLLECTIONS.POSITION,
          ft.form
        );

        if (!listsMap[listId]) {
          listsMap[listId] = [];
        }

        listsMap[listId].push({ index, value });
      });
    }
  });

  Object.keys(listsMap).forEach(listId => {
    const list = listsMap[listId];
    list.sort((a, b) => a.index - b.index);
    listsMap[listId] = list.map(obj => obj.value);
  });

  return listsMap;
}

function generateMapUsingKey(arr, mapKey, placeValuesInArray) {
  const myMap = Object.create(null);
  arr.forEach(item => {
    const key = item[mapKey];
    if (placeValuesInArray) {
      if (!myMap[key]) {
        myMap[key] = [];
      }
      myMap[key].push(item);
    } else {
      myMap[key] = item;
    }
  });
  return myMap;
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

function getCompositesTrees(conf) {
  const { parsed, points, primitivesMap, shapesMap } = conf;
  const composites = createComposites(parsed, points, primitivesMap);
  const compositesMap = generateMapUsingKey(composites, "shapeId", true);

  addShapesToComposites(composites, shapesMap);

  const childShapes = [];
  composites.forEach(composite => {
    const nestedChildShapes = compositesMap[composite.componentId];
    if (Array.isArray(nestedChildShapes) && nestedChildShapes.length) {
      composite.addChildShapes(nestedChildShapes);
      childShapes.push(...nestedChildShapes);
    }
  });

  const rootShapes = composites.filter(shape => !childShapes.includes(shape));

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

function createComposites(responseObjs, points, primitives) {
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        if (!tupleHasPrimitive(tuple, ft.form, primitives)) {
          const pcp = CompositeModel.create({
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

function createShapes(responseObjs, points, primitives) {
  const result = [];
  responseObjs.forEach(ft => {
    if (ft.form.type === MINERVA.SHAPES.SHAPE) {
      ft.tuples.forEach(tuple => {
        if (tupleHasPrimitive(tuple, ft.form, primitives)) {
          const pcp = ShapeModel.create({
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

function createPrimitives(responseObjs, pointMap, outlines, solids, lists) {
  const primitives = [];
  responseObjs.forEach(ft => {
    ft.tuples.forEach(tuple => {
      const args = [ft.form, tuple, pointMap, outlines, solids];
      switch (ft.form.type) {
        case MINERVA.PRIMITIVES.RECTANGLE:
          primitives.push(RectanglePrimitiveModel.create(...args));
          break;
        case MINERVA.PRIMITIVES.CIRCLE:
          primitives.push(CirclePrimitiveModel.create(...args));
          break;
        case MINERVA.PRIMITIVES.LINE:
          primitives.push(LinePrimitiveModel.create(...args));
          break;
        case MINERVA.PRIMITIVES.POLYGON:
          primitives.push(PolygonPrimitiveModel.create(...args, lists));
          break;
        case MINERVA.PRIMITIVES.POLYLINE:
          primitives.push(PolylinePrimitiveModel.create(...args, lists));
          break;
        case MINERVA.PRIMITIVES.ELLIPSE:
          primitives.push(EllipsePrimitiveModel.create(...args));
          break;
        case MINERVA.PRIMITIVES.TEXT:
          primitives.push(TextPrimitiveModel.create(ft.form, tuple, solids));
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
