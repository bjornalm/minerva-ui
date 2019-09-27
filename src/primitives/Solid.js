import { MINERVA } from "../helpers";
import Color from "./Color";

class Solid {
  constructor(atomId, color) {
    this.atomId = atomId;
    this.color = color;
  }

  static cloneSolid(solid) {
    const color = Color.cloneColor(solid.color);
    return new Solid(solid.atomId, color);
  }

  // form: ["solid", "color"],
  static createSolid(form, tuple, colors) {
    const solidId = tuple.getAttributeValue(MINERVA.PRIMITIVES.SOLID, form);
    const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
    const color = colors[colorId];
    return new Solid(solidId, color);
  }
}

export default Solid;
