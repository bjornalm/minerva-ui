import { MINERVA } from "./helpers";

class Point {
  constructor(atomId, horizontal, vertical) {
    this.atomId = atomId;
    this.x = horizontal;
    this.y = vertical;
  }

  static createPoint(form, tuple) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.POINT, form);
    const x = tuple.getAttributeValue(MINERVA.POSITIONS.HORIZONTAL, form);
    const y = tuple.getAttributeValue(MINERVA.POSITIONS.VERTICAL, form);

    return new Point(atomId, x, y);
  }
}

export default Point;
