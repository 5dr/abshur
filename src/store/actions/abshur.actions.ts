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
    console.log("data", data.data);
    if (key === Realty_Type.empty) {
      dispatch({ type: SET_PROPERTIES_EMPTY, payload: data.data });
      console.log(Realty_Type.empty);
    } else if (key === Realty_Type.not_paid) {
      console.log(Realty_Type.not_paid);
      dispatch({ type: SET_PROPERTIES_FINISHED, payload: data.data });
    } else if (key === Realty_Type.ten_days) {
      console.log(key, Realty_Type.ten_days);
      dispatch({ type: SET_PROPERTIES_TEN_DAYS, payload: data.data });
    } else {
      console.log(Realty_Type.empty);
      dispatch({ type: SET_PROPERTIES, payload: data.data });
    }
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
    console.log("data", data.data);
    dispatch({ type: SET_UNITS, payload: data.data });
  };
const setCurrentMaintenance =
  (unitId: number) => async (dispatch: Dispatch, getState: any) => {
    console.log("setCurrentMaintenance", unitId);
    const { data } = await apiService.getMaintenance({
      limit: "",
      page: "",
      key: "maintenance",
      sort: "",
      unitId: unitId,
    });
    console.log("data", data.data);
    dispatch({ type: SET_CURRENT_MAINTENANCE, payload: data.data });
  };

export const addMaintenance =
  (maintenance: any) => async (dispatch: Dispatch, getState: any) => {
    console.log("setCurrentUnit", maintenance);
    dispatch({ type: ADD_MAINTENANCE, payload: maintenance });
  };

export const setCurrentProperty =
  (property: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: SET_CURRENT_PROPERTIES, payload: property });
  };

export const setCurrentUnit =
  (unit: any) => async (dispatch: any, getState: any) => {
    console.log("setCurrentUnit", unit);
    dispatch(setCurrentMaintenance(unit.id));
    dispatch({ type: SET_CURRENT_UNITS, payload: unit });
  };
