import { MINERVA } from "../helpers";
import ColorModel from "./ColorModel";

class SolidModel {
  constructor(atomId, color) {
    this.atomId = atomId;
    this.color = color;
  }

  static clone(solid) {
    const color = ColorModel.clone(solid.color);
    return new SolidModel(solid.atomId, color);
  }

  // form: ["solid", "color"],
  static createSolid(form, tuple, colors) {
    const solidId = tuple.getAttributeValue(MINERVA.PRIMITIVES.SOLID, form);
    const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
    const color = colors[colorId];
    return new SolidModel(solidId, color);
  }
}

export default SolidModel;
