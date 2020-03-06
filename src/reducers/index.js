import colorChangerReducer from "./ColorChangerReducer";
import strokeChangerReducer from "./StrokeChangerReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    colorChangerReducer,
    strokeChangerReducer
  });
  
  export default rootReducer;