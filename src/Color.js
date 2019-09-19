import { MINERVA } from "./helpers";

export default class Color {
  constructor(atomId, red, green, blue) {
    this.atomId = atomId;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  static createColor(form, tuple) {
    const colorId = tuple.getAttributeValue(MINERVA.PRIMITIVES.COLOR, form);
    const red = to8Bit(tuple.getAttributeValue(MINERVA.COLORS.RED, form));
    const green = to8Bit(tuple.getAttributeValue(MINERVA.COLORS.GREEN, form));
    const blue = to8Bit(tuple.getAttributeValue(MINERVA.COLORS.BLUE, form));
    return new Color(colorId, red, green, blue);
  }

  static getHex(color) {
    const r = rgbToHex(color.red);
    const g = rgbToHex(color.green);
    const b = rgbToHex(color.blue);
    return `${r}${g}${b}`;
  }
}

function to8Bit(val) {
  return Math.round(val * 255);
}

function rgbToHex(rgbValue) {
  var hex = Number(rgbValue).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}
