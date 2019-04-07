import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Table from '../components/Table/Table';
import PopUp from '../components/PopUp/PopUp';
import Suggestion from '../components/SearchBar/Suggestion';
import { getCountryByName, getAllCountries } from '../services/restCountries';
import MouseLoader from '../components/MouseLoader/MouseLoader';
import './App.scss';

const columns = [{
  key: 'flag',
  width: 80,
  component: cell => <img className='flag' src={cell} alt={cell} />
}, {
  key: 'name'
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
  headerName: 'code',
  width: 60
}];

const App = () => (
  <div className='App'>
    <MouseLoader />
    <SearchBar fetchMethod={getCountryByName} maxSuggestions={10} renderSuggestion={Suggestion} />
    <Table fetchMethod={getAllCountries} columns={columns} />
    <PopUp />
  </div>
);

export default App;
