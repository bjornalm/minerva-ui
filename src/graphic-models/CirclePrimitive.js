import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveBase";
import Point from "./Point";

class CirclePrimitive extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, center, radius, outline, solid } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.center = center;
    this.radius = radius;
  }

  static clone(circle) {
    const { atomId, radius } = circle;
    const center = Point.clone(circle.center);
    const baseProps = PrimitiveBase.cloneBaseProperties(circle);
    return new CirclePrimitive({
      ...baseProps,
      atomId,
      center,
      radius
    });
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.CIRCLE, form);
    const centerPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.CENTER,
      form
    );
    const center = pointMap[centerPointId];
    const radius = tuple.getAttributeValue(MINERVA.RADIUS, form);
    const outline = outlines[atomId];
    const solid = solids[atomId];

    return new CirclePrimitive({
      form,
      tuple,
      atomId,
      center,
      radius,
      outline,
      solid
    });
  }
}

export default CirclePrimitive;
