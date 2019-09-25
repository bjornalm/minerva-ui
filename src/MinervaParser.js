import Point from "./Point";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import Outline from "./Outline";
import Color from "./Color";
import Stroke from "./Stroke";
import Solid from "./Solid";

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

    // console.info(parsed);

    const colors = createColorsMap(parsed);
    const strokes = createStrokesMap(parsed, colors);
    const solids = createSolidsMap(parsed, colors);
    const outlines = createOutlinesMap(parsed, strokes);
    const pointMap = createPointsMap(parsed);
    const rectangles = createRectangles(parsed, pointMap, outlines, solids);
    const circles = createCircles(parsed, pointMap, outlines, solids);

    const shapes = [...rectangles, ...circles];

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
    switch (ft.form.type) {
      case MINERVA.PRIMITIVES.RECTANGLE:
        ft.tuples.forEach(tuple => {
          shapes.push(
            Rectangle.createRectangle(ft.form, tuple, pointMap, outlines)
          );
        });
        break;

      default:
        break;
    }
  });
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

function createRectangles(primitives, pointMap, outlines, solids) {
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

function createCircles(primitives, pointMap, outlines, solids) {
  const circles = [];
  const circleFTs = primitives.filter(
    ft => ft.form.type === MINERVA.PRIMITIVES.CIRCLE
  );

  circleFTs.forEach(ft => {
    const circle = Circle.createCircle(
      ft.form,
      ft.tuples[0],
      pointMap,
      outlines,
      solids
    );
    circles.push(circle);
  });

  return circles;
}
