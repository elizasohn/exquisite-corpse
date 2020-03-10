import colorChangerReducer from "./ColorChangerReducer";
import strokeChangerReducer from "./StrokeChangerReducer";
// import positionChangerReducer from "./PositionChangerReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    colorChangerReducer,
    strokeChangerReducer,
    // positionChangerReducer
  });

  export default rootReducer;
