import { find } from 'lodash';

export default (fetchMethod, columns, pagination, setResults, setColumns) => {
  const { pageSize, currentPage } = pagination;

  const handleSort = async key => {
    const columnsCopy = [...columns];
    columnsCopy.forEach(el => el.key !== key && delete el.order);
    const matchedColumn = find(columnsCopy, { key });
    const order = !matchedColumn.order ? 'asc' : (matchedColumn.order === 'asc' ? 'desc' : null);
    matchedColumn.order = order;
    setColumns(columnsCopy);

    const { results, err } = await fetchMethod({ pageSize, currentPage, active: key, order });
    if (err) console.log(err);
    setResults(results);
  };

  return handleSort;
};
