import { MINERVA } from "./helpers";
import Color from "./Color";

// THIS SHOULD BE A MINERVA RECTANGLE REPRESENTATION, NOT A SVG RECTANGLE
// form: ["rectangle", "bottom-left", "top-right"]
class Rectangle {
  constructor(atomId, topRightPoint, bottomLeftPoint, outline) {
    this.atomId = atomId;
    this.topRight = topRightPoint;
    this.bottomLeft = bottomLeftPoint;
    this.outline = outline;
  }

  hasOutlineStroke() {
    return this.outline && this.outline.stroke;
  }

  getOutlineStrokeColor() {
    const stroke = this.outline.stroke;
    return Color.getHex(stroke.color);
  }

  getOutlineStrokeWidth() {
    const stroke = this.outline.stroke;
    return stroke.width;
  }

  static createRectangle(form, tuple, pointMap, outlines) {
    const rectangleId = tuple.getAttributeValue(
      MINERVA.PRIMITIVES.RECTANGLE,
      form
    );
    const bottomLeftPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.BOTTOM_LEFT,
      form
    );
    const topRightPointId = tuple.getAttributeValue(
      MINERVA.POSITIONS.TOP_RIGHT,
      form
    );
    const bottomLeftPoint = pointMap[bottomLeftPointId];
    const topRightPoint = pointMap[topRightPointId];

    const outline = outlines[rectangleId];

    return new Rectangle(rectangleId, topRightPoint, bottomLeftPoint, outline);
  }
}

export default Rectangle;
