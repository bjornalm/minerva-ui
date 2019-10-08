import { MINERVA } from "../helpers";

class IconShape {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.atomId = conf.atomId;
    this.name = conf.name;
    this.shapes = conf.shapes;
  }

  static create(conf) {
    const { form, tuple, atomNames, positionedComponentPrimitives } = conf;

    const atomId = tuple.getAttributeValue(MINERVA.ATOM, form);
    const iconId = tuple.getAttributeValue(MINERVA.SHAPES.ICON, form);
    const name = atomNames[atomId];

    // TODO: handle positionedComponentShapes
    const shapes = positionedComponentPrimitives.filter(
      pcp => pcp.shapeId === iconId
    );

    return new IconShape({ form, tuple, atomId, name, shapes });
  }
}

export default IconShape;
