"use strict";

/*
* Paint v0.0.8 Alpha
* Copyright (c) 2016, Kabir Shah
* http://github.com/KingPixil/paint/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
(function (global) {
  "use strict";

  var debug = true;
  var type_string = "string";
  var typeMatch = function (o, type) {
    return (typeof o === type);
  };

  var utils = {
    isFunction: function (fn) {
      return (!!fn && typeMatch(fn, "function"));
    },
    lastArgumentCallback: function (args, invoke) {
      var lastArgument = args[args.length - 1];

      if (utils.isFunction(lastArgument)) {
        if (invoke) {
          lastArgument();
        }
        return lastArgument;
      } else {
        return undefined;
      }
    },
    extend: function (target) {
      Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        for (var key in source) {
          if (source[key] !== undefined) {
            target[key] = source[key];
          }
        }
      });
      return target;
    }
  };

  var paint = function (selector) {
    return new paint.fn.init(selector);
  };

  paint.fn = paint.prototype = {
    constructor: paint,
    init: function (selector) {
      if (!!selector.nodeType && (selector.nodeType === 1 || selector.nodeType === 9)) {
        this.els = [selector];
      } else if (typeMatch(selector, type_string)) {
        this.els = document.querySelectorAll(selector);
      }

      this.length = this.els.length;

      return this;
    },
    ready: function (fn) {
      document.readyState != "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);
    },
    each: function (fn) {
      var els = this.els, trueFalseCount = 0;

      for (var i = 0, l = els.length; i < l; i++) {
        fn.call(els[i], i) === false ? trueFalseCount-- : trueFalseCount++;
      }

      return trueFalseCount;
    },
    val: function (val) {
      if (val) {
        this.each(function () {
          this.value = val;
        });
      } else {
        return this.els[0].value;
      }
    },
    html: function (html) {
      this.each(function () {
        this.innerHTML = html;
      });

      return this;
    },
    hide: function () {
      this.each(function () {
        this.style.display = "none";
      });

      return this;
    },
    show: function () {
      this.each(function () {
        this.style.display = "";
      });

      return this;
    },
    fadeIn: function () {
      this.style.opacity = 0;

      var last = +new Date();
      var tick = function () {
        this.style.opacity = +this.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+this.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };

      tick();

      return this;
    },
    hasClass: function (className) {
      className = className.trim();

      var result = this.each(function () {
        return (this.className.indexOf(className) > -1);
      });

      return ((result + this.length) > 0);
    },
    toggleClass: function (className) {
      className = className.trim();

      this.each(function () {
        var $this = $(this);
        if ($this.hasClass(className)) {
          $this.removeClass(className);
        } else {
          $this.addClass(className);
        }
      });

      return this;
    },
    addClass: function (classes) {
      var add = function () {
        var merged = (this.className + " " + classes.trim()).split(" "), uniques = {}, union = [];

        for (var i = 0, l = merged.length; i < l; i++) {
          uniques[merged[i]] = true;
        }

        for (var j in uniques) {
          if (typeMatch(j, type_string)) {
            union.push(j);
          }
        }

        this.className = union.join(" ").trim();
      };

      if (typeMatch(classes, type_string)) {
        this.each(add);
      }
      return this;
    },
    removeClass: function (classes) {
      var remove = function () {
        var existing = this.className + "";
        var removing = classes.trim().split(" ");

        for (var i = 0; i < removing.length; i++) {
          existing = existing.replace(removing[i], "");
        }

        this.className = existing;
      };

      this.each(remove);
      return this;
    },
    attr: function (attr, value) {
      this.each(function () {
        this.setAttribute(attr, value);
      });
      return this;
    },
    css: function (css) {
      var set = function () {
        return undefined;
      };

      if (css) {
        // Set
        this.each(set);
      } else {
        // Get css for first element
        return "";
      }
      return this;
    },
    click: function (callback) {
      this.on("click", callback);
    },
    on: function (events) {
      var callback = utils.lastArgumentCallback(arguments), ev = events.split(" ");

      this.each(function () {
        for (var i = 0; i < ev.length; i++) {
          this.addEventListener(ev[i], callback, false);
        }
      });

      return this;
    },
    off: function (events) {
      var callback = utils.lastArgumentCallback(arguments), ev = events.split(" ");

      this.each(function () {
        for (var i = 0; i < ev.length; i++) {
          this.removeEventListener(ev[i], callback, false);
        }
      });

      return this;
    }
  };

  paint.fn.init.prototype = paint.fn;

  global.paint = paint;
  if (!global.$) {
    global.$ = paint;
  }

  if (debug) {
    global.utils = utils;
  }
})(this);