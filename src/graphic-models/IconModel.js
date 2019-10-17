import { MINERVA } from "../helpers";

class IconModel {
  constructor(conf) {
    this.form = conf.form;
    this.tuple = conf.tuple;
    this.atomId = conf.atomId;
    this.name = conf.name;
    this.shapes = conf.myShapes;
  }

  static create(conf) {
    const { form, tuple, atomNames, shapes, composites } = conf;

    const atomId = tuple.getAttributeValue(MINERVA.ATOM, form);
    const iconId = tuple.getAttributeValue(MINERVA.SHAPES.ICON, form);
    const name = atomNames[atomId];

    const myShapes = shapes.filter(pcp => pcp.shapeId === iconId);
    const myComposites = composites.filter(pcp => pcp.shapeId === iconId);

    myShapes.push(...myComposites);

    return new IconModel({ form, tuple, atomId, name, myShapes });
  }
}

export default IconModel;
