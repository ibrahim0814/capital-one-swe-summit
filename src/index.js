//entry point js file
//renders the app container

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import http from 'http';

//ping every min to keep awake
setInterval(()=>{
    http.get("https://swesummit2018ibrahimali.herokuapp.com");
}, 60000);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
