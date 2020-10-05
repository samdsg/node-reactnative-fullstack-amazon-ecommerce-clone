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
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var react_native_1 = require("react-native");
var Icons_1 = require("../../Icons");
var theme_1 = require("../theme");
var sWidth = react_native_1.Dimensions.get('window').width;
function ProductHeader(_a) {
    var back = _a.back;
    var width = sWidth * 0.9;
    var navigate = native_1.useNavigation().navigate;
    var gotoCart = function () {
        navigate('ProductCart');
    };
    return (react_1["default"].createElement(theme_1.Box, __assign({ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, { width: width }),
        back ? react_1["default"].createElement(Icons_1.Back, { size: 25 }) : react_1["default"].createElement(Icons_1.Hamburger, { size: 20 }),
        react_1["default"].createElement(Icons_1.AmazonLogo, { size: 70 }),
        react_1["default"].createElement(Icons_1.Key, { size: 20, onPress: gotoCart })));
}
exports["default"] = ProductHeader;
