// const d = window.location.hostname.replace(/^www\./, '').split('.');
// while (d.length > 2) {
//   d.shift();
// }
// const url = 'https://api.' + d.join('.');

const uatUrl = 'https://devstric.com';

//const baseUrl = process.env.NODE_ENV === 'production' ? url : uatUrl;
const baseUrl = uatUrl;

export const apiUrl: string = baseUrl;

export const socketUrl: string = baseUrl;
