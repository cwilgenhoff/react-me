/*jshint node:true*/
'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');

var port = process.env.PORT || 7200;
var routesPath = __dirname + '/routes/';
var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());          // Compress response data with gzip

fs.readdir(routesPath, function (err, routes) {
    if (err) {
        throw err;
    }

    routes.forEach( function (route) {
        require(routesPath + route)(app);
    });
});

console.log('Loading Node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use('/', express.static('./public'));
app.use('/', express.static('./'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
