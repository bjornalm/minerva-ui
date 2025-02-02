/**
 * The composite model contains one or more shapes or other composites.
 * The composite also has a position. If the composite is a direct child
 * of the icon, the position is relative to the SVG drawing area, otherwise
 * the position is relative to the parent composite model.
 */
import { MINERVA } from "../helpers";

class CompositeModel {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.shapeId = conf.shapeId;
    this.componentId = conf.componentId;
    this.position = conf.position;
    this.shapes = [];
    this.uniqueKey = this.componentId + this.shapeId + this.position.atomId;
  }

  addChildShapes(childShapes) {
    this.shapes.push(...childShapes);
  }

  addChildShape(childShape) {
    this.shapes.push(childShape);
  }

  static create(conf) {
    const { form, tuple, points } = conf;

    const shapeId = tuple.getAttributeValue(MINERVA.SHAPES.SHAPE, form);
    const componentId = tuple.getAttributeValue(MINERVA.SHAPES.COMPONENT, form);

    const POSITION = MINERVA.SHAPES.POSITION;
    const componentPositionId = tuple.getAttributeValue(POSITION, form);
    const position = points[componentPositionId];

    return new CompositeModel({
      form,
      tuple,
      shapeId,
      position,
      componentId
    });
  }
}

export default CompositeModel;
