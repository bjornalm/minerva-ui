import { MINERVA } from "./helpers";
/**
 * Wrapper around the raw "form element" that is part of the response
 * from the Minerva API. The raw form element can be an array of strings
 * or a complex object corresponding to a logical expression in CNF.
 */
class MinervaForm {
  constructor(rawForm) {
    this.data = rawForm;
    if (Array.isArray(rawForm)) {
      this.type = determineFormPrimitive(rawForm);
    } else {
      // todo Parse CNF
    }
  }

  indexOf(column) {
    if (Array.isArray(this.data)) {
      return this.data.indexOf(column);
    }
  }
}

function determineFormPrimitive(form) {
  let type = "unknown";
  if (formIsPoint(form)) {
    type = MINERVA.PRIMITIVES.POINT;
  } else if (formIsRectangle(form)) {
    type = MINERVA.PRIMITIVES.RECTANGLE;
  } else if (formIsOutline(form)) {
    type = MINERVA.PRIMITIVES.OUTLINE;
  } else if (formIsColor(form)) {
    type = MINERVA.PRIMITIVES.COLOR;
  } else if (formIsStroke(form)) {
    type = MINERVA.PRIMITIVES.STROKE;
  }

  return type;
}

function formIsStroke(form) {
  return (
    form.includes(MINERVA.PRIMITIVES.STROKE) &&
    form.includes(MINERVA.PRIMITIVES.COLOR) &&
    form.includes(MINERVA.STROKE_PROP.WIDTH)
  );
}

function formIsColor(form) {
  return (
    form.includes(MINERVA.PRIMITIVES.COLOR) &&
    form.includes(MINERVA.COLORS.RED) &&
    form.includes(MINERVA.COLORS.GREEN) &&
    form.includes(MINERVA.COLORS.BLUE)
  );
}

function formIsPoint(form) {
  return (
    form.includes(MINERVA.PRIMITIVES.POINT) &&
    form.includes(MINERVA.POSITIONS.HORIZONTAL) &&
    form.includes(MINERVA.POSITIONS.VERTICAL)
  );
}

function formIsRectangle(form) {
  return (
    form.includes(MINERVA.PRIMITIVES.RECTANGLE) &&
    form.includes(MINERVA.POSITIONS.BOTTOM_LEFT) &&
    form.includes(MINERVA.POSITIONS.TOP_RIGHT)
  );
}

function formIsOutline(form) {
  return (
    form.includes(MINERVA.PRIMITIVES.OUTLINE) &&
    form.includes(MINERVA.PRIMITIVES.STROKE)
  );
}

export default MinervaForm;
