import React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import users from './User/UserReducer';
import posts from './Post/PostReducer';
import './files/index.css';
import App from './App';

// Middleware and store enhancers
const enhancers = [
    applyMiddleware(thunk),
];

const initialStore = createStore(combineReducers({ users, posts }), { }, compose(...enhancers));

ReactDOM.render(<App store={initialStore}/>, document.getElementById('root'));
