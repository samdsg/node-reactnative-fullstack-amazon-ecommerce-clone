"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_size_matters_1 = require("react-native-size-matters");
var Icons_1 = require("../../Icons");
var images_1 = require("../../images");
var Helpers_1 = require("../Helpers");
var theme_1 = require("../theme");
/* Components */
var ProductHeader_1 = require("./ProductHeader");
/* Utils */
var _a = react_native_1.Dimensions.get('window'), width = _a.width, height = _a.height;
function ProductDetails(_a) {
    var navigation = _a.navigation;
    var onBack = function () {
        navigation.pop();
    };
    var onEdit = function () {
        navigation.navigate('EditProduct');
    };
    return (react_1["default"].createElement(react_native_1.View, { style: { flex: 1, backgroundColor: 'white' } },
        react_1["default"].createElement(react_native_1.View, { style: { height: height * 0.6 } },
            react_1["default"].createElement(react_native_1.TouchableWithoutFeedback, { onPress: onBack },
                react_1["default"].createElement(theme_1.Box, { flexDirection: "column", alignItems: "center", backgroundColor: "white" },
                    react_1["default"].createElement(ProductHeader_1["default"], { back: true }))),
            react_1["default"].createElement(theme_1.Box, { flex: 1, padding: "m", height: height * 0.6 },
                react_1["default"].createElement(theme_1.Text, { variant: "title", fontSize: Helpers_1.CUSTOMFONT(27), color: "primary", textTransform: "capitalize", fontWeight: "900" }, "Nova Scooter"),
                react_1["default"].createElement(theme_1.Box, { flexDirection: "row", justifyContent: "space-between", marginTop: "m" },
                    react_1["default"].createElement(theme_1.Text, { color: "orange", variant: "title", fontSize: Helpers_1.CUSTOMFONT(20) }, "\u20A6700"),
                    react_1["default"].createElement(theme_1.Box, { width: 97, height: 30, borderRadius: "s", borderWidth: react_native_1.StyleSheet.hairlineWidth, flexDirection: "row", alignItems: "center", padding: "s", justifyContent: "space-between" },
                        react_1["default"].createElement(Icons_1.Plus, { size: react_native_size_matters_1.moderateScale(18) }),
                        react_1["default"].createElement(theme_1.Text, { variant: "title", color: "primary", fontSize: 15 }, "1"),
                        react_1["default"].createElement(Icons_1.Minus, { size: react_native_size_matters_1.moderateScale(15) }))),
                react_1["default"].createElement(theme_1.Box, { height: react_native_size_matters_1.moderateScale(230), width: react_native_size_matters_1.moderateScale(width * 0.77), alignSelf: "center", marginTop: "m", padding: "s", alignItems: "center", justifyContent: "center" },
                    react_1["default"].createElement(react_native_1.Image, { source: images_1.Glider, style: { height: react_native_size_matters_1.moderateScale(200) }, resizeMode: "contain" })))),
        react_1["default"].createElement(theme_1.Box, { flex: 1, backgroundColor: "white", padding: "xl", position: "relative" },
            react_1["default"].createElement(theme_1.Box, { flex: 1 },
                react_1["default"].createElement(theme_1.Text, { variant: "title", color: "primary", marginBottom: "m" }, "Description"),
                react_1["default"].createElement(theme_1.Text, { variant: "body", fontSize: Helpers_1.CUSTOMFONT(11), color: "primary" }, "And going out to meet the sunlight and fresh air, seeing all the people and the scenery It doesn't matter where you're coming from or where you're going all that matters is simple")),
            react_1["default"].createElement(react_native_1.TouchableWithoutFeedback, { onPress: onEdit },
                react_1["default"].createElement(theme_1.Box, { position: "absolute", bottom: 0, left: 0, backgroundColor: "primary", height: 57, borderTopLeftRadius: "l", padding: "m" },
                    react_1["default"].createElement(theme_1.Text, { variant: "title", color: "white", fontSize: Helpers_1.CUSTOMFONT(14) }, "Edit"))),
            react_1["default"].createElement(theme_1.Box, { position: "absolute", bottom: 0, right: 0, backgroundColor: "primary", height: 57, borderTopLeftRadius: "l", padding: "m" },
                react_1["default"].createElement(theme_1.Text, { variant: "title", color: "white", fontSize: Helpers_1.CUSTOMFONT(23) }, "ADD CART")))));
}
exports["default"] = ProductDetails;
