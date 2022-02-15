export const getDateFormat = (date: any) => {
  if (!date) return;
  return date.substring(0, 10);
};
