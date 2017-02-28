#!/usr/bin/env node

const VERSION = '0.1.2';

let program = require('commander'),
    addressGenerator = require('../src/index').onionAddressGenerator,
    rsa = require('../src/index').privateKey,
    countdown = require('countdown');

program
    .version(VERSION)
    .option('-m, --match-pattern [regex pattern]', 'find an onion address that matches the [regex pattern]', '.*')
    .parse(process.argv);

addressGenerator.searchForAddress(program.matchPattern, process).then(function (result) {
    console.log();
    if (program.matchPattern != '.*') {
        console.log('finished in ' + countdown(process.start).toString());
        console.log('number of addresses ' + process.attempts);
        console.log('speed was ' + Math.floor(process.attempts / process.duration) + ' keys per second');
        console.log();
    }
    console.log(result.address + '.onion');
    console.log();
    console.log(rsa.privateKeyToPem(result.privateKey));
});