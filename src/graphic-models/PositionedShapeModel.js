import { MINERVA } from "../helpers";

class PositionedShapeModel {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.shapeId = conf.shapeId;
    this.componentId = conf.componentId;
    this.position = conf.position;
    this.primitive = conf.primitive;
    this.uniqueKey = this.componentId + this.shapeId + this.position.atomId;
  }

  static create(conf) {
    const { form, tuple, points, primitives } = conf;

    const shapeId = tuple.getAttributeValue(MINERVA.SHAPES.SHAPE, form);
    const componentId = tuple.getAttributeValue(MINERVA.SHAPES.COMPONENT, form);
    const primitive = primitives[componentId];

    const POSITION = MINERVA.SHAPES.POSITION;
    const componentPositionId = tuple.getAttributeValue(POSITION, form);
    const position = points[componentPositionId];

    return new PositionedShapeModel({
      form,
      tuple,
      shapeId,
      position,
      componentId,
      primitive
    });
  }
}

export default PositionedShapeModel;
