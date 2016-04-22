"use strict";

/*
* Paint v0.0.7 Alpha
* Copyright (c) 2016, Kabir Shah
* http://github.com/KingPixil/paint/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.paint = root.$ = factory();
  }
})(this, function () {
  var aP = Array.prototype, slice = aP.slice;

  function Init(s) {
    var r = document.querySelectorAll(s || "\u263a"), length = r.length;
    return length == 1 ? r[0] : r;
  }
  function paint(selector) {
    return new Init(selector);
  }

  var fn = paint.fn = paint.prototype = Init.prototype = {
    constructor: paint,
    paint: true,
    length: 0,
    init: Init
  };
  paint.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments), length = args.length, i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };


  function each(collection, callback) {
    var l = collection.length, i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  fn.extend({
    each: function (callback) {
      each(this, callback);
      return this;
    }
  });

  fn.extend({
    on: function (eventName, handler) {
      this.addEventListener(eventName, handler);
      return this;
    }
  });

  fn.extend({
    show: function () {
      return this.style.display = "";
    },
    hide: function () {
      return this.style.display = "none";
    }
  });

  return paint;
});