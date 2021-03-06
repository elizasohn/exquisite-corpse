import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import Drawing from "./components/Drawing";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import downloadSVG from "export-svg-with-styles";

const options = {
  width: 800,
  height: 900,
  backgroundColor: 'white',
  svg: document.getElementById("drawArea"),
  filename: "Drawing.png"
  };

const Button = styled.button`
  display: ${(props) => props.getImageButton || "none" };
  width: 60px;
  height: 60px;
`;
const DrawArea = styled.div`
  position: absolute;
  top: ${(props) => props.borderOffset || "260px"};
  background-color: white;
  width: 800px;
  height: 900px;
  border-radius: 10px;
  cursor: crosshair;
  z-index: -1;
  align-items: center;
  `;

const Footer = styled.div`
  position: absolute;
  top: ${(props) => props.footerOffset || "600px"};
  width: 100%;
  z-index: 1;
  height: 800px;
  background-color: lightgray;
  bottom: 0px;
  padding-top: 20px;
  `;

const Blocker = styled.div`
  position: absolute;
  top: 260px;
  height: 30px;
  width: 100%;
  z-index: 2;
  visibility: in-line;
  `;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      isDrawing: false,
      borderOffset: "300px",
      footerOffset: "600px",
      player: 0,
      text: "Player 1",
      buttonText: "Next Player",
      getImageButton: "none",
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleStrokeChange = this.handleStrokeChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
}
  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: [...prevState.lines, { color: this.props.color, stroke: this.props.stroke, points: [point] }],
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
      console.log(safeLines);

      return {
        color: this.props.color,
        stroke: this.props.stroke,
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

  handleStrokeChange(stroke) {
    this.props.dispatch({
      type: "CHANGE_STROKE",
      stroke: stroke
    });
  }

  handlePlayerChange() {
    let newBorderOffset;
    let newPlayer;
    let newFooterOffset;
    let newLines;
    let newText;
    let newButtonText;
    let newGetImageButton;
    console.log("state changed: " + this.state.player);
    switch(this.state.player) {
      case (0) :
      newBorderOffset = "0px";
      newPlayer = 1;
      newFooterOffset = "600px";
      newLines = this.state.lines;
      newText = "Player 2";
      newButtonText = "Next Player";
      newGetImageButton = "none";
      break;
      case (1):
      newBorderOffset = "-300px";
      newPlayer = 2;
      newFooterOffset = "600px";
      newLines = this.state.lines;
      newText = "Player 3";
      newButtonText = "Show Drawing";
      newGetImageButton = "none";
      break;
      case (2):
      newBorderOffset = "280px";
      newPlayer = 4;
      newFooterOffset = "1200px";
      newLines = this.state.lines;
      newText = "Final Drawing";
      newButtonText = "New Game";
      newGetImageButton = "inline-block";
      window.scrollTo(0,260);
      break;
      default: newBorderOffset = "280px";
      newFooterOffset = "600px";
      newPlayer = 0;
      newLines = [];
      newText = "Player 1";
      newButtonText = "Next Player";
      newGetImageButton = "none";
      window.scrollTo(0,0);
      break;
    }
    this.setState({borderOffset: newBorderOffset, player: newPlayer, footerOffset: newFooterOffset, lines: newLines, text: newText, buttonText: newButtonText, getImageButton: newGetImageButton});
  }

  undoLine() {
    console.log(this.state);
    if (this.state.lines === [] ) {
      return;
    }

    this.setState(prevState => {
      const newState = {...prevState}
      const safeLines = [...newState.lines];
      safeLines.pop();
      return {
        color: this.props.color,
        stroke: this.props.stroke,
        lines: safeLines,
      }
    });
  }

  reset() {
    if (this.state.lines === [] ) {
      return;
    }

    this.setState(prevState => {
      const safeLines = [];

      return {
        color: this.props.color,
        stroke: this.props.stroke,
        lines: safeLines
      }
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    };
  }

  exportImage() {
  downloadSVG(options);
  };


  render() {
    return (
      <React.Fragment>
    <div className="head">
      <div className="headerdude">
        <Header/>
      </div>
       <div className="toolbar">
        <div className="colors">
          <button className="black" onClick={() => this.handleColorChange("black")}></button>
          <button className="brown" onClick={() => this.handleColorChange("#754400")}></button>
          <button className="red" onClick={() => this.handleColorChange("red")}></button>
          <button className="orange" onClick={() => this.handleColorChange("orange")}></button>
          <button className="yellow" onClick={() => this.handleColorChange("yellow")}></button>
          <button className="green" onClick={() => this.handleColorChange("green")}></button>
          <button className="blue" onClick={() => this.handleColorChange("blue")}></button>
          <button className="purple" onClick={() => this.handleColorChange("purple")}></button>
          <button className="pink" onClick={() => this.handleColorChange("pink")}></button>
          </div>
          <div className="tools">
            <button className="erase" onClick={() => this.handleColorChange("white")}>Erase</button>
            <button className="undo" onClick={() => this.undoLine()}>Undo</button>
            {/* <button onClick={() => this.reset()}>Reset</button> */}
            <button className="sm" onClick={() => this.handleStrokeChange(8)}></button>
            <button className="md" onClick={() => this.handleStrokeChange(16)}>.</button>
            <button className="lg" onClick={() => this.handleStrokeChange(32)}>.</button>
          </div>
        </div>
      </div>

        {/* drawing section  */}
        <div className="container" id="container">
        <Blocker>
        </Blocker>
        <DrawArea
          id = "drawArea"
          borderOffset={this.state.borderOffset}
          className="drawArea"
          ref="drawArea"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        >
          <Drawing lines={this.state.lines} />
        </DrawArea>
        {/* footer */}
        <Footer className="footer"
          footerOffset={this.state.footerOffset}>
          <p>{this.state.text}</p>
          <button className="footerButton" onClick={this.handlePlayerChange} player={this.state.player}>{this.state.buttonText}</button>
          <Button className="getImage" getImageButton={this.state.getImageButton} onClick={this.exportImage}>Save Image</Button>
        </Footer>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

const mapStateToProps = state => ({
  color: state.colorChangerReducer.color,
  stroke: state.strokeChangerReducer.stroke,
  // position: state.positionChangerReducer.position
});

export default connect(mapStateToProps)(App);
