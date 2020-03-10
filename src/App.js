import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
// import Drawing from "./components/Drawing";
import { connect } from "react-redux";
import DrawingPad from './components/DrawingPad';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines1: [],
      lines2: [],
      lines3: [],
      isDrawing: false,
      drawArea: 0,
    };

    // this.handleColorChange = this.handleColorChange.bind(this);
    // this.handleStrokeChange = this.handleStrokeChange.bind(this);
    // this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleMouseUp = this.handleMouseUp.bind(this);

  }

  // attachEventsToDrawArea(drawArea) {

  handleChangeDrawArea(drawArea) {
    this.setState(prevState => {
      const nextDrawArea = (this.state.drawArea + 1);
      return {
      lines: [],
      isDrawing: true,
      drawArea: nextDrawArea,
    };
  });

  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  // handleMouseDown(mouseEvent) {
  //   if (mouseEvent.button != 0) {
  //     return;
  //   }

  //   const point = this.relativeCoordinatesForEvent(mouseEvent);

  //   this.setState(prevState => ({
  //     lines: [...prevState.lines, { color: this.props.color, stroke: this.props.stroke, points: [point] }],
  //     isDrawing: true
  //   }));
  // }

  // handleMouseMove(mouseEvent) {
  //   if (!this.state.isDrawing) {
  //     return;
  //   }

  //   const point = this.relativeCoordinatesForEvent(mouseEvent);

  //   this.setState(prevState => {
  //     const safeLines = [...prevState.lines];
  //     safeLines[safeLines.length - 1].points = [
  //       ...safeLines[safeLines.length - 1].points
  //     ];
  //     safeLines[safeLines.length - 1].points.push(point);
  //     console.log(safeLines);

  //     return {
  //       color: this.props.color,
  //       stroke: this.props.stroke,
  //       lines: safeLines
  //     };
  //   });
  // }

  // handleMouseUp() {
  //   this.setState({ isDrawing: false });
  // }

  handleColorChange(color) {
    this.props.dispatch({
      type: "CHANGE_COLOR",
      color: color
    });
  }

  handleStrokeChange(stroke) {
    this.props.dispatch({
      type: "CHANGE_STROKE",
      stroke: stroke
    });
  }

  undoLine() {
    console.log(this.state);
    
    if (this.state.lines1 === [] ) {
      return;
    }

    this.setState(prevState => {
      const newState = {...prevState}
      const safeLines = [...newState.lines1];
      safeLines.pop();
      newState.lines1 = safeLines;
      return newState;
    });
  }

  // reset() {
  //   if (this.state.lines === [] ) {
  //     return;
  //   }

  //   this.setState(prevState => {
  //     const safeLines = [];

  //     return {
  //       color: this.props.color,
  //       stroke: this.props.stroke,
  //       lines: safeLines
  //     }
  //   });
  // }

  // relativeCoordinatesForEvent(mouseEvent) {
  //   const boundingRect = this.refs.drawArea.getBoundingClientRect();
  //   return {
  //     x: mouseEvent.clientX - boundingRect.left,
  //     y: mouseEvent.clientY - boundingRect.top
  //   };
  // }

  // exportImage(imageType) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       console.log(document.getElementsByClassName("drawing")[0].innerHTML);
  //       const drawArea = document.getElementsByClassName("drawing")[0];

  //       const img = document.createElement('img');
  //       img.src = `data:image/svg+xml;base64,${btoa(document.getElementsByClassName("drawing")[0].innerHTML)}`;

  //       img.onload = () => {
  //         const renderDrawArea = document.createElement('svg');
  //         renderDrawArea.setAttribute('width', drawArea.offsetWidth);
  //         console.log(drawArea.offsetWidth);
  //         renderDrawArea.setAttribute('height', drawArea.offsetHeight);
  //         renderDrawArea.getContext('2d').drawImage(img, 0, 0);

  //         resolve(renderDrawArea.toDataURL(`image/${imageType}`));
  //       };
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }

  // exportSvg() {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       resolve(document.getElementsByClassName("drawing")[0].innerHTML);
  //     }
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  // }
  render() {
    return (
      <div className="container">
      {/* <button onClick={() => this.drawArea.current.innerHTML
      .exportSvg()
      .then(data => {
      console.log(data);
      })
      .catch(e => {
      console.log(e);
      })
      }
       >Get Image</button> */}
        <div className="toolbar">
          <button onClick={() => this.handleColorChange("black")}>Black</button>
          <button onClick={() => this.handleColorChange("red")}>Red</button>
          <button onClick={() => this.handleColorChange("orange")}>Orange</button>
          <button onClick={() => this.handleColorChange("yellow")}>Yellow</button>
          <button onClick={() => this.handleColorChange("green")}>Green</button>
          <button onClick={() => this.handleColorChange("blue")}>Blue</button>
          <button onClick={() => this.handleColorChange("purple")}>Purple</button>
          <button onClick={() => this.handleColorChange("pink")}>Pink</button>
          <button onClick={() => this.handleColorChange("white")}>Erase</button>
          <button onClick={() => this.undoLine()}>Undo</button>
          <button onClick={() => this.reset()}>Reset</button>
          <button onClick={() => this.handleStrokeChange(8)}>Small</button>
          <button onClick={() => this.handleStrokeChange(16)}>Medium</button>
          <button onClick={() => this.handleStrokeChange(24)}>Large</button>
          </div>
        <div
          className="drawArea"
          ref="drawArea"
        >
          <DrawingPad 
          color={this.props.color}
          stroke={this.props.stroke} 
          lines={this.state.lines1}
          />
        </div>
        <div
          className="drawArea2"
          ref="drawArea2"
          // onMouseDown={this.handleMouseDown}
          // onMouseMove={this.handleMouseMove}
        >
          <DrawingPad
          color={this.props.color}
          stroke={this.props.stroke}
          lines={this.state.lines2} />
        </div>

        <div className="footer">
        <button onClick={() => this.handleChangeDrawArea(1)}>Next Player</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

const mapStateToProps = state => ({
  color: state.colorChangerReducer.color,
  stroke: state.strokeChangerReducer.stroke,
  
});

export default connect(mapStateToProps)(App);
