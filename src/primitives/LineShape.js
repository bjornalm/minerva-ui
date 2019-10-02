import { MINERVA } from "../helpers";
import PrimitiveShapeBase from "./PrimitiveShapeBase";
import Point from "./Point";

class LineShape extends PrimitiveShapeBase {
  constructor(conf) {
    const { form, tuple, atomId, point1, point2, outline } = conf;
    super({ form, tuple, outline });
    this.atomId = atomId;
    this.point1 = point1;
    this.point2 = point2;
  }

  static clone(line) {
    const { atomId } = line;
    const point1 = Point.clone(line.point1);
    const point2 = Point.clone(line.point2);
    const baseProps = PrimitiveShapeBase.cloneBaseProperties(line);
    return new LineShape({
      ...baseProps,
      atomId,
      point1,
      point2
    });
  }

  static createLine(form, tuple, pointMap, outlines) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.LINE, form);
    const pointIds = tuple.getAttributeValues(MINERVA.PRIMITIVES.POINT, form);
    const point1 = pointMap[pointIds[0]];
    const point2 = pointMap[pointIds[1]];
    const outline = outlines[atomId];

    return new LineShape({ form, tuple, atomId, point1, point2, outline });
  }
}

export default LineShape;
