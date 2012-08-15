# JS Library Tracer

A utility to trace any JS library's execution and performance to `window.console.log` (or `window.alert`).

## Why Would I Want To Use This?

You might be in a situation where you can't set breakpoints in your browser. This utility makes it easier to debug and profile your javascript without the use of breakpoints or anything beyond your browser's console.

## Simple Usage Example

```js
var MyExampleLibrary = (function () {
  var pub = {};

  pub.foo = function () { };
  pub.bar = function () { };

  pub.init = function () {
    pub.foo(1, 2, 3);
    pub.bar([1, 2, 3]);
  };

  return pub;

}());

var Tracer = (function () { ... }());

Tracer.watch(MyExampleLibrary);
Tracer.start();
MyExampleLibrary.init();
Tracer.stop();
```

The result of this tiny example in the Chrome console would be:

```
[Tracer] wrapping library
[Tracer] starting
[Tracer][+1ms] init []
[Tracer][+1ms] . foo [1, 2, 3]
[Tracer][+2ms] . bar [ > Array[3] ]
[Tracer] stopping
```
