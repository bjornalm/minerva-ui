import { MINERVA } from "../helpers";
import PrimitiveShapeBase from "./PrimitiveShapeBase";

class LineShape extends PrimitiveShapeBase {
  constructor(atomId, point1, point2, outline) {
    super(outline);
    this.atomId = atomId;
    this.point1 = point1;
    this.point2 = point2;
  }

  static createLine(form, tuple, pointMap, outlines) {
    const lineId = tuple.getAttributeValue(MINERVA.PRIMITIVES.LINE, form);
    const pointIds = tuple.getAttributeValues(MINERVA.PRIMITIVES.POINT, form);
    const point1 = pointMap[pointIds[0]];
    const point2 = pointMap[pointIds[1]];
    const outline = outlines[lineId];

    return new LineShape(lineId, point1, point2, outline);
  }
}

export default LineShape;
