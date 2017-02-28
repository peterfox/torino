let Promise = require("bluebird");

let promiseWhile = Promise.method(function(condition, action, lastValue) {
    if (!condition()) return lastValue;
    return action().then(promiseWhile.bind(null, condition, action));
});

exports.promiseWhile = promiseWhile;
