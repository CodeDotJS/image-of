#!/usr/bin/env node

'use strict';

const fs = require('fs');

const http = require('follow-redirects').http;

const colors = require('chalk');

const argv = require('yargs')

    .usage(colors.cyan('\nUsage: $0 -u [/user.id] -n [file name]'))
    .demand(['u', 'n'])
    .describe('u', 'ID of facebook user')
    .describe('n', 'File name')
    .argv;
console.log('Please Wait');
const file = fs.createWriteStream(argv.n);
http.get('http://graph.facebook.com/' + argv.u + '/picture?width=80', function (res) {
	res.pipe(file);
	console.log('Done');
}).on('error', function (err) {
	console.error(err);
});
