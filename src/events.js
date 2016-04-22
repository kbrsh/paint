fn.extend({
   on(eventName, handler) {
       this.addEventListener(eventName, handler);
       return this
   } 
});