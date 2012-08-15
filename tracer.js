// https://github.com/andrewchilds/js-library-tracer

var Tracer = (function () {

    if (!window.console || !window.console.log) {
        window.console = window.console || {};
        window.console.log = function () {
            window.alert(arguments);
        };
    }

    var starting_time = new Date().getTime();
    var is_running = false;
    var functions = {};
    var indent = 0;

    var pad = function () {
        var str = '';
        var i;
        for (i = 0; i < indent; i++) {
            str += '. ';
        }
        return str;
    };

    var elapsed = function () {
        var ms = new Date().getTime() - starting_time;
        return '+' + ms + 'ms';
    };

    var wrapper = function (name) {
        return function () {
            if (is_running) {
                window.console.log('[Tracer][' + elapsed() + '] ' + pad() + name, arguments);
            }
            indent++;
            var result = functions[name].apply(this, arguments);
            indent--;
            return result;
        };
    };

    var watch = function (library) {
        window.console.log('[Tracer] wrapping library');
        var prop;
        for (prop in library) {
            if (prop && Object.prototype.toString.call(library[prop]) === '[object Object]') {
                watch(library[prop]);
            }
            if (Object.prototype.toString.call(library[prop]) === '[object Function]') {
                functions[prop] = library[prop];
                library[prop] = wrapper(prop);
            }
        }
    };

    var start = function () {
        window.console.log('[Tracer] starting');
        is_running = true;
    };

    var stop = function () {
        window.console.log('[Tracer] stopping');
        is_running = false;
    };

    return {
        watch: watch,
        start: start,
        stop: stop
    };

}());

