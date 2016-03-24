#!/usr/bin/env node

'use strict';

const fs = require('fs');
const http = require('follow-redirects').http;
const mkdirp = require('mkdirp');
const colors = require('colors');

colors.setTheme({
	directory: ['cyan', 'bold']
});

colors.setTheme({
	info: ['cyan', 'bold']
});

colors.setTheme({
	normal: ['green', 'bold']
});

const argv = require('yargs')
	.usage('\nUsage : $0 -u [/user.id] -n [file name]'.info)
	.demand(['u', 'n'])
	.describe('u', 'ID of facebook user')
	.describe('n', 'File name')
	.argv;

const imageIn = './Images/';

const removeSlash = imageIn.replace('./', '');

const removeDot = removeSlash.replace('/', ''); // because I don't want to.

mkdirp(imageIn, err => {
	if (err) {
		console.error(err);
	} else {
		console.log('\n\t ❭ Directory Created 	:'.directory + '	✔'.normal);
	}
});

setTimeout(() => {
	console.log('\n\t ❭ Downloading 		:'.directory + '	✔'.normal);
}, 2000);

const file = fs.createWriteStream(imageIn + argv.n + '.jpg');

setTimeout(() => {
	console.log('\n\t ❭ In Progress 		:'.directory + '	✔'.normal);
}, 3500);
http.get('http://graph.facebook.com/' + argv.u + '/picture?width=1600', res => {
	res.pipe(file);
	setTimeout(() => {
		console.log('\n\t ❭ Image Saved in 	: '.directory + '	' + removeDot.toString().normal + ' ❭❭ ' + argv.n.toString().normal + '.jpg'.normal + '\n');
	}, 4000);
}).on('error', err => {
	process.exit(1);
	console.error(err);
});

