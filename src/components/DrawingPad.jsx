import React from "react";
import "../App.css";
import Drawing from "./Drawing";

class DrawingPad extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isDrawing: false,
        drawArea: 0,
      };

      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
  
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
    
  

      undoLine() {
        if (this.props.lines === [] ) {
          return;
        }

        this.setState(prevState => {
            const newState = {...prevState}
            const safeLines = [...newState.lines];
            safeLines.pop();
            newState.lines = safeLines;
            return newState;
          });
        }
    //     this.setState(prevState => {
    //       const safeLines = [...prevState.lines];
    //       safeLines.pop();
    //       return {
    //         color: this.props.color,
    //         stroke: this.props.stroke,
    //         lines: safeLines
    //       }
    //     });
    //   }
    
      reset() {
        if (this.props.lines === [] ) {
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


  render() {
    return (
        <div
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            className="drawArea"
            ref="drawArea">
            <Drawing lines={this.props.lines} />
        </div>
         );
    }
  }

//   const mapStateToProps = state => ({
//     color: state.colorChangerReducer.color,
//     stroke: state.strokeChangerReducer.stroke
//   });
  

export default DrawingPad;