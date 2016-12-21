/*
filenm: server.js
by: anup patel
 */

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080);
console.log("Running on Port 8080");