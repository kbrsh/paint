paint.extend = fn.extend = function(target) {
  target = target || {};

  var args = slice.call(arguments),
      length = args.length,
      i = 1;

  if ( args.length === 1) {
    target = this;
    i = 0;
  }

  for (; i < length; i++) {
    if (!args[i]) { continue; }
    for (var key in args[i]) {
      if ( args[i].hasOwnProperty(key) ) { target[key] = args[i][key]; }
    }
  }

  return target;
};


function each(collection, callback) {
  var l = collection.length,
      i = 0;

  for (; i < l; i++) {
    if ( callback.call(collection[i], collection[i], i, collection) === false ) { break; }
  }
}
