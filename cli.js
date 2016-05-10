#!/usr/bin/env node

'use strict';

const http = require('follow-redirects').http;

const https = require('follow-redirects').https;

const fs = require('fs');

const mkdirp = require('mkdirp');

const colors = require('colors/safe');

const argv = require('yargs')

.usage(colors.cyan.bold('\nUsage : $0 -u <command> [info] <command> [file]'))

.command('u', colors.cyan.bold('❱ ') + 'facebook user\'s user-id')

.command('i', colors.cyan.bold('❱ ') + 'facebook user\'s username')

.demand(['n'])

.describe('n', colors.cyan.bold('❱ ') + 'save image as')

.argv;

const updateNotifier = require('update-notifier');

const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const userID = {
	hostname: 'www.facebook.com',

	port: 443,

	path: '/' + argv.i,

	method: 'GET',

	headers: {
		'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',

		'Host': 'www.facebook.com',

		'Connection': 'Keep-Alive',

		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
};

const folderName = './Images/';

mkdirp(folderName, err => {
	if (err) {
		console.error(err);

		process.exit(1);
	} else {
		console.log(colors.cyan.bold('\n ❱ Directory Created   :   ✔'));
	}
});

function checkInternet(cb) {
	require('dns').lookup('facebook.com', err => {
		if (err && err.code === 'ENOTFOUND') {
			cb(false);
		} else {
			cb(true);
		}
	});
}

// checking internet connection
checkInternet(isConnected => {
	if (isConnected) {
		// do nothing : don't want to show a lot of messages.
	} else {
		// stop the whole process if the network is unreachable
		console.log(colors.red.bold('\n ❱ Internet Connection   :   ✖\n'));

		process.exit(1);
	}
});

if (argv.u) {
	http.get('http://graph.facebook.com/' + argv.u + '/picture?width=1600', res => {
		if (res.statusCode === 200) {
			const getImageIn = fs.createWriteStream(folderName + argv.n + '.jpg');

			res.pipe(getImageIn);

			const saveFile = colors.green.bold(folderName.toString().replace('./', '').replace('/', ''));

			const sendMess = colors.cyan.bold('\n ❱ Image Saved In      : ') + '  ' + saveFile + colors.cyan.bold(' ❱ ') + colors.green.bold(argv.n + `.jpg`, '\n');

			console.log(sendMess);
		} else {
			console.log(colors.red.bold('\n ❱ User Found          :   ✖ \n'));

			process.exit(1);
		}
	}).on('error', err => {
		console.error(err);

		process.exit(1);
	});
}

if (argv.i) {
	const getUserID = https.request(userID, res => {
		if (res.statusCode === 200) {
			console.log(colors.cyan.bold('\n ❱ Facebook user       :   ✔'));
		} else {
			console.log(colors.red.bold('\n ❱ Facebook user'));

			process.exit(1);
		}

		let storeData = '';

		res.setEncoding('utf8');

		res.on('data', d => {
			storeData += d;
		});

		res.on('end', () => {
			const matchPattern = new RegExp(/entity_id":"\d*/);

			const arrMatches = storeData.match(matchPattern);

			if (arrMatches && arrMatches[0]) {
				const getID = arrMatches[0].replace('entity_id":"', '');

				const getImageIn = fs.createWriteStream(folderName + argv.n + '.jpg');

				http.get('http://graph.facebook.com/' + getID + '/picture?width=1600', res => {
					res.pipe(getImageIn);

					console.log(colors.cyan.bold('\n ❱ Image saved in      :  '), colors.green.bold(folderName).replace('./', '').replace('/', ''), colors.cyan.bold('❱'), colors.green.bold(argv.n + `.jpg`, '\n'));
				}).on('error', err => {
					console.error(err);

					process.exit(1);
				});
			} else {
				process.exit(1);
			}
		});
	});
	getUserID.end();
}
