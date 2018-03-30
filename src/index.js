//entry point js file
//renders the app container

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import http from 'http';

//ping app every minute to keep it awake
setInterval(()=>{
    http.get("http://swesummit2018ibrahimali.herokuapp.com");
    console.log('pinged');
}, 60000);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
