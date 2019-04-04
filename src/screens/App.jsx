import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Table from '../components/Table/Table';
import { getCountryByName } from '../services/restCountries';
import './App.scss';

const columns = [{
  key: 'flag',
  width: 80,
  component: cell => <img className='table__flag' src={cell} alt={cell} />
}, {
  key: 'name'
}, {
  key: 'cioc',
  width: 60
}, {
  key: 'capital'
}, {
  key: 'region',
  width: 70
}, {
  key: 'subregion'
}, {
  key: 'population',
  width: 100
}, {
  key: 'numericCode',
  width: 60
}];

const App = () => (
  <div className='App'>
    <SearchBar fetchMethod={getCountryByName} maxSuggestions={6} />
    <Table url='/all' accessors={['data']} columns={columns} />
  </div>
);

export default App;
