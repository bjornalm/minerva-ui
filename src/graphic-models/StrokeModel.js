import { MINERVA } from "../helpers";
import ColorModel from "./ColorModel";

class StrokeModel {
  constructor(atomId, color, width) {
    this.atomId = atomId;
    this.color = color;
    this.width = width;
  }

  static cloneStroke(stroke) {
    const color = ColorModel.clone(stroke.color);
    return new StrokeModel(stroke.atomId, color, stroke.width);
  }

  // form: ["stroke", "color", "width"],
  static createStroke(form, tuple, colors) {
    const strokeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.STROKE, form);
    const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
    const color = colors[colorId];
    const width = tuple.getAttributeValue(MINERVA.STROKE_PROP.WIDTH, form);
    return new StrokeModel(strokeId, color, width);
  }
}

export default StrokeModel;
