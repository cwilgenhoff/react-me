'use strict';

var express = require('express');
var noOp = function () {};

var mockApp = {
    registerEndpoint: function(verb, url, callback) {},
    globals: {
        utils: {},
        config: {},
        models: {}
    }
};

exports = module.exports = mockApp;
