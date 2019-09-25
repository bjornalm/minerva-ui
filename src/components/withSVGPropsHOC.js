import React from "react";

const withSVGPropsHOC = function(WrappedComponent) {
  class WithSVGProps extends React.Component {
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
      return shape.hasFill() ? shape.getFill() : "transparent";
    }

    render() {
      if (!this.props.shape) {
        return null;
      }
      return (
        <WrappedComponent
          stroke={this.getSVGStroke()}
          strokeWidth={this.getSVGStrokeWidth()}
          fill={this.getSVGFill()}
          {...this.props}
        />
      );
    }
  }

  WithSVGProps.displayName = `WithSVGProps(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSVGProps;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withSVGPropsHOC;
