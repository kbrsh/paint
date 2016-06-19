(function(window) {
  var $ = function(selector, context) {
    this.elements = (context || document).querySelectorAll(selector);
    this.length = this.elements.length;
    return this;
  };

  $.fn = $.prototype = {
    ready: function(callback) {
      document.addEventListener("DOMContentLoaded", callback);
    },

    each: function(callback) {
      for (var i = 0; i < this.length; i++) {
        callback(this.elements[i], i, this.elements);
      }
      return this;
    },

    attr: function(name, val) {
      if (val) {
        this.setAttribute(name, val);
      } else if (!val) {
        return this.getAttribute(name);
      }
      return this;
    },

    addClass: function(className) {
      this.each(function(element) {
        element.classList.add(className);
      });
      return this;
    },

    removeClass: function(className) {
      this.each(function(element) {
        element.classList.remove(className);
      });

      return this;
    },
    
    val: function(val) {
      if(val) {
        this.value = val;
      } else if(!val) {
        return this.elements[0].value;
      }
      return this;
    },
    
    html: function(html) {
      if(html) {
        this.each(function() {
          this.innerHTML = html;
        });
      } else if(!html) {
        return this.innerHTML;
      }
      return this;
    },
    
    css: function(rule, attr) {
      if(rule) {
        this.each(function() {
          this.style[rule] = attr;
        });
      } else if(!attr) {
        return getComputedStyle(this)[rule];
      }
      return this;
    }
  };

  window.$ = function(selector, context) {
    return new $(selector, context);
  };
})(window);