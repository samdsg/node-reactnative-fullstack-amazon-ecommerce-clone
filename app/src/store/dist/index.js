"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var middleware = [redux_thunk_1["default"]];
var initialState = {};
var reducer_1 = require("./reducer");
var store = redux_1.createStore(reducer_1["default"], initialState, redux_1.applyMiddleware.apply(void 0, middleware));
exports["default"] = store;
