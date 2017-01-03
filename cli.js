#!/usr/bin/env node

'use strict';

const fs = require('fs');
const os = require('os');
const dns = require('dns');
const https = require('follow-redirects').https;
const got = require('got');
const fse = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();
const arg = process.argv[2];
const inf = process.argv[3];

const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');

const saveMedia = `${os.homedir()}/Facebook-Images/`;
const graph = `https://graph.facebook.com/${inf}/picture?width=1600`;

const fetchEye = {
	hostname: 'www.facebook.com',
	port: 443,
	path: `/${inf}`,
	method: 'GET',
	headers: {
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
};

fse.mkdirs(saveMedia, err => {
	if (err) {
		process.exit(1);
	}
});

const dim = foll => {
	return chalk.dim(foll);
};

const showMessage = () => {
	logUpdate();
	spinner.text = dim('Dude, wait!');
	spinner.start();
	return;
};

const checkConnection = () => {
	dns.lookup('facebook.com', err => {
		if (err) {
			logUpdate(`\n${pos} ${dim('Please check your internet connection!')}\n`);
			process.exit(1);
		}
		logUpdate();
		spinner.text = 'Searching...';
		spinner.start();
	});
};

const argList = ['-h', '--help', '-i', '--id', '-u', '--user'];

if (!arg || arg === '-h' || arg === '--help' || argList.indexOf(arg) === -1) {
	console.log(`
  Download profile picture of any facebook user!

  ${chalk.cyan('Usage')}   :  image-of [command] <username/userid>

  ${chalk.cyan('Command')} :
   -i, ${dim('--id')}         userid of facebook user
   -u, ${dim('--user')}       username of a facebook user
   -h, ${dim('--help')}       show help

  ${chalk.cyan('Example')} :
   $ image-of -i 4
   $ image-of -u zuck
  `);
	process.exit(1);
}

const getIn = fs.createWriteStream(saveMedia + `${inf}.jpg`);

const downloadMedia = opts => {
	opts = opts || {};
	let graph;
	if (typeof opts !== 'string') {
		graph = `https://graph.facebook.com/${inf}/picture?width=1600`;
	}
	if (typeof opts === 'string') {
		graph = `https://graph.facebook.com/${opts}/picture?width=1600`;
	}
	https.get(graph, (res, cb) => {
		res.pipe(getIn);
		getIn.on('finish', () => {
			logUpdate(`\n${pre} Image saved \n`);
			spinner.stop();
			getIn.close(cb);
			getIn.on('error', () => {
				process.exit(1);
			});
		});
	});
	return;
};

const removeImage = () => {
	return fs.unlinkSync(`${saveMedia}/${inf}.jpg`);
};

if (arg === '-i' || arg === '--id') {
	if (!inf) {
		logUpdate(`\n${pos} ${dim('To download image, please provide userid of a facebook user!')} \n`);
		removeImage();
		process.exit(1);
	}
	showMessage();
	checkConnection();
	got(graph).then(() => {
		logUpdate();
		spinner.text = `Downloading profile picture. Hold on!`;
		downloadMedia();
	}).catch(err => {
		if (err) {
			logUpdate(`\n${pos} ${inf} ${dim('is not an userid of any facebook user!')}\n`);
			removeImage();
			spinner.stop();
			process.exit(1);
		}
	});
}

if (arg === '-u' || arg === '--user') {
	if (!inf) {
		logUpdate(`\n${pos} ${dim('To download image, please provide username of a facebook user!')} \n`);
		removeImage();
		process.exit(1);
	}
	showMessage();
	checkConnection();
	const getUserID = https.request(fetchEye, res => {
		if (res.statusCode === 200) {
			logUpdate();
			spinner.text = `${inf} is a facebook user!`;
		} else {
			logUpdate(`\n${pos} ${inf} ${dim('is not a facebook user!')}\n`);
			removeImage();
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
				logUpdate();
				spinner.text = `Downloading profile picture. Hold on!`;
				downloadMedia(getID);
			} else {
				process.exit(1);
			}
		});
	});
	getUserID.end();
}
