import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';
import debounce from 'debounce-async';

const store = localforage.createInstance({
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
  ],
  name: 'countries-cache'
});

const api = setup({
  baseURL: '/rest/v2',
  cache: {
    maxAge: 60 * 60 * 1000,
    store
  }
});

const extractResponse = (obj, keys) =>
  keys.reduce((acum, cur) => (acum && acum[cur]) || null, obj);

export const getReq = async (url, keys) => {
  try {
    const res = await api.get(`${url}`);
    return [extractResponse(res, keys), null];
  } catch (err) {
    return [null, err];
  }
};

export const denounceGetReq = debounce(async (url, keys) => {
  const res = await getReq(url, keys);
  return res;
}, 400);
