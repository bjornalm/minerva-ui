import React, { Component } from "react";
import withSVGPropsHOC from "./withSVGPropsHOC";

class Text extends Component {
  render() {
    const text = this.props.shape;
    if (!text) {
      return null;
    }

    return (
      <text
        alignmentBaseline="ideographic"
        fontSize={text.fontSize}
        style={this.props.style}
        x="0"
        y={text.fontSize}
        fill={this.props.fill}
      >
        {text.string}
      </text>
    );
  }
}

export default withSVGPropsHOC(Text);
