import React from "react";
import PropTypes from "prop-types";
import DrawingLine from "./DrawingLine";

function Drawing({ lines }) {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} />
      ))}
    </svg>
  );
}

export default Drawing;
