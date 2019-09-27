import Color from "./Color";

class PrimitiveShapeBase {
  constructor(outline, solid) {
    this.outline = outline;
    this.solid = solid;
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
}

export default PrimitiveShapeBase;
