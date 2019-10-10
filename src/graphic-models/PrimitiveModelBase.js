import ColorModel from "./ColorModel";
import SolidModel from "./SolidModel";
import OutlineModel from "./OutlineModel";

class PrimitiveBase {
  constructor(conf) {
    this.outline = conf.outline;
    this.solid = conf.solid;
    this.form = conf.form;
    this.tuple = conf.tuple;
  }

  hasFill() {
    return !!this.solid;
  }

  getFill() {
    return ColorModel.getHex(this.solid.color);
  }

  hasOutlineStroke() {
    return !!(this.outline && this.outline.stroke);
  }

  getOutlineStrokeColor() {
    const stroke = this.outline.stroke;
    return ColorModel.getHex(stroke.color);
  }

  getOutlineStrokeWidth() {
    const stroke = this.outline.stroke;
    return stroke.width;
  }

  static cloneBaseProperties(shape) {
    const outline = shape.outline
      ? OutlineModel.clone(shape.outline)
      : undefined;
    const solid = shape.solid ? SolidModel.clone(shape.solid) : undefined;
    const form = shape.form.clone();
    const tuple = shape.tuple.clone();
    return { outline, solid, form, tuple };
  }
}

export default PrimitiveBase;
