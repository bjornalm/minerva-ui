import { MINERVA } from "../helpers";

class Shape {
  constructor(conf) {
    this.atomId = conf.atomId;
    this.form = conf.form;
    this.tuple = conf.tuple;

    // Components can themselves be other shapes or graphical primitives
    this.positionedComponents = [];
  }

  static createShape(form, tuple, pointMap, primitivesMap) {
    const atomId = tuple.getAttributeValue(MINERVA.SHAPES.SHAPE, form);
    // const componentId = tuple.getAttributeValue(MINERVA.SHAPES.COMPONENT, form);
    // const primitive = primitivesMap[componentId];

    // const componentPositionId = tuple.getAttributeValue(
    //   MINERVA.SHAPES.POSITION,
    //   form
    // );
    // const componentPosition = pointMap[componentPositionId];

    return new Shape({ form, tuple, atomId });
  }
}

export default Shape;
