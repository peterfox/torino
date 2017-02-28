let forge = require('node-forge');
let pki = forge.pki;
let asn1 = forge.asn1;
let base32 = require('rfc-3548-b32');

exports.publicKeyToOnionAddress = function generateAddress(publicKey) {
    return new Promise(function(fullfil)
    {
        let subjectPublicKeyInfo = pki.publicKeyToAsn1(publicKey);
        let publicKeyBuffer = asn1.toDer(subjectPublicKeyInfo);
        let md = forge.md.sha1.create();
        md.update(publicKeyBuffer.getBytes().slice(22));

        fullfil(base32.encode(new Buffer(md.digest().getBytes().slice(0, 10), 'binary')).toLowerCase());
    });
};

