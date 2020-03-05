export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      const newState = Object.assign({}, state);
      newState.color = action.color;
      return newState;
    default:
      return state;
  }
};

const initialState = {
  color: "black",
  stroke: 4,
  drawing: []
};
