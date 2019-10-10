import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";
import PointModel from "./PointModel";

// THIS SHOULD BE A MINERVA RECTANGLE REPRESENTATION, NOT A SVG RECTANGLE
// form: ["rectangle", "bottom-left", "top-right"]
class RectanglePrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, topRight, bottomLeft, outline, solid } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
  }

  static clone(rectangle) {
    const { atomId } = rectangle;
    const topRight = PointModel.clone(rectangle.topRight);
    const bottomLeft = PointModel.clone(rectangle.bottomLeft);
    const baseProps = PrimitiveBase.cloneBaseProperties(rectangle);
    return new RectanglePrimitiveModel({
      ...baseProps,
      atomId,
      topRight,
      bottomLeft
    });
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.RECTANGLE, form);
    const bottomLeftPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.BOTTOM_LEFT,
      form
    );
    const topRightPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.TOP_RIGHT,
      form
    );
    const bottomLeft = pointMap[bottomLeftPointId];
    const topRight = pointMap[topRightPointId];

    const outline = outlines ? outlines[atomId] : undefined;
    const solid = solids ? solids[atomId] : undefined;

    return new RectanglePrimitiveModel({
      form,
      tuple,
      atomId,
      topRight,
      bottomLeft,
      outline,
      solid
    });
  }
}

export default RectanglePrimitiveModel;
