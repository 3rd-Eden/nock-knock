# nock-knock

This module scratches some of my itches. When I define mocks I want to use URL
params in the URL instead of writing regexp's or manually creating functions
that do the path validation. So in modules uses the `routable` module to
constructor a route with params, then returns a function that validates if
received URL is accepted by `routable`. If there are params defined and we have
validators for it, we will execute those so you can still deny specific paths.

## Installation

```
npm install --save nock-knock
```

Who's there?

## Usage

Import the module, give it an URL and pass it in the nock methods:

```js
import route from 'nock-knock';
import nock from 'nock';

nock('https://example.com')
.get(route('/url/:param/another'))
.reply(200, 'another');
```

If you want to validate params you can supply an object as second argument. The
keys in the object should match the name of the param:

```js
nock('https://example.com')
.get(route('/url/:foo/bar', {
  foo: function validate(value) {
    return value === 'bar'
  }
}))

// Intercepts /url/bar/bar
```

## License

MIT
