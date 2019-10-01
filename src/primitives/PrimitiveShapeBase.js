import Color from "./Color";
import Solid from "./Solid";
import Outline from "./Outline";

class PrimitiveShapeBase {
  constructor(conf) {
    this.outline = conf.outline;
    this.solid = conf.solid;
    this.form = conf.form;
    this.tuple = conf.tuple;

    console.log(this.tuple);
  }

  hasFill() {
    return !!this.solid;
  }

  getFill() {
    return Color.getHex(this.solid.color);
  }

  hasOutlineStroke() {
    return !!(this.outline && this.outline.stroke);
  }

  getOutlineStrokeColor() {
    const stroke = this.outline.stroke;
    return Color.getHex(stroke.color);
  }

  getOutlineStrokeWidth() {
    const stroke = this.outline.stroke;
    return stroke.width;
  }

  static cloneBaseProperties(shape) {
    const outline = shape.outline ? Outline.clone(shape.outline) : undefined;
    const solid = shape.solid ? Solid.clone(shape.solid) : undefined;
    const form = shape.form.clone();
    const tuple = shape.tuple.clone();
    return { outline, solid, form, tuple };
  }
}

export default PrimitiveShapeBase;
