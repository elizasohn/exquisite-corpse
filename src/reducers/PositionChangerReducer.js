export default (state = initialState, action) => {
    console.log("in: " + action);
    switch (action.type) {
      case "CHANGE_POSITION":
      const newState = Object.assign({}, state);
      newState.position = action.position;
      console.log(newState.position)
      return newState;
      default:
        return state;
    }
  };

  const initialState = {
    color: "black",
    stroke: 16,
    drawing: [],
    position: '0px',
  };
