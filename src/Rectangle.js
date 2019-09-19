import { MINERVA } from "./helpers";

// form: ["rectangle", "bottom-left", "top-right"]
class Rectangle {
  constructor(
    atomId,
    width,
    height,
    x,
    y,
    topRightPoint,
    bottomLeftPoint,
    outline
  ) {
    this.atomId = atomId;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.topRightPoint = topRightPoint;
    this.bottomLeftPoint = bottomLeftPoint;
    this.outline = outline;
  }

  static createRectangle(form, tuple, pointMap, outlines) {
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

    const outline = outlines[rectangleId];

    return new Rectangle(
      rectangleId,
      width,
      height,
      topRightPoint.x,
      topRightPoint.y,
      topRightPoint,
      bottomLeftPoint,
      outline
    );
  }
}

export default Rectangle;
