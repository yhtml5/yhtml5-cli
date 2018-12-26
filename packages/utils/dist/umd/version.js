(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.version = factory());
}(this, (function () { 'use strict';

var version = "0.3.5";

return version;

})));
