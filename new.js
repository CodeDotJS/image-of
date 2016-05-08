#!/usr/bin/env node

'use strict';

const http = require('follow-redirects').http;

const mkdirp = require('mkdirp');

const colors = require('colors/safe');

const argv = require('yargs')

.usage(colors.cyan.bold('\nUsage : $0 -u <command> [info] <command> [file]'))

.command('u', colors.cyan.bold('❱ ') + 'facebook user\'s username')

.command('i', colors.cyan.bold('❱ ') + 'facebook user\'s user-id')

.demand(['n'])

.describe('n', colors.cyan.bold('❱ ') + 'save image as')

.argv;

const updateNotifier = require('update-notifier');

const idFinder = {

    hostname: 'www.facebook.com',

    port: 443,

    path: '/' + argv.u,

    method: 'GET',

    headers: {

        'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',

        'Host': 'www.facebook.com',

        'Connection': 'Keep-Alive',

        'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
    }
};

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
