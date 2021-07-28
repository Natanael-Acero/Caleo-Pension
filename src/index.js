import React from 'react';
import ReactDOM from 'react-dom';
import { WebApp } from './WebApp';
import './styles.css';
import * as moment from 'moment'
moment.locale('es')
ReactDOM.render(
  <WebApp />,
  document.getElementById('root')
);

