import { MINERVA } from "./helpers";
import PrimitiveShapeBase from "./PrimitiveShapeBase";

class Circle extends PrimitiveShapeBase {
  constructor(atomId, center, radius, outline, solid) {
    super(outline, solid);
    this.atomId = atomId;
    this.center = center;
    this.radius = radius;
  }

  static createCircle(form, tuple, pointMap, outlines, solids) {
    const circleId = tuple.getAttributeValue(MINERVA.PRIMITIVES.CIRCLE, form);
    const centerPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.CENTER,
      form
    );
    const centerPoint = pointMap[centerPointId];
    const radius = tuple.getAttributeValue(MINERVA.RADIUS, form);
    const outline = outlines[circleId];
    const solid = solids[circleId];

    return new Circle(circleId, centerPoint, radius, outline, solid);
  }
}

export default Circle;
