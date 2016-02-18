#!/usr/bin/env node

'use strict';

const fs = require('fs');
const url = require('url');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
const colors = require('colors');

colors.setTheme({
    error: ['red', 'bold']
});

colors.setTheme({
    info: ['cyan', 'bold']
});

colors.setTheme({
    normal: ['green', 'bold']
});

const argv = require('yargs')
    .usage('\nUsage: $0 -u [/user.id] -n [file name]'.info)
    .demand(['u', 'n'])
    .describe('u', 'ID of facebook user')
    .describe('n', 'File name')
    .argv;
    
console.log("Please Wait")
var file = fs.createWriteStream(argv.n+".jpg");

var start_downlaod = http.get('http://graph.facebook.com/' + argv.u + '/picture?width=80', function(res) {
    res.pipe(file);
    console.log('Done');
}).on('error', function(err) {
    console.error(err);
});
