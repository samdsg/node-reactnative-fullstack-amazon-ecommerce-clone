"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var types_1 = require("../actions/types");
var initialState = {
    regLoading: false,
    logLoading: false,
    isAuthenticated: null,
    user: null
};
exports["default"] = (function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case types_1.REG_LOADING:
            return __assign(__assign({}, state), { regLoading: true });
        case types_1.LOG_LOADING:
            return __assign(__assign({}, state), { logLoading: true });
        case types_1.USER_LOADING:
            return __assign(__assign({}, state), { isLoading: true });
        case types_1.REGISTER_SUCCESS:
            return __assign(__assign({}, state), { regLoading: false, isAuthenticated: true, isLoading: false });
        case types_1.LOGIN_FAIL:
        case types_1.REGISTER_FAIL:
        case types_1.AUTH_ERROR:
            return __assign(__assign({}, state), { regLoading: false, user: null, isAuthenticated: null, logLoading: false });
        case types_1.LOGIN_SUCCESS:
            return __assign(__assign(__assign({}, state), payload), { isAuthenticated: true, logLoading: false });
        case types_1.USER_LOADED:
            return __assign(__assign({}, state), { isAuthenticated: true, user: payload, logLoading: false });
        default:
            return state;
    }
});
