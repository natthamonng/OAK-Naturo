import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/themes/lite-purple.scss';
import './assets/scss/plugins/perfect-scrollbar.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Moment from 'react-moment';
import 'moment/locale/fr';

// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';

ReactDOM.render(( <App /> ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
