import api from "./api";

export const createProperty = async (payload: any) => {
  return await api.send("createProperty", payload);
};

export const login = async (payload: any) => {
  return await api.send("login", payload);
};
export const logout = async (payload: any) => {
  return await api.send("logout", payload);
};
export const register = async (payload: any) => {
  return await api.send("register", payload);
};
export const createUnit = async (payload: any) => {
  return await api.send("createUnit", payload);
};
export const getProperty = async (payload: any) => {
  return await api.send("getProperty", payload);
};
export const getUnits = async (payload: any) => {
  return await api.send("getUnits", payload);
};
export const updateProperty = async (payload: any) => {
  return await api.send("updateProperty", payload);
};
export const sendMsg = async (payload: any) => {
  return await api.send("sendMsg", payload);
};
export const getChat = async (payload: any) => {
  return await api.send("getChat", payload);
};
export const getCurrentChat = async (payload: any) => {
  return await api.send("getCurrentChat", payload);
};
export const addMaintenance = async (payload: any) => {
  return await api.send("addMaintenance", payload);
};
export const updateUser = async (payload: any) => {
  return await api.send("updateUser", payload);
};
export const getMaintenance = async (payload: any) => {
  return await api.send("getMaintenance", payload);
};
export const updateUnit = async (payload: any) => {
  return await api.send("updateUnit", payload);
};

export const searchDrByMobile = async (payload: any): Promise<any> => {
  const {
    data: { user, exist, units },
  } = await api.send("searchDrByMobile", payload);
  return { user, exist, units };
};
