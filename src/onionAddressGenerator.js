let onionAddress = require('./onionAddress');
let patternMatcher = require('./patternMatcher');
let rsa = require('./privateKey');
let promsiseWhile = require('./promiseWhile').promiseWhile;


exports.searchForAddress = function(addressPattern, process) {
        let privateKey;
        let foundAddress;
        let found = false;

        if (process == undefined) {
            process = {};
        }

        process.start = new Date();
        process.attempts = 0;

        return promsiseWhile(function () {
            return !found;
        }, function () {
            return rsa.generateKeyPair().then(function (keypair) {
                privateKey = keypair.privateKey;
                return onionAddress.publicKeyToOnionAddress(keypair.publicKey);
            }).then(function (address) {
                foundAddress = address;
                return patternMatcher.match(address, addressPattern);
            }).then(function(isMatch) {
                let current = new Date();
                process.attempts += 1;
                process.duration = (current.getTime() - process.start.getTime()) / 1000;
                found = isMatch;
                if (!found) {
                    console.log('found address ' + foundAddress + '.onion but does not match');
                }
            }).catch(function (error) {
                console.error('An error occurred in generating a key')
            });
        }).then(function () {
           return {
               privateKey: privateKey,
               address: foundAddress
           };
        });
};