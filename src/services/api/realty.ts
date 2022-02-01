import api from './api';

export const createProperty = async (payload: any) => {
  return await api.send('createProperty', payload);
};

export const login = async (payload: any) => {
  return await api.send('login', payload);
};

export const register = async (payload: any) => {
  return await api.send('register', payload);
};

export const createUnit = async (payload: any) => {
  return await api.send('createUnit', payload);
};

export const getProperty = async (payload: any) => {
  return await api.send('getProperty', payload);
};
export const getUnits = async (payload: any) => {
  return await api.send('getUnits', payload);
};

export const searchDrByMobile = async (payload: any): Promise<any> => {
  const {
    data: { user, exist, units },
  } = await api.send('searchDrByMobile', payload);
  return { user, exist, units };
};
