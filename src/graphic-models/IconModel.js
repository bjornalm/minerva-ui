import { MINERVA } from "../helpers";

class IconModel {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.atomId = conf.atomId;
    this.name = conf.name;
    this.shapes = conf.shapes;
  }

  static create(conf) {
    const { form, tuple, atomNames, positionedShapes } = conf;

    const atomId = tuple.getAttributeValue(MINERVA.ATOM, form);
    const iconId = tuple.getAttributeValue(MINERVA.SHAPES.ICON, form);
    const name = atomNames[atomId];

    // TODO: handle positionedCompositeShapes
    const shapes = positionedShapes.filter(pcp => pcp.shapeId === iconId);

    return new IconModel({ form, tuple, atomId, name, shapes });
  }
}

export default IconModel;
