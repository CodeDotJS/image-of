#!/usr/bin/env node

'use strict';

const fs = require('fs');
const url = require('url');
const http = require('follow-redirects').http;
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

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

const userName = exec("whoami", function(error, stdout, stderr) {
    var gotName = stdout;
    var getName = gotName.toString();
    console.log(getName);
    var DOWNLOAD_DIR = '/home/',
        +getName + '/Downloads/FB';
    var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
    var child = exec(mkdir, function(err, stdout, stderr) {
        if (err) throw err;
    });
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
