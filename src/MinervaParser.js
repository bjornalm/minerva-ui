import Point from "./Point";
import Rectangle from "./Rectangle";
import Outline from "./Outline";
import Color from "./Color";
import Stroke from "./Stroke";

import { MINERVA } from "./helpers";
import MinervaForm from "./MinervaForm";
import MinervaTuple from "./MinervaTuple";

export default class MinervaParser {
  static buildPrimitives(rawdata) {
    // console.log(rawdata);
    const parsed = rawdata.response.map(ft => ({
      form: new MinervaForm(ft.form),
      tuples: ft.tuples.map(rawTuple => new MinervaTuple(rawTuple))
    }));

    console.info(parsed);

    const colors = createColorsMap(parsed);
    const strokes = createStrokesMap(parsed, colors);
    const outlines = createOutlinesMap(parsed, strokes);
    const pointMap = createPointsMap(parsed);
    const shapes = createRectangles(parsed, pointMap, outlines);

    console.log(colors);
    console.log(strokes);
    console.log(outlines);
    console.log(pointMap);
    console.log(shapes);
  }
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

function createRectangles(primitives, pointMap, outlines) {
  const rectangles = [];
  const rectangleFTs = primitives.filter(
    ft => ft.form.type === MINERVA.PRIMITIVES.RECTANGLE
  );
  rectangleFTs.forEach(ft => {
    const rectangle = Rectangle.createRectangle(
      ft.form,
      ft.tuples[0],
      pointMap,
      outlines
    );
    rectangles.push(rectangle);
  });

  return rectangles;
}
