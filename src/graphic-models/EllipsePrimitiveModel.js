import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";
import PointModel from "./PointModel";

class EllipsePrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const {
      form,
      tuple,
      atomId,
      center,
      xRadius,
      yRadius,
      outline,
      solid
    } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.center = center;
    this.xRadius = xRadius;
    this.yRadius = yRadius;
  }

  static clone(ellipse) {
    const { atomId, xRadius, yRadius } = ellipse;
    const center = PointModel.clone(ellipse.center);
    const baseProps = PrimitiveBase.cloneBaseProperties(ellipse);
    return new EllipsePrimitiveModel({
      ...baseProps,
      atomId,
      center,
      xRadius,
      yRadius
    });
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.ELLIPSE, form);
    const centerPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.CENTER,
      form
    );
    const center = pointMap[centerPointId];
    const xRadius = tuple.getAttributeValue(MINERVA.X_RADIUS, form);
    const yRadius = tuple.getAttributeValue(MINERVA.Y_RADIUS, form);
    const outline = outlines[atomId];
    const solid = solids[atomId];

    return new EllipsePrimitiveModel({
      form,
      tuple,
      atomId,
      center,
      xRadius,
      yRadius,
      outline,
      solid
    });
  }
}

export default EllipsePrimitiveModel;
