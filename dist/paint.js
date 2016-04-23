"use strict";

/*
* Paint v0.0.9 Alpha
* Copyright (c) 2016, Kabir Shah
* http://github.com/KingPixil/paint/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/
(function (global) {
  "use strict";
  var typeMatch = function (o, type) {
    return (typeof o === type);
  };



  var paint = function (selector) {
    return new paint.fn.init(selector);
  };

  paint.fn = paint.prototype = {
    constructor: paint,
    init: function (s) {
      this.e = document.querySelectorAll(s);

      this.length = this.e.length;

      return this;
    },
    ready: function (fn) {
      document.readyState != "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);
    },
    each: function (fn) {
      var e = this.e, count = 0;

      for (var i = 0, l = e.length; i < l; i++) {
        fn.call(e[i], i) === false ? count-- : count++;
      }

      return count;
    },
    val: function (val) {
      if (val) {
        this.each(function () {
          this.value = val;
        });
      } else {
        return this.e[0].value;
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
    hasClass: function (className) {
      this.each(function () {
        this.classList ? this.classList.contains(className) : new RegExp("(^| )" + className + "( |$)", "gi").test(this.className);
      });
      return this;
    },
    toggleClass: function (className) {
      this.each(function () {
        if (this.classList) {
          this.classList.toggle(className);
        } else {
          var classes = this.className.split(" ");
          var existingIndex = classes.indexOf(className);
          if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);
          this.className = classes.join(" ");
        }
      });
    },
    addClass: function (className) {
      this.each(function () {
        this.classList ? this.classList.add(className) : this.className += " " + className;
      });
      return this;
    },
    removeClass: function (c) {
      this.each(function () {
        this.classList ? this.classList.remove(c) : this.className = this.className.replace(new RegExp("(^|\\b)" + c.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      });
      return this;
    },
    attr: function (attr, value) {
      this.each(function () {
        this.setAttribute(attr, value);
      });
      return this;
    },
    css: function (css, prop) {
      this.each(function () {
        this.style[css] = prop;
      });
      return this;
    },
    click: function (callback) {
      this.on("click", callback);
    },
    on: function (event, callback) {
      this.each(function () {
        this.addEventListener(event, callback, false);
      });

      return this;
    },
    off: function (event, callback) {
      this.each(function () {
        this.removeEventListener(event, callback, false);
      });

      return this;
    }
  };

  paint.fn.init.prototype = paint.fn;

  global.paint = paint;
  if (!global.$) {
    global.$ = paint;
  }
})(this);