import { MINERVA } from "../helpers";
import Color from "./Color";

class Stroke {
  constructor(atomId, color, width) {
    this.atomId = atomId;
    this.color = color;
    this.width = width;
  }

  static cloneStroke(stroke) {
    const color = Color.cloneColor(stroke.color);
    return new Stroke(stroke.atomId, color, stroke.width);
  }

  // form: ["stroke", "color", "width"],
  static createStroke(form, tuple, colors) {
    const strokeId = tuple.getAttributeValue(MINERVA.PRIMITIVES.STROKE, form);
    const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
    const color = colors[colorId];
    const width = tuple.getAttributeValue(MINERVA.STROKE_PROP.WIDTH, form);
    return new Stroke(strokeId, color, width);
  }
}

export default Stroke;
