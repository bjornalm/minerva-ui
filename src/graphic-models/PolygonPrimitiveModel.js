import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";
import PointModel from "./PointModel";

class PolygonPrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, points } = conf;
    super({ form, tuple, outline, solid });
    this.atomId = atomId;
    this.points = points;
  }

  static clone(polygon) {
    const atomId = polygon.atomId;

    const points = polygon.points.map(point => PointModel.clone(point));
    const baseProps = PrimitiveBase.cloneBaseProperties(polygon);
    return new PolygonPrimitiveModel({
      ...baseProps,
      atomId,
      points
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

    return new PolygonPrimitiveModel({
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

export default PolygonPrimitiveModel;
