import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";
import PointModel from "./PointModel";

class PolylinePrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, points, outline, solid } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.points = points;
  }

  static clone(polyline) {
    const atomId = polyline.atomId;

    const points = polyline.points.map(point => PointModel.clone(point));
    const baseProps = PrimitiveBase.cloneBaseProperties(polyline);
    return new PolylinePrimitiveModel({
      ...baseProps,
      atomId,
      points
    });
  }

  static create(form, tuple, pointMap, outlines, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.POLYLINE, form);
    const pointIds = tuple.getAttributeValue(
      MINERVA.PRIMITIVES_COLLECTIONS.POINTS,
      form
    );

    const points = pointIds.map(id => pointMap[id]);
    const outline = outlines ? outlines[atomId] : undefined;
    const solid = solids ? solids[atomId] : undefined;

    return new PolylinePrimitiveModel({
      form,
      tuple,
      atomId,
      points,
      outline,
      solid
    });
  }
}

export default PolylinePrimitiveModel;
