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
var react_native_1 = require("react-native");
var theme_1 = require("../theme");
var images_1 = require("../../images");
var react_native_touchable_scale_1 = require("react-native-touchable-scale");
var native_1 = require("@react-navigation/native");
var width = react_native_1.Dimensions.get('window').width;
function ProductCard() {
    var navigate = native_1.useNavigation().navigate;
    var onAdd = function () {
        navigate('AddProduct');
    };
    return (react_1["default"].createElement(react_native_touchable_scale_1["default"], { activeScale: 0.9, tension: 50, friction: 7, useNativeDriver: true, onPress: onAdd },
        react_1["default"].createElement(theme_1.Box, { width: width * 0.85, backgroundColor: "primary", alignItems: "baseline", alignSelf: "center", overflow: "hidden", height: 163, style: { marginTop: 20, borderRadius: 20 } },
            react_1["default"].createElement(react_native_1.Image, { source: images_1.ProductCard, style: __assign({ flex: 1 }, react_native_1.StyleSheet.absoluteFillObject) }))));
}
exports["default"] = ProductCard;
