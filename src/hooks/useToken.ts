import { removeStoredData, storeData } from "./../services/storage/storage";
import { useState } from "react";
import { getStoredData } from "../services/storage/storage";

export default function useToken() {
  const getToken = () => {
    return getStoredData("authenticationToken");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (key: string, value: string) => {
    storeData(key, value);
    setToken(getToken());
  };

  const removeToken = () => {
    removeStoredData("authenticationToken");
    setToken(null);
  };

  return [token, saveToken, removeToken];
}
