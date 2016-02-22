#!/usr/bin/env node

'use strict';

const fs = require('fs');
const http = require('follow-redirects').http;
const mkdirp = require('mkdirp');
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
  .usage(colors.cyan('\nUsage: $0 -u [/user.id] -n [file name]'))
  .demand(['u', 'n'])
  .describe('u', 'ID of facebook user')
  .describe('n', 'File name')
  .argv;

var image_in = './Images/';

var mkdir = mkdirp(image_in, function (err) {
    if (err) console.error(err)
    else console.log('pow!')
});

console.log('Please Wait');
const file = fs.createWriteStream(image_in + argv.n + ".jpg");
http.get('http://graph.facebook.com/' + argv.u + '/picture?width=1600', function (res) {
	res.pipe(file);
	console.log('Done');
}).on('error', function (err) {
	console.error(err);
});

