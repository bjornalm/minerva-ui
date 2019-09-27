import { MINERVA } from "../helpers";
import PrimitiveShapeBase from "./PrimitiveShapeBase";
import Point from "./Point";
import Solid from "./Solid";
import Outline from "./Outline";

class CircleShape extends PrimitiveShapeBase {
  constructor(atomId, center, radius, outline, solid) {
    super(outline, solid);
    this.atomId = atomId;
    this.center = center;
    this.radius = radius;
  }

  static clone(circle) {
    const { atomId, radius } = circle;
    const center = Point.clonePoint(circle.center);
    const outline = circle.outline
      ? Outline.cloneOutline(circle.outline)
      : undefined;
    const solid = circle.solid ? Solid.cloneSolid(circle.solid) : undefined;

    return new CircleShape(atomId, center, radius, outline, solid);
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const circleId = tuple.getAttributeValue(MINERVA.PRIMITIVES.CIRCLE, form);
    const centerPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.CENTER,
      form
    );
    const centerPoint = pointMap[centerPointId];
    const radius = tuple.getAttributeValue(MINERVA.RADIUS, form);
    const outline = outlines[circleId];
    const solid = solids[circleId];

    return new CircleShape(circleId, centerPoint, radius, outline, solid);
  }
}

export default CircleShape;
