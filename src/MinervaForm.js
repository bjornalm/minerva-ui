import { MINERVA } from "./helpers";
/**
 * Wrapper around the raw "form element" that is part of the response
 * from the Minerva API. The raw form element can be an array of strings
 * or a complex object corresponding to a logical expression in CNF.
 */
class MinervaForm {
  constructor(rawForm) {
    this.columns = rawForm;
    if (Array.isArray(rawForm)) {
      this.type = determineRelationType(rawForm);
    } else {
      // todo Parse CNF
    }
  }

  clone() {
    if (Array.isArray(this.columns)) {
      return new MinervaForm(this.columns.slice());
    } else {
      console.error("CNF forms not yet supported");
      // todo Parse CNF
    }
  }

  indexOf(column) {
    if (Array.isArray(this.columns)) {
      return this.columns.indexOf(column);
    }
  }
}

function determineRelationType(form) {
  let type = "unknown";
  if (formIsPoint(form)) {
    type = MINERVA.PRIMITIVES.POINT;
  } else if (formIsOutline(form)) {
    type = MINERVA.PRIMITIVES.OUTLINE;
  } else if (formIsColor(form)) {
    type = MINERVA.PRIMITIVES.COLOR;
  } else if (formIsStroke(form)) {
    type = MINERVA.PRIMITIVES.STROKE;
  } else if (formIsSolid(form)) {
    type = MINERVA.PRIMITIVES.SOLID;
  } else if (formIsCircle(form)) {
    type = MINERVA.PRIMITIVES.CIRCLE;
  } else if (formIsRectangle(form)) {
    type = MINERVA.PRIMITIVES.RECTANGLE;
  } else if (formIsLine(form)) {
    type = MINERVA.PRIMITIVES.LINE;
  } else if (formIsShape(form)) {
    type = MINERVA.SHAPES.SHAPE;
  } else if (formIsIcon(form)) {
    type = MINERVA.SHAPES.ICON;
  } else if (formIsNamedAtom(form)) {
    type = MINERVA.NAMED_ATOM;
  }

  return type;
}

function formIsNamedAtom(form) {
  return (
    form.length === 2 &&
    form.includes(MINERVA.NAME) &&
    form.includes(MINERVA.ATOM)
  );
}

function formIsIcon(form) {
  return (
    form.length === 2 &&
    form.includes(MINERVA.SHAPES.ICON) &&
    form.includes(MINERVA.ATOM)
  );
}

function formIsShape(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.SHAPES.SHAPE) &&
    form.includes(MINERVA.SHAPES.COMPONENT) &&
    form.includes(MINERVA.SHAPES.POSITION)
  );
}

function formIsStroke(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.PRIMITIVES.STROKE) &&
    form.includes(MINERVA.PRIMITIVES.COLOR) &&
    form.includes(MINERVA.STROKE_PROP.WIDTH)
  );
}

function formIsSolid(form) {
  return (
    form.length === 2 &&
    form.includes(MINERVA.PRIMITIVES.SOLID) &&
    form.includes(MINERVA.PRIMITIVES.COLOR)
  );
}

function formIsColor(form) {
  return (
    form.length === 4 &&
    form.includes(MINERVA.PRIMITIVES.COLOR) &&
    form.includes(MINERVA.COLORS.RED) &&
    form.includes(MINERVA.COLORS.GREEN) &&
    form.includes(MINERVA.COLORS.BLUE)
  );
}

function formIsPoint(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.PRIMITIVES.POINT) &&
    form.includes(MINERVA.POSITIONS.HORIZONTAL) &&
    form.includes(MINERVA.POSITIONS.VERTICAL)
  );
}

function formIsOutline(form) {
  return (
    form.length === 2 &&
    form.includes(MINERVA.PRIMITIVES.OUTLINE) &&
    form.includes(MINERVA.PRIMITIVES.STROKE)
  );
}

function formIsRectangle(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.PRIMITIVES.RECTANGLE) &&
    form.includes(MINERVA.POSITIONS.BOTTOM_LEFT) &&
    form.includes(MINERVA.POSITIONS.TOP_RIGHT)
  );
}

function formIsCircle(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.PRIMITIVES.CIRCLE) &&
    form.includes(MINERVA.POSITIONS.CENTER) &&
    form.includes(MINERVA.RADIUS)
  );
}

function formIsLine(form) {
  return (
    form.length === 3 &&
    form.includes(MINERVA.PRIMITIVES.LINE) &&
    form.filter(col => col === MINERVA.PRIMITIVES.POINT).length === 2
  );
}

export default MinervaForm;
