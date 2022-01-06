import Vue from "vue";
const mockOverride = require.requireActual("@/helpers/widgetHelpers");

mockOverride.getPageID = (vm: Vue) => "testPage";
mockOverride.notGrapes = () => true;

module.exports = mockOverride;
