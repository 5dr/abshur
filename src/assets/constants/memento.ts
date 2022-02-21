export const getDateFormat = (date: any) => {
  if (!date) return;
  return date.substring(0, 10);
};
const month = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];
export const getMonth = (date: any) => {
  return month[new Date(date).getMonth()];
};
export const getDiffDate = (date: any) => {
  const today = new Date().getTime();
  const d = new Date(date).getTime();
  const days = Math.floor((today - d) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((Math.abs(today - d) / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((Math.abs(today - d) / (1000 * 60)) % 60);
  const seconds = Math.floor(Math.abs(today - d / 1000) % 60);
  return `${days > 0 ? `${days}ي` : ""} ${hours > 0 ? `${hours}س` : ""} ${
    minutes > 0 ? `${minutes}د` : ""
  }`;
};
