import { MINERVA } from "./helpers";

class Solid {
  constructor(atomId, color) {
    this.atomId = atomId;
    this.color = color;
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
