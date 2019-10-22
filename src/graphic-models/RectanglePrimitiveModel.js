import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";
import PointModel from "./PointModel";

// THIS SHOULD BE A MINERVA RECTANGLE REPRESENTATION, NOT A SVG RECTANGLE
// form: ["rectangle", "top-left", "bottom-right"]
class RectanglePrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, topLeft, bottomRight, outline, solid } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  static clone(rectangle) {
    const { atomId } = rectangle;
    const topLeft = PointModel.clone(rectangle.topLeft);
    const bottomRight = PointModel.clone(rectangle.bottomRight);
    const baseProps = PrimitiveBase.cloneBaseProperties(rectangle);
    return new RectanglePrimitiveModel({
      ...baseProps,
      atomId,
      topLeft,
      bottomRight
    });
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.RECTANGLE, form);
    const bottomRightPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.BOTTOM_RIGHT,
      form
    );
    const topLeftPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.TOP_LEFT,
      form
    );
    const bottomRight = pointMap[bottomRightPointId];
    const topLeft = pointMap[topLeftPointId];

    const outline = outlines ? outlines[atomId] : undefined;
    const solid = solids ? solids[atomId] : undefined;

    return new RectanglePrimitiveModel({
      form,
      tuple,
      atomId,
      topLeft,
      bottomRight,
      outline,
      solid
    });
  }
}

export default RectanglePrimitiveModel;
