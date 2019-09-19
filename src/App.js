import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import httpService from "./httpService";
import Point from "./Point";
import Rectangle from "./Rectangle";
import Outline from "./Outline";
import Color from "./Color";

import MinervaForm from "./MinervaForm";
import MinervaTuple from "./MinervaTuple";
import { MINERVA } from "./helpers";

class App extends Component {
  render() {
    httpService
      .executeQuery({
        title: "foo",
        body: "bar",
        userId: 1
      })
      .then(data => {
        build(data);
      });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

function build(rawdata) {
  // console.log(rawdata);
  const parsed = rawdata.response.map(ft => ({
    form: new MinervaForm(ft.form),
    tuples: ft.tuples.map(rawTuple => new MinervaTuple(rawTuple))
  }));

  console.info(parsed);
  const pointMap = createPointsMap(parsed);
  const rectangles = createRectangles(parsed, pointMap);
  const outlines = createOutlinesMap(parsed);
  const colors = createColorsMap(parsed);

  console.log(pointMap);
  console.log(rectangles);
  console.log(outlines);
  console.log(colors);
}

// function createStroksMap(primitives) {
//   const strokes = Object.create(null);
//   primitives.forEach(ft => {
//     if (ft.form.type === MINERVA.PRIMITIVES.COLOR) {
//       ft.tuples.forEach(tuple => {
//         const colorId = tuple.getAttributeValue(
//           MINERVA.PRIMITIVES.COLOR,
//           ft.form
//         );
//         colors[colorId] = createColor(ft.form, tuple);
//       });
//     }
//   });

//   return colors;
// }

function createColorsMap(primitives) {
  const colors = Object.create(null);
  primitives.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.COLOR) {
      ft.tuples.forEach(tuple => {
        const colorId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.COLOR,
          ft.form
        );
        colors[colorId] = createColor(ft.form, tuple);
      });
    }
  });

  return colors;
}

function createColor(form, tuple) {
  const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
  const red = tuple.getAttributeValue(MINERVA.COLORS.RED, form);
  const green = tuple.getAttributeValue(MINERVA.COLORS.GREEN, form);
  const blue = tuple.getAttributeValue(MINERVA.COLORS.BLUE, form);
  return new Color(colorId, red, green, blue);
}

function createOutlinesMap(primitives) {
  const outlines = Object.create(null);
  primitives.forEach(ft => {
    if (ft.form.type === MINERVA.PRIMITIVES.OUTLINE) {
      ft.tuples.forEach(tuple => {
        const shapeId = tuple.getAttributeValue(
          MINERVA.PRIMITIVES.OUTLINE,
          ft.form
        );
        outlines[shapeId] = createOutline(ft.form, tuple);
      });
    }
  });

  return outlines;
}

function createOutline(form, tuple) {
  const shapeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.OUTLINE, form);
  const strokeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.STROKE, form);
  return new Outline(shapeId, strokeId);
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
        points[pointId] = createPoint(ft.form, tuple);
      });
    }
  });

  return points;
}

function createPoint(form, tuple) {
  const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.POINT, form);
  const x = tuple.getAttributeValue(MINERVA.POSITIONS.HORIZONTAL, form);
  const y = tuple.getAttributeValue(MINERVA.POSITIONS.VERTICAL, form);

  return new Point(atomId, x, y);
}

function createRectangles(primitives, pointMap) {
  const rectangles = [];
  const rectangleFTs = primitives.filter(
    ft => ft.form.type === MINERVA.PRIMITIVES.RECTANGLE
  );
  rectangleFTs.forEach(ft => {
    const rectangle = createRectangle(ft.form, ft.tuples[0], pointMap);
    rectangles.push(rectangle);
  });

  return rectangles;
}

function createRectangle(form, tuple, pointMap) {
  const rectangleId = tuple.getAttributeValue(
    MINERVA.PRIMITIVES.RECTANGLE,
    form
  );
  const bottomLeftPointId = tuple.getAttributeValue(
    MINERVA.POSITIONS.BOTTOM_LEFT,
    form
  );
  const topRightPointId = tuple.getAttributeValue(
    MINERVA.POSITIONS.TOP_RIGHT,
    form
  );
  const bottomLeftPoint = pointMap[bottomLeftPointId];
  const topRightPoint = pointMap[topRightPointId];

  const width = topRightPoint.x - bottomLeftPoint.x;
  const height = topRightPoint.y - bottomLeftPoint.y;
  const rectangle = new Rectangle(
    rectangleId,
    width,
    height,
    topRightPoint.x,
    topRightPoint.y
  );

  // TODO: continue with fetching outlines per rechtangle

  return rectangle;
}

export default App;
