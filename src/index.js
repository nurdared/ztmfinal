import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import 'roboto-fontface';
import { createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { setBaseState } from './reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const rootReducer = combineReducers({ setBaseState })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



const palette = {
  primary: { main: '#0277BD' },
  secondary: { main: '#E65100' }
};
const themeName = 'Lochmara Trinidad Oryx';

export default createMuiTheme({ palette, themeName });

