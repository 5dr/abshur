import { abshurStateType } from "../../assets/constants/type";
import {
  SET_PROPERTIES,
  SET_PROPERTIES_TEN_DAYS,
  SET_PROPERTIES_FINISHED,
  SET_PROPERTIES_EMPTY,
  SET_UNITS,
  SET_CURRENT_PROPERTIES,
  SET_CURRENT_UNITS,
  SET_CURRENT_MAINTENANCE,
  ADD_MAINTENANCE,
} from "../actions/actionTypes";

const initialState: abshurStateType = {
  allProperty: [],
  property10Day: [],
  propertyFinished: [],
  propertyEmpty: [],
  units: [],
  currentProperty: null,
  currentUnits: null,
  currentMaintenance: [],
};

export default function abshur(state = initialState, action: any): any {
  switch (action.type) {
    case SET_PROPERTIES:
      return { ...state, allProperty: action.payload };
    case SET_PROPERTIES_TEN_DAYS:
      return { ...state, property10Day: action.payload };
    case SET_PROPERTIES_FINISHED:
      return { ...state, propertyFinished: action.payload };
    case SET_PROPERTIES_EMPTY:
      return { ...state, propertyEmpty: action.payload };
    case SET_UNITS:
      return { ...state, units: action.payload };
    case SET_CURRENT_PROPERTIES:
      return { ...state, currentProperty: action.payload };
    case SET_CURRENT_UNITS:
      return { ...state, currentUnits: action.payload };
    case SET_CURRENT_MAINTENANCE:
      return { ...state, currentMaintenance: action.payload };
    case ADD_MAINTENANCE:
      return { ...state, currentMaintenance: [...state.currentMaintenance, action.payload ]};
    default:
      return state;
  }
}
