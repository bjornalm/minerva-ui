/**
 * A ShapeModel will contain a single primitive.
 * A shape model can be seen as a wrapper around a primitive model that adds a position.
 * If the shape is a direct child of the icon, the position is relative to the SVG drawing area,
 * otherwise the position is relative to the parent composite model.
 */
import { MINERVA } from "../helpers";

class ShapeModel {
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

    return new ShapeModel({
      form,
      tuple,
      shapeId,
      position,
      componentId,
      primitive
    });
  }
}

export default ShapeModel;
