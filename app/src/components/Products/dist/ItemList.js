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
exports.Items = exports.allItems = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Icons_1 = require("../../Icons");
var images_1 = require("../../images");
var theme_1 = require("../theme");
var react_navigation_shared_element_1 = require("react-navigation-shared-element");
var native_1 = require("@react-navigation/native");
exports.allItems = [
    { name: 'Sofa', src: images_1.Sofa, price: '₦140' },
    { name: 'Chair', src: images_1.WhiteChair, price: '₦140' },
    { name: 'Table', src: images_1.Table, price: '₦140' },
    { name: 'Wall Shelf', src: images_1.Shelve, price: '₦140' },
];
exports.Items = function (_a) {
    var src = _a.src, name = _a.name, price = _a.price;
    var navigate = native_1.useNavigation().navigate;
    var onPress = function () {
        navigate('ProductDetails');
    };
    var onDelete = function (name) { };
    return (react_1["default"].createElement(react_native_1.TouchableWithoutFeedback, __assign({}, { onPress: onPress }),
        react_1["default"].createElement(react_navigation_shared_element_1.SharedElement, { id: "image" },
            react_1["default"].createElement(theme_1.Box, { width: 157, height: 180, backgroundColor: "white", borderWidth: react_native_1.StyleSheet.hairlineWidth, marginTop: "m", borderRadius: "m", padding: 'm', justifyContent: "flex-start", margin: "s" },
                react_1["default"].createElement(theme_1.Box, { height: 70, overflow: "hidden", alignItems: "center", justifyContent: "center", padding: "s" },
                    react_1["default"].createElement(react_native_1.Image, { source: src, resizeMode: "contain", height: 50 })),
                react_1["default"].createElement(theme_1.Box, { flex: 1 },
                    react_1["default"].createElement(theme_1.Text, { variant: "title", color: "primary", marginTop: "s", fontSize: 13, marginBottom: "s" }, name),
                    react_1["default"].createElement(react_native_1.Image, { source: images_1.Stars }),
                    react_1["default"].createElement(theme_1.Box, { flexDirection: "row", justifyContent: "space-between", marginTop: "s", marginBottom: "s" },
                        react_1["default"].createElement(theme_1.Text, { variant: "body" }, price),
                        react_1["default"].createElement(Icons_1.Key, { size: 20 }))),
                react_1["default"].createElement(theme_1.Box, { style: __assign({}, react_native_1.StyleSheet.absoluteFillObject), padding: "s", flexDirection: "row", justifyContent: "flex-end" },
                    react_1["default"].createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return onDelete(name); } },
                        react_1["default"].createElement(theme_1.Text, { color: "primary", textTransform: "uppercase", variant: "smtitle" }, "X")))))));
};
function ItemList(_a) {
    var navigation = _a.navigation;
    return (react_1["default"].createElement(theme_1.Box, { flex: 1, backgroundColor: "cgrey" },
        react_1["default"].createElement(react_native_1.FlatList, { contentContainerStyle: {
                justifyContent: 'center',
                flexDirection: 'column'
            }, showsVerticalScrollIndicator: false, data: exports.allItems, numColumns: 2, renderItem: function (_a) {
                var _b = _a.item, name = _b.name, src = _b.src, price = _b.price;
                return (react_1["default"].createElement(react_1.Fragment, null,
                    react_1["default"].createElement(exports.Items, __assign({}, { name: name, src: src, price: price }))));
            }, keyExtractor: function (_a) {
                var name = _a.name;
                return name;
            } })));
}
exports["default"] = ItemList;
