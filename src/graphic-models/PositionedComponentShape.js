import { MINERVA } from "../helpers";

class PositionedComponentShape {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.shapeId = conf.shapeId;
    this.componentId = conf.componentId;
    this.position = conf.position;
    this.shape = undefined;
  }

  setShape(shape) {
    this.shape = shape;
  }

  static create(conf) {
    const { form, tuple, points } = conf;

    const shapeId = tuple.getAttributeValue(MINERVA.SHAPES.SHAPE, form);
    const componentId = tuple.getAttributeValue(MINERVA.SHAPES.COMPONENT, form);

    const POSITION = MINERVA.SHAPES.POSITION;
    const componentPositionId = tuple.getAttributeValue(POSITION, form);
    const position = points[componentPositionId];

    return new PositionedComponentShape({
      form,
      tuple,
      shapeId,
      position,
      componentId
    });
  }
}

export default PositionedComponentShape;
