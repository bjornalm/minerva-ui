import Point from "./primitives/Point";
import RectangleShape from "./primitives/RectangleShape";
import CircleShape from "./primitives/CircleShape";
import LineShape from "./primitives/LineShape";
import Outline from "./primitives/Outline";
import Color from "./primitives/Color";
import Stroke from "./primitives/Stroke";
import Solid from "./primitives/Solid";

import { MINERVA } from "./helpers";
import MinervaForm from "./MinervaForm";
import MinervaTuple from "./MinervaTuple";

export default class MinervaParser {
  static buildDragDropQuery(original, modified) {
    console.log(original instanceof CircleShape);
  }

  static buildPrimitives(rawdata) {
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
    const shapes = createShapePrimitives(parsed, points, outlines, solids);

    // console.log(colors);
    // console.log(strokes);
    // console.log(outlines);
    // console.log(pointMap);
    console.log(shapes);

    return shapes;
  }
}

function createShapePrimitives(rawPrimitives, pointMap, outlines, solids) {
  const shapes = [];
  rawPrimitives.forEach(ft => {
    ft.tuples.forEach(tuple => {
      switch (ft.form.type) {
        case MINERVA.PRIMITIVES.RECTANGLE:
          shapes.push(
            RectangleShape.createRectangle(
              ft.form,
              tuple,
              pointMap,
              outlines,
              solids
            )
          );
          break;
        case MINERVA.PRIMITIVES.CIRCLE:
          shapes.push(
            CircleShape.create(ft.form, tuple, pointMap, outlines, solids)
          );
          break;
        case MINERVA.PRIMITIVES.LINE:
          shapes.push(LineShape.createLine(ft.form, tuple, pointMap, outlines));
          break;
        default:
          break;
      }
    });
  });

  return shapes;
}

function createSolidsMap(primitives, colors) {
  const solids = Object.create(null);
  primitives.forEach(ft => {
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

function createStrokesMap(primitives, colors) {
  const strokes = Object.create(null);
  primitives.forEach(ft => {
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

function createColorsMap(primitives) {
  const colors = Object.create(null);
  primitives.forEach(ft => {
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

function createOutlinesMap(primitives, strokes) {
  const outlines = Object.create(null);
  primitives.forEach(ft => {
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

function createPointsMap(primitives) {
  const points = Object.create(null);
  primitives.forEach(ft => {
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
