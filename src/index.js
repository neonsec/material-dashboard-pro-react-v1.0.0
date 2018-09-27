import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store.js';
//import { store } from './store.js';
import { App } from './App.jsx';
//import {Hello}   from './Hello.jsx';

// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();



render(
   <Provider store={store}>
       <App />
  </Provider>,
    document.getElementById('root')
);

// import RaisedButtons from 'components/RaisedButton/RaisedButton.jsx';

// render(
//     <RaisedButtons/>,
//      document.getElementById('root')
//  );