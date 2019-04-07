import { getReq, denounceGetReq } from './makeRequest';
import { orderBy } from 'lodash';

export const getAllCountries = async ({ pageSize = 10, currentPage = 1, active, order }) => {

  let [data, err] = await getReq('/all', ['data']);
  if (err) return { err };

  if (active && order) data = orderBy(data, active, order);

  const numberOfPages = Math.ceil(data.length / pageSize);

  const results = numberOfPages > currentPage ?
    data.slice((currentPage - 1) * pageSize, currentPage * pageSize) :
    data.slice(-pageSize);

  return { results, numberOfPages };
};

export const getCountryByName = async name => {
  const [data, err] = await denounceGetReq(`/name/${name}`, ['data']);
  if (err) return [];
  return data;
};
