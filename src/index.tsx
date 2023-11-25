import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './store/rootReducer';
import { sagaWatcher } from './store/sagas';

const saga = createSagaMiddleware();
const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(saga)),
);
saga.run(sagaWatcher);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
