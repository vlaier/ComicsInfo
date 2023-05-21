import { ComicDataI } from './types';
// Standardize the data from the API to make it easier to add more APIs in the future
const mapXkcdData = (data: any) => {
  const response: ComicDataI = {
    id: data.num,
    title: data.title,
    img: data.img,
    alt: data.alt,
    day: data.day,
    month: data.month,
    year: data.year,
  };
  return response;
};
export const xkcdApi = {
  // Get the comcic number num or the latest comic if num is not provided
  getComic: async (num?: number) => {
    const url = num
      ? `https://xkcd.com/${num}/info.0.json`
      : 'https://xkcd.com/info.0.json';
    const res = await fetch(url);
    const data = await res.json();
    return {
      results: [mapXkcdData(data)],
      hasNextPage: data.num > 1,
      nextPage: data.num > 1 ? data.num - 1 : null,
    };
  },
};
export const getFetcher = (source: string) => {
  switch (source) {
    case 'xkcd':
      return xkcdApi;
    case 'other':
      return xkcdApi;
    default:
      return xkcdApi;
  }
};
