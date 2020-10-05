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
exports.Images = void 0;
var react_1 = require("react");
var react_2 = require("react");
var react_native_1 = require("react-native");
var react_native_2 = require("react-native");
var react_native_3 = require("react-native");
var Button_1 = require("../../Utils/Button");
var FormTextInput_1 = require("../../Utils/FormTextInput");
var theme_1 = require("../theme");
var ItemList_1 = require("./ItemList");
var ProductHeader_1 = require("./ProductHeader");
var width = react_native_1.Dimensions.get('window').width;
exports.Images = function (_a) {
    var src = _a.src, name = _a.name, price = _a.price;
    return (react_1["default"].createElement(theme_1.Box, { width: 157, height: 150, backgroundColor: "white", borderWidth: react_native_2.StyleSheet.hairlineWidth, marginTop: "m", borderRadius: "m", padding: 'm', justifyContent: "flex-start", margin: "s" },
        react_1["default"].createElement(theme_1.Box, { height: 100, overflow: "hidden", alignItems: "center", justifyContent: "center", padding: "s" },
            react_1["default"].createElement(react_native_3.Image, { source: src, resizeMode: "contain", height: 50 }))));
};
function AddProduct() {
    return (react_1["default"].createElement(theme_1.Box, { flex: 1, backgroundColor: "white" },
        react_1["default"].createElement(theme_1.Box, { flexDirection: "column", alignItems: "center", backgroundColor: "white" },
            react_1["default"].createElement(ProductHeader_1["default"], { back: false })),
        react_1["default"].createElement(theme_1.Box, { flex: 1, padding: "xl", alignItems: "center" },
            react_1["default"].createElement(FormTextInput_1["default"], { placeholder: "Item Title" }),
            react_1["default"].createElement(FormTextInput_1["default"], { placeholder: "Item Price", keyboardType: "number-pad" }),
            react_1["default"].createElement(FormTextInput_1["default"], { placeholder: "Item Description", numberOfLines: 7 }),
            react_1["default"].createElement(theme_1.Box, { width: width * 0.8 },
                react_1["default"].createElement(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false },
                    react_1["default"].createElement(react_2.Fragment, null,
                        react_1["default"].createElement(theme_1.Box, { width: 157, height: 150, backgroundColor: "white", borderWidth: react_native_2.StyleSheet.hairlineWidth, marginTop: "m", borderRadius: "m", padding: 'm', justifyContent: "flex-start", margin: "s" },
                            react_1["default"].createElement(theme_1.Box, { height: 100, overflow: "hidden", alignItems: "center", justifyContent: "center", padding: "s" },
                                react_1["default"].createElement(theme_1.Text, { variant: "smtitle" }, "Add Image"))),
                        ItemList_1.allItems.map(function (_a, index) {
                            var name = _a.name, src = _a.src, price = _a.price;
                            return (react_1["default"].createElement(react_2.Fragment, { key: index },
                                react_1["default"].createElement(exports.Images, __assign({}, { name: name, src: src, price: price }))));
                        })))),
            react_1["default"].createElement(theme_1.Box, null,
                react_1["default"].createElement(Button_1["default"], { label: "Add Item", variant: "primary", style: { marginTop: 20 } })))));
}
exports["default"] = AddProduct;
