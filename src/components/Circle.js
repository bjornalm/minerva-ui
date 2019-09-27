import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";
import CircleShape from "../primitives/CircleShape";

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragged: false,
      dragOffset: {}
    };
  }

  handlePointerDown = e => {
    // Why is this needed?
    // const el = e.target;
    // el.setPointerCapture(e.pointerId);

    this.setState({
      ...this.state,
      dragX: this.getX(),
      dragY: this.getY(),
      isDragged: true,
      dragOffset: getMousePosition(e)
    });
  };

  handlePointerMove = e => {
    const { x: mouseX, y: mouseY } = getMousePosition(e);

    if (this.state.isDragged) {
      this.setState({
        ...this.state,
        dragX: this.state.dragX - (this.state.dragOffset.x - mouseX),
        dragY: this.state.dragY - (this.state.dragOffset.y - mouseY)
      });
    }
  };

  handlePointerUp = () => {
    if (this.state.isDragged) {
      const modifiedCircleShape = CircleShape.clone(this.props.shape);
      modifiedCircleShape.center.horizontal = this.state.dragX;
      modifiedCircleShape.center.vertical = this.state.dragY;

      const update = {
        original: this.props.shape,
        modified: modifiedCircleShape
      };
      this.props.onDragDropped(update);
    }

    this.setState({
      ...this.state,
      isDragged: false
    });
  };

  getX() {
    const shape = this.props.shape;
    return shape.center.horizontal;
  }

  getY() {
    const shape = this.props.shape;
    return shape.center.vertical;
  }

  render() {
    const circle = this.props.shape;
    if (!circle) {
      return null;
    }

    return (
      <circle
        cx={this.state.dragX || this.getX()}
        cy={this.state.dragY || this.getY()}
        r={circle.radius}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onPointerDown={this.handlePointerDown}
        onPointerUp={this.handlePointerUp}
        onPointerMove={this.handlePointerMove}
      />
    );
  }
}

export default withSVGPropsHOC(Circle);

function getMousePosition(evt) {
  const bbox = evt.target.getBoundingClientRect();
  const shapeEl = evt.target;
  const CTM = shapeEl.getScreenCTM();
  const x = translateX(CTM, evt.clientX) - translateX(CTM, bbox.left);
  const y = translateY(CTM, evt.clientY) - translateY(CTM, bbox.top);

  return { x, y };
}

function translateX(CTM, x) {
  return (x - CTM.e) / CTM.a;
}

function translateY(CTM, y) {
  return (y - CTM.f) / CTM.d;
}
