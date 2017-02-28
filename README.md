# Torino

Torino is an example of an Onion Address generator for Tor hidden services.

This was a simple little "can I do it project?" and **ultimately isn't
likely worth using in a production environment** due to how slow
the program is but it's fun all the same if you want to try it out 
or see how Tor addresses are generated. 

## Install and use

To install globally run

```
npm install -g torino
```

running ```torino -h``` 

```

  Usage: torino [options]

  Options:

    -h, --help                           output usage information
    -V, --version                        output the version number
    -m, --match-pattern [regex pattern]  find an onion address that matches the [regex pattern]
```

To generate any address (no pattern) run with no options:

```
torino
```

Giving you an output like so:

```
uqggk3zd6ragkh3n.onion

-----BEGIN RSA PRIVATE KEY-----
MIIBWwIBAAKBgQCsIqpV5MeQO20kYEsRtpUoYPz6uG3marMmJb6a3u7TovDolVPm
KPsvI+KNt9QMCmzDfEjF/Mhmfo2/7reMuhNWNe07lowFmQ+DSRLdNbnWnExmdd36
FW8I0LveHYPsWwXFR8Vq53MG2ncSbEF8vJ/pE+lZXljfYDzvmGwrc5XA8QIBAQIB
AQJBAOurrhMMeSjAxVdRpesB5nTmXIbuG1/BuEyDh/LLQ41QvgLYr1YPVc4hHPjp
Ar/oJbOoYAWvdqORyIVWPI/vuzsCQQC6+++OaJp8gy6ALF4W2GoOtcQDVdKkw6VW
PlYIzF+PwI17eztaoLNpdAbieaJy7VUmM1PHOTLa25eZGRLVPjnDAgEBAgEBAkBL
A17mdcSJzrKWkhYsuqBir1mEDq8CR+P73+2v9bT43+5MPDoF6XkXKLy3Ie8vgFXK
kPO3xrwooif+2ozG/CzY
-----END RSA PRIVATE KEY-----
```

To generate an address that matches a regex pattern run with :

```
torino --match-pattern ^a
```

With the pattern ```^a``` it'll key generating keys until it has an address that starts with the character ```a```.

You can also use the library behind the program as well in your own project if you so wish simply install it like so:

```
npm install torino --save
```

Then use as follows:

```js

const torino = require('torino').onionAddressGenerator;
const rsa = require('torino').privateKey;

const myPattern = '^torino';

torino.searchForAddress(myPattern).then(function (result) {
    const address = result.address;
    const privateKey = rsa.privateKeyToPem(result.privateKey); // Converts it to a PEM format for use in Tor
});
```

## Hell it's slow, can it be improved?

I'd love to make the program production useful but to compete against the likes of
[Shallot](https://github.com/katmagic/Shallot) and [Scallion](https://github.com/lachesis/scallion)
it's just not possible without having a low level implementation of the key generation
or hashing algorithms. There's no reason the use of OpenCL that's seen in Scallion couldn't be done in nodejs,
it's just not something I have a huge background in or time to learn about. If you
want to give it ago, please do share your results.

## License

It's licensed under MIT, enjoy.
