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