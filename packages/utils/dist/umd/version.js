(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.version = factory());
}(this, (function () { 'use strict';

var version = "0.5.0";

return version;

})));
