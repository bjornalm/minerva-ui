import { MINERVA } from "../helpers";
import Stroke from "./Stroke";

class Outline {
  constructor(shapeAtomId, stroke) {
    this.shape = shapeAtomId;
    this.stroke = stroke;
  }

  static cloneOutline(outline) {
    const stroke = Stroke.cloneStroke(outline.stroke);
    return new Outline(outline.shape, stroke);
  }

  static createOutline(form, tuple, strokes) {
    const shapeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.OUTLINE, form);
    const strokeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.STROKE, form);
    const stroke = strokes[strokeId];
    return new Outline(shapeId, stroke);
  }
}

export default Outline;
