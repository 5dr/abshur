import { combineReducers } from "redux";
import abshur from "./abshur.reducer";

const rootReducer = combineReducers({
  abshur,
});

export default rootReducer;

export type rootState = ReturnType<typeof rootReducer>;
