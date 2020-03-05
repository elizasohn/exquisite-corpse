import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Path = styled.path`
  fill: none;
  stroke-width: 10px;
  stroke: ${props => props.currentColor || "green"};
  stroke-linejoin: round;
  stroke-linecap: round;
`;

function DrawingLine({ line }) {
  console.log(line.color);
  const pathData =
    "M " +
    line.points
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");

  return <Path currentColor={line.color} d={pathData} />;
}

export default DrawingLine;
