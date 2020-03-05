import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import Drawing from "./components/Drawing";
import { connect } from "react-redux";

const App = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      isDrawing: false
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.canvas = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button != 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: [...prevState.lines, { color: this.props.color, points: [point] }],
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      const safeLines = [...prevState.lines];
      safeLines[safeLines.length - 1].points = [
        ...safeLines[safeLines.length - 1].points
      ];
      safeLines[safeLines.length - 1].points.push(point);
      return {
        color: this.props.color,
        lines: safeLines
      };
    });
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  handleColorChange(color) {
    this.props.dispatch({
      type: "CHANGE_COLOR",
      color: color
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    };
  }

  // exportImage(imageType) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const canvas = this.
  //     }
  //   })
  // }

  render() {
    return (
      <div className="container">
        <button onClick={() => this.handleColorChange("black")}>Black</button>
        <button onClick={() => this.handleColorChange("red")}>Red</button>
        <button onClick={() => this.handleColorChange("orange")}>Orange</button>
        <button onClick={() => this.handleColorChange("yellow")}>Yellow</button>
        <button onClick={() => this.handleColorChange("green")}>Green</button>
        <button onClick={() => this.handleColorChange("blue")}>Blue</button>
        <button onClick={() => this.handleColorChange("purple")}>Purple</button>
        <button onClick={() => this.handleColorChange("pink")}>Pink</button>
        <div
          className="drawArea"
          ref="drawArea"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        >
          <Drawing lines={this.state.lines} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

const mapStateToProps = state => ({
  color: state.color
});

export default connect(mapStateToProps)(App);
