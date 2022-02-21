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
  ADD_OFFICE_NOTE,
  SET_CURRENT_OFFICE_NOTE,
  ADD_PROPERTIES,
  ADD_UNITS,
  ADD_ADDEDFEES,
  SET_ALL_CHAT,
  SET_CURRENT_CHAT,
  ADD_MSG,
} from "./../actions/actionTypes";

const initialState: abshurStateType = {
  allProperty: [],
  property10Day: [],
  propertyFinished: [],
  propertyEmpty: [],
  units: [],
  currentProperty: null,
  currentUnits: null,
  currentMaintenance: [],
  currentOfficeNote: [],
  allChat: [],
  currentChat: [],
};

export default function abshur(state = initialState, action: any): any {
  switch (action.type) {
    case SET_PROPERTIES:
      return { ...state, allProperty: action.payload };
    case ADD_PROPERTIES:
      return {
        ...state,
        allProperty: [action.payload, ...state.allProperty],
      };
    case ADD_ADDEDFEES:
      return {
        ...state,
        currentProperty: {
          ...state.currentProperty,
          addedFees: action.payload,
        },
      };
    case SET_PROPERTIES_TEN_DAYS:
      return { ...state, property10Day: action.payload };
    case SET_PROPERTIES_FINISHED:
      return { ...state, propertyFinished: action.payload };
    case SET_PROPERTIES_EMPTY:
      return { ...state, propertyEmpty: action.payload };
    case SET_UNITS:
      return { ...state, units: action.payload };
    case ADD_UNITS:
      return {
        ...state,
        units: [...state.units, action.payload],
      };
    case SET_CURRENT_PROPERTIES:
      return { ...state, currentProperty: action.payload };
    case SET_CURRENT_UNITS:
      return { ...state, currentUnits: action.payload };
    case SET_CURRENT_MAINTENANCE:
      return { ...state, currentMaintenance: action.payload };
    case ADD_MAINTENANCE:
      return {
        ...state,
        currentMaintenance: [...state.currentMaintenance, action.payload],
      };
    case SET_CURRENT_OFFICE_NOTE:
      return { ...state, currentOfficeNote: action.payload };
    case ADD_OFFICE_NOTE:
      return {
        ...state,
        currentOfficeNote: [...state.currentOfficeNote, action.payload],
      };
    case SET_ALL_CHAT:
      return { ...state, allChat: action.payload };
    case SET_CURRENT_CHAT:
      return { ...state, currentChat: action.payload };
    case ADD_MSG:
      return {
        ...state,
        currentChat: [...state.currentChat, action.payload],
      };
    default:
      return state;
  }
}
