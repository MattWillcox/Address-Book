import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import './index.css';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

const store = createStore(reducers, undefined, compose(
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
  ),
));

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
  <div>
    <Route exact path ="/" component={App}/>
    <Route path="/:contactid" component={App} />
  </div>
  </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
