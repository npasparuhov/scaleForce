import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import './assets/styles/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

if (isDev) module.hot.accept();
