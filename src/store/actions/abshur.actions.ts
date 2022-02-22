import { Realty_Type } from "../../assets/constants/type";
import {
  SET_PROPERTIES,
  SET_UNITS,
  SET_CURRENT_PROPERTIES,
  SET_CURRENT_UNITS,
  SET_PROPERTIES_EMPTY,
  SET_PROPERTIES_FINISHED,
  SET_PROPERTIES_TEN_DAYS,
  SET_CURRENT_MAINTENANCE,
  ADD_MAINTENANCE,
  SET_CURRENT_OFFICE_NOTE,
  ADD_OFFICE_NOTE,
  ADD_PROPERTIES,
  ADD_UNITS,
  ADD_ADDEDFEES,
  SET_ALL_CHAT,
  SET_CURRENT_CHAT,
  ADD_MSG,
} from "./actionTypes";
import { Dispatch } from "./types";
import apiService from "../../services/api";

export const setallProperties =
  (key?: string) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await apiService.getProperty({
      limit: "",
      page: "",
      key: "",
      status: key ? key : "",
      sort: "",
      userId: "",
    });
    if (key === Realty_Type.empty) {
      dispatch({ type: SET_PROPERTIES_EMPTY, payload: data.data });
    } else if (key === Realty_Type.not_paid) {
      dispatch({ type: SET_PROPERTIES_FINISHED, payload: data.data });
    } else if (key === Realty_Type.ten_days) {
      dispatch({ type: SET_PROPERTIES_TEN_DAYS, payload: data.data });
    } else {
      dispatch({ type: SET_PROPERTIES, payload: data.data });
    }
  };
export const addProperty =
  (property: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: ADD_PROPERTIES, payload: property });
  };
export const updateProperty =
  (key?: string) => async (dispatch: any, getState: any) => {
    key ? dispatch(setallProperties(key)) : dispatch(setallProperties());
  };

export const setAllUnit =
  (propertyId?: number) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await apiService.getUnits({
      limit: "",
      page: "",
      key: "",
      sort: "",
      tenantId: "",
      propertyId: propertyId ? propertyId : "",
    });
    dispatch({ type: SET_UNITS, payload: data.data });
  };
export const addUnit =
  (unit: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: ADD_UNITS, payload: unit });
  };
export const updateUnit = (id: any) => async (dispatch: any, getState: any) => {
  dispatch(setAllUnit(id));
};
const setCurrentMaintenance =
  (unitId: number) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await apiService.getMaintenance({
      limit: "",
      page: "",
      key: "maintenance",
      sort: "",
      unitId: unitId,
    });
    dispatch({ type: SET_CURRENT_MAINTENANCE, payload: data.data });
  };
export const addAddedFees =
  (addedFees: number) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: ADD_ADDEDFEES, payload: addedFees });
  };

export const addMaintenance =
  (maintenance: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: ADD_MAINTENANCE, payload: maintenance });
  };
const setCurrentOfficeNote =
  (unitId: number) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await apiService.getMaintenance({
      limit: "",
      page: "",
      key: "feedback",
      sort: "",
      unitId: unitId,
    });
    dispatch({ type: SET_CURRENT_OFFICE_NOTE, payload: data.data });
  };

export const addOfficeNote =
  (maintenance: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: ADD_OFFICE_NOTE, payload: maintenance });
  };

export const setCurrentProperty =
  (property: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: SET_CURRENT_PROPERTIES, payload: property });
  };

export const setCurrentUnit =
  (unit: any) => async (dispatch: any, getState: any) => {
    dispatch(setCurrentMaintenance(unit.id));
    dispatch(setCurrentOfficeNote(unit.id));
    dispatch({ type: SET_CURRENT_UNITS, payload: unit });
  };
export const setallChat = (ty: string) => async (dispatch: Dispatch, getState: any) => {
  const { data } = await apiService.getChat({ type: ty});
  dispatch({ type: SET_ALL_CHAT, payload: data.data.reverse() });
};

export const setCurrentChat =
  (id: number, ty: string) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await apiService.getCurrentChat({ id, type: ty });
    dispatch({ type: SET_CURRENT_CHAT, payload: data.data });
  };

export const sendChatMsg =
  (id: number, msg: string, ty: string) =>
  async (dispatch: any, getState: any) => {
    const { data } = await apiService.sendMsg({
      uid: id,
      content: msg,
      type: ty,
    });
   dispatch({ type: ADD_MSG, payload: data.data });
   dispatch(setallChat(ty))
  };
