import { MINERVA } from "../helpers";
import PrimitiveShapeBase from "./PrimitiveShapeBase";

// THIS SHOULD BE A MINERVA RECTANGLE REPRESENTATION, NOT A SVG RECTANGLE
// form: ["rectangle", "bottom-left", "top-right"]
class RectangleShape extends PrimitiveShapeBase {
  constructor(atomId, topRightPoint, bottomLeftPoint, outline, solid) {
    super(outline, solid);
    this.atomId = atomId;
    this.topRight = topRightPoint;
    this.bottomLeft = bottomLeftPoint;
  }

  static createRectangle(form, tuple, pointMap, outlines, solids) {
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

    const outline = outlines ? outlines[rectangleId] : undefined;
    const solid = solids ? solids[rectangleId] : undefined;

    return new RectangleShape(
      rectangleId,
      topRightPoint,
      bottomLeftPoint,
      outline,
      solid
    );
  }
}

export default RectangleShape;
