#!/usr/bin/env node

'use strict';

const fs = require('fs');
const url = require('url');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
const colors = require('colors');
const mkdirp = require('mkdirp');

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
    
var image_in = mkdirp('/home/rishi/Downloads/Facebook_Images', function (err) {
    if (err) console.error(err)
    else console.log('pow!')
});

var file = fs.createWriteStream(argv.n+".jpg");

var start_downlaod = http.get('http://graph.facebook.com/' + argv.u + '/picture?width=800', function(res) {
    res.pipe(file);
}).on('error', function(err) {
    console.error(err);
});

fs.mkdirSync(path, mode);