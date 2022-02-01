export const storeData = (key: string,value: string) => {
    localStorage.setItem(key, JSON.stringify(value))  
};

export const getStoredData = (key: string) => {
  const data = localStorage.getItem(key);
  return data && data !== 'undefined' ? JSON.parse(data) : null;
};

export const removeStoredData = (key: string) => {
  localStorage.removeItem(key);
};