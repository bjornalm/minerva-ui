import { MINERVA } from "../helpers";

class PointModel {
  constructor(atomId, horizontal, vertical) {
    this.atomId = atomId;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  static clone(point) {
    return new PointModel(point.atomId, point.horizontal, point.vertical);
  }

  static createPoint(form, tuple) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.POINT, form);
    const x = tuple.getAttributeValue(MINERVA.POSITIONS.HORIZONTAL, form);
    const y = tuple.getAttributeValue(MINERVA.POSITIONS.VERTICAL, form);

    return new PointModel(atomId, x, y);
  }
}

export default PointModel;
