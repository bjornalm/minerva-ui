import { MINERVA } from "../helpers";
import StrokeModel from "./StrokeModel";

class OutlineModel {
  constructor(shapeAtomId, stroke) {
    this.shape = shapeAtomId;
    this.stroke = stroke;
  }

  static clone(outline) {
    const stroke = StrokeModel.cloneStroke(outline.stroke);
    return new OutlineModel(outline.shape, stroke);
  }

  static createOutline(form, tuple, strokes) {
    const shapeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.OUTLINE, form);
    const strokeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.STROKE, form);
    const stroke = strokes[strokeId];
    return new OutlineModel(shapeId, stroke);
  }
}

export default OutlineModel;
