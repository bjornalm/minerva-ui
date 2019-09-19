import { MINERVA } from "./helpers";

class Stroke {
  constructor(atomId, color, width) {
    this.atomId = atomId;
    this.color = color;
    this.width = width;
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
