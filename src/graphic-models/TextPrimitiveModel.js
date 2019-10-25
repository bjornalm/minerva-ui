import { MINERVA } from "../helpers";
import PrimitiveBase from "./PrimitiveModelBase";

class TextPrimitiveModel extends PrimitiveBase {
  constructor(conf) {
    const { form, tuple, atomId, string, fontSize, solid } = conf;
    super({ form, tuple, solid });
    this.atomId = atomId;
    this.string = string;
    this.fontSize = fontSize;
  }

  static clone(text) {
    const { atomId, string, fontSize } = text;

    const baseProps = PrimitiveBase.cloneBaseProperties(text);
    return new TextPrimitiveModel({
      ...baseProps,
      atomId,
      string,
      fontSize
    });
  }

  static create(form, tuple, solids) {
    const atomId = tuple.getAttributeValue(MINERVA.PRIMITIVES.TEXT, form);
    const string = tuple.getAttributeValue(MINERVA.TEXT.STRING, form);
    const fontSize = tuple.getAttributeValue(MINERVA.TEXT.FONT_SIZE, form);
    const solid = solids[atomId];

    return new TextPrimitiveModel({
      form,
      tuple,
      atomId,
      string,
      fontSize,
      solid
    });
  }
}

export default TextPrimitiveModel;
