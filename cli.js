#!/usr/bin/env node

'use strict';

const fs = require('fs');
const url = require('url');
const http = require('follow-redirects').http;

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

var file = fs.createWriteStream(argv.n+".jpg");

var start_downlaod = http.get('http://graph.facebook.com/' + argv.u + '/picture?width=800', function(res) {
    res.pipe(file);
}).on('error', function(err) {
    console.error(err);
    console.log(image_url + ' downloaded to ' + image_in);
});