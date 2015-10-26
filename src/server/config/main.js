/*jslint node: true */
'use strict';

function main(app) {
    var NODE_ENV = process.env.NODE_ENV;
    var availableEnvironments = ['development', 'production'];

    NODE_ENV = availableEnvironments.indexOf(NODE_ENV) === -1 ? 'development' : NODE_ENV;

    return require(app.globals.utils.path.join(__dirname, NODE_ENV))();
}

exports = module.exports = main;
