
exports.match = function(address, pattern) {
    return new Promise(function (fulfil) {
        fulfil(address.match(pattern));
    })
};