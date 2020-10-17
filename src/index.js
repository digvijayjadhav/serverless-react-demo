/*
React code starts from index.js , here RouterComponent is wrapped in BrowserRouter
@author : Digvijay Jadhav
@date : 4 Oct 2020

*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './routes/RouterComponent';

ReactDOM.render(
  // BrowserRouter helps in routing so first component is wrapped in it.
  <BrowserRouter>  
    <RouterComponent/>
  </BrowserRouter>,
    
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
