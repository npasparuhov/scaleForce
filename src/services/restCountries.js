import { denounceGetReq } from './makeRequest';

export const getCountryByName = async name => {
  const [data, err] = await denounceGetReq(`/name/${name}`, ['data']);
  if (err) return [];
  return data;
};
