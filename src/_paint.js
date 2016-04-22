(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.paint = root.$ = factory();
  }
})(this, function() {
  
  var aP = Array.prototype,
      slice = aP.slice

  // @include ./core.js
  // @include ./util.js
  // @include ./array.js
  // @include ./class.js
  // @include ./events.js
  // @include ./css.js
  // @include ./misc.js

  return paint;
});
