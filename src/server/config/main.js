/*jslint node: true */
'use strict';

function main(app) {
    var NODE_ENV = process.env.NODE_ENV;
    var availableEnvironments = ['dev', 'prod'];

    NODE_ENV = availableEnvironments.indexOf(NODE_ENV) === -1 ? 'dev' : NODE_ENV;

    return require(app.globals.utils.path.join(__dirname, NODE_ENV))();
}

exports = module.exports = main;
