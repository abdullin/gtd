# reverend

Merge an express-style path string with data to create a valid path. Version 0.3.x adds support for
[Custom Match](https://github.com/component/path-to-regexp#custom-match-parameters) and
[Unnamed](https://github.com/component/path-to-regexp#unnamed-parameters) parameters as provided by path-to-regexp ^0.2.0.
To ensure compatibility, use the version of reverend compatible with path-to-regexp which most closely matches the
version your application uses.



[![Build Status](https://travis-ci.org/krakenjs/reverend.png)](https://travis-ci.org/krakenjs/reverend)

## Usage
```javascript
var reverend = require('reverend');
```

### reverend(path, object);
* `path`  (*String|Array*) - An express-style path, or an array of paths, of which only the first element will be used.
* `object` (*Object*) - An object with keys matching the tokens to be replaced in the route.

```javascript
'use strict';

var reverend = require('reverend');


var path;

// Path params
path = reverend('/user/:id', { id: 5 });
// '/user/5';

// Optional path params
path = reverend('/user/:id/:operation?', { id: 5 });
// '/user/5/';

// Multiple path params
path = reverend('/user/:id/:operation', { id: 5, operation: address });
// '/user/5/address';

// Custom match parameters
path = reverend('/posts/:id(\\d+)', { id: 5 });
// '/post/5'

path = reverend('/posts/:id(\\d+)', { id: 'foo' }); // throws

// Unnamed params
path = reverend('/:foo/(.*)', { foo: 'foo', 0: 'bar' });
// '/foo/bar'

```

## License
MIT

## Tests, Coverage, Linting
```javascript
$ npm test
```
```javascript
$ npm run cover
```
```javascript
$ npm run lint
```
