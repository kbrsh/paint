function Init(s){
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;
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