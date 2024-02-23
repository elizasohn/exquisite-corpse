export default (state = initialState, action) => {
    console.log("in: " + action);
    switch (action.type) {
      case "CHANGE_STROKE":
      const newState = Object.assign({}, state);
      newState.stroke = action.stroke;
      console.log(newState.stroke)
      return newState;
      default:
        return state;
    }
  };

  const initialState = {
    color: "black",
    stroke: 8,
    drawing: [],
  };
