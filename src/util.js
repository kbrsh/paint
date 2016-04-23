    var utils = {
        isFunction: function(fn) {
            return (!!fn && typeMatch(fn, 'function'));
        },
        lastArgumentCallback: function (args, invoke) {
            var lastArgument = args[args.length - 1];

            if (utils.isFunction(lastArgument)){
                if (invoke) {
                    lastArgument();
                }
                return lastArgument;
            } else {
                return undefined;
            }
        },
        extend: function (target) {
            Array.prototype.slice.call(arguments, 1)
                .forEach(function (source) {
                    for (var key in source) {
                        if (source[key] !== undefined) {
                            target[key] = source[key];
                        }
                    }
            });
            return target;
        }
    };