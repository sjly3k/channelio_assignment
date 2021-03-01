import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import GlobalStyle from './styled/globalStyle';
import "/node_modules/react-toastify/dist/ReactToastify.css";

const store = createStore(rootReducer, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <ToastContainer position={"top-right"}/>
    <App />
  </Provider>,
  rootElement);
