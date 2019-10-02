import React from "react";

const withSVGPropsHOC = function(WrappedComponent) {
  class WithSVGProps extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDragged: false,
        dragOffset: {}
      };
    }

    handlePointerDown = e => {
      const el = e.target;
      el.setPointerCapture(e.pointerId);

      this.setState({
        ...this.state,
        dragX: WrappedComponent.getX(this.props.shape),
        dragY: WrappedComponent.getY(this.props.shape),
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
        const x = this.state.dragX;
        const y = this.state.dragY;
        const movedShape = WrappedComponent.getShapeWithNewPosition(
          this.props.shape,
          x,
          y
        );
        this.setState({
          ...this.state,
          isDragged: false,
          dragX: undefined,
          dragY: undefined,
          dragOffset: undefined
        });

        const update = {
          original: this.props.shape,
          modified: movedShape
        };

        this.props.onDragDropped(update);
      }
    };

    getSVGStroke() {
      const shape = this.props.shape;
      return shape.hasOutlineStroke() ? shape.getOutlineStrokeColor() : "";
    }

    getSVGStrokeWidth() {
      const shape = this.props.shape;
      return shape.hasOutlineStroke() ? shape.getOutlineStrokeWidth() : "";
    }

    getSVGFill() {
      const shape = this.props.shape;
      return shape.hasFill() ? shape.getFill() : "none";
    }

    render() {
      if (!this.props.shape) {
        return null;
      }
      return (
        <WrappedComponent
          {...this.props}
          stroke={this.getSVGStroke()}
          strokeWidth={this.getSVGStrokeWidth()}
          fill={this.getSVGFill()}
          onDragDropped={this.onDragDroppedWrapper}
          isDragged={this.state.isDragged}
          dragX={this.state.dragX}
          dragY={this.state.dragY}
          onPointerDown={this.handlePointerDown}
          onPointerMove={this.handlePointerMove}
          onPointerUp={this.handlePointerUp}
        />
      );
    }
  }

  WithSVGProps.displayName = `WithSVGProps(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSVGProps;
};

export default withSVGPropsHOC;

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

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
