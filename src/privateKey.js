let forge = require('node-forge');
let pki = forge.pki;
let rsa = forge.pki.rsa;

exports.generateKeyPair = function () {
    return new Promise(function(fullfil, error) {
        rsa.generateKeyPair({bits: 1024, workers: -1, e: 0x01}, function(err, keypair) {
            if (err) {
                error(err);
            } else {
                fullfil(keypair);
            }
        });
    });
};

exports.privateKeyToPem = function (privateKey) {
    return pki.privateKeyToPem(privateKey);
};
