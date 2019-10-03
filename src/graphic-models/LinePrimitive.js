import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveBase";
import Point from "./Point";

class LinePrimitive extends PrimitiveBase {
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
    const baseProps = PrimitiveBase.cloneBaseProperties(line);
    return new LinePrimitive({
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

    return new LinePrimitive({ form, tuple, atomId, point1, point2, outline });
  }
}

export default LinePrimitive;
