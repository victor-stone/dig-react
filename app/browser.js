'use strict';

global.IS_SERVER_REQUEST = false;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


ReactDOM.render( React.createElement(App),  document.getElementById('content') );

