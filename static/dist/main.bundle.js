/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 84);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class BaseBlock {
	constructor(tag, attrs = {}) {
		this.el = document.createElement(tag);
		this.setAttrs(attrs);
	}

	setAttrs(attrs = {}) {
		Object.keys(attrs).forEach(name => {
			this.el.setAttribute(name, attrs[name]);
		});
	}

	get() {
		return this.el;
	}

	on(name, callback) {
		this.el.addEventListener(name, callback);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseBlock;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

var DiagonalMovement = {
    Always: 1,
    Never: 2,
    IfAtMostOneObstacle: 3,
    OnlyWhenNoObstacles: 4
};

module.exports = DiagonalMovement;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Router {

	constructor() {

		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = {};
		this.activeRoute = null;
		this.loginned = false;
		this.user = {
			username: '',
			score: 0
		}

		this.history = window.history;

		Router.__instance = this;
	}

	register(route, view) {
		this.routes[route] = view;
	}

	_getViewByRoute(href) {
		return this.routes[href];
	}   

	start() {
		window.onpopstate = () => {
			this.onroute(window.location.pathname);
		}
		
		this.onroute(window.location.pathname);
	}

	go(path) {
		if (this.onroute(path)) {
			window.history.pushState({ page: 1 }, 'Title 1', path);
		}
	}

	onroute(path) {

		let view = this._getViewByRoute(path);

		if (!view) {
			return false;
		}

		if (this.currentView === view) {
			return true;
		}

		if (this.currentView) {
			this.currentView.hide();
		}

		view.show();
		this.currentView = view;

		if (this.loginned) {
			this.loginSwitch(this.user)
		} else {
			this.unloginSwitch(this.user)
		}

		return true;
	}

	loginSwitch(user) {
		this.currentView.loginSwitch(user.username);
		this.loginned = true;
		this.user = user;
	}

	unloginSwitch(user) {
		this.currentView.unloginSwitch(user.username);
		this.loginned = false;
		this.user = user;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_js__ = __webpack_require__(2);






class BaseView extends __WEBPACK_IMPORTED_MODULE_0__components_BaseBlock_baseblock_js__["a" /* default */] {
	constructor(tag, attrs) {
		super(tag, attrs);
		this.back = new __WEBPACK_IMPORTED_MODULE_1__components_Back_back_js__["a" /* default */]();

		this.back.onclick(() => {
			const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_js__["a" /* default */]();
			event.preventDefault();
			router.go('/');
		})
		this.get().appendChild(this.back.get());

		this.green_background = '/img/back_green.jpg';
		this.white_background = '/img/back_yellow1.jpg';
		this.background = this.green_background;
	}

	show() {
		document.querySelector('body').appendChild(this.get());
		document.body.background = this.background;
	}

	hide() {
		document.querySelector('body').removeChild(this.get());
	}

	loginSwitch(name) {

	}

	unloginSwitch(name) {

	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseView;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userservice_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router_js__ = __webpack_require__(2);





class Authorize {
	constructor() {
		if (Authorize.__instance) {
			return Authorize.__instance;
		}

		this.service = new __WEBPACK_IMPORTED_MODULE_0__userservice_js__["a" /* default */]();
		this.router = new __WEBPACK_IMPORTED_MODULE_1__modules_router_js__["a" /* default */]();

		this.user = {};
		this.anonymUser = {
			username: 'Гость',
			score: 0
		}
		Object.assign(this.user, this.anonymUser);
		
		this.showForGuest();

		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			} else {
				this.showForGuest();
			}
		});

		Authorize.__instance = this;
	}

	loadUserScore() {
		this.service.getUserScore(xhr => {
			if (xhr.status === 'ok') {
				this.user.score = xhr.score;
			}
		})
	}

	authorize() {
		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			}
		});
	}

	deauthorize() {
		this.service.logout(xhr => {
			Object.assign(this.user, this.anonymUser);
			this.showForGuest();
		});
	}

	showForUser() {
		this.router.loginSwitch(this.user);
	}

	showForGuest() {
		this.router.unloginSwitch(this.anonymUser);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Authorize;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Events = {
	GAME_START: 		1,
	PLAY_NEW_GAME: 		2,
	TRY_QUIT: 			3,
	QUIT_CONFIRMED: 	4,
	QUIT_CANCELED: 		5,
	GAME_FINISHED: 		6,
	PLAY_AGAIN: 		7,
	EXIT_TO_MENU: 		8,
	NEW_WAVE_STARTED: 	9,
	GET_SCORE: 			10,
	THRONE_DAMAGE: 		11,

	MULTIPLAYER_NEW_MAP_SNAPSHOT: 	12,
	MULTIPLAYER_SEARCH: 			13,
	MULTIPLAYER_GAME_START: 		14,
	MULTIPLAYER_PLAY_NEW_GAME: 		15,
	MULTIPLAYER_TRY_QUIT: 			16,
	MULTIPLAYER_QUIT_CONFIRMED: 	17,
	MULTIPLAYER_QUIT_CANCELED: 		18,
	MULTIPLAYER_GAME_FINISHED: 		19,
	MULTIPLAYER_PLAY_AGAIN: 		20,
	MULTIPLAYER_EXIT_TO_MENU: 		21,
	MULTIPLAYER_NEW_WAVE_STARTED: 	22,
	MULTIPLAYER_GET_SCORE: 			23,
	MULTIPLAYER_THRONE_DAMAGE: 		24,

}

/* harmony default export */ __webpack_exports__["a"] = (Events);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Mediator {
	constructor() {
		if (Mediator.__instance) {
			return Mediator.__instance;
		}

		this.messages = {};

		Mediator.__instance = this;
	}

	emit(event, args) {
		if (event in this.messages) {
			for (const callback of this.messages[event]) {
				callback(args);
			}
			return true;
		} else {
			return false;
		}
	}

	subscribe(event, callback) {
		if (event in this.messages) {
			this.messages[event].push(callback);
		} else {
			this.messages[event] = [callback];
		}
		return true;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mediator;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 * Konva JavaScript Framework v1.6.1
 * http://konvajs.github.io/
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Tue Apr 25 2017
 *
 * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
 * Modified work Copyright (C) 2014 - 2017 by Anton Lavrenov (Konva)
 *
 * @license
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// runtime check for already included Konva
(function(global) {
  'use strict';
  /**
     * @namespace Konva
     */

  var PI_OVER_180 = Math.PI / 180;

  var Konva = {
    // public
    version: '1.6.1',

    // private
    stages: [],
    idCounter: 0,
    ids: {},
    names: {},
    shapes: {},
    listenClickTap: false,
    inDblClickWindow: false,

    // configurations
    enableTrace: false,
    traceArrMax: 100,
    dblClickWindow: 400,
    /**
         * Global pixel ratio configuration. KonvaJS automatically detect pixel ratio of current device.
         * But you may override such property, if you want to use your value.
         * @property pixelRatio
         * @default undefined
         * @memberof Konva
         * @example
         * Konva.pixelRatio = 1;
         */
    pixelRatio: undefined,
    /**
         * Drag distance property. If you start to drag a node you may want to wait until pointer is moved to some distance from start point,
         * only then start dragging.
         * @property dragDistance
         * @default 0
         * @memberof Konva
         * @example
         * Konva.dragDistance = 10;
         */
    dragDistance: 0,
    /**
         * Use degree values for angle properties. You may set this property to false if you want to use radiant values.
         * @property angleDeg
         * @default true
         * @memberof Konva
         * @example
         * node.rotation(45); // 45 degrees
         * Konva.angleDeg = false;
         * node.rotation(Math.PI / 2); // PI/2 radian
         */
    angleDeg: true,
    /**
         * Show different warnings about errors or wrong API usage
         * @property showWarnings
         * @default true
         * @memberof Konva
         * @example
         * Konva.showWarnings = false;
         */
    showWarnings: true,

    /**
         * @namespace Filters
         * @memberof Konva
         */
    Filters: {},

    /**
         * returns whether or not drag and drop is currently active
         * @method
         * @memberof Konva
         */
    isDragging: function() {
      var dd = Konva.DD;

      // if DD is not included with the build, then
      // drag and drop is not even possible
      if (dd) {
        return dd.isDragging;
      }
      return false;
    },
    /**
        * returns whether or not a drag and drop operation is ready, but may
        *  not necessarily have started
        * @method
        * @memberof Konva
        */
    isDragReady: function() {
      var dd = Konva.DD;

      // if DD is not included with the build, then
      // drag and drop is not even possible
      if (dd) {
        return !!dd.node;
      }
      return false;
    },
    _addId: function(node, id) {
      if (id !== undefined) {
        this.ids[id] = node;
      }
    },
    _removeId: function(id) {
      if (id !== undefined) {
        delete this.ids[id];
      }
    },
    _addName: function(node, name) {
      if (name) {
        if (!this.names[name]) {
          this.names[name] = [];
        }
        this.names[name].push(node);
      }
    },
    _removeName: function(name, _id) {
      if (!name) {
        return;
      }
      var nodes = this.names[name];
      if (!nodes) {
        return;
      }
      for (var n = 0; n < nodes.length; n++) {
        var no = nodes[n];
        if (no._id === _id) {
          nodes.splice(n, 1);
        }
      }
      if (nodes.length === 0) {
        delete this.names[name];
      }
    },
    getAngle: function(angle) {
      return this.angleDeg ? angle * PI_OVER_180 : angle;
    },
    _detectIE: function(ua) {
      var msie = ua.indexOf('msie ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    },
    _parseUA: function(userAgent) {
      var ua = userAgent.toLowerCase(),
        // jQuery UA regex
        match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
          /(webkit)[ \/]([\w.]+)/.exec(ua) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
          /(msie) ([\w.]+)/.exec(ua) ||
          ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
          [],
        // adding mobile flag as well
        mobile = !!userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
        ),
        ieMobile = !!userAgent.match(/IEMobile/i);

      return {
        browser: match[1] || '',
        version: match[2] || '0',
        isIE: Konva._detectIE(ua),
        // adding mobile flab
        mobile: mobile,
        ieMobile: ieMobile // If this is true (i.e., WP8), then Konva touch events are executed instead of equivalent Konva mouse events
      };
    },
    // user agent
    UA: undefined
  };

  var glob = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined' ? self : {};

  Konva.UA = Konva._parseUA(glob.navigator && glob.navigator.userAgent || '');

  if (glob.Konva) {
    console.error(
      'Konva instance is already exist in current eviroment. ' +
        'Please use only one instance.'
    );
  }
  glob.Konva = Konva;
  Konva.global = glob;

  if (true) {
    // runtime-check for browserify and nw.js (node-webkit)
    if (glob.window && glob.window.document) {
      Konva.document = glob.window.document;
      Konva.window = glob.window;
    } else {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like enviroments that support module.exports,
      // like Node.
      var Canvas = __webpack_require__(89);
      var jsdom = __webpack_require__(90).jsdom;

      Konva.window = jsdom(
        '<!DOCTYPE html><html><head></head><body></body></html>'
      ).defaultView;
      Konva.document = Konva.window.document;
      Konva.window.Image = Canvas.Image;
      Konva._nodeCanvas = Canvas;
    }
    module.exports = Konva;
    return;
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return Konva;
    });
  }
  Konva.document = document;
  Konva.window = window;
})(typeof global !== 'undefined' ? global : window);

/*eslint-disable  eqeqeq, no-cond-assign, no-empty*/
(function() {
  'use strict';
  /**
     * Collection constructor.  Collection extends
     *  Array.  This class is used in conjunction with {@link Konva.Container#get}
     * @constructor
     * @memberof Konva
     */
  Konva.Collection = function() {
    var args = [].slice.call(arguments), length = args.length, i = 0;

    this.length = length;
    for (; i < length; i++) {
      this[i] = args[i];
    }
    return this;
  };
  Konva.Collection.prototype = [];
  /**
     * iterate through node array and run a function for each node.
     *  The node and index is passed into the function
     * @method
     * @memberof Konva.Collection.prototype
     * @param {Function} func
     * @example
     * // get all nodes with name foo inside layer, and set x to 10 for each
     * layer.get('.foo').each(function(shape, n) {
     *   shape.setX(10);
     * });
     */
  Konva.Collection.prototype.each = function(func) {
    for (var n = 0; n < this.length; n++) {
      func(this[n], n);
    }
  };
  /**
     * convert collection into an array
     * @method
     * @memberof Konva.Collection.prototype
     */
  Konva.Collection.prototype.toArray = function() {
    var arr = [], len = this.length, n;

    for (n = 0; n < len; n++) {
      arr.push(this[n]);
    }
    return arr;
  };
  /**
     * convert array into a collection
     * @method
     * @memberof Konva.Collection
     * @param {Array} arr
     */
  Konva.Collection.toCollection = function(arr) {
    var collection = new Konva.Collection(), len = arr.length, n;

    for (n = 0; n < len; n++) {
      collection.push(arr[n]);
    }
    return collection;
  };

  // map one method by it's name
  Konva.Collection._mapMethod = function(methodName) {
    Konva.Collection.prototype[methodName] = function() {
      var len = this.length, i;

      var args = [].slice.call(arguments);
      for (i = 0; i < len; i++) {
        this[i][methodName].apply(this[i], args);
      }

      return this;
    };
  };

  Konva.Collection.mapMethods = function(constructor) {
    var prot = constructor.prototype;
    for (var methodName in prot) {
      Konva.Collection._mapMethod(methodName);
    }
  };

  /*
    * Last updated November 2011
    * By Simon Sarris
    * www.simonsarris.com
    * sarris@acm.org
    *
    * Free to use and distribute at will
    * So long as you are nice to people, etc
    */

  /*
    * The usage of this class was inspired by some of the work done by a forked
    * project, KineticJS-Ext by Wappworks, which is based on Simon's Transform
    * class.  Modified by Eric Rowell
    */

  /**
     * Transform constructor
     * @constructor
     * @param {Array} [m] Optional six-element matrix
     * @memberof Konva
     */
  Konva.Transform = function(m) {
    this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
  };

  Konva.Transform.prototype = {
    /**
         * Copy Konva.Transform object
         * @method
         * @memberof Konva.Transform.prototype
         * @returns {Konva.Transform}
         */
    copy: function() {
      return new Konva.Transform(this.m);
    },
    /**
         * Transform point
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Object} point 2D point(x, y)
         * @returns {Object} 2D point(x, y)
         */
    point: function(point) {
      var m = this.m;
      return {
        x: m[0] * point.x + m[2] * point.y + m[4],
        y: m[1] * point.x + m[3] * point.y + m[5]
      };
    },
    /**
         * Apply translation
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Number} x
         * @param {Number} y
         * @returns {Konva.Transform}
         */
    translate: function(x, y) {
      this.m[4] += this.m[0] * x + this.m[2] * y;
      this.m[5] += this.m[1] * x + this.m[3] * y;
      return this;
    },
    /**
         * Apply scale
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Number} sx
         * @param {Number} sy
         * @returns {Konva.Transform}
         */
    scale: function(sx, sy) {
      this.m[0] *= sx;
      this.m[1] *= sx;
      this.m[2] *= sy;
      this.m[3] *= sy;
      return this;
    },
    /**
         * Apply rotation
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Number} rad  Angle in radians
         * @returns {Konva.Transform}
         */
    rotate: function(rad) {
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m11 = this.m[0] * c + this.m[2] * s;
      var m12 = this.m[1] * c + this.m[3] * s;
      var m21 = this.m[0] * (-s) + this.m[2] * c;
      var m22 = this.m[1] * (-s) + this.m[3] * c;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    },
    /**
         * Returns the translation
         * @method
         * @memberof Konva.Transform.prototype
         * @returns {Object} 2D point(x, y)
         */
    getTranslation: function() {
      return {
        x: this.m[4],
        y: this.m[5]
      };
    },
    /**
         * Apply skew
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Number} sx
         * @param {Number} sy
         * @returns {Konva.Transform}
         */
    skew: function(sx, sy) {
      var m11 = this.m[0] + this.m[2] * sy;
      var m12 = this.m[1] + this.m[3] * sy;
      var m21 = this.m[2] + this.m[0] * sx;
      var m22 = this.m[3] + this.m[1] * sx;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    },
    /**
         * Transform multiplication
         * @method
         * @memberof Konva.Transform.prototype
         * @param {Konva.Transform} matrix
         * @returns {Konva.Transform}
         */
    multiply: function(matrix) {
      var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
      var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

      var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
      var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

      var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
      var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      this.m[4] = dx;
      this.m[5] = dy;
      return this;
    },
    /**
         * Invert the matrix
         * @method
         * @memberof Konva.Transform.prototype
         * @returns {Konva.Transform}
         */
    invert: function() {
      var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
      var m0 = this.m[3] * d;
      var m1 = (-this.m[1]) * d;
      var m2 = (-this.m[2]) * d;
      var m3 = this.m[0] * d;
      var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
      var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      this.m[0] = m0;
      this.m[1] = m1;
      this.m[2] = m2;
      this.m[3] = m3;
      this.m[4] = m4;
      this.m[5] = m5;
      return this;
    },
    /**
         * return matrix
         * @method
         * @memberof Konva.Transform.prototype
         */
    getMatrix: function() {
      return this.m;
    },
    /**
         * set to absolute position via translation
         * @method
         * @memberof Konva.Transform.prototype
         * @returns {Konva.Transform}
         * @author ericdrowell
         */
    setAbsolutePosition: function(x, y) {
      var m0 = this.m[0],
        m1 = this.m[1],
        m2 = this.m[2],
        m3 = this.m[3],
        m4 = this.m[4],
        m5 = this.m[5],
        yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2),
        xt = (x - m4 - m2 * yt) / m0;

      return this.translate(xt, yt);
    }
  };

  // CONSTANTS
  var CONTEXT_2D = '2d',
    OBJECT_ARRAY = '[object Array]',
    OBJECT_NUMBER = '[object Number]',
    OBJECT_STRING = '[object String]',
    PI_OVER_DEG180 = Math.PI / 180,
    DEG180_OVER_PI = 180 / Math.PI,
    HASH = '#',
    EMPTY_STRING = '',
    ZERO = '0',
    KONVA_WARNING = 'Konva warning: ',
    KONVA_ERROR = 'Konva error: ',
    RGB_PAREN = 'rgb(',
    COLORS = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5]
    },
    RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

  /**
     * @namespace Util
     * @memberof Konva
     */
  Konva.Util = {
    /*
         * cherry-picked utilities from underscore.js
         */
    _isElement: function(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isObject: function(obj) {
      return !!obj && obj.constructor === Object;
    },
    _isArray: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_NUMBER;
    },
    _isString: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _throttle: function(func, wait, opts) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      var options = opts || {};
      var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) {
          previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },
    /*
         * other utils
         */
    _hasMethods: function(obj) {
      var names = [], key;

      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        if (this._isFunction(obj[key])) {
          names.push(key);
        }
      }
      return names.length > 0;
    },
    isValidSelector: function(selector) {
      if (typeof selector !== 'string') {
        return false;
      }
      var firstChar = selector[0];
      return firstChar === '#' ||
        firstChar === '.' ||
        firstChar === firstChar.toUpperCase();
    },
    createCanvasElement: function() {
      var canvas = Konva.document.createElement('canvas');
      // on some environments canvas.style is readonly
      try {
        canvas.style = canvas.style || {};
      } catch (e) {}
      return canvas;
    },
    isBrowser: function() {
      return typeof exports !== 'object';
    },
    _isInDocument: function(el) {
      while (el = el.parentNode) {
        if (el == Konva.document) {
          return true;
        }
      }
      return false;
    },
    _simplifyArray: function(arr) {
      var retArr = [], len = arr.length, util = Konva.Util, n, val;

      for (n = 0; n < len; n++) {
        val = arr[n];
        if (util._isNumber(val)) {
          val = Math.round(val * 1000) / 1000;
        } else if (!util._isString(val)) {
          val = val.toString();
        }

        retArr.push(val);
      }

      return retArr;
    },
    /*
         * arg can be an image object or image data
         */
    _getImage: function(arg, callback) {
      var imageObj, canvas;

      // if arg is null or undefined
      if (!arg) {
        callback(null);
      } else if (this._isElement(arg)) {
        // if arg is already an image object
        callback(arg);
      } else if (this._isString(arg)) {
        // if arg is a string, then it's a data url
        imageObj = new Konva.window.Image();
        imageObj.onload = function() {
          callback(imageObj);
        };
        imageObj.src = arg;
      } else if (arg.data) {
        //if arg is an object that contains the data property, it's an image object
        canvas = Konva.Util.createCanvasElement();
        canvas.width = arg.width;
        canvas.height = arg.height;
        var _context = canvas.getContext(CONTEXT_2D);
        _context.putImageData(arg, 0, 0);
        this._getImage(canvas.toDataURL(), callback);
      } else {
        callback(null);
      }
    },
    _getRGBAString: function(obj) {
      var red = obj.red || 0,
        green = obj.green || 0,
        blue = obj.blue || 0,
        alpha = obj.alpha || 1;

      return ['rgba(', red, ',', green, ',', blue, ',', alpha, ')'].join(
        EMPTY_STRING
      );
    },
    _rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function(hex) {
      hex = hex.replace(HASH, EMPTY_STRING);
      var bigint = parseInt(hex, 16);
      return {
        r: bigint >> 16 & 255,
        g: bigint >> 8 & 255,
        b: bigint & 255
      };
    },
    /**
         * return random hex color
         * @method
         * @memberof Konva.Util.prototype
         */
    getRandomColor: function() {
      var randColor = (Math.random() * 0xffffff << 0).toString(16);
      while (randColor.length < 6) {
        randColor = ZERO + randColor;
      }
      return HASH + randColor;
    },
    /**
         * return value with default fallback
         * @method
         * @memberof Konva.Util.prototype
         */
    get: function(val, def) {
      if (val === undefined) {
        return def;
      } else {
        return val;
      }
    },
    /**
         * get RGB components of a color
         * @method
         * @memberof Konva.Util.prototype
         * @param {String} color
         * @example
         * // each of the following examples return {r:0, g:0, b:255}
         * var rgb = Konva.Util.getRGB('blue');
         * var rgb = Konva.Util.getRGB('#0000ff');
         * var rgb = Konva.Util.getRGB('rgb(0,0,255)');
         */
    getRGB: function(color) {
      var rgb;
      // color string
      if (color in COLORS) {
        rgb = COLORS[color];
        return {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        };
      } else if (color[0] === HASH) {
        // hex
        return this._hexToRgb(color.substring(1));
      } else if (color.substr(0, 4) === RGB_PAREN) {
        // rgb string
        rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
        return {
          r: parseInt(rgb[1], 10),
          g: parseInt(rgb[2], 10),
          b: parseInt(rgb[3], 10)
        };
      } else {
        // default
        return {
          r: 0,
          g: 0,
          b: 0
        };
      }
    },
    // convert any color string to RGBA object
    // from https://github.com/component/color-parser
    colorToRGBA: function(str) {
      str = str || 'black';
      return Konva.Util._namedColorToRBA(str) ||
        Konva.Util._hex3ColorToRGBA(str) ||
        Konva.Util._hex6ColorToRGBA(str) ||
        Konva.Util._rgbColorToRGBA(str) ||
        Konva.Util._rgbaColorToRGBA(str);
    },
    // Parse named css color. Like "green"
    _namedColorToRBA: function(str) {
      var c = COLORS[str.toLowerCase()];
      if (!c) {
        return null;
      }
      return {
        r: c[0],
        g: c[1],
        b: c[2],
        a: 1
      };
    },
    // Parse rgb(n, n, n)
    _rgbColorToRGBA: function(str) {
      if (str.indexOf('rgb(') === 0) {
        str = str.match(/rgb\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: 1
        };
      }
    },
    // Parse rgba(n, n, n, n)
    _rgbaColorToRGBA: function(str) {
      if (str.indexOf('rgba(') === 0) {
        str = str.match(/rgba\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: parts[3]
        };
      }
    },
    // Parse #nnnnnn
    _hex6ColorToRGBA: function(str) {
      if (str[0] === '#' && str.length === 7) {
        return {
          r: parseInt(str.slice(1, 3), 16),
          g: parseInt(str.slice(3, 5), 16),
          b: parseInt(str.slice(5, 7), 16),
          a: 1
        };
      }
    },
    // Parse #nnn
    _hex3ColorToRGBA: function(str) {
      if (str[0] === '#' && str.length === 4) {
        return {
          r: parseInt(str[1] + str[1], 16),
          g: parseInt(str[2] + str[2], 16),
          b: parseInt(str[3] + str[3], 16),
          a: 1
        };
      }
    },
    // o1 takes precedence over o2
    _merge: function(o1, o2) {
      var retObj = this._clone(o2);
      for (var key in o1) {
        if (this._isObject(o1[key])) {
          retObj[key] = this._merge(o1[key], retObj[key]);
        } else {
          retObj[key] = o1[key];
        }
      }
      return retObj;
    },
    cloneObject: function(obj) {
      var retObj = {};
      for (var key in obj) {
        if (this._isObject(obj[key])) {
          retObj[key] = this.cloneObject(obj[key]);
        } else if (this._isArray(obj[key])) {
          retObj[key] = this.cloneArray(obj[key]);
        } else {
          retObj[key] = obj[key];
        }
      }
      return retObj;
    },
    cloneArray: function(arr) {
      return arr.slice(0);
    },
    _degToRad: function(deg) {
      return deg * PI_OVER_DEG180;
    },
    _radToDeg: function(rad) {
      return rad * DEG180_OVER_PI;
    },
    _capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function(str) {
      throw new Error(KONVA_ERROR + str);
    },
    error: function(str) {
      console.error(KONVA_ERROR + str);
    },
    warn: function(str) {
      /*
             * IE9 on Windows7 64bit will throw a JS error
             * if we don't use window.console in the conditional
             */
      if (Konva.global.console && console.warn && Konva.showWarnings) {
        console.warn(KONVA_WARNING + str);
      }
    },
    extend: function(child, parent) {
      function Ctor() {
        this.constructor = child;
      }
      Ctor.prototype = parent.prototype;
      var oldProto = child.prototype;
      child.prototype = new Ctor();
      for (var key in oldProto) {
        if (oldProto.hasOwnProperty(key)) {
          child.prototype[key] = oldProto[key];
        }
      }
      child.__super__ = parent.prototype;
      // create reference to parent
      child.super = parent;
    },
    /**
         * adds methods to a constructor prototype
         * @method
         * @memberof Konva.Util.prototype
         * @param {Function} constructor
         * @param {Object} methods
         */
    addMethods: function(constructor, methods) {
      var key;

      for (key in methods) {
        constructor.prototype[key] = methods[key];
      }
    },
    _getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
      var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)),
        d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        fa = t * d01 / (d01 + d12),
        fb = t * d12 / (d01 + d12),
        p1x = x1 - fa * (x2 - x0),
        p1y = y1 - fa * (y2 - y0),
        p2x = x1 + fb * (x2 - x0),
        p2y = y1 + fb * (y2 - y0);

      return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function(p, tension) {
      var len = p.length, allPoints = [], n, cp;

      for (n = 2; n < len - 2; n += 2) {
        cp = Konva.Util._getControlPoints(
          p[n - 2],
          p[n - 1],
          p[n],
          p[n + 1],
          p[n + 2],
          p[n + 3],
          tension
        );
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
      }

      return allPoints;
    },
    _removeLastLetter: function(str) {
      return str.substring(0, str.length - 1);
    },
    each: function(obj, func) {
      for (var key in obj) {
        func(key, obj[key]);
      }
    },
    _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
      var x, y, dist;

      var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      if (pd2 == 0) {
        x = x1;
        y = y1;
        dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
      } else {
        var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
        if (u < 0) {
          x = x1;
          y = y1;
          dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
        } else if (u > 1.0) {
          x = x2;
          y = y2;
          dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
        } else {
          x = x1 + u * (x2 - x1);
          y = y1 + u * (y2 - y1);
          dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
        }
      }
      return [x, y, dist];
    },
    // line as array of points.
    // line might be closed
    _getProjectionToLine: function(pt, line, isClosed) {
      var pc = Konva.Util.cloneObject(pt);
      var dist = Number.MAX_VALUE;
      line.forEach(function(p1, i) {
        if (!isClosed && i === line.length - 1) {
          return;
        }
        var p2 = line[(i + 1) % line.length];
        var proj = Konva.Util._getProjectionToSegment(
          p1.x,
          p1.y,
          p2.x,
          p2.y,
          pt.x,
          pt.y
        );
        var px = proj[0], py = proj[1], pdist = proj[2];
        if (pdist < dist) {
          pc.x = px;
          pc.y = py;
          dist = pdist;
        }
      });
      return pc;
    },
    _prepareArrayForTween: function(startArray, endArray, isClosed) {
      var n, start = [], end = [];
      if (startArray.length > endArray.length) {
        var temp = endArray;
        endArray = startArray;
        startArray = temp;
      }
      for (n = 0; n < startArray.length; n += 2) {
        start.push({
          x: startArray[n],
          y: startArray[n + 1]
        });
      }
      for (n = 0; n < endArray.length; n += 2) {
        end.push({
          x: endArray[n],
          y: endArray[n + 1]
        });
      }

      var newStart = [];
      end.forEach(function(point) {
        var pr = Konva.Util._getProjectionToLine(point, start, isClosed);
        newStart.push(pr.x);
        newStart.push(pr.y);
      });
      return newStart;
    },
    _prepareToStringify: function(obj) {
      var desc;

      obj.visitedByCircularReferenceRemoval = true;

      for (var key in obj) {
        if (
          !(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')
        ) {
          continue;
        }
        desc = Object.getOwnPropertyDescriptor(obj, key);
        if (
          obj[key].visitedByCircularReferenceRemoval ||
          Konva.Util._isElement(obj[key])
        ) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        } else if (Konva.Util._prepareToStringify(obj[key]) === null) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        }
      }

      delete obj.visitedByCircularReferenceRemoval;

      return obj;
    }
  };
})();

(function() {
  'use strict';
  // calculate pixel ratio
  var canvas = Konva.Util.createCanvasElement(),
    context = canvas.getContext('2d'),
    _pixelRatio = (function() {
      var devicePixelRatio = Konva.window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
      return devicePixelRatio / backingStoreRatio;
    })();

  /**
     * Canvas Renderer constructor
     * @constructor
     * @abstract
     * @memberof Konva
     * @param {Object} config
     * @param {Number} config.width
     * @param {Number} config.height
     * @param {Number} config.pixelRatio KonvaJS automatically handles pixel ratio adjustments in order to render crisp drawings
     *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
     *  of 1.  Some high end tablets and phones, like iPhones and iPads (not the mini) have a device pixel ratio
     *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
     *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
     *  specified, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
     *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
     */
  Konva.Canvas = function(config) {
    this.init(config);
  };

  Konva.Canvas.prototype = {
    init: function(config) {
      var conf = config || {};

      var pixelRatio = conf.pixelRatio || Konva.pixelRatio || _pixelRatio;

      this.pixelRatio = pixelRatio;
      this._canvas = Konva.Util.createCanvasElement();

      // set inline styles
      this._canvas.style.padding = 0;
      this._canvas.style.margin = 0;
      this._canvas.style.border = 0;
      this._canvas.style.background = 'transparent';
      this._canvas.style.position = 'absolute';
      this._canvas.style.top = 0;
      this._canvas.style.left = 0;
    },
    /**
         * get canvas context
         * @method
         * @memberof Konva.Canvas.prototype
         * @returns {CanvasContext} context
         */
    getContext: function() {
      return this.context;
    },
    /**
         * get pixel ratio
         * @method
         * @memberof Konva.Canvas.prototype
         * @returns {Number} pixel ratio
         */
    getPixelRatio: function() {
      return this.pixelRatio;
    },
    /**
         * get pixel ratio
         * @method
         * @memberof Konva.Canvas.prototype
         * @param {Number} pixelRatio KonvaJS automatically handles pixel ratio adustments in order to render crisp drawings
         *  on all devices. Most desktops, low end tablets, and low end phones, have device pixel ratios
         *  of 1.  Some high end tablets and phones, like iPhones and iPads have a device pixel ratio
         *  of 2.  Some Macbook Pros, and iMacs also have a device pixel ratio of 2.  Some high end Android devices have pixel
         *  ratios of 2 or 3.  Some browsers like Firefox allow you to configure the pixel ratio of the viewport.  Unless otherwise
         *  specificed, the pixel ratio will be defaulted to the actual device pixel ratio.  You can override the device pixel
         *  ratio for special situations, or, if you don't want the pixel ratio to be taken into account, you can set it to 1.
         */
    setPixelRatio: function(pixelRatio) {
      var previousRatio = this.pixelRatio;
      this.pixelRatio = pixelRatio;
      this.setSize(
        this.getWidth() / previousRatio,
        this.getHeight() / previousRatio
      );
    },
    /**
         * set width
         * @method
         * @memberof Konva.Canvas.prototype
         * @param {Number} width
         */
    setWidth: function(width) {
      // take into account pixel ratio
      this.width = this._canvas.width = width * this.pixelRatio;
      this._canvas.style.width = width + 'px';

      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    },
    /**
         * set height
         * @method
         * @memberof Konva.Canvas.prototype
         * @param {Number} height
         */
    setHeight: function(height) {
      // take into account pixel ratio
      this.height = this._canvas.height = height * this.pixelRatio;
      this._canvas.style.height = height + 'px';
      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    },
    /**
         * get width
         * @method
         * @memberof Konva.Canvas.prototype
         * @returns {Number} width
         */
    getWidth: function() {
      return this.width;
    },
    /**
         * get height
         * @method
         * @memberof Konva.Canvas.prototype
         * @returns {Number} height
         */
    getHeight: function() {
      return this.height;
    },
    /**
         * set size
         * @method
         * @memberof Konva.Canvas.prototype
         * @param {Number} width
         * @param {Number} height
         */
    setSize: function(width, height) {
      this.setWidth(width);
      this.setHeight(height);
    },
    /**
         * to data url
         * @method
         * @memberof Konva.Canvas.prototype
         * @param {String} mimeType
         * @param {Number} quality between 0 and 1 for jpg mime types
         * @returns {String} data url string
         */
    toDataURL: function(mimeType, quality) {
      try {
        // If this call fails (due to browser bug, like in Firefox 3.6),
        // then revert to previous no-parameter image/png behavior
        return this._canvas.toDataURL(mimeType, quality);
      } catch (e) {
        try {
          return this._canvas.toDataURL();
        } catch (err) {
          Konva.Util.warn('Unable to get data URL. ' + err.message);
          return '';
        }
      }
    }
  };

  Konva.SceneCanvas = function(config) {
    var conf = config || {};
    var width = conf.width || 0, height = conf.height || 0;

    Konva.Canvas.call(this, conf);
    this.context = new Konva.SceneContext(this);
    this.setSize(width, height);
  };

  Konva.Util.extend(Konva.SceneCanvas, Konva.Canvas);

  Konva.HitCanvas = function(config) {
    var conf = config || {};
    var width = conf.width || 0, height = conf.height || 0;

    Konva.Canvas.call(this, conf);
    this.context = new Konva.HitContext(this);
    this.setSize(width, height);
    this.hitCanvas = true;
  };
  Konva.Util.extend(Konva.HitCanvas, Konva.Canvas);
})();

(function() {
  'use strict';
  var COMMA = ',',
    OPEN_PAREN = '(',
    CLOSE_PAREN = ')',
    OPEN_PAREN_BRACKET = '([',
    CLOSE_BRACKET_PAREN = '])',
    SEMICOLON = ';',
    DOUBLE_PAREN = '()',
    // EMPTY_STRING = '',
    EQUALS = '=',
    // SET = 'set',
    CONTEXT_METHODS = [
      'arc',
      'arcTo',
      'beginPath',
      'bezierCurveTo',
      'clearRect',
      'clip',
      'closePath',
      'createLinearGradient',
      'createPattern',
      'createRadialGradient',
      'drawImage',
      'fill',
      'fillText',
      'getImageData',
      'createImageData',
      'lineTo',
      'moveTo',
      'putImageData',
      'quadraticCurveTo',
      'rect',
      'restore',
      'rotate',
      'save',
      'scale',
      'setLineDash',
      'setTransform',
      'stroke',
      'strokeText',
      'transform',
      'translate'
    ];

  var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation'
  ];

  /**
     * Canvas Context constructor
     * @constructor
     * @abstract
     * @memberof Konva
     */
  Konva.Context = function(canvas) {
    this.init(canvas);
  };

  Konva.Context.prototype = {
    init: function(canvas) {
      this.canvas = canvas;
      this._context = canvas._canvas.getContext('2d');

      if (Konva.enableTrace) {
        this.traceArr = [];
        this._enableTrace();
      }
    },
    /**
         * fill shape
         * @method
         * @memberof Konva.Context.prototype
         * @param {Konva.Shape} shape
         */
    fillShape: function(shape) {
      if (shape.getFillEnabled()) {
        this._fill(shape);
      }
    },
    /**
         * stroke shape
         * @method
         * @memberof Konva.Context.prototype
         * @param {Konva.Shape} shape
         */
    strokeShape: function(shape) {
      if (shape.getStrokeEnabled()) {
        this._stroke(shape);
      }
    },
    /**
         * fill then stroke
         * @method
         * @memberof Konva.Context.prototype
         * @param {Konva.Shape} shape
         */
    fillStrokeShape: function(shape) {
      var fillEnabled = shape.getFillEnabled();
      if (fillEnabled) {
        this._fill(shape);
      }
      if (shape.getStrokeEnabled()) {
        this._stroke(shape);
      }
    },
    /**
         * get context trace if trace is enabled
         * @method
         * @memberof Konva.Context.prototype
         * @param {Boolean} relaxed if false, return strict context trace, which includes method names, method parameters
         *  properties, and property values.  If true, return relaxed context trace, which only returns method names and
         *  properites.
         * @returns {String}
         */
    getTrace: function(relaxed) {
      var traceArr = this.traceArr,
        len = traceArr.length,
        str = '',
        n,
        trace,
        method,
        args;

      for (n = 0; n < len; n++) {
        trace = traceArr[n];
        method = trace.method;

        // methods
        if (method) {
          args = trace.args;
          str += method;
          if (relaxed) {
            str += DOUBLE_PAREN;
          } else {
            if (Konva.Util._isArray(args[0])) {
              str += OPEN_PAREN_BRACKET +
                args.join(COMMA) +
                CLOSE_BRACKET_PAREN;
            } else {
              str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
            }
          }
        } else {
          // properties
          str += trace.property;
          if (!relaxed) {
            str += EQUALS + trace.val;
          }
        }

        str += SEMICOLON;
      }

      return str;
    },
    /**
         * clear trace if trace is enabled
         * @method
         * @memberof Konva.Context.prototype
         */
    clearTrace: function() {
      this.traceArr = [];
    },
    _trace: function(str) {
      var traceArr = this.traceArr, len;

      traceArr.push(str);
      len = traceArr.length;

      if (len >= Konva.traceArrMax) {
        traceArr.shift();
      }
    },
    /**
         * reset canvas context transform
         * @method
         * @memberof Konva.Context.prototype
         */
    reset: function() {
      var pixelRatio = this.getCanvas().getPixelRatio();
      this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    },
    /**
         * get canvas
         * @method
         * @memberof Konva.Context.prototype
         * @returns {Konva.Canvas}
         */
    getCanvas: function() {
      return this.canvas;
    },
    /**
         * clear canvas
         * @method
         * @memberof Konva.Context.prototype
         * @param {Object} [bounds]
         * @param {Number} [bounds.x]
         * @param {Number} [bounds.y]
         * @param {Number} [bounds.width]
         * @param {Number} [bounds.height]
         */
    clear: function(bounds) {
      var canvas = this.getCanvas();

      if (bounds) {
        this.clearRect(
          bounds.x || 0,
          bounds.y || 0,
          bounds.width || 0,
          bounds.height || 0
        );
      } else {
        this.clearRect(
          0,
          0,
          canvas.getWidth() / canvas.pixelRatio,
          canvas.getHeight() / canvas.pixelRatio
        );
      }
    },
    _applyLineCap: function(shape) {
      var lineCap = shape.getLineCap();
      if (lineCap) {
        this.setAttr('lineCap', lineCap);
      }
    },
    _applyOpacity: function(shape) {
      var absOpacity = shape.getAbsoluteOpacity();
      if (absOpacity !== 1) {
        this.setAttr('globalAlpha', absOpacity);
      }
    },
    _applyLineJoin: function(shape) {
      var lineJoin = shape.getLineJoin();
      if (lineJoin) {
        this.setAttr('lineJoin', lineJoin);
      }
    },
    setAttr: function(attr, val) {
      this._context[attr] = val;
    },

    // context pass through methods
    arc: function() {
      var a = arguments;
      this._context.arc(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    beginPath: function() {
      this._context.beginPath();
    },
    bezierCurveTo: function() {
      var a = arguments;
      this._context.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    clearRect: function() {
      var a = arguments;
      this._context.clearRect(a[0], a[1], a[2], a[3]);
    },
    clip: function() {
      this._context.clip();
    },
    closePath: function() {
      this._context.closePath();
    },
    createImageData: function() {
      var a = arguments;
      if (a.length === 2) {
        return this._context.createImageData(a[0], a[1]);
      } else if (a.length === 1) {
        return this._context.createImageData(a[0]);
      }
    },
    createLinearGradient: function() {
      var a = arguments;
      return this._context.createLinearGradient(a[0], a[1], a[2], a[3]);
    },
    createPattern: function() {
      var a = arguments;
      return this._context.createPattern(a[0], a[1]);
    },
    createRadialGradient: function() {
      var a = arguments;
      return this._context.createRadialGradient(
        a[0],
        a[1],
        a[2],
        a[3],
        a[4],
        a[5]
      );
    },
    drawImage: function() {
      var a = arguments, _context = this._context;

      if (a.length === 3) {
        _context.drawImage(a[0], a[1], a[2]);
      } else if (a.length === 5) {
        _context.drawImage(a[0], a[1], a[2], a[3], a[4]);
      } else if (a.length === 9) {
        _context.drawImage(
          a[0],
          a[1],
          a[2],
          a[3],
          a[4],
          a[5],
          a[6],
          a[7],
          a[8]
        );
      }
    },
    isPointInPath: function(x, y) {
      return this._context.isPointInPath(x, y);
    },
    fill: function() {
      this._context.fill();
    },
    fillRect: function(x, y, width, height) {
      this._context.fillRect(x, y, width, height);
    },
    strokeRect: function(x, y, width, height) {
      this._context.strokeRect(x, y, width, height);
    },
    fillText: function() {
      var a = arguments;
      this._context.fillText(a[0], a[1], a[2]);
    },
    measureText: function(text) {
      return this._context.measureText(text);
    },
    getImageData: function() {
      var a = arguments;
      return this._context.getImageData(a[0], a[1], a[2], a[3]);
    },
    lineTo: function() {
      var a = arguments;
      this._context.lineTo(a[0], a[1]);
    },
    moveTo: function() {
      var a = arguments;
      this._context.moveTo(a[0], a[1]);
    },
    rect: function() {
      var a = arguments;
      this._context.rect(a[0], a[1], a[2], a[3]);
    },
    putImageData: function() {
      var a = arguments;
      this._context.putImageData(a[0], a[1], a[2]);
    },
    quadraticCurveTo: function() {
      var a = arguments;
      this._context.quadraticCurveTo(a[0], a[1], a[2], a[3]);
    },
    restore: function() {
      this._context.restore();
    },
    rotate: function() {
      var a = arguments;
      this._context.rotate(a[0]);
    },
    save: function() {
      this._context.save();
    },
    scale: function() {
      var a = arguments;
      this._context.scale(a[0], a[1]);
    },
    setLineDash: function() {
      var a = arguments, _context = this._context;

      // works for Chrome and IE11
      if (this._context.setLineDash) {
        _context.setLineDash(a[0]);
      } else if ('mozDash' in _context) {
        // verified that this works in firefox
        _context.mozDash = a[0];
      } else if ('webkitLineDash' in _context) {
        // does not currently work for Safari
        _context.webkitLineDash = a[0];
      }

      // no support for IE9 and IE10
    },
    getLineDash: function() {
      return this._context.getLineDash();
    },
    setTransform: function() {
      var a = arguments;
      this._context.setTransform(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    stroke: function() {
      this._context.stroke();
    },
    strokeText: function() {
      var a = arguments;
      this._context.strokeText(a[0], a[1], a[2]);
    },
    transform: function() {
      var a = arguments;
      this._context.transform(a[0], a[1], a[2], a[3], a[4], a[5]);
    },
    translate: function() {
      var a = arguments;
      this._context.translate(a[0], a[1]);
    },
    _enableTrace: function() {
      var that = this,
        len = CONTEXT_METHODS.length,
        _simplifyArray = Konva.Util._simplifyArray,
        origSetter = this.setAttr,
        n,
        args;

      // to prevent creating scope function at each loop
      var func = function(methodName) {
        var origMethod = that[methodName], ret;

        that[methodName] = function() {
          args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
          ret = origMethod.apply(that, arguments);

          that._trace({
            method: methodName,
            args: args
          });

          return ret;
        };
      };
      // methods
      for (n = 0; n < len; n++) {
        func(CONTEXT_METHODS[n]);
      }

      // attrs
      that.setAttr = function() {
        origSetter.apply(that, arguments);
        var prop = arguments[0];
        var val = arguments[1];
        if (
          prop === 'shadowOffsetX' ||
          prop === 'shadowOffsetY' ||
          prop === 'shadowBlur'
        ) {
          val = val / this.canvas.getPixelRatio();
        }
        that._trace({
          property: prop,
          val: val
        });
      };
    }
  };

  CONTEXT_PROPERTIES.forEach(function(prop) {
    Object.defineProperty(Konva.Context.prototype, prop, {
      get: function() {
        return this._context[prop];
      },
      set: function(val) {
        this._context[prop] = val;
      }
    });
  });

  Konva.SceneContext = function(canvas) {
    Konva.Context.call(this, canvas);
  };

  Konva.SceneContext.prototype = {
    _fillColor: function(shape) {
      var fill = shape.fill();

      this.setAttr('fillStyle', fill);
      shape._fillFunc(this);
    },
    _fillPattern: function(shape) {
      var fillPatternX = shape.getFillPatternX(),
        fillPatternY = shape.getFillPatternY(),
        fillPatternScale = shape.getFillPatternScale(),
        fillPatternRotation = Konva.getAngle(shape.getFillPatternRotation()),
        fillPatternOffset = shape.getFillPatternOffset();

      if (fillPatternX || fillPatternY) {
        this.translate(fillPatternX || 0, fillPatternY || 0);
      }
      if (fillPatternRotation) {
        this.rotate(fillPatternRotation);
      }
      if (fillPatternScale) {
        this.scale(fillPatternScale.x, fillPatternScale.y);
      }
      if (fillPatternOffset) {
        this.translate((-1) * fillPatternOffset.x, (-1) * fillPatternOffset.y);
      }

      this.setAttr(
        'fillStyle',
        this.createPattern(
          shape.getFillPatternImage(),
          shape.getFillPatternRepeat() || 'repeat'
        )
      );
      this.fill();
    },
    _fillLinearGradient: function(shape) {
      var start = shape.getFillLinearGradientStartPoint(),
        end = shape.getFillLinearGradientEndPoint(),
        colorStops = shape.getFillLinearGradientColorStops(),
        grd = this.createLinearGradient(start.x, start.y, end.x, end.y);

      if (colorStops) {
        // build color stops
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        this.setAttr('fillStyle', grd);
        shape._fillFunc(this);
      }
    },
    _fillRadialGradient: function(shape) {
      var start = shape.getFillRadialGradientStartPoint(),
        end = shape.getFillRadialGradientEndPoint(),
        startRadius = shape.getFillRadialGradientStartRadius(),
        endRadius = shape.getFillRadialGradientEndRadius(),
        colorStops = shape.getFillRadialGradientColorStops(),
        grd = this.createRadialGradient(
          start.x,
          start.y,
          startRadius,
          end.x,
          end.y,
          endRadius
        );

      // build color stops
      for (var n = 0; n < colorStops.length; n += 2) {
        grd.addColorStop(colorStops[n], colorStops[n + 1]);
      }
      this.setAttr('fillStyle', grd);
      this.fill();
    },
    _fill: function(shape) {
      var hasColor = shape.fill(),
        hasPattern = shape.getFillPatternImage(),
        hasLinearGradient = shape.getFillLinearGradientColorStops(),
        hasRadialGradient = shape.getFillRadialGradientColorStops(),
        fillPriority = shape.getFillPriority();

      // priority fills
      if (hasColor && fillPriority === 'color') {
        this._fillColor(shape);
      } else if (hasPattern && fillPriority === 'pattern') {
        this._fillPattern(shape);
      } else if (hasLinearGradient && fillPriority === 'linear-gradient') {
        this._fillLinearGradient(shape);
      } else if (hasRadialGradient && fillPriority === 'radial-gradient') {
        this._fillRadialGradient(shape);
      } else if (hasColor) {
        // now just try and fill with whatever is available
        this._fillColor(shape);
      } else if (hasPattern) {
        this._fillPattern(shape);
      } else if (hasLinearGradient) {
        this._fillLinearGradient(shape);
      } else if (hasRadialGradient) {
        this._fillRadialGradient(shape);
      }
    },
    _stroke: function(shape) {
      var dash = shape.dash(),
        // ignore strokeScaleEnabled for Text
        strokeScaleEnabled = shape.getStrokeScaleEnabled() ||
          shape instanceof Konva.Text;

      if (shape.hasStroke()) {
        if (!strokeScaleEnabled) {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
        }

        this._applyLineCap(shape);
        if (dash && shape.dashEnabled()) {
          this.setLineDash(dash);
          this.setAttr('lineDashOffset', shape.dashOffset());
        }

        this.setAttr('lineWidth', shape.strokeWidth());
        this.setAttr('strokeStyle', shape.stroke());

        if (!shape.getShadowForStrokeEnabled()) {
          this.setAttr('shadowColor', 'rgba(0,0,0,0)');
        }
        shape._strokeFunc(this);

        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    },
    _applyShadow: function(shape) {
      var util = Konva.Util,
        color = util.get(shape.getShadowRGBA(), 'black'),
        blur = util.get(shape.getShadowBlur(), 5),
        offset = util.get(shape.getShadowOffset(), {
          x: 0,
          y: 0
        }),
        // TODO: get this info from transform??
        scale = shape.getAbsoluteScale(),
        ratio = this.canvas.getPixelRatio(),
        scaleX = scale.x * ratio,
        scaleY = scale.y * ratio;

      this.setAttr('shadowColor', color);
      this.setAttr('shadowBlur', blur * ratio * Math.min(scaleX, scaleY));
      this.setAttr('shadowOffsetX', offset.x * scaleX);
      this.setAttr('shadowOffsetY', offset.y * scaleY);
    },
    _applyGlobalCompositeOperation: function(shape) {
      var globalCompositeOperation = shape.getGlobalCompositeOperation();
      if (globalCompositeOperation !== 'source-over') {
        this.setAttr('globalCompositeOperation', globalCompositeOperation);
      }
    }
  };
  Konva.Util.extend(Konva.SceneContext, Konva.Context);

  Konva.HitContext = function(canvas) {
    Konva.Context.call(this, canvas);
  };

  Konva.HitContext.prototype = {
    _fill: function(shape) {
      this.save();
      this.setAttr('fillStyle', shape.colorKey);
      shape._fillFuncHit(this);
      this.restore();
    },
    _stroke: function(shape) {
      if (shape.hasStroke() && shape.strokeHitEnabled()) {
        // ignore strokeScaleEnabled for Text
        var strokeScaleEnabled = shape.getStrokeScaleEnabled() ||
          shape instanceof Konva.Text;
        if (!strokeScaleEnabled) {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
        }
        this._applyLineCap(shape);
        this.setAttr('lineWidth', shape.strokeWidth());
        this.setAttr('strokeStyle', shape.colorKey);
        shape._strokeFuncHit(this);
        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    }
  };
  Konva.Util.extend(Konva.HitContext, Konva.Context);
})();

(function() {
  'use strict';
  // CONSTANTS
  var GET = 'get', SET = 'set';

  Konva.Factory = {
    addGetterSetter: function(constructor, attr, def, validator, after) {
      this.addGetter(constructor, attr, def);
      this.addSetter(constructor, attr, validator, after);
      this.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function(constructor, attr, def) {
      var method = GET + Konva.Util._capitalize(attr);

      constructor.prototype[method] = function() {
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };
    },
    addSetter: function(constructor, attr, validator, after) {
      var method = SET + Konva.Util._capitalize(attr);

      constructor.prototype[method] = function(val) {
        if (validator) {
          val = validator.call(this, val);
        }

        this._setAttr(attr, val);

        if (after) {
          after.call(this);
        }

        return this;
      };
    },
    addComponentsGetterSetter: function(
      constructor,
      attr,
      components,
      validator,
      after
    ) {
      var len = components.length,
        capitalize = Konva.Util._capitalize,
        getter = GET + capitalize(attr),
        setter = SET + capitalize(attr),
        n,
        component;

      // getter
      constructor.prototype[getter] = function() {
        var ret = {};

        for (n = 0; n < len; n++) {
          component = components[n];
          ret[component] = this.getAttr(attr + capitalize(component));
        }

        return ret;
      };

      // setter
      constructor.prototype[setter] = function(val) {
        var oldVal = this.attrs[attr], key;

        if (validator) {
          val = validator.call(this, val);
        }

        for (key in val) {
          if (!val.hasOwnProperty(key)) {
            continue;
          }
          this._setAttr(attr + capitalize(key), val[key]);
        }

        this._fireChangeEvent(attr, oldVal, val);

        if (after) {
          after.call(this);
        }

        return this;
      };

      this.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function(constructor, attr) {
      var capitalizedAttr = Konva.Util._capitalize(attr),
        setter = SET + capitalizedAttr,
        getter = GET + capitalizedAttr;

      constructor.prototype[attr] = function() {
        // setting
        if (arguments.length) {
          this[setter](arguments[0]);
          return this;
        }
        // getting
        return this[getter]();
      };
    },
    addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
      var method = GET + Konva.Util._capitalize(attr);
      var message = attr +
        ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
      constructor.prototype[method] = function() {
        Konva.Util.error(message);
        var val = this.attrs[attr];
        return val === undefined ? def : val;
      };
      this.addSetter(constructor, attr, validator, function() {
        Konva.Util.error(message);
      });
      this.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function(constructor, methods) {
      Konva.Util.each(methods, function(oldMethodName, newMethodName) {
        var method = constructor.prototype[newMethodName];
        constructor.prototype[oldMethodName] = function() {
          method.apply(this, arguments);
          Konva.Util.error(
            oldMethodName +
              ' method is deprecated and will be removed soon. Use ' +
              newMethodName +
              ' instead'
          );
        };
      });
    },
    afterSetFilter: function() {
      this._filterUpToDate = false;
    }
  };

  Konva.Validators = {
    /**
         * @return {number}
         */
    RGBComponent: function(val) {
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      }
      return Math.round(val);
    },
    alphaComponent: function(val) {
      if (val > 1) {
        return 1;
      } else if (val < 0.0001) {
        // chrome does not honor alpha values of 0
        return 0.0001;
      }

      return val;
    }
  };
})();

(function(Konva) {
  'use strict';
  // CONSTANTS
  var ABSOLUTE_OPACITY = 'absoluteOpacity',
    ABSOLUTE_TRANSFORM = 'absoluteTransform',
    ABSOLUTE_SCALE = 'absoluteScale',
    CHANGE = 'Change',
    CHILDREN = 'children',
    DOT = '.',
    EMPTY_STRING = '',
    GET = 'get',
    ID = 'id',
    KONVA = 'konva',
    LISTENING = 'listening',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    NAME = 'name',
    SET = 'set',
    SHAPE = 'Shape',
    SPACE = ' ',
    STAGE = 'stage',
    TRANSFORM = 'transform',
    UPPER_STAGE = 'Stage',
    VISIBLE = 'visible',
    CLONE_BLACK_LIST = ['id'],
    TRANSFORM_CHANGE_STR = [
      'xChange.konva',
      'yChange.konva',
      'scaleXChange.konva',
      'scaleYChange.konva',
      'skewXChange.konva',
      'skewYChange.konva',
      'rotationChange.konva',
      'offsetXChange.konva',
      'offsetYChange.konva',
      'transformsEnabledChange.konva'
    ].join(SPACE),
    SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);

  /**
     * Node constructor. Nodes are entities that can be transformed, layered,
     * and have bound events. The stage, layers, groups, and shapes all extend Node.
     * @constructor
     * @memberof Konva
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     */
  Konva.Node = function(config) {
    this._init(config);
  };

  Konva.Util.addMethods(Konva.Node, {
    _init: function(config) {
      var that = this;
      this._id = Konva.idCounter++;
      this.eventListeners = {};
      this.attrs = {};
      this._cache = {};
      this._filterUpToDate = false;
      this._isUnderCache = false;
      this.setAttrs(config);

      // event bindings for cache handling
      this.on(TRANSFORM_CHANGE_STR, function() {
        this._clearCache(TRANSFORM);
        that._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      });

      this.on(SCALE_CHANGE_STR, function() {
        that._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
      });

      this.on('visibleChange.konva', function() {
        that._clearSelfAndDescendantCache(VISIBLE);
      });
      this.on('listeningChange.konva', function() {
        that._clearSelfAndDescendantCache(LISTENING);
      });
      this.on('opacityChange.konva', function() {
        that._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      });
    },
    _clearCache: function(attr) {
      if (attr) {
        delete this._cache[attr];
      } else {
        this._cache = {};
      }
    },
    _getCache: function(attr, privateGetter) {
      var cache = this._cache[attr];

      // if not cached, we need to set it using the private getter method.
      if (cache === undefined) {
        this._cache[attr] = privateGetter.call(this);
      }

      return this._cache[attr];
    },
    /*
         * when the logic for a cached result depends on ancestor propagation, use this
         * method to clear self and children cache
         */
    _clearSelfAndDescendantCache: function(attr) {
      this._clearCache(attr);

      if (this.children) {
        this.getChildren().each(function(node) {
          node._clearSelfAndDescendantCache(attr);
        });
      }
    },
    /**
        * clear cached canvas
        * @method
        * @memberof Konva.Node.prototype
        * @returns {Konva.Node}
        * @example
        * node.clearCache();
        */
    clearCache: function() {
      delete this._cache.canvas;
      this._filterUpToDate = false;
      return this;
    },
    /**
        *  cache node to improve drawing performance, apply filters, or create more accurate
        *  hit regions. For all basic shapes size of cache canvas will be automatically detected.
        *  If you need to cache your custom `Konva.Shape` instance you have to pass shape's bounding box
        *  properties. Look at [link to demo page](link to demo page) for more information.
        * @method
        * @memberof Konva.Node.prototype
        * @param {Object} [config]
        * @param {Number} [config.x]
        * @param {Number} [config.y]
        * @param {Number} [config.width]
        * @param {Number} [config.height]
        * @param {Number} [config.offset]  increase canvas size by `offset` pixel in all directions.
        * @param {Boolean} [config.drawBorder] when set to true, a red border will be drawn around the cached
        *  region for debugging purposes
        * @param {Number} [config.pixelRatio] change quality (or pixel ratio) of cached image. pixelRatio = 2 will produce 2x sized cache.
        * @returns {Konva.Node}
        * @example
        * // cache a shape with the x,y position of the bounding box at the center and
        * // the width and height of the bounding box equal to the width and height of
        * // the shape obtained from shape.width() and shape.height()
        * image.cache();
        *
        * // cache a node and define the bounding box position and size
        * node.cache({
        *   x: -30,
        *   y: -30,
        *   width: 100,
        *   height: 200
        * });
        *
        * // cache a node and draw a red border around the bounding box
        * // for debugging purposes
        * node.cache({
        *   x: -30,
        *   y: -30,
        *   width: 100,
        *   height: 200,
        *   offset : 10,
        *   drawBorder: true
        * });
        */
    cache: function(config) {
      var conf = config || {},
        rect = this.getClientRect(true),
        width = conf.width || rect.width,
        height = conf.height || rect.height,
        pixelRatio = conf.pixelRatio,
        x = conf.x || rect.x,
        y = conf.y || rect.y,
        offset = conf.offset || 0,
        drawBorder = conf.drawBorder || false;

      if (!width || !height) {
        throw new Error('Width or height of caching configuration equals 0.');
      }

      width += offset * 2;
      height += offset * 2;

      x -= offset;
      y -= offset;

      var cachedSceneCanvas = new Konva.SceneCanvas({
        pixelRatio: pixelRatio,
        width: width,
        height: height
      }),
        cachedFilterCanvas = new Konva.SceneCanvas({
          pixelRatio: pixelRatio,
          width: width,
          height: height
        }),
        cachedHitCanvas = new Konva.HitCanvas({
          pixelRatio: 1,
          width: width,
          height: height
        }),
        sceneContext = cachedSceneCanvas.getContext(),
        hitContext = cachedHitCanvas.getContext();

      cachedHitCanvas.isCache = true;

      this.clearCache();

      sceneContext.save();
      hitContext.save();

      sceneContext.translate(-x, -y);
      hitContext.translate(-x, -y);

      // extra flag to skip on getAbsolute opacity calc
      this._isUnderCache = true;
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);

      this.drawScene(cachedSceneCanvas, this, true);
      this.drawHit(cachedHitCanvas, this, true);
      this._isUnderCache = false;

      sceneContext.restore();
      hitContext.restore();

      // this will draw a red border around the cached box for
      // debugging purposes
      if (drawBorder) {
        sceneContext.save();
        sceneContext.beginPath();
        sceneContext.rect(0, 0, width, height);
        sceneContext.closePath();
        sceneContext.setAttr('strokeStyle', 'red');
        sceneContext.setAttr('lineWidth', 5);
        sceneContext.stroke();
        sceneContext.restore();
      }

      this._cache.canvas = {
        scene: cachedSceneCanvas,
        filter: cachedFilterCanvas,
        hit: cachedHitCanvas,
        x: x,
        y: y
      };

      return this;
    },
    /**
         * Return client rectangle {x, y, width, height} of node. This rectangle also include all styling (strokes, shadows, etc).
         * The rectangle position is relative to parent container.
         * @method
         * @memberof Konva.Node.prototype
         * @param {Boolean} [skipTransform] flag should we skip transformation to rectangle
         * @returns {Object} rect with {x, y, width, height} properties
         * @example
         * var rect = new Konva.Rect({
         *      width : 100,
         *      height : 100,
         *      x : 50,
         *      y : 50,
         *      strokeWidth : 4,
         *      stroke : 'black',
         *      offsetX : 50,
         *      scaleY : 2
         * });
         *
         * // get client rect without think off transformations (position, rotation, scale, offset, etc)
         * rect.getClientRect(true);
         * // returns {
         * //     x : -2,   // two pixels for stroke / 2
         * //     y : -2,
         * //     width : 104, // increased by 4 for stroke
         * //     height : 104
         * //}
         *
         * // get client rect with transformation applied
         * rect.getClientRect();
         * // returns Object {x: -2, y: 46, width: 104, height: 208}
         */
    getClientRect: function() {
      // abstract method
      // redefine in Container and Shape
      throw new Error('abstract "getClientRect" method call');
    },
    _transformedRect: function(rect) {
      var points = [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height }
      ];
      var minX, minY, maxX, maxY;
      var trans = this.getTransform();
      points.forEach(function(point) {
        var transformed = trans.point(point);
        if (minX === undefined) {
          minX = maxX = transformed.x;
          minY = maxY = transformed.y;
        }
        minX = Math.min(minX, transformed.x);
        minY = Math.min(minY, transformed.y);
        maxX = Math.max(maxX, transformed.x);
        maxY = Math.max(maxY, transformed.y);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    },
    _drawCachedSceneCanvas: function(context) {
      context.save();
      context._applyOpacity(this);
      context._applyGlobalCompositeOperation(this);
      context.translate(this._cache.canvas.x, this._cache.canvas.y);

      var cacheCanvas = this._getCachedSceneCanvas();
      var ratio = cacheCanvas.pixelRatio;

      context.drawImage(
        cacheCanvas._canvas,
        0,
        0,
        cacheCanvas.width / ratio,
        cacheCanvas.height / ratio
      );
      context.restore();
    },
    _drawCachedHitCanvas: function(context) {
      var cachedCanvas = this._cache.canvas, hitCanvas = cachedCanvas.hit;
      context.save();
      context.translate(this._cache.canvas.x, this._cache.canvas.y);
      context.drawImage(hitCanvas._canvas, 0, 0);
      context.restore();
    },
    _getCachedSceneCanvas: function() {
      var filters = this.filters(),
        cachedCanvas = this._cache.canvas,
        sceneCanvas = cachedCanvas.scene,
        filterCanvas = cachedCanvas.filter,
        filterContext = filterCanvas.getContext(),
        len,
        imageData,
        n,
        filter;

      if (filters) {
        if (!this._filterUpToDate) {
          var ratio = sceneCanvas.pixelRatio;

          try {
            len = filters.length;
            filterContext.clear();

            // copy cached canvas onto filter context
            filterContext.drawImage(
              sceneCanvas._canvas,
              0,
              0,
              sceneCanvas.getWidth() / ratio,
              sceneCanvas.getHeight() / ratio
            );
            imageData = filterContext.getImageData(
              0,
              0,
              filterCanvas.getWidth(),
              filterCanvas.getHeight()
            );

            // apply filters to filter context
            for (n = 0; n < len; n++) {
              filter = filters[n];
              if (typeof filter !== 'function') {
                Konva.Util.error(
                  'Filter should be type of function, but got ' +
                    typeof filter +
                    ' insted. Please check correct filters'
                );
                continue;
              }
              filter.call(this, imageData);
              filterContext.putImageData(imageData, 0, 0);
            }
          } catch (e) {
            Konva.Util.error('Unable to apply filter. ' + e.message);
          }

          this._filterUpToDate = true;
        }

        return filterCanvas;
      }
      return sceneCanvas;
    },
    /**
         * bind events to the node. KonvaJS supports mouseover, mousemove,
         *  mouseout, mouseenter, mouseleave, mousedown, mouseup, wheel, click, dblclick, touchstart, touchmove,
         *  touchend, tap, dbltap, dragstart, dragmove, and dragend events. The Konva Stage supports
         *  contentMouseover, contentMousemove, contentMouseout, contentMousedown, contentMouseup, contentWheel, contentContextmenu
         *  contentClick, contentDblclick, contentTouchstart, contentTouchmove, contentTouchend, contentTap,
         *  and contentDblTap.  Pass in a string of events delimmited by a space to bind multiple events at once
         *  such as 'mousedown mouseup mousemove'. Include a namespace to bind an
         *  event by name such as 'click.foobar'.
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', 'mousedown.foo touchstart.foo'
         * @param {Function} handler The handler function is passed an event object
         * @returns {Konva.Node}
         * @example
         * // add click listener
         * node.on('click', function() {
         *   console.log('you clicked me!');
         * });
         *
         * // get the target node
         * node.on('click', function(evt) {
         *   console.log(evt.target);
         * });
         *
         * // stop event propagation
         * node.on('click', function(evt) {
         *   evt.cancelBubble = true;
         * });
         *
         * // bind multiple listeners
         * node.on('click touchstart', function() {
         *   console.log('you clicked/touched me!');
         * });
         *
         * // namespace listener
         * node.on('click.foo', function() {
         *   console.log('you clicked/touched me!');
         * });
         *
         * // get the event type
         * node.on('click tap', function(evt) {
         *   var eventType = evt.type;
         * });
         *
         * // get native event object
         * node.on('click tap', function(evt) {
         *   var nativeEvent = evt.evt;
         * });
         *
         * // for change events, get the old and new val
         * node.on('xChange', function(evt) {
         *   var oldVal = evt.oldVal;
         *   var newVal = evt.newVal;
         * });
         *
         * // get event targets
         * // with event delegations
         * layer.on('click', 'Group', function(evt) {
         *   var shape = evt.target;
         *   var group = evtn.currentTarger;
         * });
         */
    on: function(evtStr, handler) {
      if (arguments.length === 3) {
        return this._delegate.apply(this, arguments);
      }
      var events = evtStr.split(SPACE),
        len = events.length,
        n,
        event,
        parts,
        baseEvent,
        name;

      /*
             * loop through types and attach event listeners to
             * each one.  eg. 'click mouseover.namespace mouseout'
             * will create three event bindings
             */
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(DOT);
        baseEvent = parts[0];
        name = parts[1] || EMPTY_STRING;

        // create events array if it doesn't exist
        if (!this.eventListeners[baseEvent]) {
          this.eventListeners[baseEvent] = [];
        }

        this.eventListeners[baseEvent].push({
          name: name,
          handler: handler
        });
      }

      return this;
    },
    /**
         * remove event bindings from the node. Pass in a string of
         *  event types delimmited by a space to remove multiple event
         *  bindings at once such as 'mousedown mouseup mousemove'.
         *  include a namespace to remove an event binding by name
         *  such as 'click.foobar'. If you only give a name like '.foobar',
         *  all events in that namespace will be removed.
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} evtStr e.g. 'click', 'mousedown touchstart', '.foobar'
         * @returns {Konva.Node}
         * @example
         * // remove listener
         * node.off('click');
         *
         * // remove multiple listeners
         * node.off('click touchstart');
         *
         * // remove listener by name
         * node.off('click.foo');
         */
    off: function(evtStr) {
      var events = (evtStr || '').split(SPACE),
        len = events.length,
        n,
        t,
        event,
        parts,
        baseEvent,
        name;

      if (!evtStr) {
        // remove all events
        for (t in this.eventListeners) {
          this._off(t);
        }
      }
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(DOT);
        baseEvent = parts[0];
        name = parts[1];

        if (baseEvent) {
          if (this.eventListeners[baseEvent]) {
            this._off(baseEvent, name);
          }
        } else {
          for (t in this.eventListeners) {
            this._off(t, name);
          }
        }
      }
      return this;
    },
    // some event aliases for third party integration like HammerJS
    dispatchEvent: function(evt) {
      var e = {
        target: this,
        type: evt.type,
        evt: evt
      };
      this.fire(evt.type, e);
      return this;
    },
    addEventListener: function(type, handler) {
      // we have to pass native event to handler
      this.on(type, function(evt) {
        handler.call(this, evt.evt);
      });
      return this;
    },
    removeEventListener: function(type) {
      this.off(type);
      return this;
    },
    // like node.on
    _delegate: function(event, selector, handler) {
      var stopNode = this;
      this.on(event, function(evt) {
        var targets = evt.target.findAncestors(selector, true, stopNode);
        for (var i = 0; i < targets.length; i++) {
          evt = Konva.Util.cloneObject(evt);
          evt.currentTarget = targets[i];
          handler.call(targets[i], evt);
        }
      });
    },
    /**
         * remove self from parent, but don't destroy
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Node}
         * @example
         * node.remove();
         */
    remove: function() {
      var parent = this.getParent();

      if (parent && parent.children) {
        parent.children.splice(this.index, 1);
        parent._setChildrenIndices();
        delete this.parent;
      }

      // every cached attr that is calculated via node tree
      // traversal must be cleared when removing a node
      this._clearSelfAndDescendantCache(STAGE);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      this._clearSelfAndDescendantCache(VISIBLE);
      this._clearSelfAndDescendantCache(LISTENING);
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);

      return this;
    },
    /**
         * remove and destroy self
         * @method
         * @memberof Konva.Node.prototype
         * @example
         * node.destroy();
         */
    destroy: function() {
      // remove from ids and names hashes
      Konva._removeId(this.getId());

      // remove all names
      var names = (this.getName() || '').split(/\s/g);
      for (var i = 0; i < names.length; i++) {
        var subname = names[i];
        Konva._removeName(subname, this._id);
      }

      this.remove();
      return this;
    },
    /**
         * get attr
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} attr
         * @returns {Integer|String|Object|Array}
         * @example
         * var x = node.getAttr('x');
         */
    getAttr: function(attr) {
      var method = GET + Konva.Util._capitalize(attr);
      if (Konva.Util._isFunction(this[method])) {
        return this[method]();
      }
      // otherwise get directly
      return this.attrs[attr];
    },
    /**
        * get ancestors
        * @method
        * @memberof Konva.Node.prototype
        * @returns {Konva.Collection}
        * @example
        * shape.getAncestors().each(function(node) {
        *   console.log(node.getId());
        * })
        */
    getAncestors: function() {
      var parent = this.getParent(), ancestors = new Konva.Collection();

      while (parent) {
        ancestors.push(parent);
        parent = parent.getParent();
      }

      return ancestors;
    },
    /**
         * get attrs object literal
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Object}
         */
    getAttrs: function() {
      return this.attrs || {};
    },
    /**
         * set multiple attrs at once using an object literal
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} config object containing key value pairs
         * @returns {Konva.Node}
         * @example
         * node.setAttrs({
         *   x: 5,
         *   fill: 'red'
         * });
         */
    setAttrs: function(config) {
      var key, method;

      if (!config) {
        return this;
      }
      for (key in config) {
        if (key === CHILDREN) {
          continue;
        }
        method = SET + Konva.Util._capitalize(key);
        // use setter if available
        if (Konva.Util._isFunction(this[method])) {
          this[method](config[key]);
        } else {
          // otherwise set directly
          this._setAttr(key, config[key]);
        }
      }
      return this;
    },
    /**
         * determine if node is listening for events by taking into account ancestors.
         *
         * Parent    | Self      | isListening
         * listening | listening |
         * ----------+-----------+------------
         * T         | T         | T
         * T         | F         | F
         * F         | T         | T
         * F         | F         | F
         * ----------+-----------+------------
         * T         | I         | T
         * F         | I         | F
         * I         | I         | T
         *
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    isListening: function() {
      return this._getCache(LISTENING, this._isListening);
    },
    _isListening: function() {
      var listening = this.getListening(), parent = this.getParent();

      // the following conditions are a simplification of the truth table above.
      // please modify carefully
      if (listening === 'inherit') {
        if (parent) {
          return parent.isListening();
        } else {
          return true;
        }
      } else {
        return listening;
      }
    },
    /**
         * determine if node is visible by taking into account ancestors.
         *
         * Parent    | Self      | isVisible
         * visible   | visible   |
         * ----------+-----------+------------
         * T         | T         | T
         * T         | F         | F
         * F         | T         | T
         * F         | F         | F
         * ----------+-----------+------------
         * T         | I         | T
         * F         | I         | F
         * I         | I         | T

         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    isVisible: function() {
      return this._getCache(VISIBLE, this._isVisible);
    },
    _isVisible: function() {
      var visible = this.getVisible(), parent = this.getParent();

      // the following conditions are a simplification of the truth table above.
      // please modify carefully
      if (visible === 'inherit') {
        if (parent) {
          return parent.isVisible();
        } else {
          return true;
        }
      } else {
        return visible;
      }
    },
    /**
         * determine if listening is enabled by taking into account descendants.  If self or any children
         * have _isListeningEnabled set to true, then self also has listening enabled.
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    shouldDrawHit: function(canvas) {
      var layer = this.getLayer();
      return (canvas && canvas.isCache) ||
        (layer &&
          layer.hitGraphEnabled() &&
          this.isListening() &&
          this.isVisible());
    },
    /**
         * show node
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Node}
         */
    show: function() {
      this.setVisible(true);
      return this;
    },
    /**
         * hide node.  Hidden nodes are no longer detectable
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Node}
         */
    hide: function() {
      this.setVisible(false);
      return this;
    },
    /**
         * get zIndex relative to the node's siblings who share the same parent
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Integer}
         */
    getZIndex: function() {
      return this.index || 0;
    },
    /**
         * get absolute z-index which takes into account sibling
         *  and ancestor indices
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Integer}
         */
    getAbsoluteZIndex: function() {
      var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;

      function addChildren(children) {
        nodes = [];
        len = children.length;
        for (n = 0; n < len; n++) {
          child = children[n];
          index++;

          if (child.nodeType !== SHAPE) {
            nodes = nodes.concat(child.getChildren().toArray());
          }

          if (child._id === that._id) {
            n = len;
          }
        }

        if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
          addChildren(nodes);
        }
      }
      if (that.nodeType !== UPPER_STAGE) {
        addChildren(that.getStage().getChildren());
      }

      return index;
    },
    /**
         * get node depth in node tree.  Returns an integer.
         *  e.g. Stage depth will always be 0.  Layers will always be 1.  Groups and Shapes will always
         *  be >= 2
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Integer}
         */
    getDepth: function() {
      var depth = 0, parent = this.parent;

      while (parent) {
        depth++;
        parent = parent.parent;
      }
      return depth;
    },
    setPosition: function(pos) {
      this.setX(pos.x);
      this.setY(pos.y);
      return this;
    },
    getPosition: function() {
      return {
        x: this.getX(),
        y: this.getY()
      };
    },
    /**
         * get absolute position relative to the top left corner of the stage container div
         * or relative to passed node
         * @method
         * @param {Object} [top] optional parent node
         * @memberof Konva.Node.prototype
         * @returns {Object}
         */
    getAbsolutePosition: function(top) {
      var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(),
        absoluteTransform = new Konva.Transform(),
        offset = this.offset();

      // clone the matrix array
      absoluteTransform.m = absoluteMatrix.slice();
      absoluteTransform.translate(offset.x, offset.y);

      return absoluteTransform.getTranslation();
    },
    /**
         * set absolute position
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} pos
         * @param {Number} pos.x
         * @param {Number} pos.y
         * @returns {Konva.Node}
         */
    setAbsolutePosition: function(pos) {
      var origTrans = this._clearTransform(), it;

      // don't clear translation
      this.attrs.x = origTrans.x;
      this.attrs.y = origTrans.y;
      delete origTrans.x;
      delete origTrans.y;

      // unravel transform
      it = this.getAbsoluteTransform();

      it.invert();
      it.translate(pos.x, pos.y);
      pos = {
        x: this.attrs.x + it.getTranslation().x,
        y: this.attrs.y + it.getTranslation().y
      };

      this.setPosition({ x: pos.x, y: pos.y });
      this._setTransform(origTrans);

      return this;
    },
    _setTransform: function(trans) {
      var key;

      for (key in trans) {
        this.attrs[key] = trans[key];
      }

      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    },
    _clearTransform: function() {
      var trans = {
        x: this.getX(),
        y: this.getY(),
        rotation: this.getRotation(),
        scaleX: this.getScaleX(),
        scaleY: this.getScaleY(),
        offsetX: this.getOffsetX(),
        offsetY: this.getOffsetY(),
        skewX: this.getSkewX(),
        skewY: this.getSkewY()
      };

      this.attrs.x = 0;
      this.attrs.y = 0;
      this.attrs.rotation = 0;
      this.attrs.scaleX = 1;
      this.attrs.scaleY = 1;
      this.attrs.offsetX = 0;
      this.attrs.offsetY = 0;
      this.attrs.skewX = 0;
      this.attrs.skewY = 0;

      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);

      // return original transform
      return trans;
    },
    /**
         * move node by an amount relative to its current position
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} change
         * @param {Number} change.x
         * @param {Number} change.y
         * @returns {Konva.Node}
         * @example
         * // move node in x direction by 1px and y direction by 2px
         * node.move({
         *   x: 1,
         *   y: 2)
         * });
         */
    move: function(change) {
      var changeX = change.x,
        changeY = change.y,
        x = this.getX(),
        y = this.getY();

      if (changeX !== undefined) {
        x += changeX;
      }

      if (changeY !== undefined) {
        y += changeY;
      }

      this.setPosition({ x: x, y: y });
      return this;
    },
    _eachAncestorReverse: function(func, top) {
      var family = [], parent = this.getParent(), len, n;

      // if top node is defined, and this node is top node,
      // there's no need to build a family tree.  just execute
      // func with this because it will be the only node
      if (top && top._id === this._id) {
        func(this);
        return true;
      }

      family.unshift(this);

      while (parent && (!top || parent._id !== top._id)) {
        family.unshift(parent);
        parent = parent.parent;
      }

      len = family.length;
      for (n = 0; n < len; n++) {
        func(family[n]);
      }
    },
    /**
         * rotate node by an amount in degrees relative to its current rotation
         * @method
         * @memberof Konva.Node.prototype
         * @param {Number} theta
         * @returns {Konva.Node}
         */
    rotate: function(theta) {
      this.setRotation(this.getRotation() + theta);
      return this;
    },
    /**
         * move node to the top of its siblings
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    moveToTop: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveToTop function is ignored.');
        return false;
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.push(this);
      this.parent._setChildrenIndices();
      return true;
    },
    /**
         * move node up
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean} flag is moved or not
         */
    moveUp: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveUp function is ignored.');
        return false;
      }
      var index = this.index, len = this.parent.getChildren().length;
      if (index < len - 1) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index + 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
         * move node down
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    moveDown: function() {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. moveDown function is ignored.');
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index - 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
         * move node to the bottom of its siblings
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Boolean}
         */
    moveToBottom: function() {
      if (!this.parent) {
        Konva.Util.warn(
          'Node has no parent. moveToBottom function is ignored.'
        );
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.unshift(this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    },
    /**
         * set zIndex relative to siblings
         * @method
         * @memberof Konva.Node.prototype
         * @param {Integer} zIndex
         * @returns {Konva.Node}
         */
    setZIndex: function(zIndex) {
      if (!this.parent) {
        Konva.Util.warn('Node has no parent. zIndex parameter is ignored.');
        return false;
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.splice(zIndex, 0, this);
      this.parent._setChildrenIndices();
      return this;
    },
    /**
         * get absolute opacity
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Number}
         */
    getAbsoluteOpacity: function() {
      return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    },
    _getAbsoluteOpacity: function() {
      var absOpacity = this.getOpacity();
      var parent = this.getParent();
      if (parent && !parent._isUnderCache) {
        absOpacity *= this.getParent().getAbsoluteOpacity();
      }
      return absOpacity;
    },
    /**
         * move node to another container
         * @method
         * @memberof Konva.Node.prototype
         * @param {Container} newContainer
         * @returns {Konva.Node}
         * @example
         * // move node from current layer into layer2
         * node.moveTo(layer2);
         */
    moveTo: function(newContainer) {
      // do nothing if new container is already parent
      if (this.getParent() !== newContainer) {
        // this.remove my be overrided by drag and drop
        // buy we need original
        (this.__originalRemove || this.remove).call(this);
        newContainer.add(this);
      }
      return this;
    },
    /**
         * convert Node into an object for serialization.  Returns an object.
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Object}
         */
    toObject: function() {
      var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue;

      obj.attrs = {};

      for (key in attrs) {
        val = attrs[key];
        getter = this[key];
        // remove attr value so that we can extract the default value from the getter
        delete attrs[key];
        defaultValue = getter ? getter.call(this) : null;
        // restore attr value
        attrs[key] = val;
        if (defaultValue !== val) {
          obj.attrs[key] = val;
        }
      }

      obj.className = this.getClassName();
      return Konva.Util._prepareToStringify(obj);
    },
    /**
         * convert Node into a JSON string.  Returns a JSON string.
         * @method
         * @memberof Konva.Node.prototype
         * @returns {String}}
         */
    toJSON: function() {
      return JSON.stringify(this.toObject());
    },
    /**
         * get parent container
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Node}
         */
    getParent: function() {
      return this.parent;
    },
    /**
         * get all ancestros (parent then parent of the parent, etc) of the node
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} [selector] selector for search
         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
         * @returns {Array} [ancestors]
         * @example
         * // get one of the parent group
         * var parentGroups = node.findAncestors('Group');
         */
    findAncestors: function(selector, includeSelf, stopNode) {
      var res = [];

      if (includeSelf && this._isMatch(selector)) {
        res.push(this);
      }
      var ancestor = this.parent;
      while (ancestor) {
        if (ancestor === stopNode) {
          return res;
        }
        if (ancestor._isMatch(selector)) {
          res.push(ancestor);
        }
        ancestor = ancestor.parent;
      }
      return res;
    },
    /**
         * get ancestor (parent or parent of the parent, etc) of the node that match passed selector
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} [selector] selector for search
         * @param {Boolean} [includeSelf] show we think that node is ancestro itself?
         * @param {Konva.Node} [stopNode] optional node where we need to stop searching (one of ancestors)
         * @returns {Konva.Node} ancestor
         * @example
         * // get one of the parent group
         * var group = node.findAncestors('.mygroup');
         */
    findAncestor: function(selector, includeSelf, stopNode) {
      return this.findAncestors(selector, includeSelf, stopNode)[0];
    },
    // is current node match passed selector?
    _isMatch: function(selector) {
      if (!selector) {
        return false;
      }
      var selectorArr = selector.replace(/ /g, '').split(','),
        len = selectorArr.length,
        n,
        sel;

      for (n = 0; n < len; n++) {
        sel = selectorArr[n];
        if (!Konva.Util.isValidSelector(sel)) {
          Konva.Util.warn(
            'Selector "' +
              sel +
              '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
          );
          Konva.Util.warn(
            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
          );
          Konva.Util.warn('Konva is awesome, right?');
        }
        // id selector
        if (sel.charAt(0) === '#') {
          if (this.id() === sel.slice(1)) {
            return true;
          }
        } else if (sel.charAt(0) === '.') {
          // name selector
          if (this.hasName(sel.slice(1))) {
            return true;
          }
        } else if (this._get(sel).length !== 0) {
          return true;
        }
      }
      return false;
    },
    /**
         * get layer ancestor
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Layer}
         */
    getLayer: function() {
      var parent = this.getParent();
      return parent ? parent.getLayer() : null;
    },
    /**
         * get stage ancestor
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Stage}
         */
    getStage: function() {
      return this._getCache(STAGE, this._getStage);
    },
    _getStage: function() {
      var parent = this.getParent();
      if (parent) {
        return parent.getStage();
      } else {
        return undefined;
      }
    },
    /**
         * fire event
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} eventType event type.  can be a regular event, like click, mouseover, or mouseout, or it can be a custom event, like myCustomEvent
         * @param {Event} [evt] event object
         * @param {Boolean} [bubble] setting the value to false, or leaving it undefined, will result in the event
         *  not bubbling.  Setting the value to true will result in the event bubbling.
         * @returns {Konva.Node}
         * @example
         * // manually fire click event
         * node.fire('click');
         *
         * // fire custom event
         * node.fire('foo');
         *
         * // fire custom event with custom event object
         * node.fire('foo', {
         *   bar: 10
         * });
         *
         * // fire click event that bubbles
         * node.fire('click', null, true);
         */
    fire: function(eventType, evt, bubble) {
      evt = evt || {};
      evt.target = evt.target || this;
      // bubble
      if (bubble) {
        this._fireAndBubble(eventType, evt);
      } else {
        // no bubble
        this._fire(eventType, evt);
      }
      return this;
    },
    /**
         * get absolute transform of the node which takes into
         *  account its ancestor transforms
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Transform}
         */
    getAbsoluteTransform: function(top) {
      // if using an argument, we can't cache the result.
      if (top) {
        return this._getAbsoluteTransform(top);
      } else {
        // if no argument, we can cache the result
        return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
      }
    },
    _getAbsoluteTransform: function(top) {
      var at = new Konva.Transform(), transformsEnabled, trans;

      // start with stage and traverse downwards to self
      this._eachAncestorReverse(
        function(node) {
          transformsEnabled = node.transformsEnabled();
          trans = node.getTransform();

          if (transformsEnabled === 'all') {
            at.multiply(trans);
          } else if (transformsEnabled === 'position') {
            at.translate(node.x(), node.y());
          }
        },
        top
      );
      return at;
    },
    /**
         * get absolute scale of the node which takes into
         *  account its ancestor scales
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Transform}
         */
    getAbsoluteScale: function(top) {
      // if using an argument, we can't cache the result.
      if (top) {
        return this._getAbsoluteTransform(top);
      } else {
        // if no argument, we can cache the result
        return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
      }
    },
    _getAbsoluteScale: function(top) {
      // this is special logic for caching with some shapes with shadow
      var parent = this;
      while (parent) {
        if (parent._isUnderCache) {
          top = parent;
        }
        parent = parent.getParent();
      }

      var scaleX = 1, scaleY = 1;

      // start with stage and traverse downwards to self
      this._eachAncestorReverse(
        function(node) {
          scaleX *= node.scaleX();
          scaleY *= node.scaleY();
        },
        top
      );
      return {
        x: scaleX,
        y: scaleY
      };
    },
    /**
         * get transform of the node
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Transform}
         */
    getTransform: function() {
      return this._getCache(TRANSFORM, this._getTransform);
    },
    _getTransform: function() {
      var m = new Konva.Transform(),
        x = this.getX(),
        y = this.getY(),
        rotation = Konva.getAngle(this.getRotation()),
        scaleX = this.getScaleX(),
        scaleY = this.getScaleY(),
        skewX = this.getSkewX(),
        skewY = this.getSkewY(),
        offsetX = this.getOffsetX(),
        offsetY = this.getOffsetY();

      if (x !== 0 || y !== 0) {
        m.translate(x, y);
      }
      if (rotation !== 0) {
        m.rotate(rotation);
      }
      if (skewX !== 0 || skewY !== 0) {
        m.skew(skewX, skewY);
      }
      if (scaleX !== 1 || scaleY !== 1) {
        m.scale(scaleX, scaleY);
      }
      if (offsetX !== 0 || offsetY !== 0) {
        m.translate((-1) * offsetX, (-1) * offsetY);
      }

      return m;
    },
    /**
         * clone node.  Returns a new Node instance with identical attributes.  You can also override
         *  the node properties with an object literal, enabling you to use an existing node as a template
         *  for another node
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} obj override attrs
         * @returns {Konva.Node}
         * @example
         * // simple clone
         * var clone = node.clone();
         *
         * // clone a node and override the x position
         * var clone = rect.clone({
         *   x: 5
         * });
         */
    clone: function(obj) {
      // instantiate new node
      var attrs = Konva.Util.cloneObject(this.attrs),
        key,
        allListeners,
        len,
        n,
        listener;
      // filter black attrs
      for (var i in CLONE_BLACK_LIST) {
        var blockAttr = CLONE_BLACK_LIST[i];
        delete attrs[blockAttr];
      }
      // apply attr overrides
      for (key in obj) {
        attrs[key] = obj[key];
      }

      var node = new this.constructor(attrs);
      // copy over listeners
      for (key in this.eventListeners) {
        allListeners = this.eventListeners[key];
        len = allListeners.length;
        for (n = 0; n < len; n++) {
          listener = allListeners[n];
          /*
                     * don't include konva namespaced listeners because
                     *  these are generated by the constructors
                     */
          if (listener.name.indexOf(KONVA) < 0) {
            // if listeners array doesn't exist, then create it
            if (!node.eventListeners[key]) {
              node.eventListeners[key] = [];
            }
            node.eventListeners[key].push(listener);
          }
        }
      }
      return node;
    },
    _toKonvaCanvas: function(config) {
      config = config || {};

      var stage = this.getStage(),
        x = config.x || 0,
        y = config.y || 0,
        pixelRatio = config.pixelRatio || 1,
        canvas = new Konva.SceneCanvas({
          width: config.width ||
            this.getWidth() ||
            (stage ? stage.getWidth() : 0),
          height: config.height ||
            this.getHeight() ||
            (stage ? stage.getHeight() : 0),
          pixelRatio: pixelRatio
        }),
        context = canvas.getContext();

      context.save();

      if (x || y) {
        context.translate((-1) * x, (-1) * y);
      }

      this.drawScene(canvas);
      context.restore();

      return canvas;
    },
    /**
         * converts node into an canvas element.
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
         * @example
         * var canvas = node.toCanvas();
         */
    toCanvas: function(config) {
      return this._toKonvaCanvas(config)._canvas;
    },
    /**
         * Creates a composite data URL. If MIME type is not
         * specified, then "image/png" will result. For "image/jpeg", specify a quality
         * level as quality (range 0.0 - 1.0)
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} config
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image url. Default is 1
         * @returns {String}
         */
    toDataURL: function(config) {
      config = config || {};
      var mimeType = config.mimeType || null, quality = config.quality || null;
      return this._toKonvaCanvas(config).toDataURL(mimeType, quality);
    },
    /**
         * converts node into an image.  Since the toImage
         *  method is asynchronous, a callback is required.  toImage is most commonly used
         *  to cache complex drawings as an image so that they don't have to constantly be redrawn
         * @method
         * @memberof Konva.Node.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         * @paremt {Number} [config.pixelRatio] pixelRatio of ouput image.  Default is 1.
         * @example
         * var image = node.toImage({
         *   callback: function(img) {
         *     // do stuff with img
         *   }
         * });
         */
    toImage: function(config) {
      if (!config || !config.callback) {
        throw 'callback required for toImage method config argument';
      }
      Konva.Util._getImage(this.toDataURL(config), function(img) {
        config.callback(img);
      });
    },
    setSize: function(size) {
      this.setWidth(size.width);
      this.setHeight(size.height);
      return this;
    },
    getSize: function() {
      return {
        width: this.getWidth(),
        height: this.getHeight()
      };
    },
    getWidth: function() {
      return this.attrs.width || 0;
    },
    getHeight: function() {
      return this.attrs.height || 0;
    },
    /**
         * get class name, which may return Stage, Layer, Group, or shape class names like Rect, Circle, Text, etc.
         * @method
         * @memberof Konva.Node.prototype
         * @returns {String}
         */
    getClassName: function() {
      return this.className || this.nodeType;
    },
    /**
         * get the node type, which may return Stage, Layer, Group, or Node
         * @method
         * @memberof Konva.Node.prototype
         * @returns {String}
         */
    getType: function() {
      return this.nodeType;
    },
    getDragDistance: function() {
      // compare with undefined because we need to track 0 value
      if (this.attrs.dragDistance !== undefined) {
        return this.attrs.dragDistance;
      } else if (this.parent) {
        return this.parent.getDragDistance();
      } else {
        return Konva.dragDistance;
      }
    },
    _get: function(selector) {
      return this.className === selector || this.nodeType === selector
        ? [this]
        : [];
    },
    _off: function(type, name) {
      var evtListeners = this.eventListeners[type], i, evtName;

      for (i = 0; i < evtListeners.length; i++) {
        evtName = evtListeners[i].name;
        // the following two conditions must be true in order to remove a handler:
        // 1) the current event name cannot be konva unless the event name is konva
        //    this enables developers to force remove a konva specific listener for whatever reason
        // 2) an event name is not specified, or if one is specified, it matches the current event name
        if (
          (evtName !== 'konva' || name === 'konva') &&
          (!name || evtName === name)
        ) {
          evtListeners.splice(i, 1);
          if (evtListeners.length === 0) {
            delete this.eventListeners[type];
            break;
          }
          i--;
        }
      }
    },
    _fireChangeEvent: function(attr, oldVal, newVal) {
      this._fire(attr + CHANGE, {
        oldVal: oldVal,
        newVal: newVal
      });
    },
    setId: function(id) {
      var oldId = this.getId();

      Konva._removeId(oldId);
      Konva._addId(this, id);
      this._setAttr(ID, id);
      return this;
    },
    setName: function(name) {
      var oldNames = (this.getName() || '').split(/\s/g);
      var newNames = (name || '').split(/\s/g);
      var subname, i;
      // remove all subnames
      for (i = 0; i < oldNames.length; i++) {
        subname = oldNames[i];
        if (newNames.indexOf(subname) === -1 && subname) {
          Konva._removeName(subname, this._id);
        }
      }

      // add new names
      for (i = 0; i < newNames.length; i++) {
        subname = newNames[i];
        if (oldNames.indexOf(subname) === -1 && subname) {
          Konva._addName(this, subname);
        }
      }

      this._setAttr(NAME, name);
      return this;
    },
    // naming methods
    /**
         * add name to node
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} name
         * @returns {Konva.Node}
         * @example
         * node.name('red');
         * node.addName('selected');
         * node.name(); // return 'red selected'
         */
    addName: function(name) {
      if (!this.hasName(name)) {
        var oldName = this.name();
        var newName = oldName ? oldName + ' ' + name : name;
        this.setName(newName);
      }
      return this;
    },
    /**
         * check is node has name
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} name
         * @returns {Boolean}
         * @example
         * node.name('red');
         * node.hasName('red');   // return true
         * node.hasName('selected'); // return false
         */
    hasName: function(name) {
      var names = (this.name() || '').split(/\s/g);
      return names.indexOf(name) !== -1;
    },
    /**
         * remove name from node
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} name
         * @returns {Konva.Node}
         * @example
         * node.name('red selected');
         * node.removeName('selected');
         * node.hasName('selected'); // return false
         * node.name(); // return 'red'
         */
    removeName: function(name) {
      var names = (this.name() || '').split(/\s/g);
      var index = names.indexOf(name);
      if (index !== -1) {
        names.splice(index, 1);
        this.setName(names.join(' '));
      }
      return this;
    },
    /**
         * set attr
         * @method
         * @memberof Konva.Node.prototype
         * @param {String} attr
         * @param {*} val
         * @returns {Konva.Node}
         * @example
         * node.setAttr('x', 5);
         */
    setAttr: function(attr, val) {
      var method = SET + Konva.Util._capitalize(attr), func = this[method];

      if (Konva.Util._isFunction(func)) {
        func.call(this, val);
      } else {
        // otherwise set directly
        this._setAttr(attr, val);
      }
      return this;
    },
    _setAttr: function(key, val) {
      var oldVal;
      oldVal = this.attrs[key];
      if (oldVal === val) {
        return;
      }
      if (val === undefined || val === null) {
        delete this.attrs[key];
      } else {
        this.attrs[key] = val;
      }
      this._fireChangeEvent(key, oldVal, val);
    },
    _setComponentAttr: function(key, component, val) {
      var oldVal;
      if (val !== undefined) {
        oldVal = this.attrs[key];

        if (!oldVal) {
          // set value to default value using getAttr
          this.attrs[key] = this.getAttr(key);
        }

        this.attrs[key][component] = val;
        this._fireChangeEvent(key, oldVal, val);
      }
    },
    _fireAndBubble: function(eventType, evt, compareShape) {
      var okayToRun = true;

      if (evt && this.nodeType === SHAPE) {
        evt.target = this;
      }

      if (
        eventType === MOUSEENTER &&
        compareShape &&
        (this._id === compareShape._id ||
          (this.isAncestorOf && this.isAncestorOf(compareShape)))
      ) {
        okayToRun = false;
      } else if (
        eventType === MOUSELEAVE &&
        compareShape &&
        (this._id === compareShape._id ||
          (this.isAncestorOf && this.isAncestorOf(compareShape)))
      ) {
        okayToRun = false;
      }
      if (okayToRun) {
        this._fire(eventType, evt);

        // simulate event bubbling
        var stopBubble = (eventType === MOUSEENTER ||
          eventType === MOUSELEAVE) &&
          (compareShape &&
            compareShape.isAncestorOf &&
            compareShape.isAncestorOf(this) &&
            !compareShape.isAncestorOf(this.parent));
        if (
          ((evt && !evt.cancelBubble) || !evt) &&
          this.parent &&
          this.parent.isListening() &&
          !stopBubble
        ) {
          if (compareShape && compareShape.parent) {
            this._fireAndBubble.call(
              this.parent,
              eventType,
              evt,
              compareShape.parent
            );
          } else {
            this._fireAndBubble.call(this.parent, eventType, evt);
          }
        }
      }
    },
    _fire: function(eventType, evt) {
      var events = this.eventListeners[eventType], i;

      evt = evt || {};
      evt.currentTarget = this;
      evt.type = eventType;

      if (events) {
        for (i = 0; i < events.length; i++) {
          events[i].handler.call(this, evt);
        }
      }
    },
    /**
         * draw both scene and hit graphs.  If the node being drawn is the stage, all of the layers will be cleared and redrawn
         * @method
         * @memberof Konva.Node.prototype
         * @returns {Konva.Node}
         */
    draw: function() {
      this.drawScene();
      this.drawHit();
      return this;
    }
  });

  /**
     * create node with JSON string or an Object.  De-serializtion does not generate custom
     *  shape drawing functions, images, or event handlers (this would make the
     *  serialized object huge).  If your app uses custom shapes, images, and
     *  event handlers (it probably does), then you need to select the appropriate
     *  shapes after loading the stage and set these properties via on(), setDrawFunc(),
     *  and setImage() methods
     * @method
     * @memberof Konva.Node
     * @param {String|Object} json string or object
     * @param {Element} [container] optional container dom element used only if you're
     *  creating a stage node
     */
  Konva.Node.create = function(data, container) {
    if (Konva.Util._isString(data)) {
      data = JSON.parse(data);
    }
    return this._createNode(data, container);
  };
  Konva.Node._createNode = function(obj, container) {
    var className = Konva.Node.prototype.getClassName.call(obj),
      children = obj.children,
      no,
      len,
      n;

    // if container was passed in, add it to attrs
    if (container) {
      obj.attrs.container = container;
    }

    no = new Konva[className](obj.attrs);
    if (children) {
      len = children.length;
      for (n = 0; n < len; n++) {
        no.add(this._createNode(children[n]));
      }
    }

    return no;
  };

  // =========================== add getters setters ===========================

  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'position');
  /**
     * get/set node position relative to parent
     * @name position
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} pos
     * @param {Number} pos.x
     * @param {Number} pos.y
     * @returns {Object}
     * @example
     * // get position
     * var position = node.position();
     *
     * // set position
     * node.position({
     *   x: 5
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'x', 0);

  /**
     * get/set x position
     * @name x
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} x
     * @returns {Object}
     * @example
     * // get x
     * var x = node.x();
     *
     * // set x
     * node.x(5);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'y', 0);

  /**
     * get/set y position
     * @name y
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} y
     * @returns {Integer}
     * @example
     * // get y
     * var y = node.y();
     *
     * // set y
     * node.y(5);
     */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'globalCompositeOperation',
    'source-over'
  );

  /**
     * get/set globalCompositeOperation of a shape
     * @name globalCompositeOperation
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} blur
     * @returns {Number}
     * @example
     * // get shadow blur
     * var globalCompositeOperation = shape.globalCompositeOperation();
     *
     * // set shadow blur
     * shape.globalCompositeOperation('source-in');
     */
  Konva.Factory.addGetterSetter(Konva.Node, 'opacity', 1);

  /**
     * get/set opacity.  Opacity values range from 0 to 1.
     *  A node with an opacity of 0 is fully transparent, and a node
     *  with an opacity of 1 is fully opaque
     * @name opacity
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} opacity
     * @returns {Number}
     * @example
     * // get opacity
     * var opacity = node.opacity();
     *
     * // set opacity
     * node.opacity(0.5);
     */

  Konva.Factory.addGetter(Konva.Node, 'name');
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'name');

  /**
     * get/set name
     * @name name
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} name
     * @returns {String}
     * @example
     * // get name
     * var name = node.name();
     *
     * // set name
     * node.name('foo');
     *
     * // also node may have multiple names (as css classes)
     * node.name('foo bar');
     */

  Konva.Factory.addGetter(Konva.Node, 'id');
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'id');

  /**
     * get/set id. Id is global for whole page.
     * @name id
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} id
     * @returns {String}
     * @example
     * // get id
     * var name = node.id();
     *
     * // set id
     * node.id('foo');
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'rotation', 0);

  /**
     * get/set rotation in degrees
     * @name rotation
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} rotation
     * @returns {Number}
     * @example
     * // get rotation in degrees
     * var rotation = node.rotation();
     *
     * // set rotation in degrees
     * node.rotation(45);
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'scale', ['x', 'y']);

  /**
     * get/set scale
     * @name scale
     * @param {Object} scale
     * @param {Number} scale.x
     * @param {Number} scale.y
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Object}
     * @example
     * // get scale
     * var scale = node.scale();
     *
     * // set scale
     * shape.scale({
     *   x: 2
     *   y: 3
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'scaleX', 1);

  /**
     * get/set scale x
     * @name scaleX
     * @param {Number} x
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Number}
     * @example
     * // get scale x
     * var scaleX = node.scaleX();
     *
     * // set scale x
     * node.scaleX(2);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'scaleY', 1);

  /**
     * get/set scale y
     * @name scaleY
     * @param {Number} y
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Number}
     * @example
     * // get scale y
     * var scaleY = node.scaleY();
     *
     * // set scale y
     * node.scaleY(2);
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'skew', ['x', 'y']);

  /**
     * get/set skew
     * @name skew
     * @param {Object} skew
     * @param {Number} skew.x
     * @param {Number} skew.y
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Object}
     * @example
     * // get skew
     * var skew = node.skew();
     *
     * // set skew
     * node.skew({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'skewX', 0);

  /**
     * get/set skew x
     * @name skewX
     * @param {Number} x
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Number}
     * @example
     * // get skew x
     * var skewX = node.skewX();
     *
     * // set skew x
     * node.skewX(3);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'skewY', 0);

  /**
     * get/set skew y
     * @name skewY
     * @param {Number} y
     * @method
     * @memberof Konva.Node.prototype
     * @returns {Number}
     * @example
     * // get skew y
     * var skewY = node.skewY();
     *
     * // set skew y
     * node.skewY(3);
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Node, 'offset', ['x', 'y']);

  /**
     * get/set offset.  Offsets the default position and rotation point
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} offset
     * @param {Number} offset.x
     * @param {Number} offset.y
     * @returns {Object}
     * @example
     * // get offset
     * var offset = node.offset();
     *
     * // set offset
     * node.offset({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'offsetX', 0);

  /**
     * get/set offset x
     * @name offsetX
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get offset x
     * var offsetX = node.offsetX();
     *
     * // set offset x
     * node.offsetX(3);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'offsetY', 0);

  /**
     * get/set offset y
     * @name offsetY
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get offset y
     * var offsetY = node.offsetY();
     *
     * // set offset y
     * node.offsetY(3);
     */

  Konva.Factory.addSetter(Konva.Node, 'dragDistance');
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'dragDistance');

  /**
     * get/set drag distance
     * @name dragDistance
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} distance
     * @returns {Number}
     * @example
     * // get drag distance
     * var dragDistance = node.dragDistance();
     *
     * // set distance
     * // node starts dragging only if pointer moved more then 3 pixels
     * node.dragDistance(3);
     * // or set globally
     * Konva.dragDistance = 3;
     */

  Konva.Factory.addSetter(Konva.Node, 'width', 0);
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'width');
  /**
     * get/set width
     * @name width
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} width
     * @returns {Number}
     * @example
     * // get width
     * var width = node.width();
     *
     * // set width
     * node.width(100);
     */

  Konva.Factory.addSetter(Konva.Node, 'height', 0);
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'height');
  /**
     * get/set height
     * @name height
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} height
     * @returns {Number}
     * @example
     * // get height
     * var height = node.height();
     *
     * // set height
     * node.height(100);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'listening', 'inherit');
  /**
     * get/set listenig attr.  If you need to determine if a node is listening or not
     *   by taking into account its parents, use the isListening() method
     * @name listening
     * @method
     * @memberof Konva.Node.prototype
     * @param {Boolean|String} listening Can be "inherit", true, or false.  The default is "inherit".
     * @returns {Boolean|String}
     * @example
     * // get listening attr
     * var listening = node.listening();
     *
     * // stop listening for events
     * node.listening(false);
     *
     * // listen for events
     * node.listening(true);
     *
     * // listen to events according to the parent
     * node.listening('inherit');
     */

  /**
      * get/set preventDefault
      * By default all shapes will prevent default behaviour
      * of a browser on a pointer move or tap.
      * that will prevent native scrolling when you are trying to drag&drop a node
      * but sometimes you may need to enable default actions
      * in that case you can set the property to false
      * @name preventDefault
      * @method
      * @memberof Konva.Node.prototype
      * @param {Number} preventDefault
      * @returns {Number}
      * @example
      * // get preventDefault
      * var shouldPrevent = shape.preventDefault();
      *
      * // set preventDefault
      * shape.preventDefault(false);
      */

  Konva.Factory.addGetterSetter(Konva.Node, 'preventDefault', true);

  Konva.Factory.addGetterSetter(Konva.Node, 'filters', undefined, function(
    val
  ) {
    this._filterUpToDate = false;
    return val;
  });
  /**
     * get/set filters.  Filters are applied to cached canvases
     * @name filters
     * @method
     * @memberof Konva.Node.prototype
     * @param {Array} filters array of filters
     * @returns {Array}
     * @example
     * // get filters
     * var filters = node.filters();
     *
     * // set a single filter
     * node.cache();
     * node.filters([Konva.Filters.Blur]);
     *
     * // set multiple filters
     * node.cache();
     * node.filters([
     *   Konva.Filters.Blur,
     *   Konva.Filters.Sepia,
     *   Konva.Filters.Invert
     * ]);
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'visible', 'inherit');
  /**
     * get/set visible attr.  Can be "inherit", true, or false.  The default is "inherit".
     *   If you need to determine if a node is visible or not
     *   by taking into account its parents, use the isVisible() method
     * @name visible
     * @method
     * @memberof Konva.Node.prototype
     * @param {Boolean|String} visible
     * @returns {Boolean|String}
     * @example
     * // get visible attr
     * var visible = node.visible();
     *
     * // make invisible
     * node.visible(false);
     *
     * // make visible
     * node.visible(true);
     *
     * // make visible according to the parent
     * node.visible('inherit');
     */

  Konva.Factory.addGetterSetter(Konva.Node, 'transformsEnabled', 'all');

  /**
     * get/set transforms that are enabled.  Can be "all", "none", or "position".  The default
     *  is "all"
     * @name transformsEnabled
     * @method
     * @memberof Konva.Node.prototype
     * @param {String} enabled
     * @returns {String}
     * @example
     * // enable position transform only to improve draw performance
     * node.transformsEnabled('position');
     *
     * // enable all transforms
     * node.transformsEnabled('all');
     */

  /**
     * get/set node size
     * @name size
     * @method
     * @memberof Konva.Node.prototype
     * @param {Object} size
     * @param {Number} size.width
     * @param {Number} size.height
     * @returns {Object}
     * @example
     * // get node size
     * var size = node.size();
     * var x = size.x;
     * var y = size.y;
     *
     * // set size
     * node.size({
     *   width: 100,
     *   height: 200
     * });
     */
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'size');

  Konva.Factory.backCompat(Konva.Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
  });

  Konva.Collection.mapMethods(Konva.Node);
})(Konva);

(function() {
  'use strict';
  /**
    * Grayscale Filter
    * @function
    * @memberof Konva.Filters
    * @param {Object} imageData
    * @example
    * node.cache();
    * node.filters([Konva.Filters.Grayscale]);
    */
  Konva.Filters.Grayscale = function(imageData) {
    var data = imageData.data, len = data.length, i, brightness;

    for (i = 0; i < len; i += 4) {
      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }
  };
})();

(function() {
  'use strict';
  /**
     * Brighten Filter.
     * @function
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Brighten]);
     * node.brightness(0.8);
     */
  Konva.Filters.Brighten = function(imageData) {
    var brightness = this.brightness() * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] += brightness;
      // green
      data[i + 1] += brightness;
      // blue
      data[i + 2] += brightness;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'brightness',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set filter brightness.  The brightness is a number between -1 and 1.&nbsp; Positive values
    *  brighten the pixels and negative values darken them. Use with {@link Konva.Filters.Brighten} filter.
    * @name brightness
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} brightness value between -1 and 1
    * @returns {Number}
    */
})();

(function() {
  'use strict';
  /**
    * Invert Filter
    * @function
    * @memberof Konva.Filters
    * @param {Object} imageData
    * @example
    * node.cache();
    * node.filters([Konva.Filters.Invert]);
    */
  Konva.Filters.Invert = function(imageData) {
    var data = imageData.data, len = data.length, i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] = 255 - data[i];
      // green
      data[i + 1] = 255 - data[i + 1];
      // blue
      data[i + 2] = 255 - data[i + 2];
    }
  };
})();

/*
 the Gauss filter
 master repo: https://github.com/pavelpower/kineticjsGaussFilter
*/
(function() {
  'use strict';
  /*

     StackBlur - a fast almost Gaussian Blur For Canvas

     Version:   0.5
     Author:    Mario Klingemann
     Contact:   mario@quasimondo.com
     Website:   http://www.quasimondo.com/StackBlurForCanvas
     Twitter:   @quasimondo

     In case you find this class useful - especially in commercial projects -
     I am not totally unhappy for a small donation to my PayPal account
     mario@quasimondo.de

     Or support me on flattr:
     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

     Copyright (c) 2010 Mario Klingemann

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.
     */

  function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  }

  var mul_table = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
  ];

  var shg_table = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
  ];

  function filterGaussBlurRGBA(imageData, radius) {
    var pixels = imageData.data,
      width = imageData.width,
      height = imageData.height;

    var x,
      y,
      i,
      p,
      yp,
      yi,
      yw,
      r_sum,
      g_sum,
      b_sum,
      a_sum,
      r_out_sum,
      g_out_sum,
      b_out_sum,
      a_out_sum,
      r_in_sum,
      g_in_sum,
      b_in_sum,
      a_in_sum,
      pr,
      pg,
      pb,
      pa,
      rbs;

    var div = radius + radius + 1,
      widthMinus1 = width - 1,
      heightMinus1 = height - 1,
      radiusPlus1 = radius + 1,
      sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2,
      stackStart = new BlurStack(),
      stackEnd = null,
      stack = stackStart,
      stackIn = null,
      stackOut = null,
      mul_sum = mul_table[radius],
      shg_sum = shg_table[radius];

    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();
      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }

    stack.next = stackStart;

    yw = yi = 0;

    for (y = 0; y < height; y++) {
      r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;

        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;
      for (x = 0; x < width; x++) {
        pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
        if (pa !== 0) {
          pa = 255 / pa;
          pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;

        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;

        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

        r_in_sum += stackIn.r = pixels[p];
        g_in_sum += stackIn.g = pixels[p + 1];
        b_in_sum += stackIn.b = pixels[p + 2];
        a_in_sum += stackIn.a = pixels[p + 3];

        r_sum += r_in_sum;
        g_sum += g_in_sum;
        b_sum += b_in_sum;
        a_sum += a_in_sum;

        stackIn = stackIn.next;

        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;

        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;

        stackOut = stackOut.next;

        yi += 4;
      }
      yw += width;
    }

    for (x = 0; x < width; x++) {
      g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

      yi = x << 2;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      yp = width;

      for (i = 1; i <= radius; i++) {
        yi = yp + x << 2;

        r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;

        stack = stack.next;

        if (i < heightMinus1) {
          yp += width;
        }
      }

      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;
      for (y = 0; y < height; y++) {
        p = yi << 2;
        pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
        if (pa > 0) {
          pa = 255 / pa;
          pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;

        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;

        p = x +
          ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width <<
          2;

        r_sum += r_in_sum += stackIn.r = pixels[p];
        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
        a_sum += a_in_sum += stackIn.a = pixels[p + 3];

        stackIn = stackIn.next;

        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;

        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;

        stackOut = stackOut.next;

        yi += width;
      }
    }
  }

  /**
     * Blur Filter
     * @function
     * @name Blur
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Blur]);
     * node.blurRadius(10);
     */
  Konva.Filters.Blur = function Blur(imageData) {
    var radius = Math.round(this.blurRadius());

    if (radius > 0) {
      filterGaussBlurRGBA(imageData, radius);
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blurRadius',
    0,
    null,
    Konva.Factory.afterSetFilter
  );

  /**
    * get/set blur radius. Use with {@link Konva.Filters.Blur} filter
    * @name blurRadius
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} radius
    * @returns {Integer}
    */
})();

/*eslint-disable  max-depth */
(function() {
  'use strict';
  function pixelAt(idata, x, y) {
    var idx = (y * idata.width + x) * 4;
    var d = [];
    d.push(
      idata.data[idx++],
      idata.data[idx++],
      idata.data[idx++],
      idata.data[idx++]
    );
    return d;
  }

  function rgbDistance(p1, p2) {
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
        Math.pow(p1[1] - p2[1], 2) +
        Math.pow(p1[2] - p2[2], 2)
    );
  }

  function rgbMean(pTab) {
    var m = [0, 0, 0];

    for (var i = 0; i < pTab.length; i++) {
      m[0] += pTab[i][0];
      m[1] += pTab[i][1];
      m[2] += pTab[i][2];
    }

    m[0] /= pTab.length;
    m[1] /= pTab.length;
    m[2] /= pTab.length;

    return m;
  }

  function backgroundMask(idata, threshold) {
    var rgbv_no = pixelAt(idata, 0, 0);
    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);

    var thres = threshold || 10;
    if (
      rgbDistance(rgbv_no, rgbv_ne) < thres &&
      rgbDistance(rgbv_ne, rgbv_se) < thres &&
      rgbDistance(rgbv_se, rgbv_so) < thres &&
      rgbDistance(rgbv_so, rgbv_no) < thres
    ) {
      // Mean color
      var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

      // Mask based on color distance
      var mask = [];
      for (var i = 0; i < idata.width * idata.height; i++) {
        var d = rgbDistance(mean, [
          idata.data[i * 4],
          idata.data[i * 4 + 1],
          idata.data[i * 4 + 2]
        ]);
        mask[i] = d < thres ? 0 : 255;
      }

      return mask;
    }
  }

  function applyMask(idata, mask) {
    for (var i = 0; i < idata.width * idata.height; i++) {
      idata.data[4 * i + 3] = mask[i];
    }
  }

  function erodeMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a === 255 * 8 ? 255 : 0;
      }
    }

    return maskResult;
  }

  function dilateMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a >= 255 * 4 ? 255 : 0;
      }
    }

    return maskResult;
  }

  function smoothEdgeMask(mask, sw, sh) {
    var weights = [
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9
    ];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);

    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;

            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];

              a += mask[srcOff] * wt;
            }
          }
        }

        maskResult[so] = a;
      }
    }

    return maskResult;
  }

  /**
	 * Mask Filter
	 * @function
	 * @name Mask
	 * @memberof Konva.Filters
	 * @param {Object} imageData
	 * @example
     * node.cache();
     * node.filters([Konva.Filters.Mask]);
     * node.threshold(200);
	 */
  Konva.Filters.Mask = function(imageData) {
    // Detect pixels close to the background color
    var threshold = this.threshold(),
      mask = backgroundMask(imageData, threshold);
    if (mask) {
      // Erode
      mask = erodeMask(mask, imageData.width, imageData.height);

      // Dilate
      mask = dilateMask(mask, imageData.width, imageData.height);

      // Gradient
      mask = smoothEdgeMask(mask, imageData.width, imageData.height);

      // Apply mask
      applyMask(imageData, mask);

      // todo : Update hit region function according to mask
    }

    return imageData;
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'threshold',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
})();

(function() {
  'use strict';
  /**
     * RGB Filter
     * @function
     * @name RGB
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author ippo615
     * @example
     * node.cache();
     * node.filters([Konva.Filters.RGB]);
     * node.blue(120);
     * node.green(200);
     */
  Konva.Filters.RGB = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      red = this.red(),
      green = this.green(),
      blue = this.blue(),
      i,
      brightness;

    for (i = 0; i < nPixels; i += 4) {
      brightness = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) /
        255;
      data[i] = brightness * red; // r
      data[i + 1] = brightness * green; // g
      data[i + 2] = brightness * blue; // b
      data[i + 3] = data[i + 3]; // alpha
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
    * get/set filter red value. Use with {@link Konva.Filters.RGB} filter.
    * @name red
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} red value between 0 and 255
    * @returns {Integer}
    */

  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
    * get/set filter green value. Use with {@link Konva.Filters.RGB} filter.
    * @name green
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} green value between 0 and 255
    * @returns {Integer}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blue',
    0,
    Konva.Validators.RGBComponent,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set filter blue value. Use with {@link Konva.Filters.RGB} filter.
    * @name blue
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} blue value between 0 and 255
    * @returns {Integer}
    */
})();

(function() {
  'use strict';
  /**
     * RGBA Filter
     * @function
     * @name RGBA
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author codefo
     * @example
     * node.cache();
     * node.filters([Konva.Filters.RGBA]);
     * node.blue(120);
     * node.green(200);
     * node.alpha(0.3);
     */
  Konva.Filters.RGBA = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      red = this.red(),
      green = this.green(),
      blue = this.blue(),
      alpha = this.alpha(),
      i,
      ia;

    for (i = 0; i < nPixels; i += 4) {
      ia = 1 - alpha;

      data[i] = red * alpha + data[i] * ia; // r
      data[i + 1] = green * alpha + data[i + 1] * ia; // g
      data[i + 2] = blue * alpha + data[i + 2] * ia; // b
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'red', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
    * get/set filter red value. Use with {@link Konva.Filters.RGBA} filter.
    * @name red
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} red value between 0 and 255
    * @returns {Integer}
    */

  Konva.Factory.addGetterSetter(Konva.Node, 'green', 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  /**
    * get/set filter green value. Use with {@link Konva.Filters.RGBA} filter.
    * @name green
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} green value between 0 and 255
    * @returns {Integer}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'blue',
    0,
    Konva.Validators.RGBComponent,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set filter blue value. Use with {@link Konva.Filters.RGBA} filter.
    * @name blue
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} blue value between 0 and 255
    * @returns {Integer}
    */

  Konva.Factory.addGetterSetter(Konva.Node, 'alpha', 1, function(val) {
    this._filterUpToDate = false;
    if (val > 1) {
      return 1;
    } else if (val < 0) {
      return 0;
    } else {
      return val;
    }
  });
  /**
     * get/set filter alpha value. Use with {@link Konva.Filters.RGBA} filter.
     * @name alpha
     * @method
     * @memberof Konva.Node.prototype
     * @param {Float} alpha value between 0 and 1
     * @returns {Float}
     */
})();

(function() {
  'use strict';
  /**
    * HSV Filter. Adjusts the hue, saturation and value
    * @function
    * @name HSV
    * @memberof Konva.Filters
    * @param {Object} imageData
    * @author ippo615
    * @example
    * image.filters([Konva.Filters.HSV]);
    * image.value(200);
    */

  Konva.Filters.HSV = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      v = Math.pow(2, this.value()),
      s = Math.pow(2, this.saturation()),
      h = Math.abs(this.hue() + 360) % 360,
      i;

    // Basis for the technique used:
    // http://beesbuzz.biz/code/hsv_color_transforms.php
    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
    // H is the hue shift in degrees (0 to 360)
    // vsu = V*S*cos(H*PI/180);
    // vsw = V*S*sin(H*PI/180);
    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

    // Precompute the values in the matrix:
    var vsu = v * s * Math.cos(h * Math.PI / 180),
      vsw = v * s * Math.sin(h * Math.PI / 180);
    // (result spot)(source spot)
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
      rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
      bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
      bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

    var r, g, b, a;

    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];

      data[i + 0] = rr * r + rg * g + rb * b;
      data[i + 1] = gr * r + gg * g + gb * b;
      data[i + 2] = br * r + bg * g + bb * b;
      data[i + 3] = a; // alpha
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'hue',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
    * @name hue
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} hue value between 0 and 359
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'saturation',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
    * @name saturation
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'value',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsv value. Use with {@link Konva.Filters.HSV} filter.
    * @name value
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
    * @returns {Number}
    */
})();

(function() {
  'use strict';
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'hue',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsv hue in degrees. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
    * @name hue
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} hue value between 0 and 359
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'saturation',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsv saturation. Use with {@link Konva.Filters.HSV} or {@link Konva.Filters.HSL} filter.
    * @name saturation
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} saturation 0 is no change, -1.0 halves the saturation, 1.0 doubles, etc..
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'luminance',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set hsl luminance. Use with {@link Konva.Filters.HSL} filter.
    * @name value
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} value 0 is no change, -1.0 halves the value, 1.0 doubles, etc..
    * @returns {Number}
    */

  /**
    * HSL Filter. Adjusts the hue, saturation and luminance (or lightness)
    * @function
    * @memberof Konva.Filters
    * @param {Object} imageData
    * @author ippo615
    * @example
    * image.filters([Konva.Filters.HSL]);
    * image.luminance(200);
    */

  Konva.Filters.HSL = function(imageData) {
    var data = imageData.data,
      nPixels = data.length,
      v = 1,
      s = Math.pow(2, this.saturation()),
      h = Math.abs(this.hue() + 360) % 360,
      l = this.luminance() * 127,
      i;

    // Basis for the technique used:
    // http://beesbuzz.biz/code/hsv_color_transforms.php
    // V is the value multiplier (1 for none, 2 for double, 0.5 for half)
    // S is the saturation multiplier (1 for none, 2 for double, 0.5 for half)
    // H is the hue shift in degrees (0 to 360)
    // vsu = V*S*cos(H*PI/180);
    // vsw = V*S*sin(H*PI/180);
    //[ .299V+.701vsu+.168vsw    .587V-.587vsu+.330vsw    .114V-.114vsu-.497vsw ] [R]
    //[ .299V-.299vsu-.328vsw    .587V+.413vsu+.035vsw    .114V-.114vsu+.292vsw ]*[G]
    //[ .299V-.300vsu+1.25vsw    .587V-.588vsu-1.05vsw    .114V+.886vsu-.203vsw ] [B]

    // Precompute the values in the matrix:
    var vsu = v * s * Math.cos(h * Math.PI / 180),
      vsw = v * s * Math.sin(h * Math.PI / 180);
    // (result spot)(source spot)
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw,
      rg = 0.587 * v - 0.587 * vsu + 0.330 * vsw,
      rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw,
      gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw,
      gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.300 * vsu + 1.250 * vsw,
      bg = 0.587 * v - 0.586 * vsu - 1.050 * vsw,
      bb = 0.114 * v + 0.886 * vsu - 0.200 * vsw;

    var r, g, b, a;

    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];

      data[i + 0] = rr * r + rg * g + rb * b + l;
      data[i + 1] = gr * r + gg * g + gb * b + l;
      data[i + 2] = br * r + bg * g + bb * b + l;
      data[i + 3] = a; // alpha
    }
  };
})();

(function() {
  'use strict';
  /**
     * Emboss Filter.
     * Pixastic Lib - Emboss filter - v0.1.0
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * License: [http://www.pixastic.com/lib/license.txt]
     * @function
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Emboss]);
     * node.embossStrength(0.8);
     * node.embossWhiteLevel(0.3);
     * node.embossDirection('right');
     * node.embossBlend(true);
     */
  Konva.Filters.Emboss = function(imageData) {
    // pixastic strength is between 0 and 10.  I want it between 0 and 1
    // pixastic greyLevel is between 0 and 255.  I want it between 0 and 1.  Also,
    // a max value of greyLevel yields a white emboss, and the min value yields a black
    // emboss.  Therefore, I changed greyLevel to whiteLevel
    var strength = this.embossStrength() * 10,
      greyLevel = this.embossWhiteLevel() * 255,
      direction = this.embossDirection(),
      blend = this.embossBlend(),
      dirY = 0,
      dirX = 0,
      data = imageData.data,
      w = imageData.width,
      h = imageData.height,
      w4 = w * 4,
      y = h;

    switch (direction) {
      case 'top-left':
        dirY = -1;
        dirX = -1;
        break;
      case 'top':
        dirY = -1;
        dirX = 0;
        break;
      case 'top-right':
        dirY = -1;
        dirX = 1;
        break;
      case 'right':
        dirY = 0;
        dirX = 1;
        break;
      case 'bottom-right':
        dirY = 1;
        dirX = 1;
        break;
      case 'bottom':
        dirY = 1;
        dirX = 0;
        break;
      case 'bottom-left':
        dirY = 1;
        dirX = -1;
        break;
      case 'left':
        dirY = 0;
        dirX = -1;
        break;
      default:
        Konva.Util.error('Unknown emboss direction: ' + direction);
    }

    do {
      var offsetY = (y - 1) * w4;

      var otherY = dirY;
      if (y + otherY < 1) {
        otherY = 0;
      }
      if (y + otherY > h) {
        otherY = 0;
      }

      var offsetYOther = (y - 1 + otherY) * w * 4;

      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;

        var otherX = dirX;
        if (x + otherX < 1) {
          otherX = 0;
        }
        if (x + otherX > w) {
          otherX = 0;
        }

        var offsetOther = offsetYOther + (x - 1 + otherX) * 4;

        var dR = data[offset] - data[offsetOther];
        var dG = data[offset + 1] - data[offsetOther + 1];
        var dB = data[offset + 2] - data[offsetOther + 2];

        var dif = dR;
        var absDif = dif > 0 ? dif : -dif;

        var absG = dG > 0 ? dG : -dG;
        var absB = dB > 0 ? dB : -dB;

        if (absG > absDif) {
          dif = dG;
        }
        if (absB > absDif) {
          dif = dB;
        }

        dif *= strength;

        if (blend) {
          var r = data[offset] + dif;
          var g = data[offset + 1] + dif;
          var b = data[offset + 2] + dif;

          data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
          data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
          data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
        } else {
          var grey = greyLevel - dif;
          if (grey < 0) {
            grey = 0;
          } else if (grey > 255) {
            grey = 255;
          }

          data[offset] = data[offset + 1] = data[offset + 2] = grey;
        }
      } while (--x);
    } while (--y);
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossStrength',
    0.5,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set emboss strength. Use with {@link Konva.Filters.Emboss} filter.
    * @name embossStrength
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} level between 0 and 1.  Default is 0.5
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossWhiteLevel',
    0.5,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set emboss white level. Use with {@link Konva.Filters.Emboss} filter.
    * @name embossWhiteLevel
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} embossWhiteLevel between 0 and 1.  Default is 0.5
    * @returns {Number}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossDirection',
    'top-left',
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set emboss direction. Use with {@link Konva.Filters.Emboss} filter.
    * @name embossDirection
    * @method
    * @memberof Konva.Node.prototype
    * @param {String} embossDirection can be top-left, top, top-right, right, bottom-right, bottom, bottom-left or left
    *   The default is top-left
    * @returns {String}
    */

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'embossBlend',
    false,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set emboss blend. Use with {@link Konva.Filters.Emboss} filter.
    * @name embossBlend
    * @method
    * @memberof Konva.Node.prototype
    * @param {Boolean} embossBlend
    * @returns {Boolean}
    */
})();

(function() {
  'use strict';
  function remap(fromValue, fromMin, fromMax, toMin, toMax) {
    // Compute the range of the data
    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;

    // If either range is 0, then the value can only be mapped to 1 value
    if (fromRange === 0) {
      return toMin + toRange / 2;
    }
    if (toRange === 0) {
      return toMin;
    }

    // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
    toValue = (fromValue - fromMin) / fromRange;
    toValue = toRange * toValue + toMin;

    return toValue;
  }

  /**
    * Enhance Filter. Adjusts the colors so that they span the widest
    *  possible range (ie 0-255). Performs w*h pixel reads and w*h pixel
    *  writes.
    * @function
    * @name Enhance
    * @memberof Konva.Filters
    * @param {Object} imageData
    * @author ippo615
    * @example
    * node.cache();
    * node.filters([Konva.Filters.Enhance]);
    * node.enhance(0.4);
    */
  Konva.Filters.Enhance = function(imageData) {
    var data = imageData.data,
      nSubPixels = data.length,
      rMin = data[0],
      rMax = rMin,
      r,
      gMin = data[1],
      gMax = gMin,
      g,
      bMin = data[2],
      bMax = bMin,
      b,
      i;

    // If we are not enhancing anything - don't do any computation
    var enhanceAmount = this.enhance();
    if (enhanceAmount === 0) {
      return;
    }

    // 1st Pass - find the min and max for each channel:
    for (i = 0; i < nSubPixels; i += 4) {
      r = data[i + 0];
      if (r < rMin) {
        rMin = r;
      } else if (r > rMax) {
        rMax = r;
      }
      g = data[i + 1];
      if (g < gMin) {
        gMin = g;
      } else if (g > gMax) {
        gMax = g;
      }
      b = data[i + 2];
      if (b < bMin) {
        bMin = b;
      } else if (b > bMax) {
        bMax = b;
      }
      //a = data[i + 3];
      //if (a < aMin) { aMin = a; } else
      //if (a > aMax) { aMax = a; }
    }

    // If there is only 1 level - don't remap
    if (rMax === rMin) {
      rMax = 255;
      rMin = 0;
    }
    if (gMax === gMin) {
      gMax = 255;
      gMin = 0;
    }
    if (bMax === bMin) {
      bMax = 255;
      bMin = 0;
    }

    var rMid,
      rGoalMax,
      rGoalMin,
      gMid,
      gGoalMax,
      gGoalMin,
      bMid,
      bGoalMax,
      bGoalMin;

    // If the enhancement is positive - stretch the histogram
    if (enhanceAmount > 0) {
      rGoalMax = rMax + enhanceAmount * (255 - rMax);
      rGoalMin = rMin - enhanceAmount * (rMin - 0);
      gGoalMax = gMax + enhanceAmount * (255 - gMax);
      gGoalMin = gMin - enhanceAmount * (gMin - 0);
      bGoalMax = bMax + enhanceAmount * (255 - bMax);
      bGoalMin = bMin - enhanceAmount * (bMin - 0);
      // If the enhancement is negative -   compress the histogram
    } else {
      rMid = (rMax + rMin) * 0.5;
      rGoalMax = rMax + enhanceAmount * (rMax - rMid);
      rGoalMin = rMin + enhanceAmount * (rMin - rMid);
      gMid = (gMax + gMin) * 0.5;
      gGoalMax = gMax + enhanceAmount * (gMax - gMid);
      gGoalMin = gMin + enhanceAmount * (gMin - gMid);
      bMid = (bMax + bMin) * 0.5;
      bGoalMax = bMax + enhanceAmount * (bMax - bMid);
      bGoalMin = bMin + enhanceAmount * (bMin - bMid);
    }

    // Pass 2 - remap everything, except the alpha
    for (i = 0; i < nSubPixels; i += 4) {
      data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
      data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
      data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
      //data[i + 3] = remap(data[i + 3], aMin, aMax, aGoalMin, aGoalMax);
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'enhance',
    0,
    null,
    Konva.Factory.afterSetFilter
  );

  /**
    * get/set enhance. Use with {@link Konva.Filters.Enhance} filter.
    * @name enhance
    * @method
    * @memberof Konva.Node.prototype
    * @param {Float} amount
    * @returns {Float}
    */
})();

(function() {
  'use strict';
  /**
     * Posterize Filter. Adjusts the channels so that there are no more
     *  than n different values for that channel. This is also applied
     *  to the alpha channel.
     * @function
     * @name Posterize
     * @author ippo615
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Posterize]);
     * node.levels(0.8); // between 0 and 1
     */

  Konva.Filters.Posterize = function(imageData) {
    // level must be between 1 and 255
    var levels = Math.round(this.levels() * 254) + 1,
      data = imageData.data,
      len = data.length,
      scale = 255 / levels,
      i;

    for (i = 0; i < len; i += 1) {
      data[i] = Math.floor(data[i] / scale) * scale;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'levels',
    0.5,
    null,
    Konva.Factory.afterSetFilter
  );

  /**
    * get/set levels.  Must be a number between 0 and 1.  Use with {@link Konva.Filters.Posterize} filter.
    * @name levels
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} level between 0 and 1
    * @returns {Number}
    */
})();

(function() {
  'use strict';
  /**
     * Noise Filter. Randomly adds or substracts to the color channels
     * @function
     * @name Noise
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author ippo615
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Noise]);
     * node.noise(0.8);
     */
  Konva.Filters.Noise = function(imageData) {
    var amount = this.noise() * 255,
      data = imageData.data,
      nPixels = data.length,
      half = amount / 2,
      i;

    for (i = 0; i < nPixels; i += 4) {
      data[i + 0] += half - 2 * half * Math.random();
      data[i + 1] += half - 2 * half * Math.random();
      data[i + 2] += half - 2 * half * Math.random();
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'noise',
    0.2,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set noise amount.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Noise} filter.
    * @name noise
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} noise
    * @returns {Number}
    */
})();

/*eslint-disable max-depth */
(function() {
  'use strict';
  /**
     * Pixelate Filter. Averages groups of pixels and redraws
     *  them as larger pixels
     * @function
     * @name Pixelate
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author ippo615
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Pixelate]);
     * node.pixelSize(10);
     */

  Konva.Filters.Pixelate = function(imageData) {
    var pixelSize = Math.ceil(this.pixelSize()),
      width = imageData.width,
      height = imageData.height,
      x,
      y,
      i,
      //pixelsPerBin = pixelSize * pixelSize,
      red,
      green,
      blue,
      alpha,
      nBinsX = Math.ceil(width / pixelSize),
      nBinsY = Math.ceil(height / pixelSize),
      xBinStart,
      xBinEnd,
      yBinStart,
      yBinEnd,
      xBin,
      yBin,
      pixelsInBin;
    imageData = imageData.data;

    if (pixelSize <= 0) {
      Konva.Util.error('pixelSize value can not be <= 0');
      return;
    }

    for (xBin = 0; xBin < nBinsX; xBin += 1) {
      for (yBin = 0; yBin < nBinsY; yBin += 1) {
        // Initialize the color accumlators to 0
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;

        // Determine which pixels are included in this bin
        xBinStart = xBin * pixelSize;
        xBinEnd = xBinStart + pixelSize;
        yBinStart = yBin * pixelSize;
        yBinEnd = yBinStart + pixelSize;

        // Add all of the pixels to this bin!
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            red += imageData[i + 0];
            green += imageData[i + 1];
            blue += imageData[i + 2];
            alpha += imageData[i + 3];
            pixelsInBin += 1;
          }
        }

        // Make sure the channels are between 0-255
        red = red / pixelsInBin;
        green = green / pixelsInBin;
        blue = blue / pixelsInBin;

        // Draw this bin
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            imageData[i + 0] = red;
            imageData[i + 1] = green;
            imageData[i + 2] = blue;
            imageData[i + 3] = alpha;
          }
        }
      }
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'pixelSize',
    8,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set pixel size. Use with {@link Konva.Filters.Pixelate} filter.
    * @name pixelSize
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} pixelSize
    * @returns {Integer}
    */
})();

(function() {
  'use strict';
  /**
     * Threshold Filter. Pushes any value above the mid point to
     *  the max and any value below the mid point to the min.
     *  This affects the alpha channel.
     * @function
     * @name Threshold
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author ippo615
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Threshold]);
     * node.threshold(0.1);
     */

  Konva.Filters.Threshold = function(imageData) {
    var level = this.threshold() * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 1) {
      data[i] = data[i] < level ? 0 : 255;
    }
  };

  Konva.Factory.addGetterSetter(
    Konva.Node,
    'threshold',
    0.5,
    null,
    Konva.Factory.afterSetFilter
  );
  /**
    * get/set threshold.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Threshold} or {@link Konva.Filters.Mask} filter.
    * @name threshold
    * @method
    * @memberof Konva.Node.prototype
    * @param {Number} threshold
    * @returns {Number}
    */
})();

(function() {
  'use strict';
  /**
     * Sepia Filter
     * Based on: Pixastic Lib - Sepia filter - v0.1.0
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * @function
     * @name Sepia
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @author Jacob Seidelin <jseidelin@nihilogic.dk>
     * @license MPL v1.1 [http://www.pixastic.com/lib/license.txt]
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Sepia]);
     */
  Konva.Filters.Sepia = function(imageData) {
    var data = imageData.data,
      w = imageData.width,
      y = imageData.height,
      w4 = w * 4,
      offsetY,
      x,
      offset,
      or,
      og,
      ob,
      r,
      g,
      b;

    do {
      offsetY = (y - 1) * w4;
      x = w;
      do {
        offset = offsetY + (x - 1) * 4;

        or = data[offset];
        og = data[offset + 1];
        ob = data[offset + 2];

        r = or * 0.393 + og * 0.769 + ob * 0.189;
        g = or * 0.349 + og * 0.686 + ob * 0.168;
        b = or * 0.272 + og * 0.534 + ob * 0.131;

        data[offset] = r > 255 ? 255 : r;
        data[offset + 1] = g > 255 ? 255 : g;
        data[offset + 2] = b > 255 ? 255 : b;
        data[offset + 3] = data[offset + 3];
      } while (--x);
    } while (--y);
  };
})();

(function() {
  'use strict';
  /**
     * Solarize Filter
     * Pixastic Lib - Solarize filter - v0.1.0
     * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
     * License: [http://www.pixastic.com/lib/license.txt]
     * @function
     * @name Solarize
     * @memberof Konva.Filters
     * @param {Object} imageData
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Solarize]);
     */
  Konva.Filters.Solarize = function(imageData) {
    var data = imageData.data,
      w = imageData.width,
      h = imageData.height,
      w4 = w * 4,
      y = h;

    do {
      var offsetY = (y - 1) * w4;
      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];

        if (r > 127) {
          r = 255 - r;
        }
        if (g > 127) {
          g = 255 - g;
        }
        if (b > 127) {
          b = 255 - b;
        }

        data[offset] = r;
        data[offset + 1] = g;
        data[offset + 2] = b;
      } while (--x);
    } while (--y);
  };
})();

(function() {
  'use strict';
  /*
   * ToPolar Filter. Converts image data to polar coordinates. Performs
   *  w*h*4 pixel reads and w*h pixel writes. The r axis is placed along
   *  what would be the y axis and the theta axis along the x axis.
   * @function
   * @author ippo615
   * @memberof Konva.Filters
   * @param {ImageData} src, the source image data (what will be transformed)
   * @param {ImageData} dst, the destination image data (where it will be saved)
   * @param {Object} opt
   * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
   *  default is in the middle
   * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
   *  default is in the middle
   */

  var ToPolar = function(src, dst, opt) {
    var srcPixels = src.data,
      dstPixels = dst.data,
      xSize = src.width,
      ySize = src.height,
      xMid = opt.polarCenterX || xSize / 2,
      yMid = opt.polarCenterY || ySize / 2,
      i,
      x,
      y,
      r = 0,
      g = 0,
      b = 0,
      a = 0;

    // Find the largest radius
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;

    // We'll be uisng y as the radius, and x as the angle (theta=t)
    var rSize = ySize, tSize = xSize, radius, theta;

    // We want to cover all angles (0-360) and we need to convert to
    // radians (*PI/180)
    var conversion = 360 / tSize * Math.PI / 180, sin, cos;

    // var x1, x2, x1i, x2i, y1, y2, y1i, y2i, scale;

    for (theta = 0; theta < tSize; theta += 1) {
      sin = Math.sin(theta * conversion);
      cos = Math.cos(theta * conversion);
      for (radius = 0; radius < rSize; radius += 1) {
        x = Math.floor(xMid + rMax * radius / rSize * cos);
        y = Math.floor(yMid + rMax * radius / rSize * sin);
        i = (y * xSize + x) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];

        // Store it
        //i = (theta * xSize  +  radius) * 4;
        i = (theta + radius * xSize) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };

  /*
     * FromPolar Filter. Converts image data from polar coordinates back to rectangular.
     *  Performs w*h*4 pixel reads and w*h pixel writes.
     * @function
     * @author ippo615
     * @memberof Konva.Filters
     * @param {ImageData} src, the source image data (what will be transformed)
     * @param {ImageData} dst, the destination image data (where it will be saved)
     * @param {Object} opt
     * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
     *  default is in the middle
     * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
     *  default is in the middle
     * @param {Number} [opt.polarRotation] amount to rotate the image counterclockwis,
     *  0 is no rotation, 360 degrees is a full rotation
     */

  var FromPolar = function(src, dst, opt) {
    var srcPixels = src.data,
      dstPixels = dst.data,
      xSize = src.width,
      ySize = src.height,
      xMid = opt.polarCenterX || xSize / 2,
      yMid = opt.polarCenterY || ySize / 2,
      i,
      x,
      y,
      dx,
      dy,
      r = 0,
      g = 0,
      b = 0,
      a = 0;

    // Find the largest radius
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;

    // We'll be uisng x as the radius, and y as the angle (theta=t)
    var rSize = ySize,
      tSize = xSize,
      radius,
      theta,
      phaseShift = opt.polarRotation || 0;

    // We need to convert to degrees and we need to make sure
    // it's between (0-360)
    // var conversion = tSize/360*180/Math.PI;
    //var conversion = tSize/360*180/Math.PI;

    var x1, y1;

    for (x = 0; x < xSize; x += 1) {
      for (y = 0; y < ySize; y += 1) {
        dx = x - xMid;
        dy = y - yMid;
        radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
        theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
        theta = theta * tSize / 360;
        x1 = Math.floor(theta);
        y1 = Math.floor(radius);
        i = (y1 * xSize + x1) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];

        // Store it
        i = (y * xSize + x) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };

  //Konva.Filters.ToPolar = Konva.Util._FilterWrapDoubleBuffer(ToPolar);
  //Konva.Filters.FromPolar = Konva.Util._FilterWrapDoubleBuffer(FromPolar);

  // create a temporary canvas for working - shared between multiple calls
  var tempCanvas = Konva.Util.createCanvasElement();

  /*
     * Kaleidoscope Filter.
     * @function
     * @name Kaleidoscope
     * @author ippo615
     * @memberof Konva.Filters
     * @example
     * node.cache();
     * node.filters([Konva.Filters.Kaleidoscope]);
     * node.kaleidoscopePower(3);
     * node.kaleidoscopeAngle(45);
     */
  Konva.Filters.Kaleidoscope = function(imageData) {
    var xSize = imageData.width, ySize = imageData.height;

    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
    var power = Math.round(this.kaleidoscopePower());
    var angle = Math.round(this.kaleidoscopeAngle());
    var offset = Math.floor(xSize * (angle % 360) / 360);

    if (power < 1) {
      return;
    }

    // Work with our shared buffer canvas
    tempCanvas.width = xSize;
    tempCanvas.height = ySize;
    var scratchData = tempCanvas
      .getContext('2d')
      .getImageData(0, 0, xSize, ySize);

    // Convert thhe original to polar coordinates
    ToPolar(imageData, scratchData, {
      polarCenterX: xSize / 2,
      polarCenterY: ySize / 2
    });

    // Determine how big each section will be, if it's too small
    // make it bigger
    var minSectionSize = xSize / Math.pow(2, power);
    while (minSectionSize <= 8) {
      minSectionSize = minSectionSize * 2;
      power -= 1;
    }
    minSectionSize = Math.ceil(minSectionSize);
    var sectionSize = minSectionSize;

    // Copy the offset region to 0
    // Depending on the size of filter and location of the offset we may need
    // to copy the section backwards to prevent it from rewriting itself
    var xStart = 0, xEnd = sectionSize, xDelta = 1;
    if (offset + minSectionSize > xSize) {
      xStart = sectionSize;
      xEnd = 0;
      xDelta = -1;
    }
    for (y = 0; y < ySize; y += 1) {
      for (x = xStart; x !== xEnd; x += xDelta) {
        xoff = Math.round(x + offset) % xSize;
        srcPos = (xSize * y + xoff) * 4;
        r = scratchData.data[srcPos + 0];
        g = scratchData.data[srcPos + 1];
        b = scratchData.data[srcPos + 2];
        a = scratchData.data[srcPos + 3];
        dstPos = (xSize * y + x) * 4;
        scratchData.data[dstPos + 0] = r;
        scratchData.data[dstPos + 1] = g;
        scratchData.data[dstPos + 2] = b;
        scratchData.data[dstPos + 3] = a;
      }
    }

    // Perform the actual effect
    for (y = 0; y < ySize; y += 1) {
      sectionSize = Math.floor(minSectionSize);
      for (i = 0; i < power; i += 1) {
        for (x = 0; x < sectionSize + 1; x += 1) {
          srcPos = (xSize * y + x) * 4;
          r = scratchData.data[srcPos + 0];
          g = scratchData.data[srcPos + 1];
          b = scratchData.data[srcPos + 2];
          a = scratchData.data[srcPos + 3];
          dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
          scratchData.data[dstPos + 0] = r;
          scratchData.data[dstPos + 1] = g;
          scratchData.data[dstPos + 2] = b;
          scratchData.data[dstPos + 3] = a;
        }
        sectionSize *= 2;
      }
    }

    // Convert back from polar coordinates
    FromPolar(scratchData, imageData, { polarRotation: 0 });
  };

  /**
    * get/set kaleidoscope power. Use with {@link Konva.Filters.Kaleidoscope} filter.
    * @name kaleidoscopePower
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} power of kaleidoscope
    * @returns {Integer}
    */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'kaleidoscopePower',
    2,
    null,
    Konva.Factory.afterSetFilter
  );

  /**
    * get/set kaleidoscope angle. Use with {@link Konva.Filters.Kaleidoscope} filter.
    * @name kaleidoscopeAngle
    * @method
    * @memberof Konva.Node.prototype
    * @param {Integer} degrees
    * @returns {Integer}
    */
  Konva.Factory.addGetterSetter(
    Konva.Node,
    'kaleidoscopeAngle',
    0,
    null,
    Konva.Factory.afterSetFilter
  );
})();

(function() {
  'use strict';
  /**
     * Container constructor.&nbsp; Containers are used to contain nodes or other containers
     * @constructor
     * @memberof Konva
     * @augments Konva.Node
     * @abstract
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

     */
  Konva.Container = function(config) {
    this.__init(config);
  };

  Konva.Util.addMethods(Konva.Container, {
    __init: function(config) {
      this.children = new Konva.Collection();
      Konva.Node.call(this, config);
    },
    /**
         * returns a {@link Konva.Collection} of direct descendant nodes
         * @method
         * @memberof Konva.Container.prototype
         * @param {Function} [filterFunc] filter function
         * @returns {Konva.Collection}
         * @example
         * // get all children
         * var children = layer.getChildren();
         *
         * // get only circles
         * var circles = layer.getChildren(function(node){
         *    return node.getClassName() === 'Circle';
         * });
         */
    getChildren: function(filterFunc) {
      if (!filterFunc) {
        return this.children;
      }

      var results = new Konva.Collection();
      this.children.each(function(child) {
        if (filterFunc(child)) {
          results.push(child);
        }
      });
      return results;
    },
    /**
         * determine if node has children
         * @method
         * @memberof Konva.Container.prototype
         * @returns {Boolean}
         */
    hasChildren: function() {
      return this.getChildren().length > 0;
    },
    /**
         * remove all children
         * @method
         * @memberof Konva.Container.prototype
         */
    removeChildren: function() {
      var children = Konva.Collection.toCollection(this.children);
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        // reset parent to prevent many _setChildrenIndices calls
        delete child.parent;
        child.index = 0;
        child.remove();
      }
      children = null;
      this.children = new Konva.Collection();
      return this;
    },
    /**
         * destroy all children
         * @method
         * @memberof Konva.Container.prototype
         */
    destroyChildren: function() {
      var children = Konva.Collection.toCollection(this.children);
      var child;
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        // reset parent to prevent many _setChildrenIndices calls
        delete child.parent;
        child.index = 0;
        child.destroy();
      }
      children = null;
      this.children = new Konva.Collection();
      return this;
    },
    /**
         * Add node or nodes to container.
         * @method
         * @memberof Konva.Container.prototype
         * @param {...Konva.Node} child
         * @returns {Container}
         * @example
         * layer.add(shape1, shape2, shape3);
         */
    add: function(child) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      if (child.getParent()) {
        child.moveTo(this);
        return this;
      }
      var children = this.children;
      this._validateAdd(child);
      child.index = children.length;
      child.parent = this;
      children.push(child);
      this._fire('add', {
        child: child
      });

      // if node under drag we need to update drag animation
      if (Konva.DD && child.isDragging()) {
        Konva.DD.anim.setLayers(child.getLayer());
      }

      // chainable
      return this;
    },
    destroy: function() {
      // destroy children
      if (this.hasChildren()) {
        this.destroyChildren();
      }
      // then destroy self
      Konva.Node.prototype.destroy.call(this);
      return this;
    },
    /**
         * return a {@link Konva.Collection} of nodes that match the selector.  Use '#' for id selections
         * and '.' for name selections.  You can also select by type or class name. Pass multiple selectors
         * separated by a space.
         * @method
         * @memberof Konva.Container.prototype
         * @param {String} selector
         * @returns {Collection}
         * @example
         * // select node with id foo
         * var node = stage.find('#foo');
         *
         * // select nodes with name bar inside layer
         * var nodes = layer.find('.bar');
         *
         * // select all groups inside layer
         * var nodes = layer.find('Group');
         *
         * // select all rectangles inside layer
         * var nodes = layer.find('Rect');
         *
         * // select node with an id of foo or a name of bar inside layer
         * var nodes = layer.find('#foo, .bar');
         */
    find: function(selector) {
      var retArr = [],
        selectorArr = selector.replace(/ /g, '').split(','),
        len = selectorArr.length,
        n,
        i,
        sel,
        arr,
        node,
        children,
        clen;

      for (n = 0; n < len; n++) {
        sel = selectorArr[n];
        if (!Konva.Util.isValidSelector(sel)) {
          Konva.Util.warn(
            'Selector "' +
              sel +
              '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
          );
          Konva.Util.warn(
            'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
          );
          Konva.Util.warn('Konva is awesome, right?');
        }
        // id selector
        if (sel.charAt(0) === '#') {
          node = this._getNodeById(sel.slice(1));
          if (node) {
            retArr.push(node);
          }
        } else if (sel.charAt(0) === '.') {
          // name selector
          arr = this._getNodesByName(sel.slice(1));
          retArr = retArr.concat(arr);
        } else {
          // unrecognized selector, pass to children
          children = this.getChildren();
          clen = children.length;
          for (i = 0; i < clen; i++) {
            retArr = retArr.concat(children[i]._get(sel));
          }
        }
      }

      return Konva.Collection.toCollection(retArr);
    },
    /**
         * return a first node from `find` method
         * @method
         * @memberof Konva.Container.prototype
         * @param {String} selector
         * @returns {Konva.Node}
         * @example
         * // select node with id foo
         * var node = stage.findOne('#foo');
         *
         * // select node with name bar inside layer
         * var nodes = layer.findOne('.bar');
         */
    findOne: function(selector) {
      return this.find(selector)[0];
    },
    _getNodeById: function(key) {
      var node = Konva.ids[key];

      if (node !== undefined && this.isAncestorOf(node)) {
        return node;
      }
      return null;
    },
    _getNodesByName: function(key) {
      var arr = Konva.names[key] || [];
      return this._getDescendants(arr);
    },
    _get: function(selector) {
      var retArr = Konva.Node.prototype._get.call(this, selector);
      var children = this.getChildren();
      var len = children.length;
      for (var n = 0; n < len; n++) {
        retArr = retArr.concat(children[n]._get(selector));
      }
      return retArr;
    },
    // extenders
    toObject: function() {
      var obj = Konva.Node.prototype.toObject.call(this);

      obj.children = [];

      var children = this.getChildren();
      var len = children.length;
      for (var n = 0; n < len; n++) {
        var child = children[n];
        obj.children.push(child.toObject());
      }

      return obj;
    },
    _getDescendants: function(arr) {
      var retArr = [];
      var len = arr.length;
      for (var n = 0; n < len; n++) {
        var node = arr[n];
        if (this.isAncestorOf(node)) {
          retArr.push(node);
        }
      }

      return retArr;
    },
    /**
         * determine if node is an ancestor
         * of descendant
         * @method
         * @memberof Konva.Container.prototype
         * @param {Konva.Node} node
         */
    isAncestorOf: function(node) {
      var parent = node.getParent();
      while (parent) {
        if (parent._id === this._id) {
          return true;
        }
        parent = parent.getParent();
      }

      return false;
    },
    clone: function(obj) {
      // call super method
      var node = Konva.Node.prototype.clone.call(this, obj);

      this.getChildren().each(function(no) {
        node.add(no.clone());
      });
      return node;
    },
    /**
         * get all shapes that intersect a point.  Note: because this method must clear a temporary
         * canvas and redraw every shape inside the container, it should only be used for special sitations
         * because it performs very poorly.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
         * because it performs much better
         * @method
         * @memberof Konva.Container.prototype
         * @param {Object} pos
         * @param {Number} pos.x
         * @param {Number} pos.y
         * @returns {Array} array of shapes
         */
    getAllIntersections: function(pos) {
      var arr = [];

      this.find('Shape').each(function(shape) {
        if (shape.isVisible() && shape.intersects(pos)) {
          arr.push(shape);
        }
      });

      return arr;
    },
    _setChildrenIndices: function() {
      this.children.each(function(child, n) {
        child.index = n;
      });
    },
    drawScene: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.getCanvas()),
        context = canvas && canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;

      if (this.isVisible()) {
        if (!caching && cachedSceneCanvas) {
          context.save();
          layer._applyTransform(this, context, top);
          this._drawCachedSceneCanvas(context);
          context.restore();
        } else {
          this._drawChildren(canvas, 'drawScene', top, false, caching);
        }
      }
      return this;
    },
    drawHit: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || (layer && layer.hitCanvas),
        context = canvas && canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

      if (this.shouldDrawHit(canvas)) {
        if (layer) {
          layer.clearHitCache();
        }
        if (!caching && cachedHitCanvas) {
          context.save();
          layer._applyTransform(this, context, top);
          this._drawCachedHitCanvas(context);
          context.restore();
        } else {
          this._drawChildren(canvas, 'drawHit', top);
        }
      }
      return this;
    },
    _drawChildren: function(canvas, drawMethod, top, caching, skipBuffer) {
      var layer = this.getLayer(),
        context = canvas && canvas.getContext(),
        clipWidth = this.getClipWidth(),
        clipHeight = this.getClipHeight(),
        clipFunc = this.getClipFunc(),
        hasClip = (clipWidth && clipHeight) || clipFunc,
        clipX,
        clipY;

      if (hasClip && layer) {
        context.save();
        var transform = this.getAbsoluteTransform(top);
        var m = transform.getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        context.beginPath();
        if (clipFunc) {
          clipFunc.call(this, context, this);
        } else {
          clipX = this.getClipX();
          clipY = this.getClipY();
          context.rect(clipX, clipY, clipWidth, clipHeight);
        }
        context.clip();
        m = transform.copy().invert().getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      }

      this.children.each(function(child) {
        child[drawMethod](canvas, top, caching, skipBuffer);
      });

      if (hasClip) {
        context.restore();
      }
    },
    shouldDrawHit: function(canvas) {
      var layer = this.getLayer();
      var dd = Konva.DD;
      var layerUnderDrag = dd &&
        Konva.isDragging() &&
        Konva.DD.anim.getLayers().indexOf(layer) !== -1;
      return (canvas && canvas.isCache) ||
        (layer &&
          layer.hitGraphEnabled() &&
          this.isVisible() &&
          !layerUnderDrag);
    },
    getClientRect: function(skipTransform) {
      var minX, minY, maxX, maxY;
      var selfRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      this.children.each(function(child) {
        var rect = child.getClientRect();

        // skip invisible children (like empty groups)
        // or don't skip... hmmm...
        // if (rect.width === 0 && rect.height === 0) {
        //     return;
        // }

        if (minX === undefined) {
          // initial value for first child
          minX = rect.x;
          minY = rect.y;
          maxX = rect.x + rect.width;
          maxY = rect.y + rect.height;
        } else {
          minX = Math.min(minX, rect.x);
          minY = Math.min(minY, rect.y);
          maxX = Math.max(maxX, rect.x + rect.width);
          maxY = Math.max(maxY, rect.y + rect.height);
        }
      });

      if (this.children.length !== 0) {
        selfRect = {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }

      if (!skipTransform) {
        return this._transformedRect(selfRect);
      }
      return selfRect;
    }
  });

  Konva.Util.extend(Konva.Container, Konva.Node);
  // deprecated methods
  Konva.Container.prototype.get = Konva.Container.prototype.find;

  // add getters setters
  Konva.Factory.addComponentsGetterSetter(Konva.Container, 'clip', [
    'x',
    'y',
    'width',
    'height'
  ]);
  /**
     * get/set clip
     * @method
     * @name clip
     * @memberof Konva.Container.prototype
     * @param {Object} clip
     * @param {Number} clip.x
     * @param {Number} clip.y
     * @param {Number} clip.width
     * @param {Number} clip.height
     * @returns {Object}
     * @example
     * // get clip
     * var clip = container.clip();
     *
     * // set clip
     * container.setClip({
     *   x: 20,
     *   y: 20,
     *   width: 20,
     *   height: 20
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipX');
  /**
     * get/set clip x
     * @name clipX
     * @method
     * @memberof Konva.Container.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get clip x
     * var clipX = container.clipX();
     *
     * // set clip x
     * container.clipX(10);
     */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipY');
  /**
     * get/set clip y
     * @name clipY
     * @method
     * @memberof Konva.Container.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get clip y
     * var clipY = container.clipY();
     *
     * // set clip y
     * container.clipY(10);
     */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipWidth');
  /**
     * get/set clip width
     * @name clipWidth
     * @method
     * @memberof Konva.Container.prototype
     * @param {Number} width
     * @returns {Number}
     * @example
     * // get clip width
     * var clipWidth = container.clipWidth();
     *
     * // set clip width
     * container.clipWidth(100);
     */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipHeight');
  /**
     * get/set clip height
     * @name clipHeight
     * @method
     * @memberof Konva.Container.prototype
     * @param {Number} height
     * @returns {Number}
     * @example
     * // get clip height
     * var clipHeight = container.clipHeight();
     *
     * // set clip height
     * container.clipHeight(100);
     */

  Konva.Factory.addGetterSetter(Konva.Container, 'clipFunc');
  /**
      * get/set clip function
      * @name clipFunc
      * @method
      * @memberof Konva.Container.prototype
      * @param {Function} function
      * @returns {Function}
      * @example
      * // get clip function
      * var clipFunction = container.clipFunc();
      *
      * // set clip height
      * container.clipFunc(function(ctx) {
      *   ctx.rect(0, 0, 100, 100);
      * });
      */

  Konva.Collection.mapMethods(Konva.Container);
})();

(function(Konva) {
  'use strict';
  var HAS_SHADOW = 'hasShadow';
  var SHADOW_RGBA = 'shadowRGBA';

  function _fillFunc(context) {
    context.fill();
  }
  function _strokeFunc(context) {
    context.stroke();
  }
  function _fillFuncHit(context) {
    context.fill();
  }
  function _strokeFuncHit(context) {
    context.stroke();
  }

  function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
  }

  function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
  }

  /**
     * Shape constructor.  Shapes are primitive objects such as rectangles,
     *  circles, text, lines, etc.
     * @constructor
     * @memberof Konva
     * @augments Konva.Node
     * @param {Object} config
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var customShape = new Konva.Shape({
         *   x: 5,
         *   y: 10,
         *   fill: 'red',
         *   // a Konva.Canvas renderer is passed into the drawFunc function
         *   drawFunc: function(context) {
         *     context.beginPath();
         *     context.moveTo(200, 50);
         *     context.lineTo(420, 80);
         *     context.quadraticCurveTo(300, 100, 260, 170);
         *     context.closePath();
         *     context.fillStrokeShape(this);
         *   }
         *});
     */
  Konva.Shape = function(config) {
    this.__init(config);
  };

  Konva.Util.addMethods(Konva.Shape, {
    __init: function(config) {
      this.nodeType = 'Shape';
      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this._fillFuncHit = _fillFuncHit;
      this._strokeFuncHit = _strokeFuncHit;

      // set colorKey
      var shapes = Konva.shapes;
      var key;

      while (true) {
        key = Konva.Util.getRandomColor();
        if (key && !(key in shapes)) {
          break;
        }
      }

      this.colorKey = key;
      shapes[key] = this;

      // call super constructor
      Konva.Node.call(this, config);

      this.on(
        'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
        _clearHasShadowCache
      );

      this.on(
        'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
        _clearGetShadowRGBACache
      );
    },
    hasChildren: function() {
      return false;
    },
    getChildren: function() {
      return [];
    },
    /**
         * get canvas context tied to the layer
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Konva.Context}
         */
    getContext: function() {
      return this.getLayer().getContext();
    },
    /**
         * get canvas renderer tied to the layer.  Note that this returns a canvas renderer, not a canvas element
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Konva.Canvas}
         */
    getCanvas: function() {
      return this.getLayer().getCanvas();
    },
    /**
         * returns whether or not a shadow will be rendered
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Boolean}
         */
    hasShadow: function() {
      return this._getCache(HAS_SHADOW, this._hasShadow);
    },
    _hasShadow: function() {
      return this.getShadowEnabled() &&
        (this.getShadowOpacity() !== 0 &&
          !!(this.getShadowColor() ||
            this.getShadowBlur() ||
            this.getShadowOffsetX() ||
            this.getShadowOffsetY()));
    },
    getShadowRGBA: function() {
      return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    },
    _getShadowRGBA: function() {
      if (this.hasShadow()) {
        var rgba = Konva.Util.colorToRGBA(this.shadowColor());
        return 'rgba(' +
          rgba.r +
          ',' +
          rgba.g +
          ',' +
          rgba.b +
          ',' +
          rgba.a * (this.getShadowOpacity() || 1) +
          ')';
      }
    },
    /**
         * returns whether or not the shape will be filled
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Boolean}
         */
    hasFill: function() {
      return !!(this.getFill() ||
        this.getFillPatternImage() ||
        this.getFillLinearGradientColorStops() ||
        this.getFillRadialGradientColorStops());
    },
    /**
         * returns whether or not the shape will be stroked
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Boolean}
         */
    hasStroke: function() {
      return this.strokeEnabled() && !!this.stroke();
    },
    /**
         * determines if point is in the shape, regardless if other shapes are on top of it.  Note: because
         *  this method clears a temporary canvas and then redraws the shape, it performs very poorly if executed many times
         *  consecutively.  Please use the {@link Konva.Stage#getIntersection} method if at all possible
         *  because it performs much better
         * @method
         * @memberof Konva.Shape.prototype
         * @param {Object} point
         * @param {Number} point.x
         * @param {Number} point.y
         * @returns {Boolean}
         */
    intersects: function(point) {
      var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;

      bufferHitCanvas.getContext().clear();
      this.drawHit(bufferHitCanvas);
      p = bufferHitCanvas.context.getImageData(
        Math.round(point.x),
        Math.round(point.y),
        1,
        1
      ).data;
      return p[3] > 0;
    },
    // extends Node.prototype.destroy
    destroy: function() {
      Konva.Node.prototype.destroy.call(this);
      delete Konva.shapes[this.colorKey];
      return this;
    },
    _useBufferCanvas: function(caching) {
      return (!caching &&
        (this.perfectDrawEnabled() &&
          this.getAbsoluteOpacity() !== 1 &&
          this.hasFill() &&
          this.hasStroke() &&
          this.getStage())) ||
        (this.perfectDrawEnabled() &&
          this.hasShadow() &&
          this.getAbsoluteOpacity() !== 1 &&
          this.hasFill() &&
          this.hasStroke() &&
          this.getStage());
    },
    /**
         * return self rectangle (x, y, width, height) of shape.
         * This method are not taken into account transformation and styles.
         * @method
         * @memberof Konva.Shape.prototype
         * @returns {Object} rect with {x, y, width, height} properties
         * @example
         *
         * rect.getSelfRect();  // return {x:0, y:0, width:rect.width(), height:rect.height()}
         * circle.getSelfRect();  // return {x: - circle.width() / 2, y: - circle.height() / 2, width:circle.width(), height:circle.height()}
         *
         */
    getSelfRect: function() {
      var size = this.getSize();
      return {
        x: this._centroid ? Math.round((-size.width) / 2) : 0,
        y: this._centroid ? Math.round((-size.height) / 2) : 0,
        width: size.width,
        height: size.height
      };
    },
    getClientRect: function(skipTransform) {
      var fillRect = this.getSelfRect();

      var strokeWidth = (this.hasStroke() && this.strokeWidth()) || 0;
      var fillAndStrokeWidth = fillRect.width + strokeWidth;
      var fillAndStrokeHeight = fillRect.height + strokeWidth;

      var shadowOffsetX = this.hasShadow() ? this.shadowOffsetX() : 0;
      var shadowOffsetY = this.hasShadow() ? this.shadowOffsetY() : 0;

      var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
      var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);

      var blurRadius = (this.hasShadow() && this.shadowBlur()) || 0;

      var width = preWidth + blurRadius * 2;
      var height = preHeight + blurRadius * 2;

      // if stroke, for example = 3
      // we need to set x to 1.5, but after Math.round it will be 2
      // as we have additional offset we need to increase width and height by 1 pixel
      var roundingOffset = 0;
      if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
        roundingOffset = 1;
      }
      var rect = {
        width: width + roundingOffset,
        height: height + roundingOffset,
        x: -Math.round(strokeWidth / 2 + blurRadius) +
          Math.min(shadowOffsetX, 0) +
          fillRect.x,
        y: -Math.round(strokeWidth / 2 + blurRadius) +
          Math.min(shadowOffsetY, 0) +
          fillRect.y
      };
      if (!skipTransform) {
        return this._transformedRect(rect);
      }
      return rect;
    },
    drawScene: function(can, top, caching, skipBuffer) {
      var layer = this.getLayer(),
        canvas = can || layer.getCanvas(),
        context = canvas.getContext(),
        cachedCanvas = this._cache.canvas,
        drawFunc = this.sceneFunc(),
        hasShadow = this.hasShadow(),
        hasStroke = this.hasStroke(),
        stage,
        bufferCanvas,
        bufferContext;

      if (!this.isVisible()) {
        return this;
      }
      if (cachedCanvas) {
        context.save();
        layer._applyTransform(this, context, top);
        this._drawCachedSceneCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      // if buffer canvas is needed
      if (this._useBufferCanvas(caching) && !skipBuffer) {
        stage = this.getStage();
        bufferCanvas = stage.bufferCanvas;
        bufferContext = bufferCanvas.getContext();
        bufferContext.clear();
        bufferContext.save();
        bufferContext._applyLineJoin(this);
        // layer might be undefined if we are using cache before adding to layer
        if (!caching) {
          if (layer) {
            layer._applyTransform(this, bufferContext, top);
          } else {
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          }
        }

        drawFunc.call(this, bufferContext);
        bufferContext.restore();

        var ratio = bufferCanvas.pixelRatio;
        if (hasShadow && !canvas.hitCanvas) {
          context.save();

          context._applyShadow(this);
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(
            bufferCanvas._canvas,
            0,
            0,
            bufferCanvas.width / ratio,
            bufferCanvas.height / ratio
          );
          context.restore();
        } else {
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(
            bufferCanvas._canvas,
            0,
            0,
            bufferCanvas.width / ratio,
            bufferCanvas.height / ratio
          );
        }
      } else {
        // if buffer canvas is not needed
        context._applyLineJoin(this);
        // layer might be undefined if we are using cache before adding to layer
        if (!caching) {
          if (layer) {
            layer._applyTransform(this, context, top);
          } else {
            var o = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
          }
        }

        if (hasShadow && hasStroke && !canvas.hitCanvas) {
          context.save();
          // apply shadow
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          context._applyShadow(this);

          drawFunc.call(this, context);
          context.restore();
          // if shape has stroke we need to redraw shape
          // otherwise we will see a shadow under stroke (and over fill)
          // but I think this is unexpected behavior
          if (this.hasFill() && this.getShadowForStrokeEnabled()) {
            drawFunc.call(this, context);
          }
        } else if (hasShadow && !canvas.hitCanvas) {
          context.save();
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          context._applyShadow(this);
          drawFunc.call(this, context);
          context.restore();
        } else {
          if (!caching) {
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          drawFunc.call(this, context);
        }
      }
      context.restore();
      return this;
    },
    drawHit: function(can, top, caching) {
      var layer = this.getLayer(),
        canvas = can || layer.hitCanvas,
        context = canvas.getContext(),
        drawFunc = this.hitFunc() || this.sceneFunc(),
        cachedCanvas = this._cache.canvas,
        cachedHitCanvas = cachedCanvas && cachedCanvas.hit;

      if (!this.shouldDrawHit(canvas)) {
        return this;
      }
      if (layer) {
        layer.clearHitCache();
      }
      if (cachedHitCanvas) {
        context.save();
        layer._applyTransform(this, context, top);
        this._drawCachedHitCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      context._applyLineJoin(this);
      if (!caching) {
        if (layer) {
          layer._applyTransform(this, context, top);
        } else {
          var o = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        }
      }
      drawFunc.call(this, context);
      context.restore();
      return this;
    },
    /**
        * draw hit graph using the cached scene canvas
        * @method
        * @memberof Konva.Shape.prototype
        * @param {Integer} alphaThreshold alpha channel threshold that determines whether or not
        *  a pixel should be drawn onto the hit graph.  Must be a value between 0 and 255.
        *  The default is 0
        * @returns {Konva.Shape}
        * @example
        * shape.cache();
        * shape.drawHitFromCache();
        */
    drawHitFromCache: function(alphaThreshold) {
      var threshold = alphaThreshold || 0,
        cachedCanvas = this._cache.canvas,
        sceneCanvas = this._getCachedSceneCanvas(),
        hitCanvas = cachedCanvas.hit,
        hitContext = hitCanvas.getContext(),
        hitWidth = hitCanvas.getWidth(),
        hitHeight = hitCanvas.getHeight(),
        hitImageData,
        hitData,
        len,
        rgbColorKey,
        i,
        alpha;

      hitContext.clear();
      hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);

      try {
        hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
        hitData = hitImageData.data;
        len = hitData.length;
        rgbColorKey = Konva.Util._hexToRgb(this.colorKey);

        // replace non transparent pixels with color key
        for (i = 0; i < len; i += 4) {
          alpha = hitData[i + 3];
          if (alpha > threshold) {
            hitData[i] = rgbColorKey.r;
            hitData[i + 1] = rgbColorKey.g;
            hitData[i + 2] = rgbColorKey.b;
            hitData[i + 3] = 255;
          } else {
            hitData[i + 3] = 0;
          }
        }
        hitContext.putImageData(hitImageData, 0, 0);
      } catch (e) {
        Konva.Util.error(
          'Unable to draw hit graph from cached scene canvas. ' + e.message
        );
      }

      return this;
    }
  });
  Konva.Util.extend(Konva.Shape, Konva.Node);

  // add getters and setters
  Konva.Factory.addGetterSetter(Konva.Shape, 'stroke');

  /**
     * get/set stroke color
     * @name stroke
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} color
     * @returns {String}
     * @example
     * // get stroke color
     * var stroke = shape.stroke();
     *
     * // set stroke color with color string
     * shape.stroke('green');
     *
     * // set stroke color with hex
     * shape.stroke('#00ff00');
     *
     * // set stroke color with rgb
     * shape.stroke('rgb(0,255,0)');
     *
     * // set stroke color with rgba and make it 50% opaque
     * shape.stroke('rgba(0,255,0,0.5');
     */

  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'strokeRed',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'strokeGreen',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'strokeBlue',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'strokeAlpha',
    1,
    Konva.Validators.alphaComponent
  );

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeWidth', 2);

  /**
     * get/set stroke width
     * @name strokeWidth
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} strokeWidth
     * @returns {Number}
     * @example
     * // get stroke width
     * var strokeWidth = shape.strokeWidth();
     *
     * // set stroke width
     * shape.strokeWidth();
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeHitEnabled', true);

  /**
     * get/set strokeHitEnabled property. Useful for performance optimization.
     * You may set `shape.strokeHitEnabled(false)`. In this case stroke will be no draw on hit canvas, so hit area
     * of shape will be decreased (by lineWidth / 2). Remember that non closed line with `strokeHitEnabled = false`
     * will be not drawn on hit canvas, that is mean line will no trigger pointer events (like mouseover)
     * Default value is true
     * @name strokeHitEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} strokeHitEnabled
     * @returns {Boolean}
     * @example
     * // get strokeHitEnabled
     * var strokeHitEnabled = shape.strokeHitEnabled();
     *
     * // set strokeHitEnabled
     * shape.strokeHitEnabled();
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'perfectDrawEnabled', true);

  /**
     * get/set perfectDrawEnabled. If a shape has fill, stroke and opacity you may set `perfectDrawEnabled` to false to improve performance.
     * See http://konvajs.github.io/docs/performance/Disable_Perfect_Draw.html for more information.
     * Default value is true
     * @name perfectDrawEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} perfectDrawEnabled
     * @returns {Boolean}
     * @example
     * // get perfectDrawEnabled
     * var perfectDrawEnabled = shape.perfectDrawEnabled();
     *
     * // set perfectDrawEnabled
     * shape.perfectDrawEnabled();
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowForStrokeEnabled', true);

  /**
     * get/set shadowForStrokeEnabled. Useful for performance optimization.
     * You may set `shape.shadowForStrokeEnabled(false)`. In this case stroke will be no draw shadow for stroke.
     * Remember if you set `shadowForStrokeEnabled = false` for non closed line - that line with have no shadow!.
     * Default value is true
     * @name shadowForStrokeEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} shadowForStrokeEnabled
     * @returns {Boolean}
     * @example
     * // get shadowForStrokeEnabled
     * var shadowForStrokeEnabled = shape.shadowForStrokeEnabled();
     *
     * // set shadowForStrokeEnabled
     * shape.shadowForStrokeEnabled();
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'lineJoin');

  /**
     * get/set line join.  Can be miter, round, or bevel.  The
     *  default is miter
     * @name lineJoin
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} lineJoin
     * @returns {String}
     * @example
     * // get line join
     * var lineJoin = shape.lineJoin();
     *
     * // set line join
     * shape.lineJoin('round');
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'lineCap');

  /**
     * get/set line cap.  Can be butt, round, or square
     * @name lineCap
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} lineCap
     * @returns {String}
     * @example
     * // get line cap
     * var lineCap = shape.lineCap();
     *
     * // set line cap
     * shape.lineCap('round');
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'sceneFunc');

  /**
     * get/set scene draw function
     * @name sceneFunc
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Function} drawFunc drawing function
     * @returns {Function}
     * @example
     * // get scene draw function
     * var sceneFunc = shape.sceneFunc();
     *
     * // set scene draw function
     * shape.sceneFunc(function(context) {
     *   context.beginPath();
     *   context.rect(0, 0, this.width(), this.height());
     *   context.closePath();
     *   context.fillStrokeShape(this);
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'hitFunc');

  /**
     * get/set hit draw function
     * @name hitFunc
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Function} drawFunc drawing function
     * @returns {Function}
     * @example
     * // get hit draw function
     * var hitFunc = shape.hitFunc();
     *
     * // set hit draw function
     * shape.hitFunc(function(context) {
     *   context.beginPath();
     *   context.rect(0, 0, this.width(), this.height());
     *   context.closePath();
     *   context.fillStrokeShape(this);
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'dash');

  /**
     * get/set dash array for stroke.
     * @name dash
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Array} dash
     * @returns {Array}
     * @example
     *  // apply dashed stroke that is 10px long and 5 pixels apart
     *  line.dash([10, 5]);
     *  // apply dashed stroke that is made up of alternating dashed
     *  // lines that are 10px long and 20px apart, and dots that have
     *  // a radius of 5px and are 20px apart
     *  line.dash([10, 20, 0.001, 20]);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'dashOffset', 0);

  /**
     * get/set dash offset for stroke.
     * @name dash
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} dash offset
     * @returns {Number}
     * @example
     *  // apply dashed stroke that is 10px long and 5 pixels apart with an offset of 5px
     *  line.dash([10, 5]);
     *  line.dashOffset(5);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowColor');

  /**
     * get/set shadow color
     * @name shadowColor
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} color
     * @returns {String}
     * @example
     * // get shadow color
     * var shadow = shape.shadowColor();
     *
     * // set shadow color with color string
     * shape.shadowColor('green');
     *
     * // set shadow color with hex
     * shape.shadowColor('#00ff00');
     *
     * // set shadow color with rgb
     * shape.shadowColor('rgb(0,255,0)');
     *
     * // set shadow color with rgba and make it 50% opaque
     * shape.shadowColor('rgba(0,255,0,0.5');
     */

  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'shadowRed',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'shadowGreen',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'shadowBlue',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'shadowAlpha',
    1,
    Konva.Validators.alphaComponent
  );

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowBlur');

  /**
     * get/set shadow blur
     * @name shadowBlur
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} blur
     * @returns {Number}
     * @example
     * // get shadow blur
     * var shadowBlur = shape.shadowBlur();
     *
     * // set shadow blur
     * shape.shadowBlur(10);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOpacity');

  /**
     * get/set shadow opacity.  must be a value between 0 and 1
     * @name shadowOpacity
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} opacity
     * @returns {Number}
     * @example
     * // get shadow opacity
     * var shadowOpacity = shape.shadowOpacity();
     *
     * // set shadow opacity
     * shape.shadowOpacity(0.5);
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'shadowOffset', [
    'x',
    'y'
  ]);

  /**
     * get/set shadow offset
     * @name shadowOffset
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} offset
     * @param {Number} offset.x
     * @param {Number} offset.y
     * @returns {Object}
     * @example
     * // get shadow offset
     * var shadowOffset = shape.shadowOffset();
     *
     * // set shadow offset
     * shape.shadowOffset({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetX', 0);

  /**
     * get/set shadow offset x
     * @name shadowOffsetX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get shadow offset x
     * var shadowOffsetX = shape.shadowOffsetX();
     *
     * // set shadow offset x
     * shape.shadowOffsetX(5);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowOffsetY', 0);

  /**
     * get/set shadow offset y
     * @name shadowOffsetY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get shadow offset y
     * var shadowOffsetY = shape.shadowOffsetY();
     *
     * // set shadow offset y
     * shape.shadowOffsetY(5);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternImage');

  /**
     * get/set fill pattern image
     * @name fillPatternImage
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Image} image object
     * @returns {Image}
     * @example
     * // get fill pattern image
     * var fillPatternImage = shape.fillPatternImage();
     *
     * // set fill pattern image
     * var imageObj = new Image();
     * imageObj.onload = function() {
     *   shape.fillPatternImage(imageObj);
     * };
     * imageObj.src = 'path/to/image/jpg';
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fill');

  /**
     * get/set fill color
     * @name fill
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} color
     * @returns {String}
     * @example
     * // get fill color
     * var fill = shape.fill();
     *
     * // set fill color with color string
     * shape.fill('green');
     *
     * // set fill color with hex
     * shape.fill('#00ff00');
     *
     * // set fill color with rgb
     * shape.fill('rgb(0,255,0)');
     *
     * // set fill color with rgba and make it 50% opaque
     * shape.fill('rgba(0,255,0,0.5');
     *
     * // shape without fill
     * shape.fill(null);
     */

  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'fillRed',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'fillGreen',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'fillBlue',
    0,
    Konva.Validators.RGBComponent
  );
  Konva.Factory.addDeprecatedGetterSetter(
    Konva.Shape,
    'fillAlpha',
    1,
    Konva.Validators.alphaComponent
  );

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternX', 0);

  /**
     * get/set fill pattern x
     * @name fillPatternX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill pattern x
     * var fillPatternX = shape.fillPatternX();
     * // set fill pattern x
     * shape.fillPatternX(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternY', 0);

  /**
     * get/set fill pattern y
     * @name fillPatternY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill pattern y
     * var fillPatternY = shape.fillPatternY();
     * // set fill pattern y
     * shape.fillPatternY(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientColorStops');

  /**
     * get/set fill linear gradient color stops
     * @name fillLinearGradientColorStops
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Array} colorStops
     * @returns {Array} colorStops
     * @example
     * // get fill linear gradient color stops
     * var colorStops = shape.fillLinearGradientColorStops();
     *
     * // create a linear gradient that starts with red, changes to blue
     * // halfway through, and then changes to green
     * shape.fillLinearGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
     */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartRadius',
    0
  );

  /**
     * get/set fill radial gradient start radius
     * @name fillRadialGradientStartRadius
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} radius
     * @returns {Number}
     * @example
     * // get radial gradient start radius
     * var startRadius = shape.fillRadialGradientStartRadius();
     *
     * // set radial gradient start radius
     * shape.fillRadialGradientStartRadius(0);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndRadius', 0);

  /**
     * get/set fill radial gradient end radius
     * @name fillRadialGradientEndRadius
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} radius
     * @returns {Number}
     * @example
     * // get radial gradient end radius
     * var endRadius = shape.fillRadialGradientEndRadius();
     *
     * // set radial gradient end radius
     * shape.fillRadialGradientEndRadius(100);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientColorStops');

  /**
     * get/set fill radial gradient color stops
     * @name fillRadialGradientColorStops
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} colorStops
     * @returns {Array}
     * @example
     * // get fill radial gradient color stops
     * var colorStops = shape.fillRadialGradientColorStops();
     *
     * // create a radial gradient that starts with red, changes to blue
     * // halfway through, and then changes to green
     * shape.fillRadialGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRepeat', 'repeat');

  /**
     * get/set fill pattern repeat.  Can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'.  The default is 'repeat'
     * @name fillPatternRepeat
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} repeat
     * @returns {String}
     * @example
     * // get fill pattern repeat
     * var repeat = shape.fillPatternRepeat();
     *
     * // repeat pattern in x direction only
     * shape.fillPatternRepeat('repeat-x');
     *
     * // do not repeat the pattern
     * shape.fillPatternRepeat('no repeat');
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillEnabled', true);

  /**
     * get/set fill enabled flag
     * @name fillEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get fill enabled flag
     * var fillEnabled = shape.fillEnabled();
     *
     * // disable fill
     * shape.fillEnabled(false);
     *
     * // enable fill
     * shape.fillEnabled(true);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeEnabled', true);

  /**
     * get/set stroke enabled flag
     * @name strokeEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get stroke enabled flag
     * var strokeEnabled = shape.strokeEnabled();
     *
     * // disable stroke
     * shape.strokeEnabled(false);
     *
     * // enable stroke
     * shape.strokeEnabled(true);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'shadowEnabled', true);

  /**
     * get/set shadow enabled flag
     * @name shadowEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get shadow enabled flag
     * var shadowEnabled = shape.shadowEnabled();
     *
     * // disable shadow
     * shape.shadowEnabled(false);
     *
     * // enable shadow
     * shape.shadowEnabled(true);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'dashEnabled', true);

  /**
     * get/set dash enabled flag
     * @name dashEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get dash enabled flag
     * var dashEnabled = shape.dashEnabled();
     *
     * // disable dash
     * shape.dashEnabled(false);
     *
     * // enable dash
     * shape.dashEnabled(true);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'strokeScaleEnabled', true);

  /**
     * get/set strokeScale enabled flag
     * @name strokeScaleEnabled
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get stroke scale enabled flag
     * var strokeScaleEnabled = shape.strokeScaleEnabled();
     *
     * // disable stroke scale
     * shape.strokeScaleEnabled(false);
     *
     * // enable stroke scale
     * shape.strokeScaleEnabled(true);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPriority', 'color');

  /**
     * get/set fill priority.  can be color, pattern, linear-gradient, or radial-gradient.  The default is color.
     *   This is handy if you want to toggle between different fill types.
     * @name fillPriority
     * @method
     * @memberof Konva.Shape.prototype
     * @param {String} priority
     * @returns {String}
     * @example
     * // get fill priority
     * var fillPriority = shape.fillPriority();
     *
     * // set fill priority
     * shape.fillPriority('linear-gradient');
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternOffset', [
    'x',
    'y'
  ]);

  /**
     * get/set fill pattern offset
     * @name fillPatternOffset
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} offset
     * @param {Number} offset.x
     * @param {Number} offset.y
     * @returns {Object}
     * @example
     * // get fill pattern offset
     * var patternOffset = shape.fillPatternOffset();
     *
     * // set fill pattern offset
     * shape.fillPatternOffset({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetX', 0);
  /**
     * get/set fill pattern offset x
     * @name fillPatternOffsetX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill pattern offset x
     * var patternOffsetX = shape.fillPatternOffsetX();
     *
     * // set fill pattern offset x
     * shape.fillPatternOffsetX(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternOffsetY', 0);
  /**
     * get/set fill pattern offset y
     * @name fillPatternOffsetY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill pattern offset y
     * var patternOffsetY = shape.fillPatternOffsetY();
     *
     * // set fill pattern offset y
     * shape.fillPatternOffsetY(10);
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Shape, 'fillPatternScale', [
    'x',
    'y'
  ]);

  /**
     * get/set fill pattern scale
     * @name fillPatternScale
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} scale
     * @param {Number} scale.x
     * @param {Number} scale.y
     * @returns {Object}
     * @example
     * // get fill pattern scale
     * var patternScale = shape.fillPatternScale();
     *
     * // set fill pattern scale
     * shape.fillPatternScale({
     *   x: 2
     *   y: 2
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleX', 1);
  /**
     * get/set fill pattern scale x
     * @name fillPatternScaleX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill pattern scale x
     * var patternScaleX = shape.fillPatternScaleX();
     *
     * // set fill pattern scale x
     * shape.fillPatternScaleX(2);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternScaleY', 1);
  /**
     * get/set fill pattern scale y
     * @name fillPatternScaleY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill pattern scale y
     * var patternScaleY = shape.fillPatternScaleY();
     *
     * // set fill pattern scale y
     * shape.fillPatternScaleY(2);
     */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPoint',
    ['x', 'y']
  );

  /**
     * get/set fill linear gradient start point
     * @name fillLinearGradientStartPoint
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} startPoint
     * @param {Number} startPoint.x
     * @param {Number} startPoint.y
     * @returns {Object}
     * @example
     * // get fill linear gradient start point
     * var startPoint = shape.fillLinearGradientStartPoint();
     *
     * // set fill linear gradient start point
     * shape.fillLinearGradientStartPoint({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPointX',
    0
  );
  /**
     * get/set fill linear gradient start point x
     * @name fillLinearGradientStartPointX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill linear gradient start point x
     * var startPointX = shape.fillLinearGradientStartPointX();
     *
     * // set fill linear gradient start point x
     * shape.fillLinearGradientStartPointX(20);
     */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillLinearGradientStartPointY',
    0
  );
  /**
     * get/set fill linear gradient start point y
     * @name fillLinearGradientStartPointY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill linear gradient start point y
     * var startPointY = shape.fillLinearGradientStartPointY();
     *
     * // set fill linear gradient start point y
     * shape.fillLinearGradientStartPointY(20);
     */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillLinearGradientEndPoint',
    ['x', 'y']
  );

  /**
     * get/set fill linear gradient end point
     * @name fillLinearGradientEndPoint
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} endPoint
     * @param {Number} endPoint.x
     * @param {Number} endPoint.y
     * @returns {Object}
     * @example
     * // get fill linear gradient end point
     * var endPoint = shape.fillLinearGradientEndPoint();
     *
     * // set fill linear gradient end point
     * shape.fillLinearGradientEndPoint({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointX', 0);
  /**
     * get/set fill linear gradient end point x
     * @name fillLinearGradientEndPointX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill linear gradient end point x
     * var endPointX = shape.fillLinearGradientEndPointX();
     *
     * // set fill linear gradient end point x
     * shape.fillLinearGradientEndPointX(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillLinearGradientEndPointY', 0);
  /**
     * get/set fill linear gradient end point y
     * @name fillLinearGradientEndPointY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill linear gradient end point y
     * var endPointY = shape.fillLinearGradientEndPointY();
     *
     * // set fill linear gradient end point y
     * shape.fillLinearGradientEndPointY(20);
     */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPoint',
    ['x', 'y']
  );

  /**
     * get/set fill radial gradient start point
     * @name fillRadialGradientStartPoint
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} startPoint
     * @param {Number} startPoint.x
     * @param {Number} startPoint.y
     * @returns {Object}
     * @example
     * // get fill radial gradient start point
     * var startPoint = shape.fillRadialGradientStartPoint();
     *
     * // set fill radial gradient start point
     * shape.fillRadialGradientStartPoint({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPointX',
    0
  );
  /**
     * get/set fill radial gradient start point x
     * @name fillRadialGradientStartPointX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill radial gradient start point x
     * var startPointX = shape.fillRadialGradientStartPointX();
     *
     * // set fill radial gradient start point x
     * shape.fillRadialGradientStartPointX(20);
     */

  Konva.Factory.addGetterSetter(
    Konva.Shape,
    'fillRadialGradientStartPointY',
    0
  );
  /**
     * get/set fill radial gradient start point y
     * @name fillRadialGradientStartPointY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill radial gradient start point y
     * var startPointY = shape.fillRadialGradientStartPointY();
     *
     * // set fill radial gradient start point y
     * shape.fillRadialGradientStartPointY(20);
     */

  Konva.Factory.addComponentsGetterSetter(
    Konva.Shape,
    'fillRadialGradientEndPoint',
    ['x', 'y']
  );

  /**
     * get/set fill radial gradient end point
     * @name fillRadialGradientEndPoint
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Object} endPoint
     * @param {Number} endPoint.x
     * @param {Number} endPoint.y
     * @returns {Object}
     * @example
     * // get fill radial gradient end point
     * var endPoint = shape.fillRadialGradientEndPoint();
     *
     * // set fill radial gradient end point
     * shape.fillRadialGradientEndPoint({
     *   x: 20
     *   y: 10
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointX', 0);
  /**
     * get/set fill radial gradient end point x
     * @name fillRadialGradientEndPointX
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get fill radial gradient end point x
     * var endPointX = shape.fillRadialGradientEndPointX();
     *
     * // set fill radial gradient end point x
     * shape.fillRadialGradientEndPointX(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillRadialGradientEndPointY', 0);
  /**
     * get/set fill radial gradient end point y
     * @name fillRadialGradientEndPointY
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get fill radial gradient end point y
     * var endPointY = shape.fillRadialGradientEndPointY();
     *
     * // set fill radial gradient end point y
     * shape.fillRadialGradientEndPointY(20);
     */

  Konva.Factory.addGetterSetter(Konva.Shape, 'fillPatternRotation', 0);

  /**
     * get/set fill pattern rotation in degrees
     * @name fillPatternRotation
     * @method
     * @memberof Konva.Shape.prototype
     * @param {Number} rotation
     * @returns {Konva.Shape}
     * @example
     * // get fill pattern rotation
     * var patternRotation = shape.fillPatternRotation();
     *
     * // set fill pattern rotation
     * shape.fillPatternRotation(20);
     */

  Konva.Factory.backCompat(Konva.Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',

    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',

    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
  });

  Konva.Collection.mapMethods(Konva.Shape);
})(Konva);

(function() {
  'use strict';
  // CONSTANTS
  var STAGE = 'Stage',
    STRING = 'string',
    PX = 'px',
    MOUSEOUT = 'mouseout',
    MOUSELEAVE = 'mouseleave',
    MOUSEOVER = 'mouseover',
    MOUSEENTER = 'mouseenter',
    MOUSEMOVE = 'mousemove',
    MOUSEDOWN = 'mousedown',
    MOUSEUP = 'mouseup',
    CONTEXTMENU = 'contextmenu',
    CLICK = 'click',
    DBL_CLICK = 'dblclick',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend',
    TAP = 'tap',
    DBL_TAP = 'dbltap',
    TOUCHMOVE = 'touchmove',
    DOMMOUSESCROLL = 'DOMMouseScroll',
    MOUSEWHEEL = 'mousewheel',
    WHEEL = 'wheel',
    CONTENT_MOUSEOUT = 'contentMouseout',
    CONTENT_MOUSEOVER = 'contentMouseover',
    CONTENT_MOUSEMOVE = 'contentMousemove',
    CONTENT_MOUSEDOWN = 'contentMousedown',
    CONTENT_MOUSEUP = 'contentMouseup',
    CONTENT_CONTEXTMENU = 'contentContextmenu',
    CONTENT_CLICK = 'contentClick',
    CONTENT_DBL_CLICK = 'contentDblclick',
    CONTENT_TOUCHSTART = 'contentTouchstart',
    CONTENT_TOUCHEND = 'contentTouchend',
    CONTENT_DBL_TAP = 'contentDbltap',
    CONTENT_TAP = 'contentTap',
    CONTENT_TOUCHMOVE = 'contentTouchmove',
    CONTENT_WHEEL = 'contentWheel',
    DIV = 'div',
    RELATIVE = 'relative',
    KONVA_CONTENT = 'konvajs-content',
    SPACE = ' ',
    UNDERSCORE = '_',
    CONTAINER = 'container',
    EMPTY_STRING = '',
    EVENTS = [
      MOUSEDOWN,
      MOUSEMOVE,
      MOUSEUP,
      MOUSEOUT,
      TOUCHSTART,
      TOUCHMOVE,
      TOUCHEND,
      MOUSEOVER,
      DOMMOUSESCROLL,
      MOUSEWHEEL,
      WHEEL,
      CONTEXTMENU
    ],
    // cached variables
    eventsLength = EVENTS.length;

  function addEvent(ctx, eventName) {
    ctx.content.addEventListener(
      eventName,
      function(evt) {
        ctx[UNDERSCORE + eventName](evt);
      },
      false
    );
  }

  /**
     * Stage constructor.  A stage is used to contain multiple layers
     * @constructor
     * @memberof Konva
     * @augments Konva.Container
     * @param {Object} config
     * @param {String|Element} config.container Container selector or DOM element
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var stage = new Konva.Stage({
         *   width: 500,
         *   height: 800,
         *   container: 'containerId' // or "#containerId" or ".containerClass"
         * });
     */
  Konva.Stage = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.Stage, {
    ___init: function(config) {
      this.nodeType = STAGE;
      // call super constructor
      Konva.Container.call(this, config);
      this._id = Konva.idCounter++;
      this._buildDOM();
      this._bindContentEvents();
      this._enableNestedTransforms = false;
      Konva.stages.push(this);
    },
    _validateAdd: function(child) {
      if (child.getType() !== 'Layer') {
        Konva.Util.throw('You may only add layers to the stage.');
      }
    },
    /**
         * set container dom element which contains the stage wrapper div element
         * @method
         * @memberof Konva.Stage.prototype
         * @param {DomElement} container can pass in a dom element or id string
         */
    setContainer: function(container) {
      if (typeof container === STRING) {
        if (container.charAt(0) === '.') {
          var className = container.slice(1);
          container = Konva.document.getElementsByClassName(className)[0];
        } else {
          var id;
          if (container.charAt(0) !== '#') {
            id = container;
          } else {
            id = container.slice(1);
          }
          container = Konva.document.getElementById(id);
        }
        if (!container) {
          throw 'Can not find container in document with id ' + id;
        }
      }
      this._setAttr(CONTAINER, container);
      return this;
    },
    shouldDrawHit: function() {
      return true;
    },
    draw: function() {
      Konva.Node.prototype.draw.call(this);
      return this;
    },
    /**
         * draw layer scene graphs
         * @name draw
         * @method
         * @memberof Konva.Stage.prototype
         */

    /**
         * draw layer hit graphs
         * @name drawHit
         * @method
         * @memberof Konva.Stage.prototype
         */

    /**
         * set height
         * @method
         * @memberof Konva.Stage.prototype
         * @param {Number} height
         */
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      this._resizeDOM();
      return this;
    },
    /**
         * set width
         * @method
         * @memberof Konva.Stage.prototype
         * @param {Number} width
         */
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      this._resizeDOM();
      return this;
    },
    /**
         * clear all layers
         * @method
         * @memberof Konva.Stage.prototype
         */
    clear: function() {
      var layers = this.children, len = layers.length, n;

      for (n = 0; n < len; n++) {
        layers[n].clear();
      }
      return this;
    },
    clone: function(obj) {
      if (!obj) {
        obj = {};
      }
      obj.container = Konva.document.createElement(DIV);
      return Konva.Container.prototype.clone.call(this, obj);
    },
    /**
         * destroy stage
         * @method
         * @memberof Konva.Stage.prototype
         */
    destroy: function() {
      var content = this.content;
      Konva.Container.prototype.destroy.call(this);

      if (content && Konva.Util._isInDocument(content)) {
        this.getContainer().removeChild(content);
      }
      var index = Konva.stages.indexOf(this);
      if (index > -1) {
        Konva.stages.splice(index, 1);
      }
      return this;
    },
    /**
         * get pointer position which can be a touch position or mouse position
         * @method
         * @memberof Konva.Stage.prototype
         * @returns {Object}
         */
    getPointerPosition: function() {
      return this.pointerPos;
    },
    getStage: function() {
      return this;
    },
    /**
         * get stage content div element which has the
         *  the class name "konvajs-content"
         * @method
         * @memberof Konva.Stage.prototype
         */
    getContent: function() {
      return this.content;
    },
    /**
         * Creates a composite data URL
         * @method
         * @memberof Konva.Stage.prototype
         * @param {Object} config
         * @param {Function} [config.callback] function executed when the composite has completed. Deprecated as method is sync now.
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         */
    toDataURL: function(config) {
      config = config || {};

      var mimeType = config.mimeType || null,
        quality = config.quality || null,
        x = config.x || 0,
        y = config.y || 0,
        canvas = new Konva.SceneCanvas({
          width: config.width || this.getWidth(),
          height: config.height || this.getHeight(),
          pixelRatio: config.pixelRatio
        }),
        _context = canvas.getContext()._context,
        layers = this.children;

      if (x || y) {
        _context.translate((-1) * x, (-1) * y);
      }

      layers.each(function(layer) {
        var width = layer.getCanvas().getWidth();
        var height = layer.getCanvas().getHeight();
        var ratio = layer.getCanvas().getPixelRatio();
        _context.drawImage(
          layer.getCanvas()._canvas,
          0,
          0,
          width / ratio,
          height / ratio
        );
      });
      var src = canvas.toDataURL(mimeType, quality);

      if (config.callback) {
        config.callback(src);
      }

      return src;
    },
    /**
         * converts stage into an image.
         * @method
         * @memberof Konva.Stage.prototype
         * @param {Object} config
         * @param {Function} config.callback function executed when the composite has completed
         * @param {String} [config.mimeType] can be "image/png" or "image/jpeg".
         *  "image/png" is the default
         * @param {Number} [config.x] x position of canvas section
         * @param {Number} [config.y] y position of canvas section
         * @param {Number} [config.width] width of canvas section
         * @param {Number} [config.height] height of canvas section
         * @param {Number} [config.quality] jpeg quality.  If using an "image/jpeg" mimeType,
         *  you can specify the quality from 0 to 1, where 0 is very poor quality and 1
         *  is very high quality
         */
    toImage: function(config) {
      var cb = config.callback;

      config.callback = function(dataUrl) {
        Konva.Util._getImage(dataUrl, function(img) {
          cb(img);
        });
      };
      this.toDataURL(config);
    },
    /**
         * get visible intersection shape. This is the preferred
         *  method for determining if a point intersects a shape or not
         * @method
         * @memberof Konva.Stage.prototype
         * @param {Object} pos
         * @param {Number} pos.x
         * @param {Number} pos.y
         * @param {String} [selector]
         * @returns {Konva.Node}
         * @example
         * var shape = stage.getIntersection({x: 50, y: 50});
         * // or if you interested in shape parent:
         * var group = stage.getIntersection({x: 50, y: 50}, 'Group');
         */
    getIntersection: function(pos, selector) {
      var layers = this.getChildren(),
        len = layers.length,
        end = len - 1,
        n,
        shape;

      for (n = end; n >= 0; n--) {
        shape = layers[n].getIntersection(pos, selector);
        if (shape) {
          return shape;
        }
      }

      return null;
    },
    _resizeDOM: function() {
      if (this.content) {
        var width = this.getWidth(),
          height = this.getHeight(),
          layers = this.getChildren(),
          len = layers.length,
          n,
          layer;

        // set content dimensions
        this.content.style.width = width + PX;
        this.content.style.height = height + PX;

        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);

        // set layer dimensions
        for (n = 0; n < len; n++) {
          layer = layers[n];
          layer.setSize(width, height);
          layer.batchDraw();
        }
      }
    },
    /**
         * add layer or layers to stage
         * @method
         * @memberof Konva.Stage.prototype
         * @param {...Konva.Layer} layer
         * @example
         * stage.add(layer1, layer2, layer3);
         */
    add: function(layer) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      Konva.Container.prototype.add.call(this, layer);
      layer._setCanvasSize(this.width(), this.height());

      // draw layer and append canvas to container
      layer.draw();
      this.content.appendChild(layer.canvas._canvas);

      // chainable
      return this;
    },
    getParent: function() {
      return null;
    },
    getLayer: function() {
      return null;
    },
    /**
         * returns a {@link Konva.Collection} of layers
         * @method
         * @memberof Konva.Stage.prototype
         */
    getLayers: function() {
      return this.getChildren();
    },
    _bindContentEvents: function() {
      for (var n = 0; n < eventsLength; n++) {
        addEvent(this, EVENTS[n]);
      }
    },
    _mouseover: function(evt) {
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        this._fire(CONTENT_MOUSEOVER, { evt: evt });
      }
    },
    _mouseout: function(evt) {
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var targetShape = this.targetShape;

        if (targetShape && !Konva.isDragging()) {
          targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
          targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
          this.targetShape = null;
        }
        this.pointerPos = undefined;

        this._fire(CONTENT_MOUSEOUT, { evt: evt });
      }
    },
    _mousemove: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchmove(evt);
      }
      // workaround fake mousemove event in chrome browser https://code.google.com/p/chromium/issues/detail?id=161464
      if (
        (typeof evt.movementX !== 'undefined' ||
          typeof evt.movementY !== 'undefined') &&
        evt.movementY === 0 &&
        evt.movementX === 0
      ) {
        return null;
      }
      if (Konva.UA.mobile) {
        return null;
      }
      this._setPointerPosition(evt);
      var shape;

      if (!Konva.isDragging()) {
        shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          if (
            !Konva.isDragging() &&
            (!this.targetShape || this.targetShape._id !== shape._id)
          ) {
            if (this.targetShape) {
              this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt }, shape);
              this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt }, shape);
            }
            shape._fireAndBubble(MOUSEOVER, { evt: evt }, this.targetShape);
            shape._fireAndBubble(MOUSEENTER, { evt: evt }, this.targetShape);
            this.targetShape = shape;
          } else {
            shape._fireAndBubble(MOUSEMOVE, { evt: evt });
          }
        } else {
          /*
                 * if no shape was detected, clear target shape and try
                 * to run mouseout from previous target shape
                 */
          if (this.targetShape && !Konva.isDragging()) {
            this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
            this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
            this.targetShape = null;
          }
        }

        // content event
        this._fire(CONTENT_MOUSEMOVE, { evt: evt });
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      if (evt.preventDefault) {
        evt.preventDefault();
      }
    },
    _mousedown: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchstart(evt);
      }
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var shape = this.getIntersection(this.getPointerPosition());

        Konva.listenClickTap = true;

        if (shape && shape.isListening()) {
          this.clickStartShape = shape;
          shape._fireAndBubble(MOUSEDOWN, { evt: evt });
        }

        // content event
        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      if (evt.preventDefault) {
        evt.preventDefault();
      }
    },
    _mouseup: function(evt) {
      // workaround for mobile IE to force touch event when unhandled pointer event elevates into a mouse event
      if (Konva.UA.ieMobile) {
        return this._touchend(evt);
      }
      if (!Konva.UA.mobile) {
        this._setPointerPosition(evt);
        var shape = this.getIntersection(this.getPointerPosition()),
          clickStartShape = this.clickStartShape,
          fireDblClick = false,
          dd = Konva.DD;

        if (Konva.inDblClickWindow) {
          fireDblClick = true;
          Konva.inDblClickWindow = false;
        } else if (!dd || !dd.justDragged) {
          // don't set inDblClickWindow after dragging
          Konva.inDblClickWindow = true;
        } else if (dd) {
          dd.justDragged = false;
        }

        setTimeout(
          function() {
            Konva.inDblClickWindow = false;
          },
          Konva.dblClickWindow
        );

        if (shape && shape.isListening()) {
          shape._fireAndBubble(MOUSEUP, { evt: evt });

          // detect if click or double click occurred
          if (
            Konva.listenClickTap &&
            clickStartShape &&
            clickStartShape._id === shape._id
          ) {
            shape._fireAndBubble(CLICK, { evt: evt });

            if (fireDblClick) {
              shape._fireAndBubble(DBL_CLICK, { evt: evt });
            }
          }
        }
        // content events
        this._fire(CONTENT_MOUSEUP, { evt: evt });
        if (Konva.listenClickTap) {
          this._fire(CONTENT_CLICK, { evt: evt });
          if (fireDblClick) {
            this._fire(CONTENT_DBL_CLICK, { evt: evt });
          }
        }

        Konva.listenClickTap = false;
      }

      // always call preventDefault for desktop events because some browsers
      // try to drag and drop the canvas element
      if (evt.preventDefault) {
        evt.preventDefault();
      }
    },
    _contextmenu: function(evt) {
      this._fire(CONTENT_CONTEXTMENU, { evt: evt });
    },
    _touchstart: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition());

      Konva.listenClickTap = true;

      if (shape && shape.isListening()) {
        this.tapStartShape = shape;
        shape._fireAndBubble(TOUCHSTART, { evt: evt });

        // only call preventDefault if the shape is listening for events
        if (
          shape.isListening() && shape.preventDefault() && evt.preventDefault
        ) {
          evt.preventDefault();
        }
      }
      // content event
      this._fire(CONTENT_TOUCHSTART, { evt: evt });
    },
    _touchend: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition()),
        fireDblClick = false;

      if (Konva.inDblClickWindow) {
        fireDblClick = true;
        Konva.inDblClickWindow = false;
      } else {
        Konva.inDblClickWindow = true;
      }

      setTimeout(
        function() {
          Konva.inDblClickWindow = false;
        },
        Konva.dblClickWindow
      );

      if (shape && shape.isListening()) {
        shape._fireAndBubble(TOUCHEND, { evt: evt });

        // detect if tap or double tap occurred
        if (
          Konva.listenClickTap &&
          this.tapStartShape &&
          shape._id === this.tapStartShape._id
        ) {
          shape._fireAndBubble(TAP, { evt: evt });

          if (fireDblClick) {
            shape._fireAndBubble(DBL_TAP, { evt: evt });
          }
        }
        // only call preventDefault if the shape is listening for events
        if (
          shape.isListening() && shape.preventDefault() && evt.preventDefault
        ) {
          evt.preventDefault();
        }
      }
      // content events
      this._fire(CONTENT_TOUCHEND, { evt: evt });
      if (Konva.listenClickTap) {
        this._fire(CONTENT_TAP, { evt: evt });
        if (fireDblClick) {
          this._fire(CONTENT_DBL_TAP, { evt: evt });
        }
      }

      Konva.listenClickTap = false;
    },
    _touchmove: function(evt) {
      this._setPointerPosition(evt);
      var dd = Konva.DD, shape;
      if (!Konva.isDragging()) {
        shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(TOUCHMOVE, { evt: evt });
          // only call preventDefault if the shape is listening for events
          if (
            shape.isListening() && shape.preventDefault() && evt.preventDefault
          ) {
            evt.preventDefault();
          }
        }
        this._fire(CONTENT_TOUCHMOVE, { evt: evt });
      }
      if (dd) {
        if (Konva.isDragging() && Konva.DD.node.preventDefault()) {
          evt.preventDefault();
        }
      }
    },
    _DOMMouseScroll: function(evt) {
      this._mousewheel(evt);
    },
    _mousewheel: function(evt) {
      this._setPointerPosition(evt);
      var shape = this.getIntersection(this.getPointerPosition());

      if (shape && shape.isListening()) {
        shape._fireAndBubble(WHEEL, { evt: evt });
      }
      this._fire(CONTENT_WHEEL, { evt: evt });
    },
    _wheel: function(evt) {
      this._mousewheel(evt);
    },
    _setPointerPosition: function(evt) {
      var contentPosition = this._getContentPosition(), x = null, y = null;
      evt = evt ? evt : window.event;

      // touch events
      if (evt.touches !== undefined) {
        // currently, only handle one finger
        if (evt.touches.length > 0) {
          var touch = evt.touches[0];
          // get the information for finger #1
          x = touch.offsetX !== undefined
            ? touch.offsetX
            : touch.clientX - contentPosition.left;
          y = touch.offsetY !== undefined
            ? touch.offsetY
            : touch.clientY - contentPosition.top;
        }
      } else {
        // mouse events
        x = evt.offsetX !== undefined
          ? evt.offsetX
          : evt.clientX - contentPosition.left;
        y = evt.offsetY !== undefined
          ? evt.offsetY
          : evt.clientY - contentPosition.top;
      }
      if (x !== null && y !== null) {
        this.pointerPos = {
          x: x,
          y: y
        };
      }
    },
    _getContentPosition: function() {
      var rect = this.content.getBoundingClientRect
        ? this.content.getBoundingClientRect()
        : { top: 0, left: 0 };
      return {
        top: rect.top,
        left: rect.left
      };
    },
    _buildDOM: function() {
      var container = this.getContainer();
      if (!container) {
        if (Konva.Util.isBrowser()) {
          throw 'Stage has no container. A container is required.';
        } else {
          // automatically create element for jsdom in nodejs env
          container = Konva.document.createElement(DIV);
        }
      }
      // clear content inside container
      container.innerHTML = EMPTY_STRING;

      // content
      this.content = Konva.document.createElement(DIV);
      this.content.style.position = RELATIVE;
      this.content.className = KONVA_CONTENT;
      this.content.setAttribute('role', 'presentation');
      container.appendChild(this.content);

      // the buffer canvas pixel ratio must be 1 because it is used as an
      // intermediate canvas before copying the result onto a scene canvas.
      // not setting it to 1 will result in an over compensation
      this.bufferCanvas = new Konva.SceneCanvas();
      this.bufferHitCanvas = new Konva.HitCanvas({ pixelRatio: 1 });

      this._resizeDOM();
    },
    _onContent: function(typesStr, handler) {
      var types = typesStr.split(SPACE), len = types.length, n, baseEvent;

      for (n = 0; n < len; n++) {
        baseEvent = types[n];
        this.content.addEventListener(baseEvent, handler, false);
      }
    },
    // currently cache function is now working for stage, because stage has no its own canvas element
    // TODO: may be it is better to cache all children layers?
    cache: function() {
      Konva.Util.warn(
        'Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.'
      );
    },
    clearCache: function() {}
  });
  Konva.Util.extend(Konva.Stage, Konva.Container);

  // add getters and setters
  Konva.Factory.addGetter(Konva.Stage, 'container');
  Konva.Factory.addOverloadedGetterSetter(Konva.Stage, 'container');

  /**
     * get container DOM element
     * @name container
     * @method
     * @memberof Konva.Stage.prototype
     * @returns {DomElement} container
     * @example
     * // get container
     * var container = stage.container();
     * // set container
     * var container = document.createElement('div');
     * body.appendChild(container);
     * stage.container(container);
     */
})();

(function() {
  'use strict';
  /**
     * BaseLayer constructor.
     * @constructor
     * @memberof Konva
     * @augments Konva.Container
     * @param {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

     * @example
     * var layer = new Konva.Layer();
     */
  Konva.BaseLayer = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.BaseLayer, {
    ___init: function(config) {
      this.nodeType = 'Layer';
      Konva.Container.call(this, config);
    },
    createPNGStream: function() {
      return this.canvas._canvas.createPNGStream();
    },
    /**
         * get layer canvas
         * @method
         * @memberof Konva.BaseLayer.prototype
         */
    getCanvas: function() {
      return this.canvas;
    },
    /**
         * get layer hit canvas
         * @method
         * @memberof Konva.BaseLayer.prototype
         */
    getHitCanvas: function() {
      return this.hitCanvas;
    },
    /**
         * get layer canvas context
         * @method
         * @memberof Konva.BaseLayer.prototype
         */
    getContext: function() {
      return this.getCanvas().getContext();
    },
    /**
         * clear scene and hit canvas contexts tied to the layer
         * @method
         * @memberof Konva.BaseLayer.prototype
         * @param {Object} [bounds]
         * @param {Number} [bounds.x]
         * @param {Number} [bounds.y]
         * @param {Number} [bounds.width]
         * @param {Number} [bounds.height]
         * @example
         * layer.clear();
         * layer.clear({
         *   x : 0,
         *   y : 0,
         *   width : 100,
         *   height : 100
         * });
         */
    clear: function(bounds) {
      this.getContext().clear(bounds);
      return this;
    },
    clearHitCache: function() {
      this._hitImageData = undefined;
    },
    // extend Node.prototype.setZIndex
    setZIndex: function(index) {
      Konva.Node.prototype.setZIndex.call(this, index);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);

        if (index < stage.getChildren().length - 1) {
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            stage.getChildren()[index + 1].getCanvas()._canvas
          );
        } else {
          stage.content.appendChild(this.getCanvas()._canvas);
        }
      }
      return this;
    },
    // extend Node.prototype.moveToTop
    moveToTop: function() {
      Konva.Node.prototype.moveToTop.call(this);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return this;
    },
    // extend Node.prototype.moveUp
    moveUp: function() {
      var moved = Konva.Node.prototype.moveUp.call(this);
      if (!moved) {
        return this;
      }
      var stage = this.getStage();
      if (!stage) {
        return this;
      }
      stage.content.removeChild(this.getCanvas()._canvas);

      if (this.index < stage.getChildren().length - 1) {
        stage.content.insertBefore(
          this.getCanvas()._canvas,
          stage.getChildren()[this.index + 1].getCanvas()._canvas
        );
      } else {
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return this;
    },
    // extend Node.prototype.moveDown
    moveDown: function() {
      if (Konva.Node.prototype.moveDown.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.getChildren();
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            children[this.index + 1].getCanvas()._canvas
          );
        }
      }
      return this;
    },
    // extend Node.prototype.moveToBottom
    moveToBottom: function() {
      if (Konva.Node.prototype.moveToBottom.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.getChildren();
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(
            this.getCanvas()._canvas,
            children[1].getCanvas()._canvas
          );
        }
      }
      return this;
    },
    getLayer: function() {
      return this;
    },
    remove: function() {
      var _canvas = this.getCanvas()._canvas;

      Konva.Node.prototype.remove.call(this);

      if (_canvas && _canvas.parentNode && Konva.Util._isInDocument(_canvas)) {
        _canvas.parentNode.removeChild(_canvas);
      }
      return this;
    },
    getStage: function() {
      return this.parent;
    },
    setSize: function(width, height) {
      this.canvas.setSize(width, height);
      return this;
    },
    /**
         * get/set width of layer.getter return width of stage. setter doing nothing.
         * if you want change width use `stage.width(value);`
         * @name width
         * @method
         * @memberof Konva.BaseLayer.prototype
         * @returns {Number}
         * @example
         * var width = layer.width();
         */
    getWidth: function() {
      if (this.parent) {
        return this.parent.getWidth();
      }
    },
    setWidth: function() {
      Konva.Util.warn(
        'Can not change width of layer. Use "stage.width(value)" function instead.'
      );
    },
    /**
         * get/set height of layer.getter return height of stage. setter doing nothing.
         * if you want change height use `stage.height(value);`
         * @name height
         * @method
         * @memberof Konva.BaseLayer.prototype
         * @returns {Number}
         * @example
         * var height = layer.height();
         */
    getHeight: function() {
      if (this.parent) {
        return this.parent.getHeight();
      }
    },
    setHeight: function() {
      Konva.Util.warn(
        'Can not change height of layer. Use "stage.height(value)" function instead.'
      );
    },
    // the apply transform method is handled by the Layer and FastLayer class
    // because it is up to the layer to decide if an absolute or relative transform
    // should be used
    _applyTransform: function(shape, context, top) {
      var m = shape.getAbsoluteTransform(top).getMatrix();
      context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }
  });
  Konva.Util.extend(Konva.BaseLayer, Konva.Container);

  // add getters and setters
  Konva.Factory.addGetterSetter(Konva.BaseLayer, 'clearBeforeDraw', true);
  /**
     * get/set clearBeforeDraw flag which determines if the layer is cleared or not
     *  before drawing
     * @name clearBeforeDraw
     * @method
     * @memberof Konva.BaseLayer.prototype
     * @param {Boolean} clearBeforeDraw
     * @returns {Boolean}
     * @example
     * // get clearBeforeDraw flag
     * var clearBeforeDraw = layer.clearBeforeDraw();
     *
     * // disable clear before draw
     * layer.clearBeforeDraw(false);
     *
     * // enable clear before draw
     * layer.clearBeforeDraw(true);
     */

  Konva.Collection.mapMethods(Konva.BaseLayer);
})();

(function() {
  'use strict';
  // constants
  var HASH = '#',
    BEFORE_DRAW = 'beforeDraw',
    DRAW = 'draw',
    /*
         * 2 - 3 - 4
         * |       |
         * 1 - 0   5
         *         |
         * 8 - 7 - 6
         */
    INTERSECTION_OFFSETS = [
      { x: 0, y: 0 }, // 0
      { x: -1, y: 0 }, // 1
      { x: -1, y: -1 }, // 2
      { x: 0, y: -1 }, // 3
      { x: 1, y: -1 }, // 4
      { x: 1, y: 0 }, // 5
      { x: 1, y: 1 }, // 6
      { x: 0, y: 1 }, // 7
      { x: -1, y: 1 } // 8
    ],
    INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;

  /**
     * Layer constructor.  Layers are tied to their own canvas element and are used
     * to contain groups or shapes.
     * @constructor
     * @memberof Konva
     * @augments Konva.BaseLayer
     * @param {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

     * @example
     * var layer = new Konva.Layer();
     */
  Konva.Layer = function(config) {
    this.____init(config);
  };

  Konva.Util.addMethods(Konva.Layer, {
    ____init: function(config) {
      this.nodeType = 'Layer';
      this.canvas = new Konva.SceneCanvas();
      this.hitCanvas = new Konva.HitCanvas({
        pixelRatio: 1
      });
      // call super constructor
      Konva.BaseLayer.call(this, config);
    },
    _setCanvasSize: function(width, height) {
      this.canvas.setSize(width, height);
      this.hitCanvas.setSize(width, height);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Group' && type !== 'Shape') {
        Konva.Util.throw('You may only add groups and shapes to a layer.');
      }
    },
    /**
         * get visible intersection shape. This is the preferred
         * method for determining if a point intersects a shape or not
         * also you may pass optional selector parametr to return ancestor of intersected shape
         * @method
         * @memberof Konva.Layer.prototype
         * @param {Object} pos
         * @param {Number} pos.x
         * @param {Number} pos.y
         * @param {String} [selector]
         * @returns {Konva.Node}
         * @example
         * var shape = layer.getIntersection({x: 50, y: 50});
         * // or if you interested in shape parent:
         * var group = layer.getIntersection({x: 50, y: 50}, 'Group');
         */
    getIntersection: function(pos, selector) {
      var obj, i, intersectionOffset, shape;

      if (!this.hitGraphEnabled() || !this.isVisible()) {
        return null;
      }
      // in some cases antialiased area may be bigger than 1px
      // it is possible if we will cache node, then scale it a lot
      // TODO: check { 0; 0 } point before loop, and remove it from INTERSECTION_OFFSETS.
      var spiralSearchDistance = 1;
      var continueSearch = false;
      while (true) {
        for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
          intersectionOffset = INTERSECTION_OFFSETS[i];
          obj = this._getIntersection({
            x: pos.x + intersectionOffset.x * spiralSearchDistance,
            y: pos.y + intersectionOffset.y * spiralSearchDistance
          });
          shape = obj.shape;
          if (shape && selector) {
            return shape.findAncestor(selector, true);
          } else if (shape) {
            return shape;
          }
          // we should continue search if we found antialiased pixel
          // that means our node somewhere very close
          continueSearch = !!obj.antialiased;
          // stop search if found empty pixel
          if (!obj.antialiased) {
            break;
          }
        }
        // if no shape, and no antialiased pixel, we should end searching
        if (continueSearch) {
          spiralSearchDistance += 1;
        } else {
          return null;
        }
      }
    },
    _getImageData: function(x, y) {
      var width = this.hitCanvas.width || 1,
        height = this.hitCanvas.height || 1,
        index = Math.round(y) * width + Math.round(x);

      if (!this._hitImageData) {
        this._hitImageData = this.hitCanvas.context.getImageData(
          0,
          0,
          width,
          height
        );
      }

      return [
        this._hitImageData.data[4 * index + 0], // Red
        this._hitImageData.data[4 * index + 1], // Green
        this._hitImageData.data[4 * index + 2], // Blue
        this._hitImageData.data[4 * index + 3] // Alpha
      ];
    },
    _getIntersection: function(pos) {
      var ratio = this.hitCanvas.pixelRatio;
      var p = this.hitCanvas.context.getImageData(
        Math.round(pos.x * ratio),
        Math.round(pos.y * ratio),
        1,
        1
      ).data,
        p3 = p[3],
        colorKey,
        shape;
      // fully opaque pixel
      if (p3 === 255) {
        colorKey = Konva.Util._rgbToHex(p[0], p[1], p[2]);
        shape = Konva.shapes[HASH + colorKey];
        if (shape) {
          return {
            shape: shape
          };
        }
        return {
          antialiased: true
        };
      } else if (p3 > 0) {
        // antialiased pixel
        return {
          antialiased: true
        };
      }
      // empty pixel
      return {};
    },
    drawScene: function(can, top) {
      var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());

      this._fire(BEFORE_DRAW, {
        node: this
      });

      if (this.getClearBeforeDraw()) {
        canvas.getContext().clear();
      }

      Konva.Container.prototype.drawScene.call(this, canvas, top);

      this._fire(DRAW, {
        node: this
      });

      return this;
    },
    drawHit: function(can, top) {
      var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);

      if (layer && layer.getClearBeforeDraw()) {
        layer.getHitCanvas().getContext().clear();
      }

      Konva.Container.prototype.drawHit.call(this, canvas, top);
      this.imageData = null; // Clear imageData cache
      return this;
    },
    clear: function(bounds) {
      Konva.BaseLayer.prototype.clear.call(this, bounds);
      this.getHitCanvas().getContext().clear(bounds);
      this.imageData = null; // Clear getImageData cache
      return this;
    },
    // extend Node.prototype.setVisible
    setVisible: function(visible) {
      Konva.Node.prototype.setVisible.call(this, visible);
      if (visible) {
        this.getCanvas()._canvas.style.display = 'block';
        this.hitCanvas._canvas.style.display = 'block';
      } else {
        this.getCanvas()._canvas.style.display = 'none';
        this.hitCanvas._canvas.style.display = 'none';
      }
      return this;
    },
    /**
         * enable hit graph
         * @name enableHitGraph
         * @method
         * @memberof Konva.Layer.prototype
         * @returns {Layer}
         */
    enableHitGraph: function() {
      this.setHitGraphEnabled(true);
      return this;
    },
    /**
         * disable hit graph
         * @name disableHitGraph
         * @method
         * @memberof Konva.Layer.prototype
         * @returns {Layer}
         */
    disableHitGraph: function() {
      this.setHitGraphEnabled(false);
      return this;
    },
    setSize: function(width, height) {
      Konva.BaseLayer.prototype.setSize.call(this, width, height);
      this.hitCanvas.setSize(width, height);
      return this;
    }
  });
  Konva.Util.extend(Konva.Layer, Konva.BaseLayer);

  Konva.Factory.addGetterSetter(Konva.Layer, 'hitGraphEnabled', true);
  /**
     * get/set hitGraphEnabled flag.  Disabling the hit graph will greatly increase
     *  draw performance because the hit graph will not be redrawn each time the layer is
     *  drawn.  This, however, also disables mouse/touch event detection
     * @name hitGraphEnabled
     * @method
     * @memberof Konva.Layer.prototype
     * @param {Boolean} enabled
     * @returns {Boolean}
     * @example
     * // get hitGraphEnabled flag
     * var hitGraphEnabled = layer.hitGraphEnabled();
     *
     * // disable hit graph
     * layer.hitGraphEnabled(false);
     *
     * // enable hit graph
     * layer.hitGraphEnabled(true);
     */
  Konva.Collection.mapMethods(Konva.Layer);
})();

(function() {
  'use strict';
  /**
     * FastLayer constructor. Layers are tied to their own canvas element and are used
     * to contain shapes only.  If you don't need node nesting, mouse and touch interactions,
     * or event pub/sub, you should use FastLayer instead of Layer to create your layers.
     * It renders about 2x faster than normal layers.
     * @constructor
     * @memberof Konva
     * @augments Konva.BaseLayer
     * @param {Object} config
     * @param {Boolean} [config.clearBeforeDraw] set this property to false if you don't want
     * to clear the canvas before each layer draw.  The default value is true.
     * @param {Boolean} [config.visible]
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

     * @example
     * var layer = new Konva.FastLayer();
     */
  Konva.FastLayer = function(config) {
    this.____init(config);
  };

  Konva.Util.addMethods(Konva.FastLayer, {
    ____init: function(config) {
      this.nodeType = 'Layer';
      this.canvas = new Konva.SceneCanvas();
      // call super constructor
      Konva.BaseLayer.call(this, config);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Shape') {
        Konva.Util.throw('You may only add shapes to a fast layer.');
      }
    },
    _setCanvasSize: function(width, height) {
      this.canvas.setSize(width, height);
    },
    hitGraphEnabled: function() {
      return false;
    },
    getIntersection: function() {
      return null;
    },
    drawScene: function(can) {
      var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());

      if (this.getClearBeforeDraw()) {
        canvas.getContext().clear();
      }

      Konva.Container.prototype.drawScene.call(this, canvas);

      return this;
    },
    draw: function() {
      this.drawScene();
      return this;
    },
    // extend Node.prototype.setVisible
    setVisible: function(visible) {
      Konva.Node.prototype.setVisible.call(this, visible);
      if (visible) {
        this.getCanvas()._canvas.style.display = 'block';
      } else {
        this.getCanvas()._canvas.style.display = 'none';
      }
      return this;
    }
  });
  Konva.Util.extend(Konva.FastLayer, Konva.BaseLayer);

  Konva.Collection.mapMethods(Konva.FastLayer);
})();

(function() {
  'use strict';
  /**
     * Group constructor.  Groups are used to contain shapes or other groups.
     * @constructor
     * @memberof Konva
     * @augments Konva.Container
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * * @param {Object} [config.clip] set clip
     * @param {Number} [config.clipX] set clip x
     * @param {Number} [config.clipY] set clip y
     * @param {Number} [config.clipWidth] set clip width
     * @param {Number} [config.clipHeight] set clip height
     * @param {Function} [config.clipFunc] set clip func

     * @example
     * var group = new Konva.Group();
     */
  Konva.Group = function(config) {
    this.___init(config);
  };

  Konva.Util.addMethods(Konva.Group, {
    ___init: function(config) {
      this.nodeType = 'Group';
      // call super constructor
      Konva.Container.call(this, config);
    },
    _validateAdd: function(child) {
      var type = child.getType();
      if (type !== 'Group' && type !== 'Shape') {
        Konva.Util.throw('You may only add groups and shapes to groups.');
      }
    }
  });
  Konva.Util.extend(Konva.Group, Konva.Container);

  Konva.Collection.mapMethods(Konva.Group);
})();

(function(Konva) {
  'use strict';
  var now = (function() {
    if (Konva.global.performance && Konva.global.performance.now) {
      return function() {
        return Konva.global.performance.now();
      };
    }

    return function() {
      return new Date().getTime();
    };
  })();

  function FRAF(callback) {
    setTimeout(callback, 1000 / 60);
  }

  var RAF = (function() {
    return Konva.global.requestAnimationFrame ||
      Konva.global.webkitRequestAnimationFrame ||
      Konva.global.mozRequestAnimationFrame ||
      Konva.global.oRequestAnimationFrame ||
      Konva.global.msRequestAnimationFrame ||
      FRAF;
  })();

  function requestAnimFrame() {
    return RAF.apply(Konva.global, arguments);
  }

  /**
     * Animation constructor.  A stage is used to contain multiple layers and handle
     * @constructor
     * @memberof Konva
     * @param {Function} func function executed on each animation frame.  The function is passed a frame object, which contains
     *  timeDiff, lastTime, time, and frameRate properties.  The timeDiff property is the number of milliseconds that have passed
     *  since the last animation frame.  The lastTime property is time in milliseconds that elapsed from the moment the animation started
     *  to the last animation frame.  The time property is the time in milliseconds that ellapsed from the moment the animation started
     *  to the current animation frame.  The frameRate property is the current frame rate in frames / second. Return false from function,
     *  if you don't need to redraw layer/layers on some frames.
     * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn on each animation frame. Can be a layer, an array of layers, or null.
     *  Not specifying a node will result in no redraw.
     * @example
     * // move a node to the right at 50 pixels / second
     * var velocity = 50;
     *
     * var anim = new Konva.Animation(function(frame) {
     *   var dist = velocity * (frame.timeDiff / 1000);
     *   node.move(dist, 0);
     * }, layer);
     *
     * anim.start();
     */
  Konva.Animation = function(func, layers) {
    var Anim = Konva.Animation;
    this.func = func;
    this.setLayers(layers);
    this.id = Anim.animIdCounter++;
    this.frame = {
      time: 0,
      timeDiff: 0,
      lastTime: now()
    };
  };
  /*
     * Animation methods
     */
  Konva.Animation.prototype = {
    /**
         * set layers to be redrawn on each animation frame
         * @method
         * @memberof Konva.Animation.prototype
         * @param {Konva.Layer|Array} [layers] layer(s) to be redrawn.&nbsp; Can be a layer, an array of layers, or null.  Not specifying a node will result in no redraw.
         * @return {Konva.Animation} this
         */
    setLayers: function(layers) {
      var lays = [];
      // if passing in no layers
      if (!layers) {
        lays = [];
      } else if (layers.length > 0) {
        // if passing in an array of Layers
        // NOTE: layers could be an array or Konva.Collection.  for simplicity, I'm just inspecting
        // the length property to check for both cases
        lays = layers;
      } else {
        // if passing in a Layer
        lays = [layers];
      }

      this.layers = lays;
      return this;
    },
    /**
         * get layers
         * @method
         * @memberof Konva.Animation.prototype
         * @return {Array} Array of Konva.Layer
         */
    getLayers: function() {
      return this.layers;
    },
    /**
         * add layer.  Returns true if the layer was added, and false if it was not
         * @method
         * @memberof Konva.Animation.prototype
         * @param {Konva.Layer} layer to add
         * @return {Bool} true if layer is added to animation, otherwise false
         */
    addLayer: function(layer) {
      var layers = this.layers, len = layers.length, n;

      // don't add the layer if it already exists
      for (n = 0; n < len; n++) {
        if (layers[n]._id === layer._id) {
          return false;
        }
      }

      this.layers.push(layer);
      return true;
    },
    /**
         * determine if animation is running or not.  returns true or false
         * @method
         * @memberof Konva.Animation.prototype
         * @return {Bool} is animation running?
         */
    isRunning: function() {
      var a = Konva.Animation,
        animations = a.animations,
        len = animations.length,
        n;

      for (n = 0; n < len; n++) {
        if (animations[n].id === this.id) {
          return true;
        }
      }
      return false;
    },
    /**
         * start animation
         * @method
         * @memberof Konva.Animation.prototype
         * @return {Konva.Animation} this
         */
    start: function() {
      var Anim = Konva.Animation;
      this.stop();
      this.frame.timeDiff = 0;
      this.frame.lastTime = now();
      Anim._addAnimation(this);
      return this;
    },
    /**
         * stop animation
         * @method
         * @memberof Konva.Animation.prototype
         * @return {Konva.Animation} this
         */
    stop: function() {
      Konva.Animation._removeAnimation(this);
      return this;
    },
    _updateFrameObject: function(time) {
      this.frame.timeDiff = time - this.frame.lastTime;
      this.frame.lastTime = time;
      this.frame.time += this.frame.timeDiff;
      this.frame.frameRate = 1000 / this.frame.timeDiff;
    }
  };
  Konva.Animation.animations = [];
  Konva.Animation.animIdCounter = 0;
  Konva.Animation.animRunning = false;

  Konva.Animation._addAnimation = function(anim) {
    this.animations.push(anim);
    this._handleAnimation();
  };
  Konva.Animation._removeAnimation = function(anim) {
    var id = anim.id, animations = this.animations, len = animations.length, n;

    for (n = 0; n < len; n++) {
      if (animations[n].id === id) {
        this.animations.splice(n, 1);
        break;
      }
    }
  };

  Konva.Animation._runFrames = function() {
    var layerHash = {},
      animations = this.animations,
      anim,
      layers,
      func,
      n,
      i,
      layersLen,
      layer,
      key,
      needRedraw;
    /*
         * loop through all animations and execute animation
         *  function.  if the animation object has specified node,
         *  we can add the node to the nodes hash to eliminate
         *  drawing the same node multiple times.  The node property
         *  can be the stage itself or a layer
         */
    /*
         * WARNING: don't cache animations.length because it could change while
         * the for loop is running, causing a JS error
         */

    for (n = 0; n < animations.length; n++) {
      anim = animations[n];
      layers = anim.layers;
      func = anim.func;

      anim._updateFrameObject(now());
      layersLen = layers.length;

      // if animation object has a function, execute it
      if (func) {
        // allow anim bypassing drawing
        needRedraw = func.call(anim, anim.frame) !== false;
      } else {
        needRedraw = true;
      }
      if (!needRedraw) {
        continue;
      }
      for (i = 0; i < layersLen; i++) {
        layer = layers[i];

        if (layer._id !== undefined) {
          layerHash[layer._id] = layer;
        }
      }
    }

    for (key in layerHash) {
      if (!layerHash.hasOwnProperty(key)) {
        continue;
      }
      layerHash[key].draw();
    }
  };
  Konva.Animation._animationLoop = function() {
    var Anim = Konva.Animation;
    if (Anim.animations.length) {
      Anim._runFrames();
      requestAnimFrame(Anim._animationLoop);
    } else {
      Anim.animRunning = false;
    }
  };
  Konva.Animation._handleAnimation = function() {
    if (!this.animRunning) {
      this.animRunning = true;
      requestAnimFrame(this._animationLoop);
    }
  };

  /**
     * batch draw. this function will not do immediate draw
     * but it will schedule drawing to next tick (requestAnimFrame)
     * @method
     * @return {Konva.Layer} this
     * @memberof Konva.Base.prototype
     */
  Konva.BaseLayer.prototype.batchDraw = function() {
    var that = this, Anim = Konva.Animation;

    if (!this.batchAnim) {
      this.batchAnim = new Anim(
        function() {
          // stop animation after first tick
          that.batchAnim.stop();
        },
        this
      );
    }

    if (!this.batchAnim.isRunning()) {
      this.batchAnim.start();
    }
    return this;
  };

  /**
     * batch draw
     * @method
     * @return {Konva.Stage} this
     * @memberof Konva.Stage.prototype
     */
  Konva.Stage.prototype.batchDraw = function() {
    this.getChildren().each(function(layer) {
      layer.batchDraw();
    });
    return this;
  };
})(Konva);

(function() {
  'use strict';
  var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
  },
    PAUSED = 1,
    PLAYING = 2,
    REVERSING = 3,
    idCounter = 0,
    colorAttrs = ['fill', 'stroke', 'shadowColor'];

  var Tween = function(prop, propFunc, func, begin, finish, duration, yoyo) {
    this.prop = prop;
    this.propFunc = propFunc;
    this.begin = begin;
    this._pos = begin;
    this.duration = duration;
    this._change = 0;
    this.prevPos = 0;
    this.yoyo = yoyo;
    this._time = 0;
    this._position = 0;
    this._startTime = 0;
    this._finish = 0;
    this.func = func;
    this._change = finish - this.begin;
    this.pause();
  };
  /*
     * Tween methods
     */
  Tween.prototype = {
    fire: function(str) {
      var handler = this[str];
      if (handler) {
        handler();
      }
    },
    setTime: function(t) {
      if (t > this.duration) {
        if (this.yoyo) {
          this._time = this.duration;
          this.reverse();
        } else {
          this.finish();
        }
      } else if (t < 0) {
        if (this.yoyo) {
          this._time = 0;
          this.play();
        } else {
          this.reset();
        }
      } else {
        this._time = t;
        this.update();
      }
    },
    getTime: function() {
      return this._time;
    },
    setPosition: function(p) {
      this.prevPos = this._pos;
      this.propFunc(p);
      this._pos = p;
    },
    getPosition: function(t) {
      if (t === undefined) {
        t = this._time;
      }
      return this.func(t, this.begin, this._change, this.duration);
    },
    play: function() {
      this.state = PLAYING;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire('onPlay');
    },
    reverse: function() {
      this.state = REVERSING;
      this._time = this.duration - this._time;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire('onReverse');
    },
    seek: function(t) {
      this.pause();
      this._time = t;
      this.update();
      this.fire('onSeek');
    },
    reset: function() {
      this.pause();
      this._time = 0;
      this.update();
      this.fire('onReset');
    },
    finish: function() {
      this.pause();
      this._time = this.duration;
      this.update();
      this.fire('onFinish');
    },
    update: function() {
      this.setPosition(this.getPosition(this._time));
    },
    onEnterFrame: function() {
      var t = this.getTimer() - this._startTime;
      if (this.state === PLAYING) {
        this.setTime(t);
      } else if (this.state === REVERSING) {
        this.setTime(this.duration - t);
      }
    },
    pause: function() {
      this.state = PAUSED;
      this.fire('onPause');
    },
    getTimer: function() {
      return new Date().getTime();
    }
  };

  /**
     * Tween constructor.  Tweens enable you to animate a node between the current state and a new state.
     *  You can play, pause, reverse, seek, reset, and finish tweens.  By default, tweens are animated using
     *  a linear easing.  For more tweening options, check out {@link Konva.Easings}
     * @constructor
     * @memberof Konva
     * @example
     * // instantiate new tween which fully rotates a node in 1 second
     * var tween = new Konva.Tween({
     *   node: node,
     *   rotationDeg: 360,
     *   duration: 1,
     *   easing: Konva.Easings.EaseInOut
     * });
     *
     * // play tween
     * tween.play();
     *
     * // pause tween
     * tween.pause();
     */
  Konva.Tween = function(config) {
    var that = this,
      node = config.node,
      nodeId = node._id,
      duration,
      easing = config.easing || Konva.Easings.Linear,
      yoyo = !!config.yoyo,
      key;

    if (typeof config.duration === 'undefined') {
      duration = 1;
    } else if (config.duration === 0) {
      // zero is bad value for duration
      duration = 0.001;
    } else {
      duration = config.duration;
    }
    this.node = node;
    this._id = idCounter++;

    var layers = node.getLayer() ||
      (node instanceof Konva.Stage ? node.getLayers() : null);
    if (!layers) {
      Konva.Util.error(
        'Tween constructor have `node` that is not in a layer. Please add node into layer first.'
      );
    }
    this.anim = new Konva.Animation(
      function() {
        that.tween.onEnterFrame();
      },
      layers
    );

    this.tween = new Tween(
      key,
      function(i) {
        that._tweenFunc(i);
      },
      easing,
      0,
      1,
      duration * 1000,
      yoyo
    );

    this._addListeners();

    // init attrs map
    if (!Konva.Tween.attrs[nodeId]) {
      Konva.Tween.attrs[nodeId] = {};
    }
    if (!Konva.Tween.attrs[nodeId][this._id]) {
      Konva.Tween.attrs[nodeId][this._id] = {};
    }
    // init tweens map
    if (!Konva.Tween.tweens[nodeId]) {
      Konva.Tween.tweens[nodeId] = {};
    }

    for (key in config) {
      if (blacklist[key] === undefined) {
        this._addAttr(key, config[key]);
      }
    }

    this.reset();

    // callbacks
    this.onFinish = config.onFinish;
    this.onReset = config.onReset;
  };

  // start/diff object = attrs.nodeId.tweenId.attr
  Konva.Tween.attrs = {};
  // tweenId = tweens.nodeId.attr
  Konva.Tween.tweens = {};

  Konva.Tween.prototype = {
    _addAttr: function(key, end) {
      var node = this.node,
        nodeId = node._id,
        start,
        diff,
        tweenId,
        n,
        len,
        trueEnd,
        trueStart;

      // remove conflict from tween map if it exists
      tweenId = Konva.Tween.tweens[nodeId][key];

      if (tweenId) {
        delete Konva.Tween.attrs[nodeId][tweenId][key];
      }

      // add to tween map
      start = node.getAttr(key);

      if (Konva.Util._isArray(end)) {
        diff = [];
        len = Math.max(end.length, start.length);

        if (key === 'points' && end.length !== start.length) {
          // before tweening points we need to make sure that start.length === end.length
          // Konva.Util._prepareArrayForTween thinking that end.length > start.length

          if (end.length > start.length) {
            // so in this case we will increase number of starting points
            trueStart = start;
            start = Konva.Util._prepareArrayForTween(start, end, node.closed());
          } else {
            // in this case we will increase number of eding points
            trueEnd = end;
            end = Konva.Util._prepareArrayForTween(end, start, node.closed());
          }
        }

        for (n = 0; n < len; n++) {
          diff.push(end[n] - start[n]);
        }
      } else if (colorAttrs.indexOf(key) !== -1) {
        start = Konva.Util.colorToRGBA(start);
        var endRGBA = Konva.Util.colorToRGBA(end);
        diff = {
          r: endRGBA.r - start.r,
          g: endRGBA.g - start.g,
          b: endRGBA.b - start.b,
          a: endRGBA.a - start.a
        };
      } else {
        diff = end - start;
      }

      Konva.Tween.attrs[nodeId][this._id][key] = {
        start: start,
        diff: diff,
        end: end,
        trueEnd: trueEnd,
        trueStart: trueStart
      };
      Konva.Tween.tweens[nodeId][key] = this._id;
    },
    _tweenFunc: function(i) {
      var node = this.node,
        attrs = Konva.Tween.attrs[node._id][this._id],
        key,
        attr,
        start,
        diff,
        newVal,
        n,
        len,
        end;

      for (key in attrs) {
        attr = attrs[key];
        start = attr.start;
        diff = attr.diff;
        end = attr.end;

        if (Konva.Util._isArray(start)) {
          newVal = [];
          len = Math.max(start.length, end.length);
          for (n = 0; n < len; n++) {
            newVal.push((start[n] || 0) + diff[n] * i);
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          newVal = 'rgba(' +
            Math.round(start.r + diff.r * i) +
            ',' +
            Math.round(start.g + diff.g * i) +
            ',' +
            Math.round(start.b + diff.b * i) +
            ',' +
            (start.a + diff.a * i) +
            ')';
        } else {
          newVal = start + diff * i;
        }

        node.setAttr(key, newVal);
      }
    },
    _addListeners: function() {
      var that = this;

      // start listeners
      this.tween.onPlay = function() {
        that.anim.start();
      };
      this.tween.onReverse = function() {
        that.anim.start();
      };

      // stop listeners
      this.tween.onPause = function() {
        that.anim.stop();
      };
      this.tween.onFinish = function() {
        var node = that.node;

        // after tweening  points of line we need to set original end
        var attrs = Konva.Tween.attrs[node._id][that._id];
        if (attrs.points && attrs.points.trueEnd) {
          node.points(attrs.points.trueEnd);
        }

        if (that.onFinish) {
          that.onFinish.call(that);
        }
      };
      this.tween.onReset = function() {
        var node = that.node;
        // after tweening  points of line we need to set original start
        var attrs = Konva.Tween.attrs[node._id][that._id];
        if (attrs.points && attrs.points.trueStart) {
          node.points(attrs.points.trueStart);
        }

        if (that.onReset) {
          that.onReset();
        }
      };
    },
    /**
         * play
         * @method
         * @memberof Konva.Tween.prototype
         * @returns {Tween}
         */
    play: function() {
      this.tween.play();
      return this;
    },
    /**
         * reverse
         * @method
         * @memberof Konva.Tween.prototype
         * @returns {Tween}
         */
    reverse: function() {
      this.tween.reverse();
      return this;
    },
    /**
         * reset
         * @method
         * @memberof Konva.Tween.prototype
         * @returns {Tween}
         */
    reset: function() {
      this.tween.reset();
      return this;
    },
    /**
         * seek
         * @method
         * @memberof Konva.Tween.prototype
         * @param {Integer} t time in seconds between 0 and the duration
         * @returns {Tween}
         */
    seek: function(t) {
      this.tween.seek(t * 1000);
      return this;
    },
    /**
         * pause
         * @method
         * @memberof Konva.Tween.prototype
         * @returns {Tween}
         */
    pause: function() {
      this.tween.pause();
      return this;
    },
    /**
         * finish
         * @method
         * @memberof Konva.Tween.prototype
         * @returns {Tween}
         */
    finish: function() {
      this.tween.finish();
      return this;
    },
    /**
         * destroy
         * @method
         * @memberof Konva.Tween.prototype
         */
    destroy: function() {
      var nodeId = this.node._id,
        thisId = this._id,
        attrs = Konva.Tween.tweens[nodeId],
        key;

      this.pause();

      for (key in attrs) {
        delete Konva.Tween.tweens[nodeId][key];
      }

      delete Konva.Tween.attrs[nodeId][thisId];
    }
  };

  /**
     * Tween node properties. Shorter usage of {@link Konva.Tween} object.
     *
     * @method Konva.Node#to
     * @memberof Konva.Node
     * @param {Object} [params] tween params
     * @example
     *
     * circle.to({
     *  x : 50,
     *  duration : 0.5
     * });
     */
  Konva.Node.prototype.to = function(params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function() {
      this.destroy();
      if (onFinish) {
        onFinish();
      }
    };
    var tween = new Konva.Tween(params);
    tween.play();
  };

  /*
    * These eases were ported from an Adobe Flash tweening library to JavaScript
    * by Xaric
    */

  /**
     * @namespace Easings
     * @memberof Konva
     */
  Konva.Easings = {
    /**
        * back ease in
        * @function
        * @memberof Konva.Easings
        */
    BackEaseIn: function(t, b, c, d) {
      var s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    /**
        * back ease out
        * @function
        * @memberof Konva.Easings
        */
    BackEaseOut: function(t, b, c, d) {
      var s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    /**
        * back ease in out
        * @function
        * @memberof Konva.Easings
        */
    BackEaseInOut: function(t, b, c, d) {
      var s = 1.70158;
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    /**
        * elastic ease in
        * @function
        * @memberof Konva.Easings
        */
    ElasticEaseIn: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    /**
        * elastic ease out
        * @function
        * @memberof Konva.Easings
        */
    ElasticEaseOut: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a *
        Math.pow(2, (-10) * t) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) +
        c +
        b;
    },
    /**
        * elastic ease in out
        * @function
        * @memberof Konva.Easings
        */
    ElasticEaseInOut: function(t, b, c, d, a, p) {
      // added s = 0
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return (-0.5) *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p)) +
          b;
      }
      return a *
        Math.pow(2, (-10) * (t -= 1)) *
        Math.sin((t * d - s) * (2 * Math.PI) / p) *
        0.5 +
        c +
        b;
    },
    /**
        * bounce ease out
        * @function
        * @memberof Konva.Easings
        */
    BounceEaseOut: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    /**
        * bounce ease in
        * @function
        * @memberof Konva.Easings
        */
    BounceEaseIn: function(t, b, c, d) {
      return c - Konva.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    /**
        * bounce ease in out
        * @function
        * @memberof Konva.Easings
        */
    BounceEaseInOut: function(t, b, c, d) {
      if (t < d / 2) {
        return Konva.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
      } else {
        return Konva.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 +
          c * 0.5 +
          b;
      }
    },
    /**
        * ease in
        * @function
        * @memberof Konva.Easings
        */
    EaseIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    /**
        * ease out
        * @function
        * @memberof Konva.Easings
        */
    EaseOut: function(t, b, c, d) {
      return (-c) * (t /= d) * (t - 2) + b;
    },
    /**
        * ease in out
        * @function
        * @memberof Konva.Easings
        */
    EaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return (-c) / 2 * (--t * (t - 2) - 1) + b;
    },
    /**
        * strong ease in
        * @function
        * @memberof Konva.Easings
        */
    StrongEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    /**
        * strong ease out
        * @function
        * @memberof Konva.Easings
        */
    StrongEaseOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    /**
        * strong ease in out
        * @function
        * @memberof Konva.Easings
        */
    StrongEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    /**
        * linear
        * @function
        * @memberof Konva.Easings
        */
    Linear: function(t, b, c, d) {
      return c * t / d + b;
    }
  };
})();

(function() {
  'use strict';
  Konva.DD = {
    // properties
    anim: new Konva.Animation(function() {
      var b = this.dirty;
      this.dirty = false;
      return b;
    }),
    isDragging: false,
    justDragged: false,
    offset: {
      x: 0,
      y: 0
    },
    node: null,

    // methods
    _drag: function(evt) {
      var dd = Konva.DD, node = dd.node;

      if (node) {
        if (!dd.isDragging) {
          var pos = node.getStage().getPointerPosition();
          var dragDistance = node.dragDistance();
          var distance = Math.max(
            Math.abs(pos.x - dd.startPointerPos.x),
            Math.abs(pos.y - dd.startPointerPos.y)
          );
          if (distance < dragDistance) {
            return;
          }
        }

        node.getStage()._setPointerPosition(evt);
        node._setDragPosition(evt);
        if (!dd.isDragging) {
          dd.isDragging = true;
          node.fire(
            'dragstart',
            {
              type: 'dragstart',
              target: node,
              evt: evt
            },
            true
          );
        }

        // execute ondragmove if defined
        node.fire(
          'dragmove',
          {
            type: 'dragmove',
            target: node,
            evt: evt
          },
          true
        );
      }
    },
    _endDragBefore: function(evt) {
      var dd = Konva.DD, node = dd.node, layer;

      if (node) {
        layer = node.getLayer();
        dd.anim.stop();

        // only fire dragend event if the drag and drop
        // operation actually started.
        if (dd.isDragging) {
          dd.isDragging = false;
          dd.justDragged = true;
          Konva.listenClickTap = false;

          if (evt) {
            evt.dragEndNode = node;
          }
        }

        delete dd.node;

        if (node.getLayer() || layer || node instanceof Konva.Stage) {
          (layer || node).draw();
        }
      }
    },
    _endDragAfter: function(evt) {
      evt = evt || {};
      var dragEndNode = evt.dragEndNode;

      if (evt && dragEndNode) {
        dragEndNode.fire(
          'dragend',
          {
            type: 'dragend',
            target: dragEndNode,
            evt: evt
          },
          true
        );
      }
    }
  };

  // Node extenders

  /**
     * initiate drag and drop
     * @method
     * @memberof Konva.Node.prototype
     */
  Konva.Node.prototype.startDrag = function() {
    var dd = Konva.DD,
      stage = this.getStage(),
      layer = this.getLayer(),
      pos = stage.getPointerPosition(),
      ap = this.getAbsolutePosition();

    if (pos) {
      if (dd.node) {
        dd.node.stopDrag();
      }

      dd.node = this;
      dd.startPointerPos = pos;
      dd.offset.x = pos.x - ap.x;
      dd.offset.y = pos.y - ap.y;
      dd.anim.setLayers(layer || this.getLayers());
      dd.anim.start();

      this._setDragPosition();
    }
  };

  Konva.Node.prototype._setDragPosition = function(evt) {
    var dd = Konva.DD,
      pos = this.getStage().getPointerPosition(),
      dbf = this.getDragBoundFunc();
    if (!pos) {
      return;
    }
    var newNodePos = {
      x: pos.x - dd.offset.x,
      y: pos.y - dd.offset.y
    };

    if (dbf !== undefined) {
      newNodePos = dbf.call(this, newNodePos, evt);
    }
    this.setAbsolutePosition(newNodePos);

    if (
      !this._lastPos ||
      this._lastPos.x !== newNodePos.x ||
      this._lastPos.y !== newNodePos.y
    ) {
      dd.anim.dirty = true;
    }

    this._lastPos = newNodePos;
  };

  /**
     * stop drag and drop
     * @method
     * @memberof Konva.Node.prototype
     */
  Konva.Node.prototype.stopDrag = function() {
    var dd = Konva.DD, evt = {};
    dd._endDragBefore(evt);
    dd._endDragAfter(evt);
  };

  Konva.Node.prototype.setDraggable = function(draggable) {
    this._setAttr('draggable', draggable);
    this._dragChange();
  };

  var origRemove = Konva.Node.prototype.remove;

  Konva.Node.prototype.__originalRemove = origRemove;
  Konva.Node.prototype.remove = function() {
    var dd = Konva.DD;

    // stop DD
    if (dd.node && dd.node._id === this._id) {
      this.stopDrag();
    }

    origRemove.call(this);
  };

  /**
     * determine if node is currently in drag and drop mode
     * @method
     * @memberof Konva.Node.prototype
     */
  Konva.Node.prototype.isDragging = function() {
    var dd = Konva.DD;
    return !!(dd.node && dd.node._id === this._id && dd.isDragging);
  };

  Konva.Node.prototype._listenDrag = function() {
    var that = this;

    this._dragCleanup();

    if (this.getClassName() === 'Stage') {
      this.on('contentMousedown.konva contentTouchstart.konva', function(evt) {
        if (!Konva.DD.node) {
          that.startDrag(evt);
        }
      });
    } else {
      this.on('mousedown.konva touchstart.konva', function(evt) {
        // ignore right and middle buttons
        if (evt.evt.button === 1 || evt.evt.button === 2) {
          return;
        }
        if (!Konva.DD.node) {
          that.startDrag(evt);
        }
      });
    }

    // listening is required for drag and drop
    /*
        this._listeningEnabled = true;
        this._clearSelfAndAncestorCache('listeningEnabled');
        */
  };

  Konva.Node.prototype._dragChange = function() {
    if (this.attrs.draggable) {
      this._listenDrag();
    } else {
      // remove event listeners
      this._dragCleanup();

      /*
             * force drag and drop to end
             * if this node is currently in
             * drag and drop mode
             */
      var stage = this.getStage();
      var dd = Konva.DD;
      if (stage && dd.node && dd.node._id === this._id) {
        dd.node.stopDrag();
      }
    }
  };

  Konva.Node.prototype._dragCleanup = function() {
    if (this.getClassName() === 'Stage') {
      this.off('contentMousedown.konva');
      this.off('contentTouchstart.konva');
    } else {
      this.off('mousedown.konva');
      this.off('touchstart.konva');
    }
  };

  Konva.Factory.addGetterSetter(Konva.Node, 'dragBoundFunc');

  /**
     * get/set drag bound function.  This is used to override the default
     *  drag and drop position
     * @name dragBoundFunc
     * @method
     * @memberof Konva.Node.prototype
     * @param {Function} dragBoundFunc
     * @returns {Function}
     * @example
     * // get drag bound function
     * var dragBoundFunc = node.dragBoundFunc();
     *
     * // create vertical drag and drop
     * node.dragBoundFunc(function(pos){
     *   return {
     *     x: this.getAbsolutePosition().x,
     *     y: pos.y
     *   };
     * });
     */

  Konva.Factory.addGetter(Konva.Node, 'draggable', false);
  Konva.Factory.addOverloadedGetterSetter(Konva.Node, 'draggable');

  /**
     * get/set draggable flag
     * @name draggable
     * @method
     * @memberof Konva.Node.prototype
     * @param {Boolean} draggable
     * @returns {Boolean}
     * @example
     * // get draggable flag
     * var draggable = node.draggable();
     *
     * // enable drag and drop
     * node.draggable(true);
     *
     * // disable drag and drop
     * node.draggable(false);
     */

  var html = Konva.document.documentElement;
  html.addEventListener('mouseup', Konva.DD._endDragBefore, true);
  html.addEventListener('touchend', Konva.DD._endDragBefore, true);

  html.addEventListener('mousemove', Konva.DD._drag);
  html.addEventListener('touchmove', Konva.DD._drag);

  html.addEventListener('mouseup', Konva.DD._endDragAfter, false);
  html.addEventListener('touchend', Konva.DD._endDragAfter, false);
})();

(function() {
  'use strict';
  /**
     * Rect constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} [config.cornerRadius]
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var rect = new Konva.Rect({
     *   width: 100,
     *   height: 50,
     *   fill: 'red',
     *   stroke: 'black',
     *   strokeWidth: 5
     * });
     */
  Konva.Rect = function(config) {
    this.___init(config);
  };

  Konva.Rect.prototype = {
    ___init: function(config) {
      Konva.Shape.call(this, config);
      this.className = 'Rect';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var cornerRadius = this.getCornerRadius(),
        width = this.getWidth(),
        height = this.getHeight();

      context.beginPath();

      if (!cornerRadius) {
        // simple rect - don't bother doing all that complicated maths stuff.
        context.rect(0, 0, width, height);
      } else {
        // arcTo would be nicer, but browser support is patchy (Opera)
        cornerRadius = Math.min(cornerRadius, width / 2, height / 2);
        context.moveTo(cornerRadius, 0);
        context.lineTo(width - cornerRadius, 0);
        context.arc(
          width - cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI * 3 / 2,
          0,
          false
        );
        context.lineTo(width, height - cornerRadius);
        context.arc(
          width - cornerRadius,
          height - cornerRadius,
          cornerRadius,
          0,
          Math.PI / 2,
          false
        );
        context.lineTo(cornerRadius, height);
        context.arc(
          cornerRadius,
          height - cornerRadius,
          cornerRadius,
          Math.PI / 2,
          Math.PI,
          false
        );
        context.lineTo(0, cornerRadius);
        context.arc(
          cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI,
          Math.PI * 3 / 2,
          false
        );
      }
      context.closePath();
      context.fillStrokeShape(this);
    }
  };

  Konva.Util.extend(Konva.Rect, Konva.Shape);

  Konva.Factory.addGetterSetter(Konva.Rect, 'cornerRadius', 0);
  /**
     * get/set corner radius
     * @name cornerRadius
     * @method
     * @memberof Konva.Rect.prototype
     * @param {Number} cornerRadius
     * @returns {Number}
     * @example
     * // get corner radius
     * var cornerRadius = rect.cornerRadius();
     *
     * // set corner radius
     * rect.cornerRadius(10);
     */

  Konva.Collection.mapMethods(Konva.Rect);
})();

(function() {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001, CIRCLE = 'Circle';

  /**
     * Circle constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.radius
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * // create circle
     * var circle = new Konva.Circle({
     *   radius: 40,
     *   fill: 'red',
     *   stroke: 'black'
     *   strokeWidth: 5
     * });
     */
  Konva.Circle = function(config) {
    this.___init(config);
  };

  Konva.Circle.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = CIRCLE;
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(0, 0, this.getRadius(), 0, PIx2, false);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Circle, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Circle, 'radius', 0);
  Konva.Factory.addOverloadedGetterSetter(Konva.Circle, 'radius');

  /**
     * get/set radius
     * @name radius
     * @method
     * @memberof Konva.Circle.prototype
     * @param {Number} radius
     * @returns {Number}
     * @example
     * // get radius
     * var radius = circle.radius();
     *
     * // set radius
     * circle.radius(10);
     */

  Konva.Collection.mapMethods(Konva.Circle);
})();

(function() {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001, ELLIPSE = 'Ellipse';

  /**
     * Ellipse constructor
     * @constructor
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Object} config.radius defines x and y radius
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var ellipse = new Konva.Ellipse({
     *   radius : {
     *     x : 50,
     *     y : 50
     *   },
     *   fill: 'red'
     * });
     */
  Konva.Ellipse = function(config) {
    this.___init(config);
  };

  Konva.Ellipse.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = ELLIPSE;
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var rx = this.getRadiusX(), ry = this.getRadiusY();

      context.beginPath();
      context.save();
      if (rx !== ry) {
        context.scale(1, ry / rx);
      }
      context.arc(0, 0, rx, 0, PIx2, false);
      context.restore();
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadiusX() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadiusY() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      this.setRadius({
        x: width / 2
      });
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      this.setRadius({
        y: height / 2
      });
    }
  };
  Konva.Util.extend(Konva.Ellipse, Konva.Shape);

  // add getters setters
  Konva.Factory.addComponentsGetterSetter(Konva.Ellipse, 'radius', ['x', 'y']);

  /**
     * get/set radius
     * @name radius
     * @method
     * @memberof Konva.Ellipse.prototype
     * @param {Object} radius
     * @param {Number} radius.x
     * @param {Number} radius.y
     * @returns {Object}
     * @example
     * // get radius
     * var radius = ellipse.radius();
     *
     * // set radius
     * ellipse.radius({
     *   x: 200,
     *   y: 100
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusX', 0);
  /**
     * get/set radius x
     * @name radiusX
     * @method
     * @memberof Konva.Ellipse.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get radius x
     * var radiusX = ellipse.radiusX();
     *
     * // set radius x
     * ellipse.radiusX(200);
     */

  Konva.Factory.addGetterSetter(Konva.Ellipse, 'radiusY', 0);
  /**
     * get/set radius y
     * @name radiusY
     * @method
     * @memberof Konva.Ellipse.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get radius y
     * var radiusY = ellipse.radiusY();
     *
     * // set radius y
     * ellipse.radiusY(200);
     */

  Konva.Collection.mapMethods(Konva.Ellipse);
})();

(function() {
  'use strict';
  // the 0.0001 offset fixes a bug in Chrome 27
  var PIx2 = Math.PI * 2 - 0.0001;
  /**
     * Ring constructor
     * @constructor
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.innerRadius
     * @param {Number} config.outerRadius
     * @param {Boolean} [config.clockwise]
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var ring = new Konva.Ring({
     *   innerRadius: 40,
     *   outerRadius: 80,
     *   fill: 'red',
     *   stroke: 'black',
     *   strokeWidth: 5
     * });
     */
  Konva.Ring = function(config) {
    this.___init(config);
  };

  Konva.Ring.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Ring';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(0, 0, this.getInnerRadius(), 0, PIx2, false);
      context.moveTo(this.getOuterRadius(), 0);
      context.arc(0, 0, this.getOuterRadius(), PIx2, 0, true);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.outerRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.outerRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    },
    setOuterRadius: function(val) {
      this._setAttr('outerRadius', val);
      this.setWidth(val * 2);
      this.setHeight(val * 2);
    }
  };
  Konva.Util.extend(Konva.Ring, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Ring, 'innerRadius', 0);

  /**
     * get/set innerRadius
     * @name innerRadius
     * @method
     * @memberof Konva.Ring.prototype
     * @param {Number} innerRadius
     * @returns {Number}
     * @example
     * // get inner radius
     * var innerRadius = ring.innerRadius();
     *
     * // set inner radius
     * ring.innerRadius(20);
     */
  Konva.Factory.addGetter(Konva.Ring, 'outerRadius', 0);
  Konva.Factory.addOverloadedGetterSetter(Konva.Ring, 'outerRadius');

  /**
     * get/set outerRadius
     * @name outerRadius
     * @method
     * @memberof Konva.Ring.prototype
     * @param {Number} outerRadius
     * @returns {Number}
     * @example
     * // get outer radius
     * var outerRadius = ring.outerRadius();
     *
     * // set outer radius
     * ring.outerRadius(20);
     */

  Konva.Collection.mapMethods(Konva.Ring);
})();

(function() {
  'use strict';
  /**
     * Wedge constructor
     * @constructor
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.angle in degrees
     * @param {Number} config.radius
     * @param {Boolean} [config.clockwise]
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * // draw a wedge that's pointing downwards
     * var wedge = new Konva.Wedge({
     *   radius: 40,
     *   fill: 'red',
     *   stroke: 'black'
     *   strokeWidth: 5,
     *   angleDeg: 60,
     *   rotationDeg: -120
     * });
     */
  Konva.Wedge = function(config) {
    this.___init(config);
  };

  Konva.Wedge.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Wedge';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      context.beginPath();
      context.arc(
        0,
        0,
        this.getRadius(),
        0,
        Konva.getAngle(this.getAngle()),
        this.getClockwise()
      );
      context.lineTo(0, 0);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Wedge, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Wedge, 'radius', 0);

  /**
     * get/set radius
     * @name radius
     * @method
     * @memberof Konva.Wedge.prototype
     * @param {Number} radius
     * @returns {Number}
     * @example
     * // get radius
     * var radius = wedge.radius();
     *
     * // set radius
     * wedge.radius(10);
     */

  Konva.Factory.addGetterSetter(Konva.Wedge, 'angle', 0);

  /**
     * get/set angle in degrees
     * @name angle
     * @method
     * @memberof Konva.Wedge.prototype
     * @param {Number} angle
     * @returns {Number}
     * @example
     * // get angle
     * var angle = wedge.angle();
     *
     * // set angle
     * wedge.angle(20);
     */

  Konva.Factory.addGetterSetter(Konva.Wedge, 'clockwise', false);

  /**
     * get/set clockwise flag
     * @name clockwise
     * @method
     * @memberof Konva.Wedge.prototype
     * @param {Number} clockwise
     * @returns {Number}
     * @example
     * // get clockwise flag
     * var clockwise = wedge.clockwise();
     *
     * // draw wedge counter-clockwise
     * wedge.clockwise(false);
     *
     * // draw wedge clockwise
     * wedge.clockwise(true);
     */

  Konva.Factory.backCompat(Konva.Wedge, {
    angleDeg: 'angle',
    getAngleDeg: 'getAngle',
    setAngleDeg: 'setAngle'
  });

  Konva.Collection.mapMethods(Konva.Wedge);
})();

(function() {
  'use strict';
  /**
     * Arc constructor
     * @constructor
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.angle in degrees
     * @param {Number} config.innerRadius
     * @param {Number} config.outerRadius
     * @param {Boolean} [config.clockwise]
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * // draw a Arc that's pointing downwards
     * var arc = new Konva.Arc({
     *   innerRadius: 40,
     *   outerRadius: 80,
     *   fill: 'red',
     *   stroke: 'black'
     *   strokeWidth: 5,
     *   angle: 60,
     *   rotationDeg: -120
     * });
     */
  Konva.Arc = function(config) {
    this.___init(config);
  };

  Konva.Arc.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Arc';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var angle = Konva.getAngle(this.angle()), clockwise = this.clockwise();

      context.beginPath();
      context.arc(0, 0, this.getOuterRadius(), 0, angle, clockwise);
      context.arc(0, 0, this.getInnerRadius(), angle, 0, !clockwise);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.getOuterRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.getOuterRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Arc, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Arc, 'innerRadius', 0);

  /**
     * get/set innerRadius
     * @name innerRadius
     * @method
     * @memberof Konva.Arc.prototype
     * @param {Number} innerRadius
     * @returns {Number}
     * @example
     * // get inner radius
     * var innerRadius = arc.innerRadius();
     *
     * // set inner radius
     * arc.innerRadius(20);
     */

  Konva.Factory.addGetterSetter(Konva.Arc, 'outerRadius', 0);

  /**
     * get/set outerRadius
     * @name outerRadius
     * @method
     * @memberof Konva.Arc.prototype
     * @param {Number} outerRadius
     * @returns {Number}
     * @example
     * // get outer radius
     * var outerRadius = arc.outerRadius();
     *
     * // set outer radius
     * arc.outerRadius(20);
     */

  Konva.Factory.addGetterSetter(Konva.Arc, 'angle', 0);

  /**
     * get/set angle in degrees
     * @name angle
     * @method
     * @memberof Konva.Arc.prototype
     * @param {Number} angle
     * @returns {Number}
     * @example
     * // get angle
     * var angle = arc.angle();
     *
     * // set angle
     * arc.angle(20);
     */

  Konva.Factory.addGetterSetter(Konva.Arc, 'clockwise', false);

  /**
     * get/set clockwise flag
     * @name clockwise
     * @method
     * @memberof Konva.Arc.prototype
     * @param {Boolean} clockwise
     * @returns {Boolean}
     * @example
     * // get clockwise flag
     * var clockwise = arc.clockwise();
     *
     * // draw arc counter-clockwise
     * arc.clockwise(false);
     *
     * // draw arc clockwise
     * arc.clockwise(true);
     */

  Konva.Collection.mapMethods(Konva.Arc);
})();

(function() {
  'use strict';
  // CONSTANTS
  var IMAGE = 'Image';

  /**
     * Image constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Image} config.image
     * @param {Object} [config.crop]
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var imageObj = new Image();
     * imageObj.onload = function() {
     *   var image = new Konva.Image({
     *     x: 200,
     *     y: 50,
     *     image: imageObj,
     *     width: 100,
     *     height: 100
     *   });
     * };
     * imageObj.src = '/path/to/image.jpg'
     */
  Konva.Image = function(config) {
    this.___init(config);
  };

  Konva.Image.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = IMAGE;
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _useBufferCanvas: function() {
      return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
        this.hasStroke() &&
        this.getStage();
    },
    _sceneFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight(),
        image = this.getImage(),
        cropWidth,
        cropHeight,
        params;

      if (image) {
        cropWidth = this.getCropWidth();
        cropHeight = this.getCropHeight();
        if (cropWidth && cropHeight) {
          params = [
            image,
            this.getCropX(),
            this.getCropY(),
            cropWidth,
            cropHeight,
            0,
            0,
            width,
            height
          ];
        } else {
          params = [image, 0, 0, width, height];
        }
      }

      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }

      if (image) {
        context.drawImage.apply(context, params);
      }
    },
    _hitFunc: function(context) {
      var width = this.getWidth(), height = this.getHeight();

      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    },
    getWidth: function() {
      var image = this.getImage();
      return this.attrs.width || (image ? image.width : 0);
    },
    getHeight: function() {
      var image = this.getImage();
      return this.attrs.height || (image ? image.height : 0);
    }
  };
  Konva.Util.extend(Konva.Image, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Image, 'image');

  /**
     * set image
     * @name setImage
     * @method
     * @memberof Konva.Image.prototype
     * @param {Image} image
     */

  /**
     * get image
     * @name getImage
     * @method
     * @memberof Konva.Image.prototype
     * @returns {Image}
     */

  Konva.Factory.addComponentsGetterSetter(Konva.Image, 'crop', [
    'x',
    'y',
    'width',
    'height'
  ]);
  /**
     * get/set crop
     * @method
     * @name crop
     * @memberof Konva.Image.prototype
     * @param {Object} crop
     * @param {Number} crop.x
     * @param {Number} crop.y
     * @param {Number} crop.width
     * @param {Number} crop.height
     * @returns {Object}
     * @example
     * // get crop
     * var crop = image.crop();
     *
     * // set crop
     * image.crop({
     *   x: 20,
     *   y: 20,
     *   width: 20,
     *   height: 20
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Image, 'cropX', 0);
  /**
     * get/set crop x
     * @method
     * @name cropX
     * @memberof Konva.Image.prototype
     * @param {Number} x
     * @returns {Number}
     * @example
     * // get crop x
     * var cropX = image.cropX();
     *
     * // set crop x
     * image.cropX(20);
     */

  Konva.Factory.addGetterSetter(Konva.Image, 'cropY', 0);
  /**
     * get/set crop y
     * @name cropY
     * @method
     * @memberof Konva.Image.prototype
     * @param {Number} y
     * @returns {Number}
     * @example
     * // get crop y
     * var cropY = image.cropY();
     *
     * // set crop y
     * image.cropY(20);
     */

  Konva.Factory.addGetterSetter(Konva.Image, 'cropWidth', 0);
  /**
     * get/set crop width
     * @name cropWidth
     * @method
     * @memberof Konva.Image.prototype
     * @param {Number} width
     * @returns {Number}
     * @example
     * // get crop width
     * var cropWidth = image.cropWidth();
     *
     * // set crop width
     * image.cropWidth(20);
     */

  Konva.Factory.addGetterSetter(Konva.Image, 'cropHeight', 0);
  /**
     * get/set crop height
     * @name cropHeight
     * @method
     * @memberof Konva.Image.prototype
     * @param {Number} height
     * @returns {Number}
     * @example
     * // get crop height
     * var cropHeight = image.cropHeight();
     *
     * // set crop height
     * image.cropHeight(20);
     */

  Konva.Collection.mapMethods(Konva.Image);

  /**
     * load image from given url and create `Konva.Image` instance
     * @method
     * @memberof Konva.Image
     * @param {String} url image source
     * @param {Function} callback with Konva.Image instance as first argument
     * @example
     *  Konva.Image.fromURL(imageURL, function(image){
     *    // image is Konva.Image instance
     *    layer.add(image);
     *    layer.draw();
     *  });
     */
  Konva.Image.fromURL = function(url, callback) {
    var img = new Image();
    img.onload = function() {
      var image = new Konva.Image({
        image: img
      });
      callback(image);
    };
    img.src = url;
  };
})();

/*eslint-disable max-depth */
(function() {
  'use strict';
  // var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  // constants
  var AUTO = 'auto',
    //CANVAS = 'canvas',
    CENTER = 'center',
    JUSTIFY = 'justify',
    CHANGE_KONVA = 'Change.konva',
    CONTEXT_2D = '2d',
    DASH = '-',
    EMPTY_STRING = '',
    LEFT = 'left',
    TEXT = 'text',
    TEXT_UPPER = 'Text',
    MIDDLE = 'middle',
    NORMAL = 'normal',
    PX_SPACE = 'px ',
    SPACE = ' ',
    RIGHT = 'right',
    WORD = 'word',
    CHAR = 'char',
    NONE = 'none',
    ATTR_CHANGE_LIST = [
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontVariant',
      'padding',
      'align',
      'lineHeight',
      'text',
      'width',
      'height',
      'wrap',
      'letterSpacing'
    ],
    // cached variables
    attrChangeListLen = ATTR_CHANGE_LIST.length,
    dummyContext = Konva.Util.createCanvasElement().getContext(CONTEXT_2D);

  /**
     * Text constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {String} [config.fontFamily] default is Arial
     * @param {Number} [config.fontSize] in pixels.  Default is 12
     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
     * @param {String} config.text
     * @param {String} [config.align] can be left, center, or right
     * @param {Number} [config.padding]
     * @param {Number} [config.lineHeight] default is 1
     * @param {String} [config.wrap] can be word, char, or none. Default is word
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var text = new Konva.Text({
     *   x: 10,
     *   y: 15,
     *   text: 'Simple Text',
     *   fontSize: 30,
     *   fontFamily: 'Calibri',
     *   fill: 'green'
     * });
     */
  Konva.Text = function(config) {
    this.___init(config);
  };
  function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
  }
  function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
  }

  Konva.Text.prototype = {
    ___init: function(config) {
      config = config || {};

      // set default color to black
      if (
        !config.fillLinearGradientColorStops &&
        !config.fillRadialGradientColorStops
      ) {
        config.fill = config.fill || 'black';
      }
      //
      // if (config.width === undefined) {
      //     config.width = AUTO;
      // }
      // if (config.height === undefined) {
      //     config.height = AUTO;
      // }

      // call super constructor
      Konva.Shape.call(this, config);

      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this.className = TEXT_UPPER;

      // update text data for certain attr changes
      for (var n = 0; n < attrChangeListLen; n++) {
        this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
      }

      this._setTextData();
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      var p = this.getPadding(),
        textHeight = this.getTextHeight(),
        lineHeightPx = this.getLineHeight() * textHeight,
        textArr = this.textArr,
        textArrLen = textArr.length,
        align = this.getAlign(),
        totalWidth = this.getWidth(),
        letterSpacing = this.getLetterSpacing(),
        textDecoration = this.textDecoration(),
        fill = this.fill(),
        fontSize = this.fontSize(),
        n;

      context.setAttr('font', this._getContextFont());

      context.setAttr('textBaseline', MIDDLE);
      context.setAttr('textAlign', LEFT);
      context.save();
      if (p) {
        context.translate(p, 0);
        context.translate(0, p + textHeight / 2);
      } else {
        context.translate(0, textHeight / 2);
      }

      // draw text lines
      for (n = 0; n < textArrLen; n++) {
        var obj = textArr[n], text = obj.text, width = obj.width;

        // horizontal alignment
        context.save();
        if (align === RIGHT) {
          context.translate(totalWidth - width - p * 2, 0);
        } else if (align === CENTER) {
          context.translate((totalWidth - width - p * 2) / 2, 0);
        }

        if (textDecoration.indexOf('underline') !== -1) {
          context.save();
          context.beginPath();
          context.moveTo(0, Math.round(lineHeightPx / 2));
          context.lineTo(Math.round(width), Math.round(lineHeightPx / 2));
          // TODO: I have no idea what is real ratio
          // just /20 looks good enough
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (textDecoration.indexOf('line-through') !== -1) {
          context.save();
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(Math.round(width), 0);
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (letterSpacing !== 0 || align === JUSTIFY) {
          //   var words = text.split(' ');
          var spacesNumber = text.split(' ').length - 1;
          for (var li = 0; li < text.length; li++) {
            var letter = text[li];
            // skip justify for the last line
            if (letter === ' ' && n !== textArrLen - 1 && align === JUSTIFY) {
              context.translate(
                Math.floor((totalWidth - width) / spacesNumber),
                0
              );
            }
            this.partialText = letter;
            context.fillStrokeShape(this);
            context.translate(
              Math.round(this._getTextSize(letter).width) + letterSpacing,
              0
            );
          }
        } else {
          this.partialText = text;

          context.fillStrokeShape(this);
        }
        context.restore();
        context.translate(0, lineHeightPx);
      }
      context.restore();
    },
    _hitFunc: function(context) {
      var width = this.getWidth(), height = this.getHeight();

      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    },
    // _useBufferCanvas: function(caching) {
    //     var useIt = Konva.Shape.prototype._useBufferCanvas.call(this, caching);
    //     if (useIt) {
    //       return true;
    //     }
    //     return false;
    //     // return isFirefox && this.hasFill() && this.hasShadow();
    // },
    setText: function(text) {
      var str = Konva.Util._isString(text) ? text : (text || '').toString();
      this._setAttr(TEXT, str);
      return this;
    },
    /**
         * get width of text area, which includes padding
         * @method
         * @memberof Konva.Text.prototype
         * @returns {Number}
         */
    getWidth: function() {
      var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
      return isAuto
        ? this.getTextWidth() + this.getPadding() * 2
        : this.attrs.width;
    },
    /**
         * get the height of the text area, which takes into account multi-line text, line heights, and padding
         * @method
         * @memberof Konva.Text.prototype
         * @returns {Number}
         */
    getHeight: function() {
      var isAuto = this.attrs.height === AUTO ||
        this.attrs.height === undefined;
      return isAuto
        ? this.getTextHeight() * this.textArr.length * this.getLineHeight() +
            this.getPadding() * 2
        : this.attrs.height;
    },
    /**
         * get text width
         * @method
         * @memberof Konva.Text.prototype
         * @returns {Number}
         */
    getTextWidth: function() {
      return this.textWidth;
    },
    /**
         * get text height
         * @method
         * @memberof Konva.Text.prototype
         * @returns {Number}
         */
    getTextHeight: function() {
      return this.textHeight;
    },
    _getTextSize: function(text) {
      var _context = dummyContext, fontSize = this.getFontSize(), metrics;

      _context.save();
      _context.font = this._getContextFont();

      metrics = _context.measureText(text);
      _context.restore();
      return {
        width: metrics.width,
        height: parseInt(fontSize, 10)
      };
    },
    _getContextFont: function() {
      // IE don't want to work with usual font style
      // bold was not working
      // removing font variant will solve
      // fix for: https://github.com/konvajs/konva/issues/94
      if (Konva.UA.isIE) {
        return this.getFontStyle() +
          SPACE +
          this.getFontSize() +
          PX_SPACE +
          this.getFontFamily();
      }
      return this.getFontStyle() +
        SPACE +
        this.getFontVariant() +
        SPACE +
        this.getFontSize() +
        PX_SPACE +
        this.getFontFamily();
    },
    _addTextLine: function(line) {
      if (this.align() === JUSTIFY) {
        line = line.trim();
      }
      var width = this._getTextWidth(line);
      return this.textArr.push({ text: line, width: width });
    },
    _getTextWidth: function(text) {
      var latterSpacing = this.getLetterSpacing();
      var length = text.length;
      return dummyContext.measureText(text).width +
        (length ? latterSpacing * (length - 1) : 0);
    },
    _setTextData: function() {
      var lines = this.getText().split('\n'),
        fontSize = +this.getFontSize(),
        textWidth = 0,
        lineHeightPx = this.getLineHeight() * fontSize,
        width = this.attrs.width,
        height = this.attrs.height,
        fixedWidth = width !== AUTO,
        fixedHeight = height !== AUTO,
        padding = this.getPadding(),
        maxWidth = width - padding * 2,
        maxHeightPx = height - padding * 2,
        currentHeightPx = 0,
        wrap = this.getWrap(),
        shouldWrap = wrap !== NONE,
        wrapAtWord = wrap !== CHAR && shouldWrap;

      this.textArr = [];
      dummyContext.save();
      dummyContext.font = this._getContextFont();
      for (var i = 0, max = lines.length; i < max; ++i) {
        var line = lines[i];

        var lineWidth = this._getTextWidth(line);
        if (fixedWidth && lineWidth > maxWidth) {
          /*
                     * if width is fixed and line does not fit entirely
                     * break the line into multiple fitting lines
                     */
          while (line.length > 0) {
            /*
                         * use binary search to find the longest substring that
                         * that would fit in the specified width
                         */
            var low = 0, high = line.length, match = '', matchWidth = 0;
            while (low < high) {
              var mid = low + high >>> 1,
                substr = line.slice(0, mid + 1),
                substrWidth = this._getTextWidth(substr);
              if (substrWidth <= maxWidth) {
                low = mid + 1;
                match = substr;
                matchWidth = substrWidth;
              } else {
                high = mid;
              }
            }
            /*
                         * 'low' is now the index of the substring end
                         * 'match' is the substring
                         * 'matchWidth' is the substring width in px
                         */
            if (match) {
              // a fitting substring was found
              if (wrapAtWord) {
                // try to find a space or dash where wrapping could be done
                var wrapIndex = Math.max(
                  match.lastIndexOf(SPACE),
                  match.lastIndexOf(DASH)
                ) + 1;
                if (wrapIndex > 0) {
                  // re-cut the substring found at the space/dash position
                  low = wrapIndex;
                  match = match.slice(0, low);
                  matchWidth = this._getTextWidth(match);
                }
              }
              this._addTextLine(match);
              textWidth = Math.max(textWidth, matchWidth);
              currentHeightPx += lineHeightPx;
              if (
                !shouldWrap ||
                (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx)
              ) {
                /*
                                 * stop wrapping if wrapping is disabled or if adding
                                 * one more line would overflow the fixed height
                                 */
                break;
              }
              line = line.slice(low);
              if (line.length > 0) {
                // Check if the remaining text would fit on one line
                lineWidth = this._getTextWidth(line);
                if (lineWidth <= maxWidth) {
                  // if it does, add the line and break out of the loop
                  this._addTextLine(line);
                  currentHeightPx += lineHeightPx;
                  textWidth = Math.max(textWidth, lineWidth);
                  break;
                }
              }
            } else {
              // not even one character could fit in the element, abort
              break;
            }
          }
        } else {
          // element width is automatically adjusted to max line width
          this._addTextLine(line);
          currentHeightPx += lineHeightPx;
          textWidth = Math.max(textWidth, lineWidth);
        }
        // if element height is fixed, abort if adding one more line would overflow
        if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
          break;
        }
      }
      dummyContext.restore();
      this.textHeight = fontSize;
      // var maxTextWidth = 0;
      // for(var j = 0; j < this.textArr.length; j++) {
      //     maxTextWidth = Math.max(maxTextWidth, this.textArr[j].width);
      // }
      this.textWidth = textWidth;
    }
  };
  Konva.Util.extend(Konva.Text, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Text, 'fontFamily', 'Arial');

  /**
     * get/set font family
     * @name fontFamily
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} fontFamily
     * @returns {String}
     * @example
     * // get font family
     * var fontFamily = text.fontFamily();
     *
     * // set font family
     * text.fontFamily('Arial');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'fontSize', 12);

  /**
     * get/set font size in pixels
     * @name fontSize
     * @method
     * @memberof Konva.Text.prototype
     * @param {Number} fontSize
     * @returns {Number}
     * @example
     * // get font size
     * var fontSize = text.fontSize();
     *
     * // set font size to 22px
     * text.fontSize(22);
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'fontStyle', NORMAL);

  /**
     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
     * @name fontStyle
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} fontStyle
     * @returns {String}
     * @example
     * // get font style
     * var fontStyle = text.fontStyle();
     *
     * // set font style
     * text.fontStyle('bold');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'fontVariant', NORMAL);

  /**
     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
     * @name fontVariant
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} fontVariant
     * @returns {String}
     * @example
     * // get font variant
     * var fontVariant = text.fontVariant();
     *
     * // set font variant
     * text.fontVariant('small-caps');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'padding', 0);

  /**
     * set padding
     * @name padding
     * @method
     * @memberof Konva.Text.prototype
     * @param {Number} padding
     * @returns {Number}
     * @example
     * // get padding
     * var padding = text.padding();
     *
     * // set padding to 10 pixels
     * text.padding(10);
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'align', LEFT);

  /**
     * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
     * @name align
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} align
     * @returns {String}
     * @example
     * // get text align
     * var align = text.align();
     *
     * // center text
     * text.align('center');
     *
     * // align text to right
     * text.align('right');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'lineHeight', 1);

  /**
     * get/set line height.  The default is 1.
     * @name lineHeight
     * @method
     * @memberof Konva.Text.prototype
     * @param {Number} lineHeight
     * @returns {Number}
     * @example
     * // get line height
     * var lineHeight = text.lineHeight();
     *
     * // set the line height
     * text.lineHeight(2);
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'wrap', WORD);

  /**
     * get/set wrap.  Can be word, char, or none. Default is word.
     * @name wrap
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} wrap
     * @returns {String}
     * @example
     * // get wrap
     * var wrap = text.wrap();
     *
     * // set wrap
     * text.wrap('word');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'letterSpacing', 0);

  /**
       * set letter spacing property. Default value is 0.
       * @name letterSpacing
       * @method
       * @memberof Konva.TextPath.prototype
       * @param {Number} letterSpacing
       */

  Konva.Factory.addGetter(Konva.Text, 'text', EMPTY_STRING);
  Konva.Factory.addOverloadedGetterSetter(Konva.Text, 'text');

  /**
     * get/set text
     * @name getText
     * @method
     * @memberof Konva.Text.prototype
     * @param {String} text
     * @returns {String}
     * @example
     * // get text
     * var text = text.text();
     *
     * // set text
     * text.text('Hello world!');
     */

  Konva.Factory.addGetterSetter(Konva.Text, 'textDecoration', EMPTY_STRING);

  /**
      * get/set text decoration of a text.  Possible values are 'underline', 'line-through' or combination of these values separated by space
      * @name textDecoration
      * @method
      * @memberof Konva.Text.prototype
      * @param {String} textDecoration
      * @returns {String}
      * @example
      * // get text decoration
      * var textDecoration = text.textDecoration();
      *
      * // underline text
      * text.textDecoration('underline');
      *
      * // strike text
      * text.textDecoration('line-through');
      *
      * // underline and strike text
      * text.textDecoration('underline line-through');
      */

  Konva.Collection.mapMethods(Konva.Text);
})();

(function() {
  'use strict';
  /**
     * Line constructor.&nbsp; Lines are defined by an array of points and
     *  a tension
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Array} config.points
     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
     *   The default is 0
     * @param {Boolean} [config.closed] defines whether or not the line shape is closed, creating a polygon or blob
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var line = new Konva.Line({
     *   x: 100,
     *   y: 50,
     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
     *   stroke: 'red',
     *   tension: 1
     * });
     */
  Konva.Line = function(config) {
    this.___init(config);
  };

  Konva.Line.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Line';

      this.on(
        'pointsChange.konva tensionChange.konva closedChange.konva',
        function() {
          this._clearCache('tensionPoints');
        }
      );

      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var points = this.getPoints(),
        length = points.length,
        tension = this.getTension(),
        closed = this.getClosed(),
        tp,
        len,
        n;

      if (!length) {
        return;
      }

      context.beginPath();
      context.moveTo(points[0], points[1]);

      // tension
      if (tension !== 0 && length > 4) {
        tp = this.getTensionPoints();
        len = tp.length;
        n = closed ? 0 : 4;

        if (!closed) {
          context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
        }

        while (n < len - 2) {
          context.bezierCurveTo(
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++],
            tp[n++]
          );
        }

        if (!closed) {
          context.quadraticCurveTo(
            tp[len - 2],
            tp[len - 1],
            points[length - 2],
            points[length - 1]
          );
        }
      } else {
        // no tension
        for (n = 2; n < length; n += 2) {
          context.lineTo(points[n], points[n + 1]);
        }
      }

      // closed e.g. polygons and blobs
      if (closed) {
        context.closePath();
        context.fillStrokeShape(this);
      } else {
        // open e.g. lines and splines
        context.strokeShape(this);
      }
    },
    getTensionPoints: function() {
      return this._getCache('tensionPoints', this._getTensionPoints);
    },
    _getTensionPoints: function() {
      if (this.getClosed()) {
        return this._getTensionPointsClosed();
      } else {
        return Konva.Util._expandPoints(this.getPoints(), this.getTension());
      }
    },
    _getTensionPointsClosed: function() {
      var p = this.getPoints(),
        len = p.length,
        tension = this.getTension(),
        util = Konva.Util,
        firstControlPoints = util._getControlPoints(
          p[len - 2],
          p[len - 1],
          p[0],
          p[1],
          p[2],
          p[3],
          tension
        ),
        lastControlPoints = util._getControlPoints(
          p[len - 4],
          p[len - 3],
          p[len - 2],
          p[len - 1],
          p[0],
          p[1],
          tension
        ),
        middle = Konva.Util._expandPoints(p, tension),
        tp = [firstControlPoints[2], firstControlPoints[3]]
          .concat(middle)
          .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1]
          ]);

      return tp;
    },
    getWidth: function() {
      return this.getSelfRect().width;
    },
    getHeight: function() {
      return this.getSelfRect().height;
    },
    // overload size detection
    getSelfRect: function() {
      var points;
      if (this.getTension() !== 0) {
        points = this._getTensionPoints();
      } else {
        points = this.getPoints();
      }
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    }
  };
  Konva.Util.extend(Konva.Line, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Line, 'closed', false);

  /**
     * get/set closed flag.  The default is false
     * @name closed
     * @method
     * @memberof Konva.Line.prototype
     * @param {Boolean} closed
     * @returns {Boolean}
     * @example
     * // get closed flag
     * var closed = line.closed();
     *
     * // close the shape
     * line.closed(true);
     *
     * // open the shape
     * line.closed(false);
     */

  Konva.Factory.addGetterSetter(Konva.Line, 'tension', 0);

  /**
     * get/set tension
     * @name tension
     * @method
     * @memberof Konva.Line.prototype
     * @param {Number} Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
     *   The default is 0
     * @returns {Number}
     * @example
     * // get tension
     * var tension = line.tension();
     *
     * // set tension
     * line.tension(3);
     */

  Konva.Factory.addGetterSetter(Konva.Line, 'points', []);
  /**
     * get/set points array
     * @name points
     * @method
     * @memberof Konva.Line.prototype
     * @param {Array} points
     * @returns {Array}
     * @example
     * // get points
     * var points = line.points();
     *
     * // set points
     * line.points([10, 20, 30, 40, 50, 60]);
     *
     * // push a new point
     * line.points(line.points().concat([70, 80]));
     */

  Konva.Collection.mapMethods(Konva.Line);
})();

(function() {
  'use strict';
  /**
     * Sprite constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {String} config.animation animation key
     * @param {Object} config.animations animation map
     * @param {Integer} [config.frameIndex] animation frame index
     * @param {Image} config.image image object
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var imageObj = new Image();
     * imageObj.onload = function() {
     *   var sprite = new Konva.Sprite({
     *     x: 200,
     *     y: 100,
     *     image: imageObj,
     *     animation: 'standing',
     *     animations: {
     *       standing: [
     *         // x, y, width, height (6 frames)
     *         0, 0, 49, 109,
     *         52, 0, 49, 109,
     *         105, 0, 49, 109,
     *         158, 0, 49, 109,
     *         210, 0, 49, 109,
     *         262, 0, 49, 109
     *       ],
     *       kicking: [
     *         // x, y, width, height (6 frames)
     *         0, 109, 45, 98,
     *         45, 109, 45, 98,
     *         95, 109, 63, 98,
     *         156, 109, 70, 98,
     *         229, 109, 60, 98,
     *         287, 109, 41, 98
     *       ]
     *     },
     *     frameRate: 7,
     *     frameIndex: 0
     *   });
     * };
     * imageObj.src = '/path/to/image.jpg'
     */
  Konva.Sprite = function(config) {
    this.___init(config);
  };

  Konva.Sprite.prototype = {
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Sprite';

      this._updated = true;
      var that = this;
      this.anim = new Konva.Animation(function() {
        // if we don't need to redraw layer we should return false
        var updated = that._updated;
        that._updated = false;
        return updated;
      });
      this.on('animationChange.konva', function() {
        // reset index when animation changes
        this.frameIndex(0);
      });
      this.on('frameIndexChange.konva', function() {
        this._updated = true;
      });
      // smooth change for frameRate
      this.on('frameRateChange.konva', function() {
        if (!this.anim.isRunning()) {
          return;
        }
        clearInterval(this.interval);
        this._setInterval();
      });

      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      var anim = this.getAnimation(),
        index = this.frameIndex(),
        ix4 = index * 4,
        set = this.getAnimations()[anim],
        offsets = this.frameOffsets(),
        x = set[ix4 + 0],
        y = set[ix4 + 1],
        width = set[ix4 + 2],
        height = set[ix4 + 3],
        image = this.getImage();

      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }

      if (image) {
        if (offsets) {
          var offset = offsets[anim], ix2 = index * 2;
          context.drawImage(
            image,
            x,
            y,
            width,
            height,
            offset[ix2 + 0],
            offset[ix2 + 1],
            width,
            height
          );
        } else {
          context.drawImage(image, x, y, width, height, 0, 0, width, height);
        }
      }
    },
    _hitFunc: function(context) {
      var anim = this.getAnimation(),
        index = this.frameIndex(),
        ix4 = index * 4,
        set = this.getAnimations()[anim],
        offsets = this.frameOffsets(),
        width = set[ix4 + 2],
        height = set[ix4 + 3];

      context.beginPath();
      if (offsets) {
        var offset = offsets[anim];
        var ix2 = index * 2;
        context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
      } else {
        context.rect(0, 0, width, height);
      }
      context.closePath();
      context.fillShape(this);
    },
    _useBufferCanvas: function() {
      return (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
        this.hasStroke();
    },
    _setInterval: function() {
      var that = this;
      this.interval = setInterval(
        function() {
          that._updateIndex();
        },
        1000 / this.getFrameRate()
      );
    },
    /**
         * start sprite animation
         * @method
         * @memberof Konva.Sprite.prototype
         */
    start: function() {
      var layer = this.getLayer();

      /*
             * animation object has no executable function because
             *  the updates are done with a fixed FPS with the setInterval
             *  below.  The anim object only needs the layer reference for
             *  redraw
             */
      this.anim.setLayers(layer);
      this._setInterval();
      this.anim.start();
    },
    /**
         * stop sprite animation
         * @method
         * @memberof Konva.Sprite.prototype
         */
    stop: function() {
      this.anim.stop();
      clearInterval(this.interval);
    },
    /**
         * determine if animation of sprite is running or not.  returns true or false
         * @method
         * @memberof Konva.Animation.prototype
         * @returns {Boolean}
         */
    isRunning: function() {
      return this.anim.isRunning();
    },
    _updateIndex: function() {
      var index = this.frameIndex(),
        animation = this.getAnimation(),
        animations = this.getAnimations(),
        anim = animations[animation],
        len = anim.length / 4;

      if (index < len - 1) {
        this.frameIndex(index + 1);
      } else {
        this.frameIndex(0);
      }
    }
  };
  Konva.Util.extend(Konva.Sprite, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Sprite, 'animation');

  /**
     * get/set animation key
     * @name animation
     * @method
     * @memberof Konva.Sprite.prototype
     * @param {String} anim animation key
     * @returns {String}
     * @example
     * // get animation key
     * var animation = sprite.animation();
     *
     * // set animation key
     * sprite.animation('kicking');
     */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'animations');

  /**
     * get/set animations map
     * @name animations
     * @method
     * @memberof Konva.Sprite.prototype
     * @param {Object} animations
     * @returns {Object}
     * @example
     * // get animations map
     * var animations = sprite.animations();
     *
     * // set animations map
     * sprite.animations({
     *   standing: [
     *     // x, y, width, height (6 frames)
     *     0, 0, 49, 109,
     *     52, 0, 49, 109,
     *     105, 0, 49, 109,
     *     158, 0, 49, 109,
     *     210, 0, 49, 109,
     *     262, 0, 49, 109
     *   ],
     *   kicking: [
     *     // x, y, width, height (6 frames)
     *     0, 109, 45, 98,
     *     45, 109, 45, 98,
     *     95, 109, 63, 98,
     *     156, 109, 70, 98,
     *     229, 109, 60, 98,
     *     287, 109, 41, 98
     *   ]
     * });
     */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameOffsets');

  /**
    * get/set offsets map
    * @name offsets
    * @method
    * @memberof Konva.Sprite.prototype
    * @param {Object} offsets
    * @returns {Object}
    * @example
    * // get offsets map
    * var offsets = sprite.offsets();
    *
    * // set offsets map
    * sprite.offsets({
    *   standing: [
    *     // x, y (6 frames)
    *     0, 0,
    *     0, 0,
    *     5, 0,
    *     0, 0,
    *     0, 3,
    *     2, 0
    *   ],
    *   kicking: [
    *     // x, y (6 frames)
    *     0, 5,
    *     5, 0,
    *     10, 0,
    *     0, 0,
    *     2, 1,
    *     0, 0
    *   ]
    * });
    */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'image');

  /**
     * get/set image
     * @name image
     * @method
     * @memberof Konva.Sprite.prototype
     * @param {Image} image
     * @returns {Image}
     * @example
     * // get image
     * var image = sprite.image();
     *
     * // set image
     * sprite.image(imageObj);
     */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameIndex', 0);

  /**
     * set/set animation frame index
     * @name frameIndex
     * @method
     * @memberof Konva.Sprite.prototype
     * @param {Integer} frameIndex
     * @returns {Integer}
     * @example
     * // get animation frame index
     * var frameIndex = sprite.frameIndex();
     *
     * // set animation frame index
     * sprite.frameIndex(3);
     */

  Konva.Factory.addGetterSetter(Konva.Sprite, 'frameRate', 17);

  /**
     * get/set frame rate in frames per second.  Increase this number to make the sprite
     *  animation run faster, and decrease the number to make the sprite animation run slower
     *  The default is 17 frames per second
     * @name frameRate
     * @method
     * @memberof Konva.Sprite.prototype
     * @param {Integer} frameRate
     * @returns {Integer}
     * @example
     * // get frame rate
     * var frameRate = sprite.frameRate();
     *
     * // set frame rate to 2 frames per second
     * sprite.frameRate(2);
     */

  Konva.Factory.backCompat(Konva.Sprite, {
    index: 'frameIndex',
    getIndex: 'getFrameIndex',
    setIndex: 'setFrameIndex'
  });

  Konva.Collection.mapMethods(Konva.Sprite);
})();

/*eslint-disable  no-shadow, max-len, max-depth */
(function() {
  'use strict';
  /**
     * Path constructor.
     * @author Jason Follas
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {String} config.data SVG data string
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var path = new Konva.Path({
     *   x: 240,
     *   y: 40,
     *   data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
     *   fill: 'green',
     *   scale: 2
     * });
     */
  Konva.Path = function(config) {
    this.___init(config);
  };

  Konva.Path.prototype = {
    ___init: function(config) {
      this.dataArray = [];
      var that = this;

      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Path';

      this.dataArray = Konva.Path.parsePathData(this.getData());
      this.on('dataChange.konva', function() {
        that.dataArray = Konva.Path.parsePathData(this.getData());
      });

      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var ca = this.dataArray;

      // context position
      context.beginPath();
      for (var n = 0; n < ca.length; n++) {
        var c = ca[n].command;
        var p = ca[n].points;
        switch (c) {
          case 'L':
            context.lineTo(p[0], p[1]);
            break;
          case 'M':
            context.moveTo(p[0], p[1]);
            break;
          case 'C':
            context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
            break;
          case 'Q':
            context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
            break;
          case 'A':
            var cx = p[0],
              cy = p[1],
              rx = p[2],
              ry = p[3],
              theta = p[4],
              dTheta = p[5],
              psi = p[6],
              fs = p[7];

            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;

            context.translate(cx, cy);
            context.rotate(psi);
            context.scale(scaleX, scaleY);
            context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
            context.scale(1 / scaleX, 1 / scaleY);
            context.rotate(-psi);
            context.translate(-cx, -cy);

            break;
          case 'z':
            context.closePath();
            break;
        }
      }

      context.fillStrokeShape(this);
    },
    getSelfRect: function() {
      var points = [];
      this.dataArray.forEach(function(data) {
        points = points.concat(data.points);
      });
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    }
  };
  Konva.Util.extend(Konva.Path, Konva.Shape);

  Konva.Path.getLineLength = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };
  Konva.Path.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
    if (fromX === undefined) {
      fromX = P1x;
    }
    if (fromY === undefined) {
      fromY = P1y;
    }

    var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
    var run = Math.sqrt(dist * dist / (1 + m * m));
    if (P2x < P1x) {
      run *= -1;
    }
    var rise = m * run;
    var pt;

    if (P2x === P1x) {
      // vertical line
      pt = {
        x: fromX,
        y: fromY + rise
      };
    } else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
      pt = {
        x: fromX + run,
        y: fromY + rise
      };
    } else {
      var ix, iy;

      var len = this.getLineLength(P1x, P1y, P2x, P2y);
      if (len < 0.00000001) {
        return undefined;
      }
      var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
      u = u / (len * len);
      ix = P1x + u * (P2x - P1x);
      iy = P1y + u * (P2y - P1y);

      var pRise = this.getLineLength(fromX, fromY, ix, iy);
      var pRun = Math.sqrt(dist * dist - pRise * pRise);
      run = Math.sqrt(pRun * pRun / (1 + m * m));
      if (P2x < P1x) {
        run *= -1;
      }
      rise = m * run;
      pt = {
        x: ix + run,
        y: iy + rise
      };
    }

    return pt;
  };

  Konva.Path.getPointOnCubicBezier = function(
    pct,
    P1x,
    P1y,
    P2x,
    P2y,
    P3x,
    P3y,
    P4x,
    P4y
  ) {
    function CB1(t) {
      return t * t * t;
    }
    function CB2(t) {
      return 3 * t * t * (1 - t);
    }
    function CB3(t) {
      return 3 * t * (1 - t) * (1 - t);
    }
    function CB4(t) {
      return (1 - t) * (1 - t) * (1 - t);
    }
    var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
    var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

    return {
      x: x,
      y: y
    };
  };
  Konva.Path.getPointOnQuadraticBezier = function(
    pct,
    P1x,
    P1y,
    P2x,
    P2y,
    P3x,
    P3y
  ) {
    function QB1(t) {
      return t * t;
    }
    function QB2(t) {
      return 2 * t * (1 - t);
    }
    function QB3(t) {
      return (1 - t) * (1 - t);
    }
    var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
    var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

    return {
      x: x,
      y: y
    };
  };
  Konva.Path.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
    var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
    var pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  };
  /*
     * get parsed data array from the data
     *  string.  V, v, H, h, and l data are converted to
     *  L data for the purpose of high performance Path
     *  rendering
     */
  Konva.Path.parsePathData = function(data) {
    // Path Data Segment must begin with a moveTo
    //m (x y)+  Relative moveTo (subsequent points are treated as lineTo)
    //M (x y)+  Absolute moveTo (subsequent points are treated as lineTo)
    //l (x y)+  Relative lineTo
    //L (x y)+  Absolute LineTo
    //h (x)+    Relative horizontal lineTo
    //H (x)+    Absolute horizontal lineTo
    //v (y)+    Relative vertical lineTo
    //V (y)+    Absolute vertical lineTo
    //z (closepath)
    //Z (closepath)
    //c (x1 y1 x2 y2 x y)+ Relative Bezier curve
    //C (x1 y1 x2 y2 x y)+ Absolute Bezier curve
    //q (x1 y1 x y)+       Relative Quadratic Bezier
    //Q (x1 y1 x y)+       Absolute Quadratic Bezier
    //t (x y)+    Shorthand/Smooth Relative Quadratic Bezier
    //T (x y)+    Shorthand/Smooth Absolute Quadratic Bezier
    //s (x2 y2 x y)+       Shorthand/Smooth Relative Bezier curve
    //S (x2 y2 x y)+       Shorthand/Smooth Absolute Bezier curve
    //a (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+     Relative Elliptical Arc
    //A (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  Absolute Elliptical Arc

    // return early if data is not defined
    if (!data) {
      return [];
    }

    // command string
    var cs = data;

    // command chars
    var cc = [
      'm',
      'M',
      'l',
      'L',
      'v',
      'V',
      'h',
      'H',
      'z',
      'Z',
      'c',
      'C',
      'q',
      'Q',
      't',
      'T',
      's',
      'S',
      'a',
      'A'
    ];
    // convert white spaces to commas
    cs = cs.replace(new RegExp(' ', 'g'), ',');
    // create pipes so that we can split the data
    for (var n = 0; n < cc.length; n++) {
      cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
    }
    // create array
    var arr = cs.split('|');
    var ca = [];
    // init context point
    var cpx = 0;
    var cpy = 0;
    for (n = 1; n < arr.length; n++) {
      var str = arr[n];
      var c = str.charAt(0);
      str = str.slice(1);
      // remove ,- for consistency
      str = str.replace(new RegExp(',-', 'g'), '-');
      // add commas so that it's easy to split
      str = str.replace(new RegExp('-', 'g'), ',-');
      str = str.replace(new RegExp('e,-', 'g'), 'e-');
      var p = str.split(',');
      if (p.length > 0 && p[0] === '') {
        p.shift();
      }
      // convert strings to floats
      for (var i = 0; i < p.length; i++) {
        p[i] = parseFloat(p[i]);
      }
      while (p.length > 0) {
        if (isNaN(p[0])) {
          // case for a trailing comma before next command
          break;
        }

        var cmd = null;
        var points = [];
        var startX = cpx, startY = cpy;
        // Move var from within the switch to up here (jshint)
        var prevCmd, ctlPtx, ctlPty; // Ss, Tt
        var rx, ry, psi, fa, fs, x1, y1; // Aa

        // convert l, H, h, V, and v to L
        switch (c) {
          // Note: Keep the lineTo's above the moveTo's in this switch
          case 'l':
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'L':
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;

          // Note: lineTo handlers need to be above this point
          case 'm':
            var dx = p.shift();
            var dy = p.shift();
            cpx += dx;
            cpy += dy;
            cmd = 'M';
            // After closing the path move the current position
            // to the the first point of the path (if any).
            if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
              for (var idx = ca.length - 2; idx >= 0; idx--) {
                if (ca[idx].command === 'M') {
                  cpx = ca[idx].points[0] + dx;
                  cpy = ca[idx].points[1] + dy;
                  break;
                }
              }
            }
            points.push(cpx, cpy);
            c = 'l';
            // subsequent points are treated as relative lineTo
            break;
          case 'M':
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'M';
            points.push(cpx, cpy);
            c = 'L';
            // subsequent points are treated as absolute lineTo
            break;

          case 'h':
            cpx += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'H':
            cpx = p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'v':
            cpy += p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'V':
            cpy = p.shift();
            cmd = 'L';
            points.push(cpx, cpy);
            break;
          case 'C':
            points.push(p.shift(), p.shift(), p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;
          case 'c':
            points.push(
              cpx + p.shift(),
              cpy + p.shift(),
              cpx + p.shift(),
              cpy + p.shift()
            );
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 'S':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'C') {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 's':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'C') {
              ctlPtx = cpx + (cpx - prevCmd.points[2]);
              ctlPty = cpy + (cpy - prevCmd.points[3]);
            }
            points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'C';
            points.push(cpx, cpy);
            break;
          case 'Q':
            points.push(p.shift(), p.shift());
            cpx = p.shift();
            cpy = p.shift();
            points.push(cpx, cpy);
            break;
          case 'q':
            points.push(cpx + p.shift(), cpy + p.shift());
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'Q';
            points.push(cpx, cpy);
            break;
          case 'T':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'Q') {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'Q';
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case 't':
            ctlPtx = cpx;
            ctlPty = cpy;
            prevCmd = ca[ca.length - 1];
            if (prevCmd.command === 'Q') {
              ctlPtx = cpx + (cpx - prevCmd.points[0]);
              ctlPty = cpy + (cpy - prevCmd.points[1]);
            }
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'Q';
            points.push(ctlPtx, ctlPty, cpx, cpy);
            break;
          case 'A':
            rx = p.shift();
            ry = p.shift();
            psi = p.shift();
            fa = p.shift();
            fs = p.shift();
            x1 = cpx;
            y1 = cpy;
            cpx = p.shift();
            cpy = p.shift();
            cmd = 'A';
            points = this.convertEndpointToCenterParameterization(
              x1,
              y1,
              cpx,
              cpy,
              fa,
              fs,
              rx,
              ry,
              psi
            );
            break;
          case 'a':
            rx = p.shift();
            ry = p.shift();
            psi = p.shift();
            fa = p.shift();
            fs = p.shift();
            x1 = cpx;
            y1 = cpy;
            cpx += p.shift();
            cpy += p.shift();
            cmd = 'A';
            points = this.convertEndpointToCenterParameterization(
              x1,
              y1,
              cpx,
              cpy,
              fa,
              fs,
              rx,
              ry,
              psi
            );
            break;
        }

        ca.push({
          command: cmd || c,
          points: points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, cmd || c, points)
        });
      }

      if (c === 'z' || c === 'Z') {
        ca.push({
          command: 'z',
          points: [],
          start: undefined,
          pathLength: 0
        });
      }
    }

    return ca;
  };
  Konva.Path.calcLength = function(x, y, cmd, points) {
    var len, p1, p2, t;
    var path = Konva.Path;

    switch (cmd) {
      case 'L':
        return path.getLineLength(x, y, points[0], points[1]);
      case 'C':
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = path.getPointOnCubicBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3],
          points[4],
          points[5]
        );
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = path.getPointOnCubicBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3],
            points[4],
            points[5]
          );
          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case 'Q':
        // Approximates by breaking curve into 100 line segments
        len = 0.0;
        p1 = path.getPointOnQuadraticBezier(
          0,
          x,
          y,
          points[0],
          points[1],
          points[2],
          points[3]
        );
        for (t = 0.01; t <= 1; t += 0.01) {
          p2 = path.getPointOnQuadraticBezier(
            t,
            x,
            y,
            points[0],
            points[1],
            points[2],
            points[3]
          );
          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case 'A':
        // Approximates by breaking curve into line segments
        len = 0.0;
        var start = points[4];
        // 4 = theta
        var dTheta = points[5];
        // 5 = dTheta
        var end = points[4] + dTheta;
        var inc = Math.PI / 180.0;
        // 1 degree resolution
        if (Math.abs(start - end) < inc) {
          inc = Math.abs(start - end);
        }
        // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi
        p1 = path.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          start,
          0
        );
        if (dTheta < 0) {
          // clockwise
          for (t = start - inc; t > end; t -= inc) {
            p2 = path.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            );
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        } else {
          // counter-clockwise
          for (t = start + inc; t < end; t += inc) {
            p2 = path.getPointOnEllipticalArc(
              points[0],
              points[1],
              points[2],
              points[3],
              t,
              0
            );
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        }
        p2 = path.getPointOnEllipticalArc(
          points[0],
          points[1],
          points[2],
          points[3],
          end,
          0
        );
        len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);

        return len;
    }

    return 0;
  };
  Konva.Path.convertEndpointToCenterParameterization = function(
    x1,
    y1,
    x2,
    y2,
    fa,
    fs,
    rx,
    ry,
    psiDeg
  ) {
    // Derived from: http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
    var psi = psiDeg * (Math.PI / 180.0);
    var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
    var yp = (-1) * Math.sin(psi) * (x1 - x2) / 2.0 +
      Math.cos(psi) * (y1 - y2) / 2.0;

    var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

    if (lambda > 1) {
      rx *= Math.sqrt(lambda);
      ry *= Math.sqrt(lambda);
    }

    var f = Math.sqrt(
      (rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
        (rx * rx * (yp * yp) + ry * ry * (xp * xp))
    );

    if (fa === fs) {
      f *= -1;
    }
    if (isNaN(f)) {
      f = 0;
    }

    var cxp = f * rx * yp / ry;
    var cyp = f * (-ry) * xp / rx;

    var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
    var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;

    var vMag = function(v) {
      return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    };
    var vRatio = function(u, v) {
      return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
    };
    var vAngle = function(u, v) {
      return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
    };
    var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
    var u = [(xp - cxp) / rx, (yp - cyp) / ry];
    var v = [((-1) * xp - cxp) / rx, ((-1) * yp - cyp) / ry];
    var dTheta = vAngle(u, v);

    if (vRatio(u, v) <= -1) {
      dTheta = Math.PI;
    }
    if (vRatio(u, v) >= 1) {
      dTheta = 0;
    }
    if (fs === 0 && dTheta > 0) {
      dTheta = dTheta - 2 * Math.PI;
    }
    if (fs === 1 && dTheta < 0) {
      dTheta = dTheta + 2 * Math.PI;
    }
    return [cx, cy, rx, ry, theta, dTheta, psi, fs];
  };
  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Path, 'data');

  /**
     * set SVG path data string.  This method
     *  also automatically parses the data string
     *  into a data array.  Currently supported SVG data:
     *  M, m, L, l, H, h, V, v, Q, q, T, t, C, c, S, s, A, a, Z, z
     * @name setData
     * @method
     * @memberof Konva.Path.prototype
     * @param {String} SVG path command string
     */

  /**
     * get SVG path data string
     * @name getData
     * @method
     * @memberof Konva.Path.prototype
     */

  Konva.Collection.mapMethods(Konva.Path);
})();

(function() {
  'use strict';
  var EMPTY_STRING = '',
    //CALIBRI = 'Calibri',
    NORMAL = 'normal';

  /**
     * Path constructor.
     * @author Jason Follas
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {String} [config.fontFamily] default is Calibri
     * @param {Number} [config.fontSize] default is 12
     * @param {String} [config.fontStyle] can be normal, bold, or italic.  Default is normal
     * @param {String} [config.fontVariant] can be normal or small-caps.  Default is normal
     * @param {String} config.text
     * @param {String} config.data SVG data string
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var textpath = new Konva.TextPath({
     *   x: 100,
     *   y: 50,
     *   fill: '#333',
     *   fontSize: '24',
     *   fontFamily: 'Arial',
     *   text: 'All the world\'s a stage, and all the men and women merely players.',
     *   data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
     * });
     */
  Konva.TextPath = function(config) {
    this.___init(config);
  };

  function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
  }
  function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
  }

  Konva.TextPath.prototype = {
    ___init: function(config) {
      var that = this;
      this.dummyCanvas = Konva.Util.createCanvasElement();
      this.dataArray = [];

      // call super constructor
      Konva.Shape.call(this, config);

      // overrides
      // TODO: shouldn't this be on the prototype?
      this._fillFunc = _fillFunc;
      this._strokeFunc = _strokeFunc;
      this._fillFuncHit = _fillFunc;
      this._strokeFuncHit = _strokeFunc;

      this.className = 'TextPath';

      this.dataArray = Konva.Path.parsePathData(this.attrs.data);
      this.on('dataChange.konva', function() {
        that.dataArray = Konva.Path.parsePathData(this.attrs.data);
        that._setTextData();
      });

      // update text data for certain attr changes
      this.on(
        'textChange.konva alignChange.konva letterSpacingChange.konva',
        that._setTextData
      );
      that._setTextData();
      this.sceneFunc(this._sceneFunc);
      this.hitFunc(this._hitFunc);
    },
    _sceneFunc: function(context) {
      context.setAttr('font', this._getContextFont());
      context.setAttr('textBaseline', this.getTextBaseline());
      context.setAttr('textAlign', 'left');
      context.save();

      var textDecoration = this.textDecoration();
      var fill = this.fill();
      var fontSize = this.fontSize();

      var glyphInfo = this.glyphInfo;
      if (textDecoration === 'underline') {
        context.beginPath();
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        context.save();

        var p0 = glyphInfo[i].p0;

        context.translate(p0.x, p0.y);
        context.rotate(glyphInfo[i].rotation);
        this.partialText = glyphInfo[i].text;

        context.fillStrokeShape(this);
        if (textDecoration === 'underline') {
          if (i === 0) {
            context.moveTo(0, fontSize / 2 + 1);
          }

          context.lineTo(fontSize, fontSize / 2 + 1);
        }
        context.restore();

        //// To assist with debugging visually, uncomment following
        //
        // if (i % 2)
        // context.strokeStyle = 'cyan';
        // else
        // context.strokeStyle = 'green';
        // var p1 = glyphInfo[i].p1;
        // context.moveTo(p0.x, p0.y);
        // context.lineTo(p1.x, p1.y);
        // context.stroke();
      }
      if (textDecoration === 'underline') {
        context.strokeStyle = fill;
        context.lineWidth = fontSize / 20;
        context.stroke();
      }

      context.restore();
    },
    _hitFunc: function(context) {
      context.beginPath();

      var glyphInfo = this.glyphInfo;
      if (glyphInfo.length >= 1) {
        var p0 = glyphInfo[0].p0;
        context.moveTo(p0.x, p0.y);
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        var p1 = glyphInfo[i].p1;
        context.lineTo(p1.x, p1.y);
      }
      context.setAttr('lineWidth', this.getFontSize());
      context.setAttr('strokeStyle', this.colorKey);
      context.stroke();
    },
    /**
         * get text width in pixels
         * @method
         * @memberof Konva.TextPath.prototype
         */
    getTextWidth: function() {
      return this.textWidth;
    },
    /**
         * get text height in pixels
         * @method
         * @memberof Konva.TextPath.prototype
         */
    getTextHeight: function() {
      return this.textHeight;
    },
    /**
         * set text
         * @method
         * @memberof Konva.TextPath.prototype
         * @param {String} text
         */
    setText: function(text) {
      Konva.Text.prototype.setText.call(this, text);
    },
    _getTextSize: function(text) {
      var dummyCanvas = this.dummyCanvas;
      var _context = dummyCanvas.getContext('2d');

      _context.save();

      _context.font = this._getContextFont();
      var metrics = _context.measureText(text);

      _context.restore();

      return {
        width: metrics.width,
        height: parseInt(this.attrs.fontSize, 10)
      };
    },
    _setTextData: function() {
      var that = this;
      var size = this._getTextSize(this.attrs.text);
      var letterSpacing = this.getLetterSpacing();
      var align = this.align();

      this.textWidth = size.width;
      this.textHeight = size.height;

      var textFullWidth = Math.max(
        this.textWidth + ((this.attrs.text || '').length - 1) * letterSpacing,
        0
      );

      this.glyphInfo = [];

      var fullPathWidth = 0;
      for (var l = 0; l < that.dataArray.length; l++) {
        if (that.dataArray[l].pathLength > 0) {
          fullPathWidth += that.dataArray[l].pathLength;
        }
      }

      var offset = 0;
      if (align === 'center') {
        offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
      }
      if (align === 'right') {
        offset = Math.max(0, fullPathWidth - textFullWidth);
      }

      var charArr = this.getText().split('');
      var spacesNumber = this.getText().split(' ').length - 1;

      var p0, p1, pathCmd;

      var pIndex = -1;
      var currentT = 0;
      // var sumLength = 0;
      // for(var j = 0; j < that.dataArray.length; j++) {
      //   if(that.dataArray[j].pathLength > 0) {
      //
      //     if (sumLength + that.dataArray[j].pathLength > offset) {}
      //       fullPathWidth += that.dataArray[j].pathLength;
      //   }
      // }

      var getNextPathSegment = function() {
        currentT = 0;
        var pathData = that.dataArray;

        for (var j = pIndex + 1; j < pathData.length; j++) {
          if (pathData[j].pathLength > 0) {
            pIndex = j;

            return pathData[j];
          } else if (pathData[j].command === 'M') {
            p0 = {
              x: pathData[j].points[0],
              y: pathData[j].points[1]
            };
          }
        }

        return {};
      };

      var findSegmentToFitCharacter = function(c) {
        var glyphWidth = that._getTextSize(c).width + letterSpacing;

        if (c === ' ' && align === 'justify') {
          glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
        }

        var currLen = 0;
        var attempts = 0;

        p1 = undefined;
        while (
          Math.abs(glyphWidth - currLen) / glyphWidth > 0.01 && attempts < 25
        ) {
          attempts++;
          var cumulativePathLength = currLen;
          while (pathCmd === undefined) {
            pathCmd = getNextPathSegment();

            if (
              pathCmd && cumulativePathLength + pathCmd.pathLength < glyphWidth
            ) {
              cumulativePathLength += pathCmd.pathLength;
              pathCmd = undefined;
            }
          }

          if (pathCmd === {} || p0 === undefined) {
            return undefined;
          }

          var needNewSegment = false;

          switch (pathCmd.command) {
            case 'L':
              if (
                Konva.Path.getLineLength(
                  p0.x,
                  p0.y,
                  pathCmd.points[0],
                  pathCmd.points[1]
                ) > glyphWidth
              ) {
                p1 = Konva.Path.getPointOnLine(
                  glyphWidth,
                  p0.x,
                  p0.y,
                  pathCmd.points[0],
                  pathCmd.points[1],
                  p0.x,
                  p0.y
                );
              } else {
                pathCmd = undefined;
              }
              break;
            case 'A':
              var start = pathCmd.points[4];
              // 4 = theta
              var dTheta = pathCmd.points[5];
              // 5 = dTheta
              var end = pathCmd.points[4] + dTheta;

              if (currentT === 0) {
                currentT = start + 0.00000001;
              } else if (glyphWidth > currLen) {
                // Just in case start is 0
                currentT += Math.PI / 180.0 * dTheta / Math.abs(dTheta);
              } else {
                currentT -= Math.PI / 360.0 * dTheta / Math.abs(dTheta);
              }

              // Credit for bug fix: @therth https://github.com/ericdrowell/KonvaJS/issues/249
              // Old code failed to render text along arc of this path: "M 50 50 a 150 50 0 0 1 250 50 l 50 0"
              if (
                (dTheta < 0 && currentT < end) ||
                (dTheta >= 0 && currentT > end)
              ) {
                currentT = end;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnEllipticalArc(
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3],
                currentT,
                pathCmd.points[6]
              );
              break;
            case 'C':
              if (currentT === 0) {
                if (glyphWidth > pathCmd.pathLength) {
                  currentT = 0.00000001;
                } else {
                  currentT = glyphWidth / pathCmd.pathLength;
                }
              } else if (glyphWidth > currLen) {
                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
              } else {
                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
              }

              if (currentT > 1.0) {
                currentT = 1.0;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnCubicBezier(
                currentT,
                pathCmd.start.x,
                pathCmd.start.y,
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3],
                pathCmd.points[4],
                pathCmd.points[5]
              );
              break;
            case 'Q':
              if (currentT === 0) {
                currentT = glyphWidth / pathCmd.pathLength;
              } else if (glyphWidth > currLen) {
                currentT += (glyphWidth - currLen) / pathCmd.pathLength;
              } else {
                currentT -= (currLen - glyphWidth) / pathCmd.pathLength;
              }

              if (currentT > 1.0) {
                currentT = 1.0;
                needNewSegment = true;
              }
              p1 = Konva.Path.getPointOnQuadraticBezier(
                currentT,
                pathCmd.start.x,
                pathCmd.start.y,
                pathCmd.points[0],
                pathCmd.points[1],
                pathCmd.points[2],
                pathCmd.points[3]
              );
              break;

          }

          if (p1 !== undefined) {
            currLen = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
          }

          if (needNewSegment) {
            needNewSegment = false;
            pathCmd = undefined;
          }
        }
      };

      // fake search for offset, this is very bad approach
      // TODO: find other way to add offset from start (for align)
      var testChar = 'C';
      var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
      for (var k = 0; k < offset / glyphWidth; k++) {
        findSegmentToFitCharacter(testChar);
        if (p0 === undefined || p1 === undefined) {
          break;
        }
        p0 = p1;
      }

      for (var i = 0; i < charArr.length; i++) {
        // Find p1 such that line segment between p0 and p1 is approx. width of glyph
        findSegmentToFitCharacter(charArr[i]);

        if (p0 === undefined || p1 === undefined) {
          break;
        }

        var width = Konva.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);

        // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
        // Can foresee having a rough pair table built in that the developer can override as needed.

        var kern = 0;
        // placeholder for future implementation

        var midpoint = Konva.Path.getPointOnLine(
          kern + width / 2.0,
          p0.x,
          p0.y,
          p1.x,
          p1.y
        );

        var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        this.glyphInfo.push({
          transposeX: midpoint.x,
          transposeY: midpoint.y,
          text: charArr[i],
          rotation: rotation,
          p0: p0,
          p1: p1
        });
        p0 = p1;
      }
    },
    getSelfRect: function() {
      var points = [];

      this.glyphInfo.forEach(function(info) {
        points.push(info.p0.x);
        points.push(info.p0.y);
        points.push(info.p1.x);
        points.push(info.p1.y);
      });
      var minX = points[0];
      var maxX = points[0];
      var minY = points[0];
      var maxY = points[0];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      var fontSize = this.fontSize();
      return {
        x: Math.round(minX) - fontSize / 2,
        y: Math.round(minY) - fontSize / 2,
        width: Math.round(maxX - minX) + fontSize,
        height: Math.round(maxY - minY) + fontSize
      };
    }
  };

  // map TextPath methods to Text
  Konva.TextPath.prototype._getContextFont = Konva.Text.prototype._getContextFont;

  Konva.Util.extend(Konva.TextPath, Konva.Shape);

  // add setters and getters
  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontFamily', 'Arial');

  /**
     * set font family
     * @name setFontFamily
     * @method
     * @memberof Konva.TextPath.prototype
     * @param {String} fontFamily
     */

  /**
     * get font family
     * @name getFontFamily
     * @method
     * @memberof Konva.TextPath.prototype
     */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontSize', 12);

  /**
     * set font size
     * @name setFontSize
     * @method
     * @memberof Konva.TextPath.prototype
     * @param {int} fontSize
     */

  /**
     * get font size
     * @name getFontSize
     * @method
     * @memberof Konva.TextPath.prototype
     */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontStyle', NORMAL);

  /**
     * set font style.  Can be 'normal', 'italic', or 'bold'.  'normal' is the default.
     * @name setFontStyle
     * @method
     * @memberof Konva.TextPath.prototype
     * @param {String} fontStyle
     */
  Konva.Factory.addGetterSetter(Konva.TextPath, 'align', 'left');

  /**
      * get/set horizontal align of text.  Can be 'left', 'center', 'right' or 'justify'
      * @name align
      * @method
      * @memberof Konva.Text.prototype
      * @param {String} align
      * @returns {String}
      * @example
      * // get text align
      * var align = text.align();
      *
      * // center text
      * text.align('center');
      *
      * // align text to right
      * text.align('right');
      */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'letterSpacing', 0);

  /**
      * set letter spacing property. Default value is 0.
      * @name letterSpacing
      * @method
      * @memberof Konva.TextPath.prototype
      * @param {Number} letterSpacing
      */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'textBaseline', 'middle');

  /**
      * set textBaseline property. Default value is 'middle'.
      * Can be 'top', 'bottom', 'middle', 'alphabetic', 'hanging'
      * @name textBaseline
      * @method
      * @memberof Konva.TextPath.prototype
      * @param {Number} textBaseline
      */

  /**
     * get font style
     * @name getFontStyle
     * @method
     * @memberof Konva.TextPath.prototype
     */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'fontVariant', NORMAL);

  /**
     * set font variant.  Can be 'normal' or 'small-caps'.  'normal' is the default.
     * @name setFontVariant
     * @method
     * @memberof Konva.TextPath.prototype
     * @param {String} fontVariant
     */

  /**
     * @get font variant
     * @name getFontVariant
     * @method
     * @memberof Konva.TextPath.prototype
     */

  Konva.Factory.addGetter(Konva.TextPath, 'text', EMPTY_STRING);

  /**
     * get text
     * @name getText
     * @method
     * @memberof Konva.TextPath.prototype
     */

  Konva.Factory.addGetterSetter(Konva.TextPath, 'textDecoration', null);

  /**
      * get/set text decoration of a text.  Can be '' or 'underline'
      * @name textDecoration
      * @method
      * @memberof Konva.Text.prototype
      * @param {String} textDecoration
      * @returns {String}
      * @example
      * // get text decoration
      * var textDecoration = text.textDecoration();
      *
      * // center text
      * text.textDecoration('underline');
      */

  Konva.Collection.mapMethods(Konva.TextPath);
})();

(function() {
  'use strict';
  /**
     * RegularPolygon constructor.&nbsp; Examples include triangles, squares, pentagons, hexagons, etc.
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Number} config.sides
     * @param {Number} config.radius
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var hexagon = new Konva.RegularPolygon({
     *   x: 100,
     *   y: 200,
     *   sides: 6,
     *   radius: 70,
     *   fill: 'red',
     *   stroke: 'black',
     *   strokeWidth: 4
     * });
     */
  Konva.RegularPolygon = function(config) {
    this.___init(config);
  };

  Konva.RegularPolygon.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'RegularPolygon';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var sides = this.attrs.sides, radius = this.attrs.radius, n, x, y;

      context.beginPath();
      context.moveTo(0, 0 - radius);

      for (n = 1; n < sides; n++) {
        x = radius * Math.sin(n * 2 * Math.PI / sides);
        y = (-1) * radius * Math.cos(n * 2 * Math.PI / sides);
        context.lineTo(x, y);
      }
      context.closePath();
      context.fillStrokeShape(this);
    },
    getWidth: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.radius() !== width / 2) {
        this.setRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.radius() !== height / 2) {
        this.setRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.RegularPolygon, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'radius', 0);

  /**
     * set radius
     * @name setRadius
     * @method
     * @memberof Konva.RegularPolygon.prototype
     * @param {Number} radius
     */

  /**
     * get radius
     * @name getRadius
     * @method
     * @memberof Konva.RegularPolygon.prototype
     */

  Konva.Factory.addGetterSetter(Konva.RegularPolygon, 'sides', 0);

  /**
     * set number of sides
     * @name setSides
     * @method
     * @memberof Konva.RegularPolygon.prototype
     * @param {int} sides
     */

  /**
     * get number of sides
     * @name getSides
     * @method
     * @memberof Konva.RegularPolygon.prototype
     */

  Konva.Collection.mapMethods(Konva.RegularPolygon);
})();

(function() {
  'use strict';
  /**
     * Star constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Integer} config.numPoints
     * @param {Number} config.innerRadius
     * @param {Number} config.outerRadius
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var star = new Konva.Star({
     *   x: 100,
     *   y: 200,
     *   numPoints: 5,
     *   innerRadius: 70,
     *   outerRadius: 70,
     *   fill: 'red',
     *   stroke: 'black',
     *   strokeWidth: 4
     * });
     */
  Konva.Star = function(config) {
    this.___init(config);
  };

  Konva.Star.prototype = {
    _centroid: true,
    ___init: function(config) {
      // call super constructor
      Konva.Shape.call(this, config);
      this.className = 'Star';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var innerRadius = this.innerRadius(),
        outerRadius = this.outerRadius(),
        numPoints = this.numPoints();

      context.beginPath();
      context.moveTo(0, 0 - outerRadius);

      for (var n = 1; n < numPoints * 2; n++) {
        var radius = n % 2 === 0 ? outerRadius : innerRadius;
        var x = radius * Math.sin(n * Math.PI / numPoints);
        var y = (-1) * radius * Math.cos(n * Math.PI / numPoints);
        context.lineTo(x, y);
      }
      context.closePath();

      context.fillStrokeShape(this);
    },
    // implements Shape.prototype.getWidth()
    getWidth: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.getHeight()
    getHeight: function() {
      return this.getOuterRadius() * 2;
    },
    // implements Shape.prototype.setWidth()
    setWidth: function(width) {
      Konva.Node.prototype.setWidth.call(this, width);
      if (this.outerRadius() !== width / 2) {
        this.setOuterRadius(width / 2);
      }
    },
    // implements Shape.prototype.setHeight()
    setHeight: function(height) {
      Konva.Node.prototype.setHeight.call(this, height);
      if (this.outerRadius() !== height / 2) {
        this.setOuterRadius(height / 2);
      }
    }
  };
  Konva.Util.extend(Konva.Star, Konva.Shape);

  // add getters setters
  Konva.Factory.addGetterSetter(Konva.Star, 'numPoints', 5);

  /**
     * set number of points
     * @name setNumPoints
     * @method
     * @memberof Konva.Star.prototype
     * @param {Integer} points
     */

  /**
     * get number of points
     * @name getNumPoints
     * @method
     * @memberof Konva.Star.prototype
     */

  Konva.Factory.addGetterSetter(Konva.Star, 'innerRadius', 0);

  /**
     * set inner radius
     * @name setInnerRadius
     * @method
     * @memberof Konva.Star.prototype
     * @param {Number} radius
     */

  /**
     * get inner radius
     * @name getInnerRadius
     * @method
     * @memberof Konva.Star.prototype
     */

  Konva.Factory.addGetterSetter(Konva.Star, 'outerRadius', 0);

  /**
     * set outer radius
     * @name setOuterRadius
     * @method
     * @memberof Konva.Star.prototype
     * @param {Number} radius
     */

  /**
     * get outer radius
     * @name getOuterRadius
     * @method
     * @memberof Konva.Star.prototype
     */

  Konva.Collection.mapMethods(Konva.Star);
})();

(function() {
  'use strict';
  // constants
  var ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'padding',
    'lineHeight',
    'text',
    'width'
  ],
    CHANGE_KONVA = 'Change.konva',
    NONE = 'none',
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left',
    LABEL = 'Label',
    // cached variables
    attrChangeListLen = ATTR_CHANGE_LIST.length;

  /**
     * Label constructor.&nbsp; Labels are groups that contain a Text and Tag shape
     * @constructor
     * @memberof Konva
     * @param {Object} config
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * // create label
     * var label = new Konva.Label({
     *   x: 100,
     *   y: 100,
     *   draggable: true
     * });
     *
     * // add a tag to the label
     * label.add(new Konva.Tag({
     *   fill: '#bbb',
     *   stroke: '#333',
     *   shadowColor: 'black',
     *   shadowBlur: 10,
     *   shadowOffset: [10, 10],
     *   shadowOpacity: 0.2,
     *   lineJoin: 'round',
     *   pointerDirection: 'up',
     *   pointerWidth: 20,
     *   pointerHeight: 20,
     *   cornerRadius: 5
     * }));
     *
     * // add text to the label
     * label.add(new Konva.Text({
     *   text: 'Hello World!',
     *   fontSize: 50,
     *   lineHeight: 1.2,
     *   padding: 10,
     *   fill: 'green'
     *  }));
     */
  Konva.Label = function(config) {
    this.____init(config);
  };

  Konva.Label.prototype = {
    ____init: function(config) {
      var that = this;

      Konva.Group.call(this, config);
      this.className = LABEL;

      this.on('add.konva', function(evt) {
        that._addListeners(evt.child);
        that._sync();
      });
    },
    /**
         * get Text shape for the label.  You need to access the Text shape in order to update
         * the text properties
         * @name getText
         * @method
         * @memberof Konva.Label.prototype
         */
    getText: function() {
      return this.find('Text')[0];
    },
    /**
         * get Tag shape for the label.  You need to access the Tag shape in order to update
         * the pointer properties and the corner radius
         * @name getTag
         * @method
         * @memberof Konva.Label.prototype
         */
    getTag: function() {
      return this.find('Tag')[0];
    },
    _addListeners: function(text) {
      var that = this, n;
      var func = function() {
        that._sync();
      };

      // update text data for certain attr changes
      for (n = 0; n < attrChangeListLen; n++) {
        text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
      }
    },
    getWidth: function() {
      return this.getText().getWidth();
    },
    getHeight: function() {
      return this.getText().getHeight();
    },
    _sync: function() {
      var text = this.getText(),
        tag = this.getTag(),
        width,
        height,
        pointerDirection,
        pointerWidth,
        x,
        y,
        pointerHeight;

      if (text && tag) {
        width = text.getWidth();
        height = text.getHeight();
        pointerDirection = tag.getPointerDirection();
        pointerWidth = tag.getPointerWidth();
        pointerHeight = tag.getPointerHeight();
        x = 0;
        y = 0;

        switch (pointerDirection) {
          case UP:
            x = width / 2;
            y = (-1) * pointerHeight;
            break;
          case RIGHT:
            x = width + pointerWidth;
            y = height / 2;
            break;
          case DOWN:
            x = width / 2;
            y = height + pointerHeight;
            break;
          case LEFT:
            x = (-1) * pointerWidth;
            y = height / 2;
            break;
        }

        tag.setAttrs({
          x: (-1) * x,
          y: (-1) * y,
          width: width,
          height: height
        });

        text.setAttrs({
          x: (-1) * x,
          y: (-1) * y
        });
      }
    }
  };

  Konva.Util.extend(Konva.Label, Konva.Group);

  Konva.Collection.mapMethods(Konva.Label);

  /**
     * Tag constructor.&nbsp; A Tag can be configured
     *  to have a pointer element that points up, right, down, or left
     * @constructor
     * @memberof Konva
     * @param {Object} config
     * @param {String} [config.pointerDirection] can be up, right, down, left, or none; the default
     *  is none.  When a pointer is present, the positioning of the label is relative to the tip of the pointer.
     * @param {Number} [config.pointerWidth]
     * @param {Number} [config.pointerHeight]
     * @param {Number} [config.cornerRadius]
     */
  Konva.Tag = function(config) {
    this.___init(config);
  };

  Konva.Tag.prototype = {
    ___init: function(config) {
      Konva.Shape.call(this, config);
      this.className = 'Tag';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(context) {
      var width = this.getWidth(),
        height = this.getHeight(),
        pointerDirection = this.getPointerDirection(),
        pointerWidth = this.getPointerWidth(),
        pointerHeight = this.getPointerHeight(),
        cornerRadius = Math.min(this.getCornerRadius(), width / 2, height / 2);

      context.beginPath();
      if (!cornerRadius) {
        context.moveTo(0, 0);
      } else {
        context.moveTo(cornerRadius, 0);
      }

      if (pointerDirection === UP) {
        context.lineTo((width - pointerWidth) / 2, 0);
        context.lineTo(width / 2, (-1) * pointerHeight);
        context.lineTo((width + pointerWidth) / 2, 0);
      }

      if (!cornerRadius) {
        context.lineTo(width, 0);
      } else {
        context.lineTo(width - cornerRadius, 0);
        context.arc(
          width - cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI * 3 / 2,
          0,
          false
        );
      }

      if (pointerDirection === RIGHT) {
        context.lineTo(width, (height - pointerHeight) / 2);
        context.lineTo(width + pointerWidth, height / 2);
        context.lineTo(width, (height + pointerHeight) / 2);
      }

      if (!cornerRadius) {
        context.lineTo(width, height);
      } else {
        context.lineTo(width, height - cornerRadius);
        context.arc(
          width - cornerRadius,
          height - cornerRadius,
          cornerRadius,
          0,
          Math.PI / 2,
          false
        );
      }

      if (pointerDirection === DOWN) {
        context.lineTo((width + pointerWidth) / 2, height);
        context.lineTo(width / 2, height + pointerHeight);
        context.lineTo((width - pointerWidth) / 2, height);
      }

      if (!cornerRadius) {
        context.lineTo(0, height);
      } else {
        context.lineTo(cornerRadius, height);
        context.arc(
          cornerRadius,
          height - cornerRadius,
          cornerRadius,
          Math.PI / 2,
          Math.PI,
          false
        );
      }

      if (pointerDirection === LEFT) {
        context.lineTo(0, (height + pointerHeight) / 2);
        context.lineTo((-1) * pointerWidth, height / 2);
        context.lineTo(0, (height - pointerHeight) / 2);
      }

      if (cornerRadius) {
        context.lineTo(0, cornerRadius);
        context.arc(
          cornerRadius,
          cornerRadius,
          cornerRadius,
          Math.PI,
          Math.PI * 3 / 2,
          false
        );
      }

      context.closePath();
      context.fillStrokeShape(this);
    },
    getSelfRect: function() {
      var x = 0,
        y = 0,
        pointerWidth = this.getPointerWidth(),
        pointerHeight = this.getPointerHeight(),
        direction = this.pointerDirection(),
        width = this.getWidth(),
        height = this.getHeight();

      if (direction === UP) {
        y -= pointerHeight;
        height += pointerHeight;
      } else if (direction === DOWN) {
        height += pointerHeight;
      } else if (direction === LEFT) {
        // ARGH!!! I have no idea why should I used magic 1.5!!!!!!!!!
        x -= pointerWidth * 1.5;
        width += pointerWidth;
      } else if (direction === RIGHT) {
        width += pointerWidth * 1.5;
      }
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
  };

  Konva.Util.extend(Konva.Tag, Konva.Shape);
  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerDirection', NONE);

  /**
     * set pointer Direction
     * @name setPointerDirection
     * @method
     * @memberof Konva.Tag.prototype
     * @param {String} pointerDirection can be up, right, down, left, or none.  The
     *  default is none
     */

  /**
     * get pointer Direction
     * @name getPointerDirection
     * @method
     * @memberof Konva.Tag.prototype
     */

  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerWidth', 0);

  /**
     * set pointer width
     * @name setPointerWidth
     * @method
     * @memberof Konva.Tag.prototype
     * @param {Number} pointerWidth
     */

  /**
     * get pointer width
     * @name getPointerWidth
     * @method
     * @memberof Konva.Tag.prototype
     */

  Konva.Factory.addGetterSetter(Konva.Tag, 'pointerHeight', 0);

  /**
     * set pointer height
     * @name setPointerHeight
     * @method
     * @memberof Konva.Tag.prototype
     * @param {Number} pointerHeight
     */

  /**
     * get pointer height
     * @name getPointerHeight
     * @method
     * @memberof Konva.Tag.prototype
     */

  Konva.Factory.addGetterSetter(Konva.Tag, 'cornerRadius', 0);

  /**
     * set corner radius
     * @name setCornerRadius
     * @method
     * @memberof Konva.Tag.prototype
     * @param {Number} corner radius
     */

  /**
     * get corner radius
     * @name getCornerRadius
     * @method
     * @memberof Konva.Tag.prototype
     */

  Konva.Collection.mapMethods(Konva.Tag);
})();

(function() {
  'use strict';
  /**
     * Arrow constructor
     * @constructor
     * @memberof Konva
     * @augments Konva.Shape
     * @param {Object} config
     * @param {Array} config.points
     * @param {Number} [config.tension] Higher values will result in a more curvy line.  A value of 0 will result in no interpolation.
     *   The default is 0
     * @param {Number} config.pointerLength
     * @param {Number} config.pointerWidth
     * @param {String} [config.fill] fill color
     * @param {Image} [config.fillPatternImage] fill pattern image
     * @param {Number} [config.fillPatternX]
     * @param {Number} [config.fillPatternY]
     * @param {Object} [config.fillPatternOffset] object with x and y component
     * @param {Number} [config.fillPatternOffsetX] 
     * @param {Number} [config.fillPatternOffsetY] 
     * @param {Object} [config.fillPatternScale] object with x and y component
     * @param {Number} [config.fillPatternScaleX]
     * @param {Number} [config.fillPatternScaleY]
     * @param {Number} [config.fillPatternRotation]
     * @param {String} [config.fillPatternRepeat] can be "repeat", "repeat-x", "repeat-y", or "no-repeat".  The default is "no-repeat"
     * @param {Object} [config.fillLinearGradientStartPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientStartPointX]
     * @param {Number} [config.fillLinearGradientStartPointY]
     * @param {Object} [config.fillLinearGradientEndPoint] object with x and y component
     * @param {Number} [config.fillLinearGradientEndPointX]
     * @param {Number} [config.fillLinearGradientEndPointY]
     * @param {Array} [config.fillLinearGradientColorStops] array of color stops
     * @param {Object} [config.fillRadialGradientStartPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientStartPointX]
     * @param {Number} [config.fillRadialGradientStartPointY]
     * @param {Object} [config.fillRadialGradientEndPoint] object with x and y component
     * @param {Number} [config.fillRadialGradientEndPointX] 
     * @param {Number} [config.fillRadialGradientEndPointY] 
     * @param {Number} [config.fillRadialGradientStartRadius]
     * @param {Number} [config.fillRadialGradientEndRadius]
     * @param {Array} [config.fillRadialGradientColorStops] array of color stops
     * @param {Boolean} [config.fillEnabled] flag which enables or disables the fill.  The default value is true
     * @param {String} [config.fillPriority] can be color, linear-gradient, radial-graident, or pattern.  The default value is color.  The fillPriority property makes it really easy to toggle between different fill types.  For example, if you want to toggle between a fill color style and a fill pattern style, simply set the fill property and the fillPattern properties, and then use setFillPriority('color') to render the shape with a color fill, or use setFillPriority('pattern') to render the shape with the pattern fill configuration
     * @param {String} [config.stroke] stroke color
     * @param {Number} [config.strokeWidth] stroke width
     * @param {Boolean} [config.strokeHitEnabled] flag which enables or disables stroke hit region.  The default is true
     * @param {Boolean} [config.perfectDrawEnabled] flag which enables or disables using buffer canvas.  The default is true
     * @param {Boolean} [config.shadowForStrokeEnabled] flag which enables or disables shasow for stroke.  The default is true
     * @param {Boolean} [config.strokeScaleEnabled] flag which enables or disables stroke scale.  The default is true
     * @param {Boolean} [config.strokeEnabled] flag which enables or disables the stroke.  The default value is true
     * @param {String} [config.lineJoin] can be miter, round, or bevel.  The default
     *  is miter
     * @param {String} [config.lineCap] can be butt, round, or sqare.  The default
     *  is butt
     * @param {String} [config.shadowColor]
     * @param {Number} [config.shadowBlur]
     * @param {Object} [config.shadowOffset] object with x and y component
     * @param {Number} [config.shadowOffsetX]
     * @param {Number} [config.shadowOffsetY]
     * @param {Number} [config.shadowOpacity] shadow opacity.  Can be any real number
     *  between 0 and 1
     * @param {Boolean} [config.shadowEnabled] flag which enables or disables the shadow.  The default value is true
     * @param {Array} [config.dash]
     * @param {Boolean} [config.dashEnabled] flag which enables or disables the dashArray.  The default value is true
     * @param {Number} [config.x]
     * @param {Number} [config.y]
     * @param {Number} [config.width]
     * @param {Number} [config.height]
     * @param {Boolean} [config.visible]
     * @param {Boolean} [config.listening] whether or not the node is listening for events
     * @param {String} [config.id] unique id
     * @param {String} [config.name] non-unique name
     * @param {Number} [config.opacity] determines node opacity.  Can be any number between 0 and 1
     * @param {Object} [config.scale] set scale
     * @param {Number} [config.scaleX] set scale x
     * @param {Number} [config.scaleY] set scale y
     * @param {Number} [config.rotation] rotation in degrees
     * @param {Object} [config.offset] offset from center point and rotation point
     * @param {Number} [config.offsetX] set offset x
     * @param {Number} [config.offsetY] set offset y
     * @param {Boolean} [config.draggable] makes the node draggable.  When stages are draggable, you can drag and drop
     *  the entire stage by dragging any portion of the stage
     * @param {Number} [config.dragDistance]
     * @param {Function} [config.dragBoundFunc]
     * @example
     * var line = new Konva.Line({
     *   points: [73, 70, 340, 23, 450, 60, 500, 20],
     *   stroke: 'red',
     *   tension: 1,
     *   pointerLength : 10,
     *   pointerWidth : 12
     * });
     */
  Konva.Arrow = function(config) {
    this.____init(config);
  };

  Konva.Arrow.prototype = {
    ____init: function(config) {
      // call super constructor
      Konva.Line.call(this, config);
      this.className = 'Arrow';
    },
    _sceneFunc: function(ctx) {
      Konva.Line.prototype._sceneFunc.apply(this, arguments);
      var PI2 = Math.PI * 2;
      var points = this.points();
      var n = points.length;
      var dx = points[n - 2] - points[n - 4];
      var dy = points[n - 1] - points[n - 3];
      var radians = (Math.atan2(dy, dx) + PI2) % PI2;
      var length = this.pointerLength();
      var width = this.pointerWidth();

      ctx.save();
      ctx.beginPath();
      ctx.translate(points[n - 2], points[n - 1]);
      ctx.rotate(radians);
      ctx.moveTo(0, 0);
      ctx.lineTo(-length, width / 2);
      ctx.lineTo(-length, (-width) / 2);
      ctx.closePath();
      ctx.restore();

      if (this.pointerAtBeginning()) {
        ctx.save();
        ctx.translate(points[0], points[1]);
        dx = points[2] - points[0];
        dy = points[3] - points[1];
        ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, (-width) / 2);
        ctx.closePath();
        ctx.restore();
      }
      ctx.fillStrokeShape(this);
    }
  };

  Konva.Util.extend(Konva.Arrow, Konva.Line);
  /**
     * get/set pointerLength
     * @name pointerLength
     * @method
     * @memberof Konva.Arrow.prototype
     * @param {Number} Length of pointer of arrow.
     *   The default is 10.
     * @returns {Number}
     * @example
     * // get tension
     * var pointerLength = line.pointerLength();
     *
     * // set tension
     * line.pointerLength(15);
     */

  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerLength', 10);
  /**
     * get/set pointerWidth
     * @name pointerWidth
     * @method
     * @memberof Konva.Arrow.prototype
     * @param {Number} Width of pointer of arrow.
     *   The default is 10.
     * @returns {Number}
     * @example
     * // get tension
     * var pointerWidth = line.pointerWidth();
     *
     * // set tension
     * line.pointerWidth(15);
     */

  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerWidth', 10);
  /**
     * get/set pointerAtBeginning
     * @name pointerAtBeginning
     * @method
     * @memberof Konva.Arrow.prototype
     * @param {Number} Should pointer displayed at beginning of arrow.
     *   The default is false.
     * @returns {Boolean}
     * @example
     * // get tension
     * var pointerAtBeginning = line.pointerAtBeginning();
     *
     * // set tension
     * line.pointerAtBeginning(true);
     */

  Konva.Factory.addGetterSetter(Konva.Arrow, 'pointerAtBeginning', false);
  Konva.Collection.mapMethods(Konva.Arrow);
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Settings {
	constructor() {

		this.gameFieldId = 'game-field';
		this.hintsFieldId = 'hints-field';
		this.hpCircl = 'hpCircl';

		this.gameFieldElement = document.getElementById(this.gameFieldId);
		this.hintsFieldElement = document.getElementById(this.hintsFieldId);

		this.mapSize = 10;

		this.checkpoints = [[0, 0], [0, this.mapSize - 1], [this.mapSize - 1, 0], [this.mapSize - 1, this.mapSize - 1]];

		let minSize = Math.min(this.gameFieldElement.offsetHeight, this.gameFieldElement.offsetWidth)
		this.fullMapSize = minSize * 0.9;
		this.fieldSize = (this.fullMapSize / this.mapSize) - 2;

		this.mapX = (this.gameFieldElement.offsetWidth - ((this.fieldSize + 2) * this.mapSize)) / 2;
		this.mapY = (this.gameFieldElement.offsetHeight - ((this.fieldSize + 2) * this.mapSize)) / 2;

		this.variantRadius = this.fieldSize * 0.2;
		if (this.variantRadius < 5) {
			this.variantRadius = 5;
		}
		this.bulletStep = 20;
		this.monsterStep = 10;

		this.numberTowersInStep = 3;

		this.addHPInWave = 50;
		this.numberMonstersInWave = 10;
		this.bulletRadius = 5;
		this.laserWidth = 8;
		this.numberChangesColors = 6;
		this.throneHealth = 100;
		this.damage = 1;
		this.addDamageInWave = 1;

		this.circleTowerDamage = 10;
		this.pentagonTpwerDamage = 10;
		this.starTowerDamage = 10;

		this.circleWaveMinRadius = this.fieldSize;
		this.circleWaveMaxRadius = 2 * this.fieldSize;
		this.waveWidth = 8;

		this.circleRed = {
			name: 'circleRed',
			color: '#FF0000',
			power: 10,
			radiusFight: 400,
		};

		this.circleBlue = {
			name: 'circleBlue',
			color: '#00FFFF',
			power: 15,
			radiusFight: 400,
		};

		this.circleGreen = {
			name: 'circleGreen',
			color: '#00FF00',
			power: 20,
			radiusFight: 400,
		};

		this.circleYellow = {
			name: 'circleYellow',
			color: '#FFFF00',
			power: 25,
			radiusFight: 400,
		};

		this.circlePink = {
			name: 'circlePink',
			color: '#FF00FF',
			power: 30,
			radiusFight: 400,
		};

		this.circleSad = {
			name: 'circleSad',
			color: '#0000FF',
			power: 35,
			radiusFight: 400,
		};

		this.triangl = {
			name: 'triangl',
			size: this.fieldSize * 0.5,
			color: '#00FF00',
			health: 100,
		};

		this.stone = {
			name: 'stone',
			color: 'black',
		};

		this.pentagonRPS = {
			name: 'pentagonRPS',
			power: 70,
			colors: ['#FF0000', '#FF00FF', '#0000FF'],
			radiusFight: 400,
			circles: ['circleRed', 'circlePink', 'circleSad']
		};

		this.pentagonSBG = {
			name: 'pentagonSBG',
			power: 80,
			colors: ['#0000FF', '#00FFFF', '#00FF00'],
			radiusFight: 400,
			circles: ['circleSad', 'circleBlue', 'circleGreen']
		};

		this.pentagonGYR = {
			name: 'pentagonGYR',
			power: 70,
			colors: ['#00FF00', '#FFFF00', '#FF0000'],
			radiusFight: 400,
			circles: ['circleGreen', 'circleYellow', 'circleRed']
		};

		this.star = {
			name: 'star',
			color: 'khaki',
			power: 100,
			radiusFight: 400,
			numberBullets: 3,
			pentagons: ['pentagonGYR', 'pentagonRPS', 'pentagonSBG'],
		};

		this.circles = [
			this.circleRed, 
			this.circleGreen, 
			this.circleYellow, 
			this.circleBlue, 
			this.circleSad, 
			this.circlePink
		];

		this.pentagons = [
			this.pentagonRPS, 
			this.pentagonSBG, 
			this.pentagonGYR
		];

		this.variantsX = this.hintsFieldElement.offsetWidth * 0.05;
		this.variantsY = this.mapY;
		this.variantsXSize = this.hintsFieldElement.offsetWidth * 0.9;
		this.variantsYSize = this.fullMapSize * 0.1;
		this.betweenVariants = this.fullMapSize * 0.15;

		this.variantCircls = [
			[this.circleRed, this.circlePink, this.circleSad],
			[this.circleSad, this.circleBlue, this.circleGreen],
			[this.circleGreen, this.circleYellow, this.circleRed]
		];

		this.type = {
			'o': 0,
			'#': this.stone,
			'a': this.circleRed,
			'b': this.circlePink,
			'c': this.circleSad,
			'd': this.circleBlue,
			'e': this.circleGreen,
			'f': this.circleYellow,
		}

		this.typeRev = {
			0: 'o', 
			'stone': '#',
			'circleRed':'a',
			'circlePink':'b', 
			'circleSad':'c',
			'circleBlue':'d', 
			'circleGreen':'e',
			'circleYellow':'f', 
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Backtrace according to the parent records and return the path.
 * (including both start and end nodes)
 * @param {Node} node End node
 * @return {Array<Array<number>>} the path
 */
function backtrace(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
}
exports.backtrace = backtrace;

/**
 * Backtrace from start and end node, and return the path.
 * (including both start and end nodes)
 * @param {Node}
 * @param {Node}
 */
function biBacktrace(nodeA, nodeB) {
    var pathA = backtrace(nodeA),
        pathB = backtrace(nodeB);
    return pathA.concat(pathB.reverse());
}
exports.biBacktrace = biBacktrace;

/**
 * Compute the length of the path.
 * @param {Array<Array<number>>} path The path
 * @return {number} The length of the path
 */
function pathLength(path) {
    var i, sum = 0, a, b, dx, dy;
    for (i = 1; i < path.length; ++i) {
        a = path[i - 1];
        b = path[i];
        dx = a[0] - b[0];
        dy = a[1] - b[1];
        sum += Math.sqrt(dx * dx + dy * dy);
    }
    return sum;
}
exports.pathLength = pathLength;


/**
 * Given the start and end coordinates, return all the coordinates lying
 * on the line formed by these coordinates, based on Bresenham's algorithm.
 * http://en.wikipedia.org/wiki/Bresenham's_line_algorithm#Simplification
 * @param {number} x0 Start x coordinate
 * @param {number} y0 Start y coordinate
 * @param {number} x1 End x coordinate
 * @param {number} y1 End y coordinate
 * @return {Array<Array<number>>} The coordinates on the line
 */
function interpolate(x0, y0, x1, y1) {
    var abs = Math.abs,
        line = [],
        sx, sy, dx, dy, err, e2;

    dx = abs(x1 - x0);
    dy = abs(y1 - y0);

    sx = (x0 < x1) ? 1 : -1;
    sy = (y0 < y1) ? 1 : -1;

    err = dx - dy;

    while (true) {
        line.push([x0, y0]);

        if (x0 === x1 && y0 === y1) {
            break;
        }
        
        e2 = 2 * err;
        if (e2 > -dy) {
            err = err - dy;
            x0 = x0 + sx;
        }
        if (e2 < dx) {
            err = err + dx;
            y0 = y0 + sy;
        }
    }

    return line;
}
exports.interpolate = interpolate;


/**
 * Given a compressed path, return a new path that has all the segments
 * in it interpolated.
 * @param {Array<Array<number>>} path The path
 * @return {Array<Array<number>>} expanded path
 */
function expandPath(path) {
    var expanded = [],
        len = path.length,
        coord0, coord1,
        interpolated,
        interpolatedLen,
        i, j;

    if (len < 2) {
        return expanded;
    }

    for (i = 0; i < len - 1; ++i) {
        coord0 = path[i];
        coord1 = path[i + 1];

        interpolated = interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
        interpolatedLen = interpolated.length;
        for (j = 0; j < interpolatedLen - 1; ++j) {
            expanded.push(interpolated[j]);
        }
    }
    expanded.push(path[len - 1]);

    return expanded;
}
exports.expandPath = expandPath;


/**
 * Smoothen the give path.
 * The original path will not be modified; a new path will be returned.
 * @param {PF.Grid} grid
 * @param {Array<Array<number>>} path The path
 */
function smoothenPath(grid, path) {
    var len = path.length,
        x0 = path[0][0],        // path start x
        y0 = path[0][1],        // path start y
        x1 = path[len - 1][0],  // path end x
        y1 = path[len - 1][1],  // path end y
        sx, sy,                 // current start coordinate
        ex, ey,                 // current end coordinate
        newPath,
        i, j, coord, line, testCoord, blocked;

    sx = x0;
    sy = y0;
    newPath = [[sx, sy]];

    for (i = 2; i < len; ++i) {
        coord = path[i];
        ex = coord[0];
        ey = coord[1];
        line = interpolate(sx, sy, ex, ey);

        blocked = false;
        for (j = 1; j < line.length; ++j) {
            testCoord = line[j];

            if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
                blocked = true;
                break;
            }
        }
        if (blocked) {
            lastValidCoord = path[i - 1];
            newPath.push(lastValidCoord);
            sx = lastValidCoord[0];
            sy = lastValidCoord[1];
        }
    }
    newPath.push([x1, y1]);

    return newPath;
}
exports.smoothenPath = smoothenPath;


/**
 * Compress a path, remove redundant nodes without altering the shape
 * The original path is not modified
 * @param {Array<Array<number>>} path The path
 * @return {Array<Array<number>>} The compressed path
 */
function compressPath(path) {

    // nothing to compress
    if(path.length < 3) {
        return path;
    }

    var compressed = [],
        sx = path[0][0], // start x
        sy = path[0][1], // start y
        px = path[1][0], // second point x
        py = path[1][1], // second point y
        dx = px - sx, // direction between the two points
        dy = py - sy, // direction between the two points
        lx, ly,
        ldx, ldy,
        sq, i;

    // normalize the direction
    sq = Math.sqrt(dx*dx + dy*dy);
    dx /= sq;
    dy /= sq;

    // start the new path
    compressed.push([sx,sy]);

    for(i = 2; i < path.length; i++) {

        // store the last point
        lx = px;
        ly = py;

        // store the last direction
        ldx = dx;
        ldy = dy;

        // next point
        px = path[i][0];
        py = path[i][1];

        // next direction
        dx = px - lx;
        dy = py - ly;

        // normalize
        sq = Math.sqrt(dx*dx + dy*dy);
        dx /= sq;
        dy /= sq;

        // if the direction has changed, store the point
        if ( dx !== ldx || dy !== ldy ) {
            compressed.push([lx,ly]);
        }
    }

    // store the last point
    compressed.push([px,py]);

    return compressed;
}
exports.compressPath = compressPath;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http_js__ = __webpack_require__(20);




class UserService {
	constructor() {
		this.http = new __WEBPACK_IMPORTED_MODULE_0__modules_http_js__["a" /* default */]();

		this.func = (callback, xhr) => {
			if (typeof (callback) === 'function') {
				callback.call(xhr, JSON.parse(xhr.responseText || ''));
			}
		};
	}

	register(mail, login, password, callback) {
		const body = {mail, login, password};
		this.http.post('/api/registration', body, xhr => {
			this.func(callback, xhr);
		});
	}

	login(login, password, callback) {
		const body = {login, password};
		this.http.post('/api/login', body, xhr => {
			this.func(callback, xhr);
		});
	}

	logout(callback) {
		this.http.get('/api/logout', null, xhr => {
			this.func(callback, xhr);
		});
	}

	getUsername(callback) {
		this.http.get('/api/user', null, xhr => {
			this.func(callback, xhr);
		});
	}

	getUserScore(callback) {
		this.http.get('/api/getscore', null, xhr => {
			this.func(callback, xhr);
		})
	}

	setUserScore(score, callback) {
		const body = {score};
		this.http.post('/api/setscore', body, xhr => {
			this.func(callback, xhr);
		});
	}

	getUsersList(callback) {
		this.http.get('/api/users', null, xhr => {
			this.func(callback, xhr);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserService;



/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */
module.exports = {

  /**
   * Manhattan distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} dx + dy
   */
  manhattan: function(dx, dy) {
      return dx + dy;
  },

  /**
   * Euclidean distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy)
   */
  euclidean: function(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * Octile distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy) for grids
   */
  octile: function(dx, dy) {
      var F = Math.SQRT2 - 1;
      return (dx < dy) ? F * dx + dy : F * dy + dx;
  },

  /**
   * Chebyshev distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} max(dx, dy)
   */
  chebyshev: function(dx, dy) {
      return Math.max(dx, dy);
  }

};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author imor / https://github.com/imor
 */
var Heap       = __webpack_require__(14);
var Util       = __webpack_require__(9);
var Heuristic  = __webpack_require__(13);
var DiagonalMovement = __webpack_require__(1);

/**
 * Base class for the Jump Point Search algorithm
 * @param {object} opt
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function JumpPointFinderBase(opt) {
    opt = opt || {};
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.trackJumpRecursion = opt.trackJumpRecursion || false;
}

/**
 * Find and return the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
JumpPointFinderBase.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = this.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        }),
        startNode = this.startNode = grid.getNodeAt(startX, startY),
        endNode = this.endNode = grid.getNodeAt(endX, endY), node;

    this.grid = grid;


    // set the `g` and `f` value of the start node to be 0
    startNode.g = 0;
    startNode.f = 0;

    // push the start node into the open list
    openList.push(startNode);
    startNode.opened = true;

    // while the open list is not empty
    while (!openList.empty()) {
        // pop the position of node which has the minimum `f` value.
        node = openList.pop();
        node.closed = true;

        if (node === endNode) {
            return Util.expandPath(Util.backtrace(endNode));
        }

        this._identifySuccessors(node);
    }

    // fail to find the path
    return [];
};

/**
 * Identify successors for the given node. Runs a jump point search in the
 * direction of each available neighbor, adding any points found to the open
 * list.
 * @protected
 */
JumpPointFinderBase.prototype._identifySuccessors = function(node) {
    var grid = this.grid,
        heuristic = this.heuristic,
        openList = this.openList,
        endX = this.endNode.x,
        endY = this.endNode.y,
        neighbors, neighbor,
        jumpPoint, i, l,
        x = node.x, y = node.y,
        jx, jy, dx, dy, d, ng, jumpNode,
        abs = Math.abs, max = Math.max;

    neighbors = this._findNeighbors(node);
    for(i = 0, l = neighbors.length; i < l; ++i) {
        neighbor = neighbors[i];
        jumpPoint = this._jump(neighbor[0], neighbor[1], x, y);
        if (jumpPoint) {

            jx = jumpPoint[0];
            jy = jumpPoint[1];
            jumpNode = grid.getNodeAt(jx, jy);

            if (jumpNode.closed) {
                continue;
            }

            // include distance, as parent may not be immediately adjacent:
            d = Heuristic.octile(abs(jx - x), abs(jy - y));
            ng = node.g + d; // next `g` value

            if (!jumpNode.opened || ng < jumpNode.g) {
                jumpNode.g = ng;
                jumpNode.h = jumpNode.h || heuristic(abs(jx - endX), abs(jy - endY));
                jumpNode.f = jumpNode.g + jumpNode.h;
                jumpNode.parent = node;

                if (!jumpNode.opened) {
                    openList.push(jumpNode);
                    jumpNode.opened = true;
                } else {
                    openList.updateItem(jumpNode);
                }
            }
        }
    }
};

module.exports = JumpPointFinderBase;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * A node in grid. 
 * This class holds some basic information about a node and custom 
 * attributes may be added, depending on the algorithms' needs.
 * @constructor
 * @param {number} x - The x coordinate of the node on the grid.
 * @param {number} y - The y coordinate of the node on the grid.
 * @param {boolean} [walkable] - Whether this node is walkable.
 */
function Node(x, y, walkable) {
    /**
     * The x coordinate of the node on the grid.
     * @type number
     */
    this.x = x;
    /**
     * The y coordinate of the node on the grid.
     * @type number
     */
    this.y = y;
    /**
     * Whether this node can be walked through.
     * @type boolean
     */
    this.walkable = (walkable === undefined ? true : walkable);
}

module.exports = Node;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Heap       = __webpack_require__(14);
var Util       = __webpack_require__(9);
var Heuristic  = __webpack_require__(13);
var DiagonalMovement = __webpack_require__(1);

/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching 
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
function AStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    // When diagonal movement is allowed the manhattan heuristic is not
    //admissible. It should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
AStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = new Heap(function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        }),
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        heuristic = this.heuristic,
        diagonalMovement = this.diagonalMovement,
        weight = this.weight,
        abs = Math.abs, SQRT2 = Math.SQRT2,
        node, neighbors, neighbor, i, l, x, y, ng;

    // set the `g` and `f` value of the start node to be 0
    startNode.g = 0;
    startNode.f = 0;

    // push the start node into the open list
    openList.push(startNode);
    startNode.opened = true;

    // while the open list is not empty
    while (!openList.empty()) {
        // pop the position of node which has the minimum `f` value.
        node = openList.pop();
        node.closed = true;

        // if reached the end position, construct the path and return it
        if (node === endNode) {
            return Util.backtrace(endNode);
        }

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    openList.push(neighbor);
                    neighbor.opened = true;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    openList.updateItem(neighbor);
                }
            }
        } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [];
};

module.exports = AStarFinder;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Heap       = __webpack_require__(14);
var Util       = __webpack_require__(9);
var Heuristic  = __webpack_require__(13);
var DiagonalMovement = __webpack_require__(1);

/**
 * A* path-finder.
 * based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
function BiAStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    //When diagonal movement is allowed the manhattan heuristic is not admissible
    //It should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BiAStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var cmp = function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        },
        startOpenList = new Heap(cmp),
        endOpenList = new Heap(cmp),
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        heuristic = this.heuristic,
        diagonalMovement = this.diagonalMovement,
        weight = this.weight,
        abs = Math.abs, SQRT2 = Math.SQRT2,
        node, neighbors, neighbor, i, l, x, y, ng,
        BY_START = 1, BY_END = 2;

    // set the `g` and `f` value of the start node to be 0
    // and push it into the start open list
    startNode.g = 0;
    startNode.f = 0;
    startOpenList.push(startNode);
    startNode.opened = BY_START;

    // set the `g` and `f` value of the end node to be 0
    // and push it into the open open list
    endNode.g = 0;
    endNode.f = 0;
    endOpenList.push(endNode);
    endNode.opened = BY_END;

    // while both the open lists are not empty
    while (!startOpenList.empty() && !endOpenList.empty()) {

        // pop the position of start node which has the minimum `f` value.
        node = startOpenList.pop();
        node.closed = true;

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened === BY_END) {
                return Util.biBacktrace(node, neighbor);
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h ||
                    weight * heuristic(abs(x - endX), abs(y - endY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    startOpenList.push(neighbor);
                    neighbor.opened = BY_START;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    startOpenList.updateItem(neighbor);
                }
            }
        } // end for each neighbor


        // pop the position of end node which has the minimum `f` value.
        node = endOpenList.pop();
        node.closed = true;

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened === BY_START) {
                return Util.biBacktrace(neighbor, node);
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h ||
                    weight * heuristic(abs(x - startX), abs(y - startY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    endOpenList.push(neighbor);
                    neighbor.opened = BY_END;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    endOpenList.updateItem(neighbor);
                }
            }
        } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [];
};

module.exports = BiAStarFinder;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Link extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('a', attrs);
		this.setAttrs({
			href: '#'
		});
		this.get().innerHTML = text;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

class HTTP {
	constructor() {
		if (HTTP.__instance) {
			return HTTP.__instance;
		}

		this._headers = {};
		this._baseUrl = '';

		HTTP.__instance = this;
	}

	get BaseURL() {
		return this._baseUrl;
	}

	set BaseURL(value) {
		this._baseUrl = value;
	}

	get(address, query = null, callback = null) {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		let url = `${this._baseUrl}${address}`;
		if (query) {
			url += Object.keys(query)
				.map(name => encodeURIComponent(`${name}=${query[name]}`))
				.join('&');
		}
		xhr.open('GET', url, true);

		Object.keys(this._headers)
			.forEach(name => xhr.setRequestHeader(name, this._headers[name]));

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (typeof callback === 'function') {
					callback.call(xhr, xhr);
				}
			}
		};

		xhr.send(null);
	}

	post(address, body = null, callback = null) {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		const url = `${this._baseUrl}${address}`;
		xhr.open('POST', url, true);

		Object.keys(this._headers)
			.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (typeof callback === 'function') {
					callback.call(xhr, xhr);
				}
			}
		};

		if (body) {
			xhr.send(JSON.stringify(body));
		} else {
			xhr.send(null);
		}
	}

	put(address, body = null, callback = null) {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		const url = `${this._baseUrl}${address}`;
		xhr.open('PUT', url, true);

		Object.keys(this._headers)
			.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (typeof callback === 'function') {
					callback.call(xhr, xhr);
				}
			}
		};

		if (body) {
			xhr.send(JSON.stringify(body));
		} else {
			xhr.send(null);
		}
	}

	delete(address, body = null, callback = null) {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		const url = `${this._baseUrl}${address}`;
		xhr.open('DELETE', url, true);

		Object.keys(this._headers)
			.forEach(name => xhr.setRequestHeader(name, this._headers[name]));
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (typeof callback === 'function') {
					callback.call(xhr, xhr);
				}
			}
		};
		if (body) {
			xhr.send(JSON.stringify(body));
		} else {
			xhr.send(null);
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HTTP;



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Form extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor() {
		super('form', {
			class: 'form-horizontal',
			action: '#'
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Button_button_js__ = __webpack_require__(76);





class FormButton extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.buttonBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_1__Button_button_js__["a" /* default */](text, attrs);

		this.render();
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.buttonBlock.get());
		this.buttonBlock.get().appendChild(this.button.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormButton;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formmessage_scss__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formmessage_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__formmessage_scss__);






class FormMessage extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
		});
		this.indent = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
		});
		this.messageBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5 form__message'
		});

		this.render();
	}

	showMessage(text) {
		this.messageBlock.get().innerHTML = text;
	}

	clean() {
		this.messageBlock.get().innerHTML = '';
	}

	render() {
		this.get().appendChild(this.indent.get());
		this.get().appendChild(this.messageBlock.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormMessage;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_scss__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__input_scss__);






class Input extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(labelName, attrs) {
		super('div', {
			class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line form-input'
		});
		this.labelBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('label', {
			class: 'col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label form-input__label'
		});
		this.labelBlock.get().innerHTML = labelName;
		this.inputBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
		});
		this.input = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('input', attrs);
		this.input.get().classList.add('form-control', 'input-lg');
		this.errorBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 form-input__error-message'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.labelBlock.get());
		this.get().appendChild(this.inputBlock.get());
		this.get().appendChild(this.errorBlock.get());
		this.inputBlock.get().appendChild(this.input.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class Arrow {
	constructor(row, type) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		if (type == 'inVariantBlocks') {
			this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Arrow({
				x: this.settings.variantsX + this.settings.variantsXSize * 0.7,
				y: this.settings.variantsY + this.settings.variantsYSize * 0.5 + row * this.settings.betweenVariants,
				points: [-this.settings.variantsXSize * 0.1, 0, this.settings.variantsXSize * 0.1, 0],
				pointerLength: 20,
				pointerWidth: 20,
				fill: 'red',
				stroke: 'red',
				strokeWidth: 4
			})
		} else if (type == 'checkpoints'){
			let xp = (this.settings.checkpoints[row][0] + 1) * (this.settings.fieldSize + 2) - this.settings.fieldSize / 2 + this.settings.mapX;
			let yp = (this.settings.checkpoints[row][1] + 1) * (this.settings.fieldSize + 2) - this.settings.fieldSize / 2 + this.settings.mapY;
			this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Arrow({
				x: xp,
				y: yp,
				points: [0, -this.settings.fieldSize * 0.4, 0, this.settings.fieldSize * 0.4],
				pointerLength: this.settings.fieldSize * 0.4,
				pointerWidth: this.settings.fieldSize * 0.4,
				fill: 'lime',
				stroke: 'green',
				strokeWidth: 4,
			})
		}
		
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Arrow;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class CircleTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Circle({
			x: x,
			y: y,
			radius: radius,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color
		});
		this.kind = name;
		this.bulletes = [];
		this.waves = [];
		this.radiusFight = name.radiusFight;
		this.numberChangesColors = this.settings.numberChangesColors;
	}

	fire(enemie) {
		this.bulletes[enemie].push(new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: this.settings.bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.getFill()
		}));
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleTower;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class Monster {
	constructor(name, index) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.RegularPolygon({
			x: this.settings.mapX,
			y: this.settings.mapY,
			sides: 3,
			radius: name.size,
			fill: name.color,
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.health = name.health;
		this.numberTurns = 0;
		this.killed = false;
		this.killedTics = 0;
		this.number = index
	}

	paintRed() {
		this.draw.fill('red');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Monster;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class PentagonTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.RegularPolygon({
			x: x,
			y: y,
			sides: 5,
			radius: radius,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: radius,
			fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
		this.waves = [];
	}

	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes[0] = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.colors[0],
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round'
		});
		this.bulletes.enemie = enemie;
		enemie.health -= this.settings.pentagonTpwerDamage;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PentagonTower;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class StarTower {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Star({
			x: x,
			y: y,
			numPoints: 5,
			innerRadius: radius / 2,
			outerRadius: radius,
			fill: 'khaki',
			stroke: 'black',
			strokeWidth: 0,
		});
		this.kind = name;
		this.bulletes = [];
		this.waves = [];
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes.push(new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.color,
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round',
		}))
		enemie.health -= this.settings.starTowerDamage;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StarTower;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategies_strategy_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategies_strategy_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__strategies_strategy_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(10);





class GameManager {
	constructor(strategy) {

		if (GameManager.__instance) {
			return GameManager.__instance;
		}
		
		this.mediator = new __WEBPACK_IMPORTED_MODULE_1__mediator_js__["a" /* default */]();

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].PLAY_NEW_GAME, this.start.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].PLAY_AGAIN, this.start.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].GAME_FINISHED, this.end.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].QUIT_CONFIRMED, this.end.bind(this));

		GameManager.__instance = this;
	}

	setStrategy(strategy) {
		this.play = false;
		this.strategy = strategy;
	}

	gameLoop() {
		this.strategy.gameStep();
		if (this.play) {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	start() {
		console.log(this.strategy);
		this.strategy.init();
		this.play = true;
		this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
	}

	end(args) {
		this.play = false;
		const userService = new __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__["a" /* default */];
		userService.setUserScore(args.score, () => {});
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class Scene {
	constructor() {
		this.state = {};
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */];

		this.gameStage = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Stage({
			container: this.settings.gameFieldId,
			width : this.settings.gameFieldElement.offsetWidth,
			height : this.settings.gameFieldElement.offsetHeight
		});

		this.gameLayer = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Layer();

		this.hintsStage = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Stage({
			container: this.settings.hintsFieldId,
			width : this.settings.hintsFieldElement.offsetWidth,
			height : this.settings.hintsFieldElement.offsetHeight
		})

		this.hintsLayer = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Layer();
	}

	setState(state) {
		this.state = state;
	}

	render() {

		let length = this.gameLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.gameLayer.children[0].remove();
		}
		
		length = this.hintsLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.hintsLayer.children[0].remove();
		}

		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.gameLayer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					this.gameLayer.add(this.state.fields[i][j].tower.draw);
				}
				
			}
		}
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			this.gameLayer.add(this.state.fieldsNewTower[i].draw)
		}

		for (let i = 0; i < this.state.variantRects.length; i++) {
			this.hintsLayer.add(this.state.variantRects[i].draw);
			if (this.state.variantRects[i].text) {
				this.hintsLayer.add(this.state.variantRects[i].text);
			}
		}

		for (let i = 0; i < this.state.variantElements.length; i++){
			this.hintsLayer.add(this.state.variantElements[i].draw);
		}

		for (let i = 0; i < this.state.variantsShow.length; i++){
			this.gameLayer.add(this.state.variantsShow[i].draw);
		}

		for (let i = 0; i < this.state.enemies.length; i++){
			this.gameLayer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.state.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.state.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					this.gameLayer.add(this.state.fieldsWithCircles[i].tower.bulletes[j][s])
				}
			}
		}

		for (let i = 0; i < this.state.fieldsWithPentagons.length; i++) {
			if (this.state.fieldsWithPentagons[i].tower.bulletes.length) {
				this.gameLayer.add(this.state.fieldsWithPentagons[i].tower.bulletes[0]);
			}
		}

		for (let i = 0; i < this.state.fieldsWithStars.length; i++) {
			for (let j = 0; j < this.state.fieldsWithStars[i].tower.bulletes.length; j++) {
				this.gameLayer.add(this.state.fieldsWithStars[i].tower.bulletes[j]);
			}
		}

		for (let i = 0; i < this.state.fieldsWith.length; i++) {
			for (let j = 0; j < this.state.fieldsWith[i].tower.waves.length; j++) {
				this.gameLayer.add(this.state.fieldsWith[i].tower.waves[j].draw);
			}
		}


		for (let i = 0; i < this.state.checkpoints.length ; i++) {
			this.gameLayer.add(this.state.checkpoints[i].draw);
		}

		this.gameStage.add(this.gameLayer);
		this.hintsStage.add(this.hintsLayer);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_js__ = __webpack_require__(5);




class WebSocketService {
	constructor() {
		this.mediator = new __WEBPACK_IMPORTED_MODULE_0__mediator_js__["a" /* default */]();
	}

	open() {
		this.authorize = new __WEBPACK_IMPORTED_MODULE_1__services_authorize_js__["a" /* default */]();

		this.ws = new WebSocket('wss://gem-td-back.herokuapp.com/game');

		this.ws.onopen = () => { 
			console.log('open');
			this.sendObject({ 
				type: 'techpark.game.events.JoinGame',
				content: {}
			});
		};

		this.ws.onerror = (error) => {
			console.log('error ', error.message);
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].MULTIPLAYER_CONNECTION_REFUSED);
		};

		this.ws.onclose = (event) => {
			console.log('close');
			console.log('code: ', event.code);
			console.log('reason: ', event.reason);
			if (event.code !== 1005) {
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].MULTIPLAYER_CONNECTION_REFUSED);
			}
		};

		this.ws.onmessage = (event) => {
			const object = this.parseMessage(event.data);

			console.log(object);

			this.parseObject(object);
		};
	}

	close() {
		this.ws.close();
	}

	sendNewTower(coord) {
		this.sendObject({
			type: 'techpark.game.base.ClientSnap',
			content: {
				square: {
					x: coord.x,
					y: coord.y
				},
			}
		});
	}

	//sendNewTower(coord, kind) {
	//	this.sendObject({
	//		type: 'techpark.game.base.ClientSnap',
	//		content: {
	//			square: {
	//				x: coord.x,
	//				y: coord.y,
	//				comb: kind
	//			},
	//		}
	//	});
	//}

	sendObject(message) {
		if (message.content) {
			message.content = JSON.stringify(message.content);
		}
		message = JSON.stringify(message);
		this.ws.send(message);
	}

	parseMessage(message) {
		message = JSON.parse(message);
		if (message.content) {
			message.content = JSON.parse(message.content);
		}
		return message;
	}

	parseObject(object) {
		if (object.type === 'techpark.game.request.InitGame$Request') {
			const payers = object.content.players;
			let ally = 'ally';
			for (let player of payers) {
				if (player !== this.authorize.user.username) {
					ally = player;
				}
			}
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].MULTIPLAYER_GAME_START, {ally})

		} else if (object.type === 'techpark.game.base.ServerMazeSnap') {
			const obj = {};
			obj.map = object.content.map;
			obj.combinations = object.content.combinations;
			if (object.content.user === this.authorize.user.username) {
				obj.myself = true;
			} else {
				obj.myself = false;
			}
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].MULTIPLAYER_NEW_MAP_SNAPSHOT, obj);
			
		} else if (object.type === 'techpark.game.base.ServerWaveSnap') {
			let obj = {};
			obj.enemyDamages = object.content.enemyDamages;
			obj.route = object.content.route;
			obj.points = object.content.points;
			obj.throneDamages = object.content.throneDamages;
			obj.wave = object.content.wave;
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_2__events_js__["a" /* default */].MULTIPLAYER_NEW_WAVE_STARTED, obj);
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WebSocketService;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class VariantBlock {
	constructor(number, text) {

		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */];
		this.isAble = false;
		this.kind = 0;
		this.field = 0;
		switch (number) {
			case (0):
				this.kind = this.settings.pentagonRPS;
				break;
			case (1):
				this.kind = this.settings.pentagonSBG;
				break;
			case (2):
				this.kind = this.settings.pentagonGYR;
				break;
			case (3):
				this.kind = this.settings.star;
				break;
		}
		if (text) {
			this.text = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Text({
				x: this.settings.variantsX,
				y: this.settings.variantsY + number * this.settings.betweenVariants,
				width: this.settings.variantsXSize,
				text: text,
				fontSize: 18,
				fill: 'red',
				padding: 15,
				align: 'center',
			});
		}

		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Rect({
			x: this.settings.variantsX,
			y: this.settings.variantsY + number * this.settings.betweenVariants,
			width: this.settings.variantsXSize,
			height: (text ? this.text.getHeight() : this.settings.variantsYSize),
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 5
		});

		// let width = this.settings.hintsFieldElement.offsetWidth;
		// let height = this.settings.hintsFieldElement.offsetHeight;

		// this.draw = new Konva.Rect({
		// 		x: width * 0.05,
		// 		y: this.settings.mapY + number * height * 0.15,
		// 		width: width * 0.9,
		// 		height: height * 0.1,
		// 		fill: 'grey',
		// 		stroke: 'black',
		// 		strokeWidth: 2
		// });
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VariantBlock;



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);





class About extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'about'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list'
		});
		this.header = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list__header',
			align: 'center'
		});
		this.header.get().innerHTML = 'Gem-TD';
		this.hr = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('hr');
		this.cnt = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div');
		this.cnt.get().innerHTML = this.loadContent();

		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());
		this.list.get().appendChild(this.header.get());
		this.list.get().appendChild(this.cnt.get());
		this.header.get().appendChild(this.hr.get());
	}

	loadContent() {

		return '<b>Gem-TD - игра в жанре Tower Defence, которая отличается от всех остальных!</b> <br><br>' + 
		'Злые монстры хотят выйти из преисподней и уничтожить королевский трон, зайдя по пути в несколько мест на вашей карте. <br><br>' + 
		'<b>Ваша задача - помешать им!</b><br><br>' + 
		'Стройте оборонительные окрепления, чтобы монстрам было сложнее добраться туда, куда они хотят.' +
		'Возводите башни, чтобы уничтожить ваших врагов. <br><br>' + 
		'За один ход вам дается возможность построить 3 башни в любом месте вашей карты, но так, чтобы остался <b>хотя бы один возможный путь</b> ко всем ключевым местам.<br><br>' + 
		'Построенные башни получаются случайного цвета. После того, как вы их построите, вы должны выбрать <b>только одну</b> из них. Остальные две превратятся в стены, которые монстры не могут обойти. <br><br>' + 
		'Используйте комбинации, чтобы соединить 3 башни разных цветов в одну более сильную, пятиугольную башню.<br>' +
		'Соберите 3 различных пятиугольных башни, чтобы соединить их в звездную башню - она сможет атаковать старзу нескольких монстров!<br><br>' + 
		'<b>Цель игры - продержаться как можно дольше до тех пор, пока королевский трон не будет уничтожен!</b>'

		return '<b>Жанр</b>: Tower Defense<br>' +
		'<b>Количество игроков</b>: 1-2<br>' +
		'<b>Особенности</b>: сложная, но интересная Tower Defence, у всех вышек есть способности, успех в немалой степени зависит от случайности.<br>' +
		'<b>Задача</b>: уничтожить все волны мобов<br>' +
		'<b>Количество волн: </b>  <br>' +
		'<b>Поражение</b>: пропустить некоторое количество мобов / боссов к кристаллу (количество зависит от типа и уровня хп пропущенных)<br>' +
		'<br>' +

		'<b>Суть игры:</b><br>' +
		'<div style="padding-left: 30px">Игра относится к подкатегории TD, в которых необходимо строить лабиринт для врагов, окутывая вышками и баррикадами контрольные точки, в которые все враги обязаны заходить в определенной последовательности. Контрольные точки выделены зеленым узором, а дорожки, по которым враги потенциально могут идти, светло-зеленым цветом.<br>' +
		'</div><br>' +

		'<b>Основные факты о вышках:</b><br>' +
		'<ul>' +
		'<li>Каждый раунд вы можете разместить 5 гемов, так называются все вышки, они же составляющие для спец.вышек.</li>' +
		'<li>Гемы представляют собой драгоценные камни - опалы, аметисты, рубины, топазы, эмеральды, аквамарины, алмазы. Все они имеют различные типы атак, например, рубин бьет в сплеше, опалы дают ауру скорости атаки, топазы бьют в несколько целей и т.д.</li>' +
		'<li>Различные камни объединяются в спец. вышки</li> <br>' +
		'<li>За каждый раунд после установки 5 гемов, оставить вы сможете лишь один из них, остальные будут превращены в скалы. Однако если в вашем наборе есть сочетание для спец. вышки, вы можете её сразу построить.</li>' +
		'</ul><br>' +

		'<b>Факты о волнах:</b><br>' +
		'<ul>' +
		'<li>Наземные юниты будут ходить от стрелки к стрелке по кратчайшему пути, нарисованный путь не имеет значения</li>' +
		'<li>Летающие юниты всегда идут прямым путем, игнорируя препятствия</li>' +
		'<li>На магически неуязвимых юнитов не работают замедление, понижение урона, яд, сплеш и вышки Asteriated ruby / Vulcano не наносят урона.</li>' +
		'<li>Некоторые волны - боссы, все летающие, секрет убийства - настакивать замедление и минус броню, очень «сильная» вышка для этого - quartz.</li>' +
		'<li>Также имеются волны юнитов с уворотам, физически иммунных юнитов и быстрых юнитов, которые не замедляются.</li>' +
		'</ul>' +
		'<br>' +

		'<b>Факты и советы по  постройке лабиринта:</b><br>' +
		'<ul>' +
		'<li>Вышки выгоднее всего строить ближе к центру - пересечению путей следования летающих юнитов</li>' +
		'<li>Поскольку существует 5 стрелок (включая старт и финиш - всего 7 точек для посещения юнитами), можно построить такой лабиринт, для которого наземные юниты будут путешествовать через одну и ту же область 6 раз (это максимум).</li>' +
		'</ul>' +
		'<br>' +

		'<b>Прохождение.</b><br>' +
		'<div style="padding-left: 30px">Залогом успешной игры является построение лабиринта по типу «сильных», баланс в вышках для прохождения разных волн (физически и магически иммунных), и немного удачи.' +
		'</div>';
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = About;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_userservice_js__ = __webpack_require__(10);






class LeaderBoard extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'leaderboard'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list'
		});
		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());

		this.template = window.fest['leaderboard.tmpl'];
		this.list.get().innerHTML = this.template({});
	}

	show() {
		super.show();
		this.update();
	}

	update() {
		const service = new __WEBPACK_IMPORTED_MODULE_2__services_userservice_js__["a" /* default */]();
		service.getUsersList(xhr => {
			this.list.get().innerHTML = this.template(xhr);
			this.paint();
		});
	}

	paint() {
		let rows = this.list.get().querySelectorAll('.line.row');

		rows[1].style.borderTopLeftRadius = '15px';
		rows[1].style.borderTopRightRadius = '15px';
		rows[rows.length - 1].style.borderBottomLeftRadius = '15px';
		rows[rows.length - 1].style.borderBottomRightRadius = '15px';

		let mark = true;
		const color1 = 'rgb(229, 251, 195)';
		const color2 = 'rgb(203, 236, 153)';
		for (let i = 1; i < rows.length; i++) {
			if (!mark) {
				rows[i].style.backgroundColor = color1;
			} else {	
				rows[i].style.backgroundColor = color2;
			}
			mark = !mark;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LeaderBoard;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(2);









class Login extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'login'
		});
		this.background = this.white_background;
		
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.form = new __WEBPACK_IMPORTED_MODULE_2__components_LoginForm_loginform_js__["a" /* default */]();

		this.form.on('submit', () => {

			event.preventDefault();

			const service = new __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__["a" /* default */]();
			const auth = new __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__["a" /* default */]();
			const router = new __WEBPACK_IMPORTED_MODULE_5__modules_router_js__["a" /* default */]();

			if (this.form.validate()) {

				service.login(this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Неверный логин или пароль!');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Login;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(4);









class Menu extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'menu'
		});

		this.greeting = new __WEBPACK_IMPORTED_MODULE_3__components_Greeting_greeting_js__["a" /* default */]('Гость');
		
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd',
			align: 'center'
		});
		this.line1 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'line',
			align: 'center'
		});
		this.line2 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'line',
			align: 'center'
		});
		this.singleButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Одиночная игра', {
			class: 'menu__single-button menu__button_big'
		});
		this.multiButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Мультиплеер', {
			class: 'menu__multi-button menu__button_big'
		});
		this.aboutButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Об игре', {
			class: 'menu__about-button menu__button_small'
		});
		this.leaderButton = new __WEBPACK_IMPORTED_MODULE_2__components_MenuButton_menubutton_js__["a" /* default */]('Лидеры', {
			class: 'menu__leaderboard-button menu__button_small'
		});

		this.render();
		this.makeListeners();
	}

	render() {
		this.get().removeChild(this.back.get());

		this.get().appendChild(this.greeting.get());
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.line1.get());
		this.padd.get().appendChild(this.line2.get());
		this.line1.get().appendChild(this.singleButton.get());
		this.line1.get().appendChild(this.multiButton.get());
		this.line2.get().appendChild(this.aboutButton.get());
		this.line2.get().appendChild(this.leaderButton.get());
	}

	makeListeners() {

		const router = new __WEBPACK_IMPORTED_MODULE_4__modules_router_js__["a" /* default */]();

		this.greeting.loginButton.on('click', (event) => {
			event.preventDefault();
			router.go('/login/');
		});

		this.greeting.registerButton.on('click', (event) => {
			event.preventDefault();
			router.go('/register/');
		});

		this.greeting.exitButton.on('click', (event) => {
			event.preventDefault();

			const auth = new __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__["a" /* default */]();
			auth.deauthorize();
		});

		this.singleButton.on('click', (event) => {
			event.preventDefault();
			router.go('/game/');
		});

		this.multiButton.on('click', (event) => {
			event.preventDefault();
			router.go('/multiplayer/');
		});

		this.aboutButton.on('click', (event) => {
			event.preventDefault();
			router.go('/about/');
		});

		this.leaderButton.on('click', (event) => {
			event.preventDefault();
			router.go('/leaders/');
		});
	}

	loginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.noAuth.get().hidden = true;
		this.greeting.auth.get().hidden = false;
	}

	unloginSwitch(name) {
		this.greeting.username.get().textContent = name;
		this.greeting.auth.get().hidden = true;
		this.greeting.noAuth.get().hidden = false;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_js__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_strategies_multi_strategy_js__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_manager_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__game_transport_js__ = __webpack_require__(33);













class MultiPlayer extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'multiplayer'
		});
		
		this.get().removeChild(this.back.get());

		this.startSubView = new __WEBPACK_IMPORTED_MODULE_2__start_js__["a" /* default */]();
		this.gameSubView = new __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */]()

		this.router = new __WEBPACK_IMPORTED_MODULE_7__modules_router_js__["a" /* default */]();
		this.mediator = new __WEBPACK_IMPORTED_MODULE_6__game_mediator_js__["a" /* default */]();

		this.render();

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].MULTIPLAYER_SEARCH, this.onSearch.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].MULTIPLAYER_GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].MULTIPLAYER_QUIT_CONFIRMED, this.onQuitConfirm.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].MULTIPLAYER_EXIT_TO_MENU, this.onExit.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].MULTIPLAYER_PLAY_AGAIN, this.onQuitConfirm.bind(this));
	}

	onSearch() {
		this.ws = new __WEBPACK_IMPORTED_MODULE_9__game_transport_js__["a" /* default */]();
		this.ws.open();
	}

	onStartGame(args) {
		this.gameManager = new __WEBPACK_IMPORTED_MODULE_5__game_manager_js__["a" /* default */]();
		this.gameManager.setStrategy(new __WEBPACK_IMPORTED_MODULE_4__game_strategies_multi_strategy_js__["a" /* default */](this.ws));

		this.get().removeChild(this.startSubView.get());
		this.get().appendChild(this.gameSubView.get());
		
		console.log(args.ally);

		this.mediator.emit(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].PLAY_NEW_GAME);
	}

	onQuitConfirm() {
		this.ws.close();
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
	}

	onExit() {
		this.ws.close();
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());	this.router.go('/');
	}

	render() {
		this.get().appendChild(this.startSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiPlayer;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(4);









class Register extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'registration'
		});
		this.background = this.white_background;
		
		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.form = new __WEBPACK_IMPORTED_MODULE_2__components_RegisterForm_registerform_js__["a" /* default */]();
		this.form.on('submit', () => {

			event.preventDefault();

			const router = new __WEBPACK_IMPORTED_MODULE_3__modules_router_js__["a" /* default */]();
			const service = new __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__["a" /* default */]();
			const auth = new __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__["a" /* default */]();

			if (this.form.validate()) {

				service.register(this.form.data.email, this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Что-то пошло не так');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Register;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__start_js__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_js__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_strategies_single_strategy_js__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_manager_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__game_events_js__ = __webpack_require__(5);












class SinglePlayer extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer'
		});
		
		this.get().removeChild(this.back.get());

		this.startSubView = new __WEBPACK_IMPORTED_MODULE_2__start_js__["a" /* default */]();
		this.gameSubView = new __WEBPACK_IMPORTED_MODULE_3__game_js__["a" /* default */]();

		this.router = new __WEBPACK_IMPORTED_MODULE_7__modules_router_js__["a" /* default */]();
		this.mediator = new __WEBPACK_IMPORTED_MODULE_6__game_mediator_js__["a" /* default */]();

		this.render();

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].QUIT_CONFIRMED, this.onQuitConfirm.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].EXIT_TO_MENU, this.onExit.bind(this));
	}

	onStartGame() {
		this.gameManager = new __WEBPACK_IMPORTED_MODULE_5__game_manager_js__["a" /* default */]();
		this.gameManager.setStrategy(new __WEBPACK_IMPORTED_MODULE_4__game_strategies_single_strategy_js__["a" /* default */]());

		this.get().removeChild(this.startSubView.get());
		this.get().appendChild(this.gameSubView.get());
		
		this.mediator.emit(__WEBPACK_IMPORTED_MODULE_8__game_events_js__["a" /* default */].PLAY_NEW_GAME);
	}

	onQuitConfirm() {
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
	}

	onExit() {
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
		this.router.go('/');
	}

	render() {
		this.get().appendChild(this.startSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayer;



/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".back {\n  font-size: 18pt; }\n  .back__button {\n    color: #000000;\n    padding-top: 0.5%;\n    display: inline-block;\n    width: 200px; }\n    .back__button:hover {\n      color: #C46E00;\n      text-decoration: none; }\n  .back__image {\n    display: inline-block;\n    width: 60%; }\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".form__message {\n  font-size: 20px;\n  color: red; }\n", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".greeting {\n  width: 99%;\n  max-height: 10%; }\n  .greeting__text-block {\n    max-height: 5vh;\n    height: 50%;\n    margin-bottom: 25px; }\n  .greeting__text {\n    color: #3B1A1A;\n    display: inline; }\n  .greeting__button-block {\n    max-height: 5vh;\n    height: 50%; }\n  .greeting__button {\n    border: 1px solid #0a3c59;\n    background: #826639;\n    background: linear-gradient(to bottom, #c47d43, #826639);\n    padding: 7px 14px;\n    border-radius: 6px;\n    box-shadow: rgba(255, 255, 255, 0.4) 0 0px 0, inset rgba(255, 255, 255, 0.4) 0 0px 0;\n    text-shadow: #0e496e 0 1px 0;\n    color: #ffe69c;\n    font-size: 17px;\n    text-decoration: none;\n    vertical-align: middle;\n    margin-left: 5px; }\n    .greeting__button:hover {\n      border: 1px solid #0a3c59;\n      text-decoration: none;\n      text-shadow: #1e4158 0 1px 0;\n      background: #5c4a2f;\n      background: linear-gradient(to top, #c47d43, #826639);\n      color: #e6c163; }\n    .greeting__button:active {\n      text-shadow: #1e4158 0 1px 0;\n      border: 1px solid #0a3c59;\n      background: #4d2613;\n      background: linear-gradient(to bottom, #c47d43, #826639);\n      color: #c47937; }\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".form-input__error-message {\n  color: red;\n  font-size: 15px; }\n\n.form-input__label {\n  font-size: 20pt; }\n", ""]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".menu__button:visited {\n  text-decoration: none; }\n\n.menu__button {\n  display: inline-block;\n  border: 1px solid #64734D;\n  border-radius: 20px;\n  color: #705D07;\n  font-weight: bolder;\n  font-size: 30px;\n  padding: 20px 20px;\n  box-shadow: inset 0 1px 0 0 #C7E69A,inset 0 -1px 0 0 #A0B87B,inset 0 0 0 1px #B8D48E;\n  text-shadow: 0 1px 0 #FFFFFF;\n  background-color: #DBFCA9;\n  text-decoration: none;\n  background-repeat: no-repeat;\n  background-position: 20%;\n  margin-right: 0.5%;\n  margin-left: 0.5%; }\n\n.menu__button:hover, .menu__button:active {\n  background-repeat: no-repeat;\n  text-decoration: none;\n  color: #3B1A1A;\n  background-color: #D3FF91; }\n\n.menu__button_big {\n  width: 305px;\n  height: 275px; }\n\n.menu__button_small {\n  width: 305px; }\n\n.menu__single-button {\n  background-image: url(" + __webpack_require__(71) + "); }\n\n.menu__single-button:hover, .menu__single-button:active {\n  background-image: url(" + __webpack_require__(72) + "); }\n\n.menu__multi-button {\n  background-image: url(" + __webpack_require__(69) + "); }\n\n.menu__multi-button:hover, .menu__multi-button:active {\n  background-image: url(" + __webpack_require__(70) + "); }\n", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "body {\n  font-family: 'Comic Sans MS', 'Arial';\n  background-size: 100% auto;\n  background-attachment: fixed; }\n\n.list {\n  position: relative;\n  background-color: #DBFCA9;\n  margin-left: 20%;\n  margin-right: 20%;\n  margin-top: 3%;\n  margin-bottom: 3%;\n  padding: 3%;\n  font-size: 18pt;\n  border-radius: 20px;\n  border: 1px solid #64734D; }\n  .list__header {\n    font-size: 30pt;\n    margin-bottom: 3%;\n    margin-top: -2%; }\n    .list__header hr {\n      color: #64734D;\n      background-color: #64734D;\n      opacity: 1;\n      height: 1px;\n      border: 0; }\n  .list__sub-header {\n    font-size: 22pt;\n    margin-bottom: 2%; }\n\n.game-field, .hints-field {\n  height: 100vh;\n  padding: 0px; }\n\n.line {\n  padding-bottom: 1%; }\n\n.padd {\n  max-height: 60vh;\n  width: 99%;\n  position: absolute;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  top: 50%; }\n\n.kirka {\n  background-position: left bottom;\n  position: fixed;\n  bottom: 0%;\n  left: -7%; }\n\n.left-bar {\n  height: 100vh;\n  padding: 0px;\n  background-color: rgba(58, 183, 51, 0.82);\n  border: 1px solid black;\n  border-bottom-right-radius: 20px;\n  border-top-right-radius: 20px;\n  font-size: 25px; }\n  .left-bar__quit {\n    height: 20%;\n    padding: 5%; }\n  .left-bar__user, .left-bar__score, .left-bar__wave, .left-bar__HP {\n    height: 20%; }\n\n.game-window {\n  position: fixed;\n  margin-top: 35vh;\n  margin-bottom: 35vh;\n  margin-left: 35vw;\n  margin-right: 35vw;\n  border: 2px solid black;\n  border-radius: 20px;\n  background-color: blue;\n  height: 30vh;\n  width: 30vw;\n  font-size: 20px; }\n  .game-window__text {\n    height: 50%;\n    padding: 3%; }\n  .game-window__buttons {\n    height: 50%;\n    padding: 3%; }\n    .game-window__buttons button {\n      margin: 3%; }\n", ""]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = Heap;
  } else {
    window.Heap = Heap;
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)(module)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'Heap'                      : __webpack_require__(14),
    'Node'                      : __webpack_require__(16),
    'Grid'                      : __webpack_require__(51),
    'Util'                      : __webpack_require__(9),
    'DiagonalMovement'          : __webpack_require__(1),
    'Heuristic'                 : __webpack_require__(13),
    'AStarFinder'               : __webpack_require__(17),
    'BestFirstFinder'           : __webpack_require__(52),
    'BreadthFirstFinder'        : __webpack_require__(56),
    'DijkstraFinder'            : __webpack_require__(57),
    'BiAStarFinder'             : __webpack_require__(18),
    'BiBestFirstFinder'         : __webpack_require__(53),
    'BiBreadthFirstFinder'      : __webpack_require__(54),
    'BiDijkstraFinder'          : __webpack_require__(55),
    'IDAStarFinder'             : __webpack_require__(58),
    'JumpPointFinder'           : __webpack_require__(63),
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var Node = __webpack_require__(16);
var DiagonalMovement = __webpack_require__(1);

/**
 * The Grid class, which serves as the encapsulation of the layout of the nodes.
 * @constructor
 * @param {number|Array<Array<(number|boolean)>>} width_or_matrix Number of columns of the grid, or matrix
 * @param {number} height Number of rows of the grid.
 * @param {Array<Array<(number|boolean)>>} [matrix] - A 0-1 matrix
 *     representing the walkable status of the nodes(0 or false for walkable).
 *     If the matrix is not supplied, all the nodes will be walkable.  */
function Grid(width_or_matrix, height, matrix) {
    var width;

    if (typeof width_or_matrix !== 'object') {
        width = width_or_matrix;
    } else {
        height = width_or_matrix.length;
        width = width_or_matrix[0].length;
        matrix = width_or_matrix;
    }

    /**
     * The number of columns of the grid.
     * @type number
     */
    this.width = width;
    /**
     * The number of rows of the grid.
     * @type number
     */
    this.height = height;

    /**
     * A 2D array of nodes.
     */
    this.nodes = this._buildNodes(width, height, matrix);
}

/**
 * Build and return the nodes.
 * @private
 * @param {number} width
 * @param {number} height
 * @param {Array<Array<number|boolean>>} [matrix] - A 0-1 matrix representing
 *     the walkable status of the nodes.
 * @see Grid
 */
Grid.prototype._buildNodes = function(width, height, matrix) {
    var i, j,
        nodes = new Array(height);

    for (i = 0; i < height; ++i) {
        nodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            nodes[i][j] = new Node(j, i);
        }
    }


    if (matrix === undefined) {
        return nodes;
    }

    if (matrix.length !== height || matrix[0].length !== width) {
        throw new Error('Matrix size does not fit');
    }

    for (i = 0; i < height; ++i) {
        for (j = 0; j < width; ++j) {
            if (matrix[i][j]) {
                // 0, false, null will be walkable
                // while others will be un-walkable
                nodes[i][j].walkable = false;
            }
        }
    }

    return nodes;
};


Grid.prototype.getNodeAt = function(x, y) {
    return this.nodes[y][x];
};


/**
 * Determine whether the node at the given position is walkable.
 * (Also returns false if the position is outside the grid.)
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @return {boolean} - The walkability of the node.
 */
Grid.prototype.isWalkableAt = function(x, y) {
    return this.isInside(x, y) && this.nodes[y][x].walkable;
};


/**
 * Determine whether the position is inside the grid.
 * XXX: `grid.isInside(x, y)` is wierd to read.
 * It should be `(x, y) is inside grid`, but I failed to find a better
 * name for this method.
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
Grid.prototype.isInside = function(x, y) {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};


/**
 * Set whether the node on the given position is walkable.
 * NOTE: throws exception if the coordinate is not inside the grid.
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @param {boolean} walkable - Whether the position is walkable.
 */
Grid.prototype.setWalkableAt = function(x, y, walkable) {
    this.nodes[y][x].walkable = walkable;
};


/**
 * Get the neighbors of the given node.
 *
 *     offsets      diagonalOffsets:
 *  +---+---+---+    +---+---+---+
 *  |   | 0 |   |    | 0 |   | 1 |
 *  +---+---+---+    +---+---+---+
 *  | 3 |   | 1 |    |   |   |   |
 *  +---+---+---+    +---+---+---+
 *  |   | 2 |   |    | 3 |   | 2 |
 *  +---+---+---+    +---+---+---+
 *
 *  When allowDiagonal is true, if offsets[i] is valid, then
 *  diagonalOffsets[i] and
 *  diagonalOffsets[(i + 1) % 4] is valid.
 * @param {Node} node
 * @param {DiagonalMovement} diagonalMovement
 */
Grid.prototype.getNeighbors = function(node, diagonalMovement) {
    var x = node.x,
        y = node.y,
        neighbors = [],
        s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false,
        nodes = this.nodes;

    // ↑
    if (this.isWalkableAt(x, y - 1)) {
        neighbors.push(nodes[y - 1][x]);
        s0 = true;
    }
    // →
    if (this.isWalkableAt(x + 1, y)) {
        neighbors.push(nodes[y][x + 1]);
        s1 = true;
    }
    // ↓
    if (this.isWalkableAt(x, y + 1)) {
        neighbors.push(nodes[y + 1][x]);
        s2 = true;
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
        neighbors.push(nodes[y][x - 1]);
        s3 = true;
    }

    if (diagonalMovement === DiagonalMovement.Never) {
        return neighbors;
    }

    if (diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } else {
        throw new Error('Incorrect value of diagonalMovement');
    }

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
        neighbors.push(nodes[y - 1][x - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[y - 1][x + 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
        neighbors.push(nodes[y + 1][x + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[y + 1][x - 1]);
    }

    return neighbors;
};


/**
 * Get a clone of this grid.
 * @return {Grid} Cloned grid.
 */
Grid.prototype.clone = function() {
    var i, j,

        width = this.width,
        height = this.height,
        thisNodes = this.nodes,

        newGrid = new Grid(width, height),
        newNodes = new Array(height);

    for (i = 0; i < height; ++i) {
        newNodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
        }
    }

    newGrid.nodes = newNodes;

    return newGrid;
};

module.exports = Grid;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var AStarFinder = __webpack_require__(17);

/**
 * Best-First-Search path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function BestFirstFinder(opt) {
    AStarFinder.call(this, opt);

    var orig = this.heuristic;
    this.heuristic = function(dx, dy) {
        return orig(dx, dy) * 1000000;
    };
}

BestFirstFinder.prototype = new AStarFinder();
BestFirstFinder.prototype.constructor = BestFirstFinder;

module.exports = BestFirstFinder;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var BiAStarFinder = __webpack_require__(18);

/**
 * Bi-direcitional Best-First-Search path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function BiBestFirstFinder(opt) {
    BiAStarFinder.call(this, opt);

    var orig = this.heuristic;
    this.heuristic = function(dx, dy) {
        return orig(dx, dy) * 1000000;
    };
}

BiBestFirstFinder.prototype = new BiAStarFinder();
BiBestFirstFinder.prototype.constructor = BiBestFirstFinder;

module.exports = BiBestFirstFinder;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(9);
var DiagonalMovement = __webpack_require__(1);

/**
 * Bi-directional Breadth-First-Search path finder.
 * @constructor
 * @param {object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BiBreadthFirstFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
}


/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BiBreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        startOpenList = [], endOpenList = [],
        neighbors, neighbor, node,
        diagonalMovement = this.diagonalMovement,
        BY_START = 0, BY_END = 1,
        i, l;

    // push the start and end nodes into the queues
    startOpenList.push(startNode);
    startNode.opened = true;
    startNode.by = BY_START;

    endOpenList.push(endNode);
    endNode.opened = true;
    endNode.by = BY_END;

    // while both the queues are not empty
    while (startOpenList.length && endOpenList.length) {

        // expand start open list

        node = startOpenList.shift();
        node.closed = true;

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened) {
                // if this node has been inspected by the reversed search,
                // then a path is found.
                if (neighbor.by === BY_END) {
                    return Util.biBacktrace(node, neighbor);
                }
                continue;
            }
            startOpenList.push(neighbor);
            neighbor.parent = node;
            neighbor.opened = true;
            neighbor.by = BY_START;
        }

        // expand end open list

        node = endOpenList.shift();
        node.closed = true;

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened) {
                if (neighbor.by === BY_START) {
                    return Util.biBacktrace(neighbor, node);
                }
                continue;
            }
            endOpenList.push(neighbor);
            neighbor.parent = node;
            neighbor.opened = true;
            neighbor.by = BY_END;
        }
    }

    // fail to find the path
    return [];
};

module.exports = BiBreadthFirstFinder;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var BiAStarFinder = __webpack_require__(18);

/**
 * Bi-directional Dijkstra path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BiDijkstraFinder(opt) {
    BiAStarFinder.call(this, opt);
    this.heuristic = function(dx, dy) {
        return 0;
    };
}

BiDijkstraFinder.prototype = new BiAStarFinder();
BiDijkstraFinder.prototype.constructor = BiDijkstraFinder;

module.exports = BiDijkstraFinder;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(9);
var DiagonalMovement = __webpack_require__(1);

/**
 * Breadth-First-Search path finder.
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BreadthFirstFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = [],
        diagonalMovement = this.diagonalMovement,
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        neighbors, neighbor, node, i, l;

    // push the start pos into the queue
    openList.push(startNode);
    startNode.opened = true;

    // while the queue is not empty
    while (openList.length) {
        // take the front node from the queue
        node = openList.shift();
        node.closed = true;

        // reached the end position
        if (node === endNode) {
            return Util.backtrace(endNode);
        }

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            // skip this neighbor if it has been inspected before
            if (neighbor.closed || neighbor.opened) {
                continue;
            }

            openList.push(neighbor);
            neighbor.opened = true;
            neighbor.parent = node;
        }
    }
    
    // fail to find the path
    return [];
};

module.exports = BreadthFirstFinder;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var AStarFinder = __webpack_require__(17);

/**
 * Dijkstra path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function DijkstraFinder(opt) {
    AStarFinder.call(this, opt);
    this.heuristic = function(dx, dy) {
        return 0;
    };
}

DijkstraFinder.prototype = new AStarFinder();
DijkstraFinder.prototype.constructor = DijkstraFinder;

module.exports = DijkstraFinder;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var Util       = __webpack_require__(9);
var Heuristic  = __webpack_require__(13);
var Node       = __webpack_require__(16);
var DiagonalMovement = __webpack_require__(1);

/**
 * Iterative Deeping A Star (IDA*) path-finder.
 *
 * Recursion based on:
 *   http://www.apl.jhu.edu/~hall/AI-Programming/IDA-Star.html
 *
 * Path retracing based on:
 *  V. Nageshwara Rao, Vipin Kumar and K. Ramesh
 *  "A Parallel Implementation of Iterative-Deeping-A*", January 1987.
 *  ftp://ftp.cs.utexas.edu/.snapshot/hourly.1/pub/AI-Lab/tech-reports/UT-AI-TR-87-46.pdf
 *
 * @author Gerard Meier (www.gerardmeier.com)
 *
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 * @param {boolean} opt.trackRecursion Whether to track recursion for
 *     statistical purposes.
 * @param {number} opt.timeLimit Maximum execution time. Use <= 0 for infinite.
 */
function IDAStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;
    this.trackRecursion = opt.trackRecursion || false;
    this.timeLimit = opt.timeLimit || Infinity; // Default: no time limit.

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    // When diagonal movement is allowed the manhattan heuristic is not
    // admissible, it should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path. When an empty array is returned, either
 * no path is possible, or the maximum execution time is reached.
 *
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
IDAStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    // Used for statistics:
    var nodesVisited = 0;

    // Execution time limitation:
    var startTime = new Date().getTime();

    // Heuristic helper:
    var h = function(a, b) {
        return this.heuristic(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }.bind(this);

    // Step cost from a to b:
    var cost = function(a, b) {
        return (a.x === b.x || a.y === b.y) ? 1 : Math.SQRT2;
    };

    /**
     * IDA* search implementation.
     *
     * @param {Node} The node currently expanding from.
     * @param {number} Cost to reach the given node.
     * @param {number} Maximum search depth (cut-off value).
     * @param {Array<Array<number>>} The found route.
     * @param {number} Recursion depth.
     *
     * @return {Object} either a number with the new optimal cut-off depth,
     * or a valid node instance, in which case a path was found.
     */
    var search = function(node, g, cutoff, route, depth) {
        nodesVisited++;

        // Enforce timelimit:
        if (this.timeLimit > 0 &&
            new Date().getTime() - startTime > this.timeLimit * 1000) {
            // Enforced as "path-not-found".
            return Infinity;
        }

        var f = g + h(node, end) * this.weight;

        // We've searched too deep for this iteration.
        if (f > cutoff) {
            return f;
        }

        if (node == end) {
            route[depth] = [node.x, node.y];
            return node;
        }

        var min, t, k, neighbour;

        var neighbours = grid.getNeighbors(node, this.diagonalMovement);

        // Sort the neighbours, gives nicer paths. But, this deviates
        // from the original algorithm - so I left it out.
        //neighbours.sort(function(a, b){
        //    return h(a, end) - h(b, end);
        //});

        
        /*jshint -W084 *///Disable warning: Expected a conditional expression and instead saw an assignment
        for (k = 0, min = Infinity; neighbour = neighbours[k]; ++k) {
        /*jshint +W084 *///Enable warning: Expected a conditional expression and instead saw an assignment
            if (this.trackRecursion) {
                // Retain a copy for visualisation. Due to recursion, this
                // node may be part of other paths too.
                neighbour.retainCount = neighbour.retainCount + 1 || 1;

                if(neighbour.tested !== true) {
                    neighbour.tested = true;
                }
            }

            t = search(neighbour, g + cost(node, neighbour), cutoff, route, depth + 1);

            if (t instanceof Node) {
                route[depth] = [node.x, node.y];

                // For a typical A* linked list, this would work:
                // neighbour.parent = node;
                return t;
            }

            // Decrement count, then determine whether it's actually closed.
            if (this.trackRecursion && (--neighbour.retainCount) === 0) {
                neighbour.tested = false;
            }

            if (t < min) {
                min = t;
            }
        }

        return min;

    }.bind(this);

    // Node instance lookups:
    var start = grid.getNodeAt(startX, startY);
    var end   = grid.getNodeAt(endX, endY);

    // Initial search depth, given the typical heuristic contraints,
    // there should be no cheaper route possible.
    var cutOff = h(start, end);

    var j, route, t;

    // With an overflow protection.
    for (j = 0; true; ++j) {

        route = [];

        // Search till cut-off depth:
        t = search(start, 0, cutOff, route, 0);

        // Route not possible, or not found in time limit.
        if (t === Infinity) {
            return [];
        }

        // If t is a node, it's also the end node. Route is now
        // populated with a valid path to the end node.
        if (t instanceof Node) {
            return route;
        }

        // Try again, this time with a deeper cut-off. The t score
        // is the closest we got to the end node.
        cutOff = t;
    }

    // This _should_ never to be reached.
    return [];
};

module.exports = IDAStarFinder;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = __webpack_require__(15);
var DiagonalMovement = __webpack_require__(1);

/**
 * Path finder using the Jump Point Search algorithm which always moves
 * diagonally irrespective of the number of obstacles.
 */
function JPFAlwaysMoveDiagonally(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFAlwaysMoveDiagonally.prototype = new JumpPointFinderBase();
JPFAlwaysMoveDiagonally.prototype.constructor = JPFAlwaysMoveDiagonally;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFAlwaysMoveDiagonally.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            return [x, y];
        }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if( dx !== 0 ) { // moving along x
            if((grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1)) ||
               (grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1))) {
                return [x, y];
            }
        }
        else {
            if((grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y)) ||
               (grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y))) {
                return [x, y];
            }
        }
    }

    return this._jump(x + dx, y + dy, x, y);
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFAlwaysMoveDiagonally.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x + dx, y + dy)) {
                neighbors.push([x + dx, y + dy]);
            }
            if (!grid.isWalkableAt(x - dx, y)) {
                neighbors.push([x - dx, y + dy]);
            }
            if (!grid.isWalkableAt(x, y - dy)) {
                neighbors.push([x + dx, y - dy]);
            }
        }
        // search horizontally/vertically
        else {
            if(dx === 0) {
                if (grid.isWalkableAt(x, y + dy)) {
                    neighbors.push([x, y + dy]);
                }
                if (!grid.isWalkableAt(x + 1, y)) {
                    neighbors.push([x + 1, y + dy]);
                }
                if (!grid.isWalkableAt(x - 1, y)) {
                    neighbors.push([x - 1, y + dy]);
                }
            }
            else {
                if (grid.isWalkableAt(x + dx, y)) {
                    neighbors.push([x + dx, y]);
                }
                if (!grid.isWalkableAt(x, y + 1)) {
                    neighbors.push([x + dx, y + 1]);
                }
                if (!grid.isWalkableAt(x, y - 1)) {
                    neighbors.push([x + dx, y - 1]);
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.Always);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFAlwaysMoveDiagonally;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = __webpack_require__(15);
var DiagonalMovement = __webpack_require__(1);

/**
 * Path finder using the Jump Point Search algorithm which moves
 * diagonally only when there is at most one obstacle.
 */
function JPFMoveDiagonallyIfAtMostOneObstacle(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFMoveDiagonallyIfAtMostOneObstacle.prototype = new JumpPointFinderBase();
JPFMoveDiagonallyIfAtMostOneObstacle.prototype.constructor = JPFMoveDiagonallyIfAtMostOneObstacle;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFMoveDiagonallyIfAtMostOneObstacle.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            return [x, y];
        }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if( dx !== 0 ) { // moving along x
            if((grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1)) ||
               (grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1))) {
                return [x, y];
            }
        }
        else {
            if((grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y)) ||
               (grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y))) {
                return [x, y];
            }
        }
    }

    // moving diagonally, must make sure one of the vertical/horizontal
    // neighbors is open to allow the path
    if (grid.isWalkableAt(x + dx, y) || grid.isWalkableAt(x, y + dy)) {
        return this._jump(x + dx, y + dy, x, y);
    } else {
        return null;
    }
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFMoveDiagonallyIfAtMostOneObstacle.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x, y + dy) || grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y + dy]);
            }
            if (!grid.isWalkableAt(x - dx, y) && grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x - dx, y + dy]);
            }
            if (!grid.isWalkableAt(x, y - dy) && grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y - dy]);
            }
        }
        // search horizontally/vertically
        else {
            if(dx === 0) {
                if (grid.isWalkableAt(x, y + dy)) {
                    neighbors.push([x, y + dy]);
                    if (!grid.isWalkableAt(x + 1, y)) {
                        neighbors.push([x + 1, y + dy]);
                    }
                    if (!grid.isWalkableAt(x - 1, y)) {
                        neighbors.push([x - 1, y + dy]);
                    }
                }
            }
            else {
                if (grid.isWalkableAt(x + dx, y)) {
                    neighbors.push([x + dx, y]);
                    if (!grid.isWalkableAt(x, y + 1)) {
                        neighbors.push([x + dx, y + 1]);
                    }
                    if (!grid.isWalkableAt(x, y - 1)) {
                        neighbors.push([x + dx, y - 1]);
                    }
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.IfAtMostOneObstacle);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFMoveDiagonallyIfAtMostOneObstacle;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = __webpack_require__(15);
var DiagonalMovement = __webpack_require__(1);

/**
 * Path finder using the Jump Point Search algorithm which moves
 * diagonally only when there are no obstacles.
 */
function JPFMoveDiagonallyIfNoObstacles(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFMoveDiagonallyIfNoObstacles.prototype = new JumpPointFinderBase();
JPFMoveDiagonallyIfNoObstacles.prototype.constructor = JPFMoveDiagonallyIfNoObstacles;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFMoveDiagonallyIfNoObstacles.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        // if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            // (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            // return [x, y];
        // }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if (dx !== 0) {
            if ((grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1)) ||
                (grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1))) {
                return [x, y];
            }
        }
        else if (dy !== 0) {
            if ((grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy)) ||
                (grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy))) {
                return [x, y];
            }
            // When moving vertically, must check for horizontal jump points
            // if (this._jump(x + 1, y, x, y) || this._jump(x - 1, y, x, y)) {
                // return [x, y];
            // }
        }
    }

    // moving diagonally, must make sure one of the vertical/horizontal
    // neighbors is open to allow the path
    if (grid.isWalkableAt(x + dx, y) && grid.isWalkableAt(x, y + dy)) {
        return this._jump(x + dx, y + dy, x, y);
    } else {
        return null;
    }
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFMoveDiagonallyIfNoObstacles.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x, y + dy) && grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y + dy]);
            }
        }
        // search horizontally/vertically
        else {
            var isNextWalkable;
            if (dx !== 0) {
                isNextWalkable = grid.isWalkableAt(x + dx, y);
                var isTopWalkable = grid.isWalkableAt(x, y + 1);
                var isBottomWalkable = grid.isWalkableAt(x, y - 1);

                if (isNextWalkable) {
                    neighbors.push([x + dx, y]);
                    if (isTopWalkable) {
                        neighbors.push([x + dx, y + 1]);
                    }
                    if (isBottomWalkable) {
                        neighbors.push([x + dx, y - 1]);
                    }
                }
                if (isTopWalkable) {
                    neighbors.push([x, y + 1]);
                }
                if (isBottomWalkable) {
                    neighbors.push([x, y - 1]);
                }
            }
            else if (dy !== 0) {
                isNextWalkable = grid.isWalkableAt(x, y + dy);
                var isRightWalkable = grid.isWalkableAt(x + 1, y);
                var isLeftWalkable = grid.isWalkableAt(x - 1, y);

                if (isNextWalkable) {
                    neighbors.push([x, y + dy]);
                    if (isRightWalkable) {
                        neighbors.push([x + 1, y + dy]);
                    }
                    if (isLeftWalkable) {
                        neighbors.push([x - 1, y + dy]);
                    }
                }
                if (isRightWalkable) {
                    neighbors.push([x + 1, y]);
                }
                if (isLeftWalkable) {
                    neighbors.push([x - 1, y]);
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.OnlyWhenNoObstacles);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFMoveDiagonallyIfNoObstacles;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = __webpack_require__(15);
var DiagonalMovement = __webpack_require__(1);

/**
 * Path finder using the Jump Point Search algorithm allowing only horizontal
 * or vertical movements.
 */
function JPFNeverMoveDiagonally(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFNeverMoveDiagonally.prototype = new JumpPointFinderBase();
JPFNeverMoveDiagonally.prototype.constructor = JPFNeverMoveDiagonally;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFNeverMoveDiagonally.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    if (dx !== 0) {
        if ((grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1)) ||
            (grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1))) {
            return [x, y];
        }
    }
    else if (dy !== 0) {
        if ((grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy)) ||
            (grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy))) {
            return [x, y];
        }
        //When moving vertically, must check for horizontal jump points
        if (this._jump(x + 1, y, x, y) || this._jump(x - 1, y, x, y)) {
            return [x, y];
        }
    }
    else {
        throw new Error("Only horizontal and vertical movements are allowed");
    }

    return this._jump(x + dx, y + dy, x, y);
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFNeverMoveDiagonally.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        if (dx !== 0) {
            if (grid.isWalkableAt(x, y - 1)) {
                neighbors.push([x, y - 1]);
            }
            if (grid.isWalkableAt(x, y + 1)) {
                neighbors.push([x, y + 1]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
        }
        else if (dy !== 0) {
            if (grid.isWalkableAt(x - 1, y)) {
                neighbors.push([x - 1, y]);
            }
            if (grid.isWalkableAt(x + 1, y)) {
                neighbors.push([x + 1, y]);
            }
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.Never);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFNeverMoveDiagonally;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author aniero / https://github.com/aniero
 */
var DiagonalMovement = __webpack_require__(1);
var JPFNeverMoveDiagonally = __webpack_require__(62);
var JPFAlwaysMoveDiagonally = __webpack_require__(59);
var JPFMoveDiagonallyIfNoObstacles = __webpack_require__(61);
var JPFMoveDiagonallyIfAtMostOneObstacle = __webpack_require__(60);

/**
 * Path finder using the Jump Point Search algorithm
 * @param {Object} opt
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {DiagonalMovement} opt.diagonalMovement Condition under which diagonal
 *      movement will be allowed.
 */
function JumpPointFinder(opt) {
    opt = opt || {};
    if (opt.diagonalMovement === DiagonalMovement.Never) {
        return new JPFNeverMoveDiagonally(opt);
    } else if (opt.diagonalMovement === DiagonalMovement.Always) {
        return new JPFAlwaysMoveDiagonally(opt);
    } else if (opt.diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        return new JPFMoveDiagonallyIfNoObstacles(opt);
    } else {
        return new JPFMoveDiagonallyIfAtMostOneObstacle(opt);
    }
}

module.exports = JumpPointFinder;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./back.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./back.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./formmessage.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./formmessage.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./greeting.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./greeting.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./input.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./input.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./menubutton.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./menubutton.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__back_scss__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__back_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__back_scss__);








class Back extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'back',
			align: 'left'
		});
		this.link = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('', {
			class: 'back__button',
			align: "center"
		});
		this.image = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('img', {
			class: 'back__image',
			src: '/img/back.png',
			align: 'center'
		});
		this.text = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'back__text',
			align: 'center'
		});
		this.text.get().innerHTML = 'Обратно в меню';

		this.render();
	}

	onclick(callback) {
		this.link.on('click', () => {
			callback();
		})
	}

	render() {
		this.get().appendChild(this.link.get());
		this.link.get().appendChild(this.image.get());
		this.link.get().appendChild(this.text.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Back;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);




class Button extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(text = '', attrs = {}) {
		attrs.type = 'submit';
		super('button', attrs);
		this.get().innerHTML = text;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Link_link_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__greeting_scss__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__greeting_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__greeting_scss__);









class Greeting extends __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */] {
	constructor(name) {
		super('div', {
			class: 'greeting',
			align: 'right'
		});
		this.greetingBlock = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__text-block'
		});
		this.entryBy = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('h3', {
			class: 'greeting__text'
		});
		this.entryBy.get().innerHTML = 'Вы вошли как ';
		this.username = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('h2', {
			class: 'greeting__text username'
		});
		this.username.get().innerHTML = name;
		this.noAuth = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__button-block no-authorized'
		});
		this.auth = new __WEBPACK_IMPORTED_MODULE_0__BaseBlock_baseblock_js__["a" /* default */]('div', {
			align: 'right',
			class: 'greeting__button-block authorized'
		});
		this.registerButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Регистрация', {
			class: 'greeting__button'
		});
		this.loginButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Вход', {
			class: 'greeting__button'
		});
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__Link_link_js__["a" /* default */]('Выйти', {
			class: 'greeting__button'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.greetingBlock.get());
		this.greetingBlock.get().appendChild(this.entryBy.get());
		this.greetingBlock.get().appendChild(this.username.get());
		this.get().appendChild(this.noAuth.get());
		this.get().appendChild(this.auth.get());
		this.noAuth.get().appendChild(this.registerButton.get());
		this.noAuth.get().appendChild(this.loginButton.get());
		this.auth.get().appendChild(this.exitButton.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Greeting;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_userservice_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_router_js__ = __webpack_require__(2);










class LoginForm extends __WEBPACK_IMPORTED_MODULE_0__Form_form_js__["a" /* default */] {
	constructor() {
		super();
		this.message = new __WEBPACK_IMPORTED_MODULE_3__FormMessage_formmessage_js__["a" /* default */]();
		this.login = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Логин', {
			type: 'text',
			placeholder: 'Введите логин',
			required: 'true'
		});
		this.pass = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Пароль', {
			type: 'password',
			placeholder: 'Введите пароль',
			required: 'true'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__["a" /* default */]('Войти', {
			class: 'btn btn-default btn-lg'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.message.get());
		this.get().appendChild(this.login.get());
		this.get().appendChild(this.pass.get());
		this.get().appendChild(this.button.get());
	}

	onsubmit(callback) {
		this.on('submit', () => {
			callback();
		})
	}

	validate() {
		const login = this.login.input.get().value;
		const pass = this.pass.input.get().value;

		this.data = {
			login: login, 
			password: pass
		};

		return true;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginForm;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Link_link_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menubutton_scss__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menubutton_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__menubutton_scss__);






class MenuButton extends __WEBPACK_IMPORTED_MODULE_0__Link_link_js__["a" /* default */] {
	constructor(text, attrs) {
		super(text, attrs);
		this.get().classList.add('menu__button');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuButton;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_form_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input_input_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_userservice_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__ = __webpack_require__(24);










class RegisterForm extends __WEBPACK_IMPORTED_MODULE_0__Form_form_js__["a" /* default */] {
	constructor() {
		super();
		this.message = new __WEBPACK_IMPORTED_MODULE_6__FormMessage_formmessage_js__["a" /* default */]();
		this.email = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('E-Mail', {
			type: 'text',
			placeholder: 'Введите ваш E-Mail'
		});
		this.login = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Логин', {
			type: 'text',
			placeholder: 'Введите ваш логин',
			required: 'true'
		});
		this.pass = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Пароль', {
			type: 'password',
			placeholder: 'Введите ваш пароль',
			required: 'true'
		});
		this.repeat = new __WEBPACK_IMPORTED_MODULE_1__Input_input_js__["a" /* default */]('Повторите пароль', {
			type: 'password',
			placeholder: 'Повторите ваш пароль',
			required: 'true'
		});
		this.button = new __WEBPACK_IMPORTED_MODULE_2__FormButton_formbutton_js__["a" /* default */]('Зарегистрироваться', {
			class: 'btn btn-default btn-lg'
		});

		this.render();
	}

	render() {
		this.get().appendChild(this.message.get());
		this.get().appendChild(this.email.get());
		this.get().appendChild(this.login.get());
		this.get().appendChild(this.pass.get());
		this.get().appendChild(this.repeat.get());
		this.get().appendChild(this.button.get());
	}

	onsubmit(callback) {
		this.on('submit', () => {
			callback();
		})
	}

	validate() {
		const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

		const login = this.login.input.get();
		const loginError = this.login.errorBlock.get();
		const email = this.email.input.get();
		const emailError = this.email.errorBlock.get();
		const pass = this.pass.input.get();
		const passError = this.pass.errorBlock.get();
		const passRepeat = this.repeat.input.get();
		const passRepeatError = this.repeat.errorBlock.get();

		loginError.textContent = '';
		emailError.textContent = '';
		passError.textContent = '';
		passRepeatError.textContent = '';

		let result = true;

		if (!regexp.test(email.value)) {
			emailError.textContent = 'Введенный вами E-mail некорректен';
			result = false;
		}
		if (login.value.length > 15 || login.value.length < 5) {
			loginError.textContent = 'Ваш логин должен содержать от 5 до 15 символов';
			result = false;
		}
		if (pass.value.length < 5) {
			passError.textContent = 'Ваш пароль должен содержать не менее 5 символов';
			result = false;
		}
		if (pass.value !== passRepeat.value) {
			passRepeatError.textContent = 'Пароли не совпадают';
			result = false;
		}

		if (!result) {
			pass.value = passRepeat.value = '';
		} else {
			this.data = {email: email.value, login: login.value, password: pass.value};
		}

		return result;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RegisterForm;



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gameObjects_towerwave_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__transport_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_konva__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_pathfinding__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_pathfinding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_pathfinding__);
















class MultiplayerStrategy {
	constructor(ws) {
		this.ws = ws;
	}

	init() {

		console.log('multi_strategy');
		this.fl = true;
		this.timer = 0;
		this.arg = {};

		this.mediator = new __WEBPACK_IMPORTED_MODULE_9__mediator_js__["a" /* default */]();
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.wave = 1;
		this.score = 0;

		this.betweenEnemies = 10;
		this.betweenBulles = 3;
		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithCircles = [];
		this.fieldsWithPentagons = [];
		this.fieldsWithStars = [];
		this.fieldsWith = [];
		this.variantsShow = [];
		this.enemies = [];
		this.throneHealth = this.settings.throneHealth;
		this.enemiesNumber = 0;
		this.path = [];
		this.fieldsNewTower = [];
		this.checkpoints = [];
		this.lastMap = Array(this.settings.mapSize);
		for (let i = 0; i < this.lastMap.length; i++) {
			this.lastMap[i] = "o" * 10
		}


		for (let i = 0; i < 4; i++) {
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
				))
			}
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i, 'inVariantBlocks'));
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](3, 'inVariantBlocks'));
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
				this.settings.star,
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))

		for (let i = 1; i < this.settings.checkpoints.length - 1; i++) {
			let arrow = new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i, 'checkpoints');
			this.checkpoints.push(arrow);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			this.fields[i] = Array(this.settings.mapSize);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.fields[j][i] = {
					tower: 0,
					field: new __WEBPACK_IMPORTED_MODULE_12_konva___default.a.Rect({
						x: this.settings.mapX + j * this.settings.fieldSize + j * 2,
						y: this.settings.mapY + i * this.settings.fieldSize + i * 2,
						width: this.settings.fieldSize,
						height: this.settings.fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [j, i],
				};
				if (!((i === 0) && ((j === 0) || (j === this.settings.mapSize - 1)) || (i === this.settings.mapSize - 1) && ((j === 0) || (j === this.settings.mapSize - 1)))) {
					this.fields[j][i]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[j][i], 0)});
					this.fields[j][i]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[j][i], 0)});
					this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i], 0)});
					this.fields[j][i]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[j][i], 0)});
				}

			};
		};
		this.fields[0][this.settings.mapSize - 1].field.setFill('DarkOliveGreen');
		this.fields[this.settings.mapSize - 1][0].field.setFill('DarkOliveGreen');
		
		this.newStones = 0;
		this.towers = {
			circleBlue: 0,
			circleRed: 0,
			circleGreen: 0,
			circleYellow: 0,
			circlePink: 0,
			circleSad: 0,
			pentagonRPS: 0,
			pentagonSBG: 0,
			pentagonGYR: 0,
			star: 0,
		};

		this.state = {};

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_10__events_js__["a" /* default */].MULTIPLAYER_NEW_MAP_SNAPSHOT, this.generateTower.bind(this));
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_10__events_js__["a" /* default */].MULTIPLAYER_NEW_WAVE_STARTED, this.gameWave.bind(this));
	}

	gameStep() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			
			this.gameWave();
		}

		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
	}

	updateState() {
		this.state = {
			fields: this.fields,
			variantRects: this.variantRects,
			towers: this.towers,
			fieldsNewTower: this.fieldsNewTower,
			variantElements: this.variantElements,
			variantsShow: this.variantsShow,
			enemies: this.enemies,
			fieldsWithCircles: this.fieldsWithCircles,
			fieldsWithPentagons: this.fieldsWithPentagons,
			fieldsWithStars: this.fieldsWithStars,
			fieldsWith: this.fieldsWith,
			checkpoints: this.checkpoints,
		}
	}

	

	isAbleTower(place) {
		for (let i = 0; i < this.settings.checkpoints.length; i++){
			if (place.coordinates[0] == this.settings.checkpoints[i][0] && place.coordinates[1] == this.settings.checkpoints[i][1]) {
				return false;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 1;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 1;
		let path = this.findPath(this.settings.checkpoints);
		let points = [];
		for (let i = 0; i < this.settings.checkpoints.length; i++) {
			points.push(this.settings.checkpoints[i]);
		}
		let j = 0;
		for (let i = 0; (i < path.length) && (j < points.length); i++){
			if (path[i][0] == points[j][0] && path[i][1] == points[j][1]) {
				j++;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 0;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 0;
		if (j == points.length) {
			return true;
		}
		return false;
	}

	onClickField(field, knd) {
		knd = knd || 0;
		this.ws.sendNewTower({
			x: field.coordinates[1],
			y: field.coordinates[0]
		}, knd)
	}
		

	onOverField(field) {
	//	field.field.setStroke(this.isAbleTower(field) ? 'green' : 'red');
	}

	onOutField(field) {
	//	field.field.setStroke('black');	
	}

	onClickNewPentagon(field, kind, currentNewTower) {
		if (currentNewTower) {
			for (let i = 0; i < this.fieldsNewTower.length; i++) {
				let xCoord = this.fieldsNewTower[i]['coordinates'][0];
				let yCoord = this.fieldsNewTower[i]['coordinates'][1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			}
			this.fieldsNewTower = [];
			this.newStones = 0;
			this.status = 'Wave';
		}
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deleteCircles = new Array(...kind.circles);
		for (let i = 0; i < deleteCircles.length; i++){
			if (deleteCircles[i] === (currentNewTower ? currentNewTower.kind.name : field.tower.kind.name)) {
				deleteCircles.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithCircles.length; i++) {
			let xCoord = this.fieldsWithCircles[i].coordinates[0];
			let yCoord = this.fieldsWithCircles[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithPentagons.push(field);
		this.fields[x][y].tower.draw.addEventListener('click', () => {this.onClickPentagon.call(this, this.fields[x][y])})
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deleteCircles[0]]--;
		this.towers[deleteCircles[1]]--;
		this.variantsShow = [];
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
		}
	}

	onClickStayVariant(field, kind, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let xCoord = this.fieldsNewTower[i]['coordinates'][0];
			let yCoord = this.fieldsNewTower[i]['coordinates'][1];
			let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
			this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
		}
		this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower ;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithCircles.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
		this.newStones = 0;
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].isAble = false;
		}
	}

	onClickVariantRect(variantRect) {
		this.createVariants.call(this, variantRect.field);
	}

	onClickPentagon(field) {
		if (!(this.towers.pentagonRPS && this.towers.pentagonSBG && this.towers.pentagonGYR)) {
			return;
		}
		this.variantsShow = [];
		let star = new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
			'star',
			field.tower.draw.getX() - this.settings.fieldSize,
			field.tower.draw.getY(),
			this.settings.variantRadius
		);
		star.draw.addEventListener('click', () => {this.onClickNewStar.call(this, field, this.settings.star)});
		this.variantsShow.push(star);
	}

	onClickNewStar(field, kind) {
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deletePentagons = new Array(...kind.pentagons);
		for (let i = 0; i < deletePentagons.length; i++){
			if (deletePentagons[i] == field.tower.kind.name) {
				deletePentagons.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			let xCoord = this.fieldsWithPentagons[i].coordinates[0];
			let yCoord = this.fieldsWithPentagons[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithPentagons.splice(i, 1);
			}
		}


		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithStars.push(field);
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[0]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[1]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deletePentagons[0]]--;
		this.towers[deletePentagons[1]]--;
		this.variantsShow = [];

	}

	generateTower(arg) {
		this.fieldsWith = [];
		for (let i = 0; i < arg.map.length; i++) {
			for (let j = 0; j < arg.map.length; j++) {
				if (arg.map[j][i] === 'o') {
					this.fields[i][j].tower = 0;
				} else if ((arg.map[j][i] >= 'a') && (arg.map[j][i] <= 'f')){
					this.fields[i][j].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
						this.settings.type[arg.map[j][i]],
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j], arg.map[j][i])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j], arg.map[j][i])})
					this.fieldsWith.push(this.fields[i][j])
				} else if (arg.map[j][i] === '#') {
					this.fields[i][j].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
						this.settings.stone,
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
				} else if (arg.map[j][i] === 'z') {
					this.fields[i][j].tower = new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
						this.settings.star,
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j])})
					this.fieldsWith.push(this.fields[i][j]);
				}
				else {
					this.fields[i][j].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
						this.settings.type[arg.map[j][i]],
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j])})
					this.fieldsWith.push(this.fields[i][j]);
				}
			}
		}
		console.log(arg.combinatios);
		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= this.settings.numberTowersInStep)) {
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					currentNewTower['kind'],
					this.settings.variantX,
					this.settings.variantY,
					this.settings.variantRadius
				);
			};
		};
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]++;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower']['tower'] = 0
		}
		let alfa = 6.28 / (variants.length + 1);
		let beta = alfa;
		let variantX = field['field'].getX() + this.settings.fieldSize / 2 - this.settings.fieldSize;
		let variantY = field['field'].getY() + this.settings.fieldSize / 2;
		for (let i = 0; i < variants.length; i++){
			let variant = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				variants[i],
				variantX,
				variantY,
				this.settings.variantRadius
			);
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('click', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variant.draw.addEventListener('tap', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variantX = field['field'].getX() + this.settings.fieldSize / 2 - Math.cos(beta) * this.settings.fieldSize;
			variantY = field['field'].getY()  + this.settings.fieldSize / 2 - Math.sin(beta) * this.settings.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
				currentNewTower.kind,
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantStay.draw.addEventListener('click', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			variantStay.draw.addEventListener('tap', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && (!field || (field.tower.kind == this.settings.circleRed) || (field.tower.kind == this.settings.circlePink) || (field.tower.kind == this.settings.circleSad))){
		variants.push(this.settings.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && (!field || (field.tower.kind == this.settings.circleSad) || (field.tower.kind == this.settings.circleBlue) || (field.tower.kind == this.settings.circleGreen))){
			variants.push(this.settings.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && (!field || (field.tower.kind == this.settings.circleGreen) || (field.tower.kind == this.settings.circleYellow) || (field.tower.kind == this.settings.circleRed))){
			variants.push(this.settings.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if (this.fieldsNewTower[i].numberChangesColors > 1) {
				if (this.fieldsNewTower[i].numberChangesColors % 4 === 0) {
					let color = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)].color;
					this.fieldsNewTower[i].draw.setFill(color);
				}
				this.fieldsNewTower[i].numberChangesColors--;
			} else if (this.fieldsNewTower[i].numberChangesColors === 1) {
				let endColor = this.fieldsNewTower[i].kind.color;
				this.fieldsNewTower[i].draw.setFill(endColor);
				this.fieldsNewTower[i].numberChangesColors--;
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fieldsNewTower[i].draw.addEventListener('click', () => { this.createVariants.call(this, this.fields[x][y]) } ); 
			}
		}
	}

	gameWave(arg) {
		if (arg) {
			this.arg = arg;
		}
		this.status = 'gameWave';
		this.path = this.arg.route;
  
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				if (this.fields[i][j].tower === 0) {
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
				}
			}
		}

		if (this.enemiesNumber < this.settings.numberMonstersInWave) {
			if (this.betweenEnemies > 10) {
				let monster = new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](this.settings.triangl, this.enemiesNumber);
				monster.health += this.settings.addHPInWave * (this.wave - 1);
				this.enemies.push(monster);
				this.betweenEnemies = 0;
				this.enemiesNumber++;
			} else {
				this.betweenEnemies++;
			}
		}

		for (let i = 0; i < this.fieldsWith.length; i++){
			
			if ((this.fieldsWith[i].tower.waves.length === 0) || (this.fieldsWith[i].tower.waves[this.fieldsWith[i].tower.waves.length - 1].draw.getInnerRadius() > this.settings.circleWaveMinRadius)) {

				let wave = new __WEBPACK_IMPORTED_MODULE_8__gameObjects_towerwave_js__["a" /* default */](
					this.fieldsWith[i].tower.kind,
					this.fieldsWith[i].tower.draw.getX(),
					this.fieldsWith[i].tower.draw.getY(),
					this.fieldsWith[i].tower.draw.getRadius()
				)
				this.fieldsWith[i].tower.waves.push(wave);
			}
			if (this.fieldsWith[i].tower.waves[0].draw.getInnerRadius() > this.settings.circleWaveMaxRadius) {
				this.fieldsWith[i].tower.waves.shift();
			}
			for (let j = 0; j < this.fieldsWith[i].tower.waves.length; j++) {
				
				let oldInnerRadius = this.fieldsWith[i].tower.waves[j].draw.getInnerRadius()
				let oldOuterRadius = this.fieldsWith[i].tower.waves[j].draw.getOuterRadius()

				this.fieldsWith[i].tower.waves[j].draw.setInnerRadius(oldInnerRadius + 2);
				this.fieldsWith[i].tower.waves[j].draw.setOuterRadius(oldOuterRadius + 2);
  			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			let color = this.enemies[i].kind.color;
			this.enemies[i].draw.setFill(color);
			if (this.enemies[i].killed) {
				this.enemies.splice(i, 1);
				this.score++;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_10__events_js__["a" /* default */].GET_SCORE, {
					score: this.score
				})
  			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			for (let j = 0; j < this.arg.enemyDamages.length; j++) {
				if (this.enemies[i].number === this.arg.enemyDamages[j].enemy.number) {
					if (Math.abs(this.enemies[i].draw.getX() - this.settings.mapX - this.arg.enemyDamages[j].coordinateY * this.settings.fieldSize) < 100) {
						if (Math.abs(this.enemies[i].draw.getY() - this.settings.mapY - this.arg.enemyDamages[j].coordinateX * this.settings.fieldSize) < 100) {
							this.enemies[i].paintRed();
							this.enemies[i].killed = this.arg.enemyDamages[j].enemy.dead;
							//console.log(this.arg.enemyDamages[j].enemy.dead);
						} else {
							//console.log('99999999999999999999999999999999999999999')
							//console.log(Math.abs(this.enemies[i].draw.getX() - this.settings.mapX - this.arg.enemyDamages[j].coordinateY * this.settings.fieldSize))
							//console.log(Math.abs(this.enemies[i].draw.getY() - this.settings.mapY - this.arg.enemyDamages[j].coordinateX * this.settings.fieldSize))
							//console.log(this.enemies[i].killed)

						}
					}
  				}
  			}
  		}
  		if (this.fl) {
  			for (let j = 0; j < this.arg.enemyDamages.length; j++) {
  				//console.log('88888888888888888888888888888888888888888888888888888')
  				//console.log(this.arg.enemyDamages[j].coordinateX, this.arg.enemyDamages[j].coordinateY, this.arg.enemyDamages[j].enemy.number, this.arg.enemyDamages[j].enemy.dead);
  			}
  			this.fl = false;
  		}
  		

		for (let i = 0; i < this.enemies.length; i++) {
			let place = this.path[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (this.settings.mapX + place['y'] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (this.settings.mapY + place['x'] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			
			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			}

			let stepX = this.settings.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(this.settings.monsterStep * this.settings.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
		}

		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].numberTurns >= this.path.length) {
				this.enemies.splice(i, 1);
				i--;
				let damage = this.settings.damage + this.settings.addDamageInWave * (this.wave - 1);
				this.throneHealth -= damage;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_10__events_js__["a" /* default */].THRONE_DAMAGE, {
					health: (this.throneHealth > 0 ? this.throneHealth : 0)
				})
				if (this.throneHealth <= 0) {
					this.mediator.emit(__WEBPACK_IMPORTED_MODULE_10__events_js__["a" /* default */].GAME_FINISHED, {
						score: this.score,
						death: true
					});
				}
			}
		}
		if ((this.enemies.length === 0) && (this.enemiesNumber >= this.settings.numberMonstersInWave)) {
			this.status = 'playerStep';
			this.wave++;
			this.arg = {};

			this.enemiesNumber = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					if (this.fields[i][j].tower === 0) {
						this.fields[i][j]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
					}
				}
			}
			this.path = [];
			for (let i = 0; i < this.fieldsWith.length; i++){
				this.fieldsWith[i].tower.waves = [];
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiplayerStrategy;


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_konva__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_pathfinding__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_pathfinding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_pathfinding__);














class SingleStrategy {
	
	constructor() {

	}

	init() {

		console.log('single_strategy');

		this.mediator = new __WEBPACK_IMPORTED_MODULE_8__mediator_js__["a" /* default */]();
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.scene = new __WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* default */]();

		this.wave = 1;
		this.score = 0;

		this.betweenEnemies = 10;
		this.betweenBulles = 3;
		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithCircles = [];
		this.fieldsWithPentagons = [];
		this.fieldsWithStars = [];
		this.fieldsWith = [];
		this.variantsShow = [];
		this.enemies = [];
		this.throneHealth = this.settings.throneHealth;
		this.enemiesNumber = 0;
		this.path = [];
		this.fieldsNewTower = [];
		this.checkpoints = [];

		for (let i = 0; i < 4; i++) {
			this.variantRects[i] = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
				))
			}
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i, 'inVariantBlocks'));
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](3, 'inVariantBlocks'));
		this.variantElements.push(new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
				this.settings.star,
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))

		for (let i = 1; i < this.settings.checkpoints.length - 1; i++) {
			let arrow = new __WEBPACK_IMPORTED_MODULE_7__gameObjects_arrow_js__["a" /* default */](i, 'checkpoints');
			this.checkpoints.push(arrow);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			this.fields[i] = Array(this.settings.mapSize);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.fields[j][i] = {
					tower: 0,
					field: new __WEBPACK_IMPORTED_MODULE_10_konva___default.a.Rect({
						x: this.settings.mapX + j * this.settings.fieldSize + j * 2,
						y: this.settings.mapY + i * this.settings.fieldSize + i * 2,
						width: this.settings.fieldSize,
						height: this.settings.fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [j, i],
				};
				if (!((i === 0) && ((j === 0) || (j === this.settings.mapSize - 1)) || (i === this.settings.mapSize - 1) && ((j === 0) || (j === this.settings.mapSize - 1)))) {
					this.fields[j][i]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[j][i])});
				}

			};
		};
		this.fields[0][this.settings.mapSize - 1].field.setFill('DarkOliveGreen');
		this.fields[this.settings.mapSize - 1][0].field.setFill('DarkOliveGreen');
		
		this.newStones = 0;
		this.towers = {
			circleBlue: 0,
			circleRed: 0,
			circleGreen: 0,
			circleYellow: 0,
			circlePink: 0,
			circleSad: 0,
			pentagonRPS: 0,
			pentagonSBG: 0,
			pentagonGYR: 0,
			star: 0,
		};

		this.state = {};

		//this.fields[3][4].tower = new StarTower(
		//	this.settings.star,
		//	3 * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2 + this.settings.mapX,
		//	4 * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2 + this.settings.mapY,
		//	this.settings.fieldSize / 2 - 2
		//)
//
		//this.fieldsWithStars.push(this.fields[3][4]);
	}

	gameStep() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.gameWave();
		}

		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
	}

	updateState() {
		this.state = {
			fields: this.fields,
			variantRects: this.variantRects,
			towers: this.towers,
			fieldsNewTower: this.fieldsNewTower,
			variantElements: this.variantElements,
			variantsShow: this.variantsShow,
			enemies: this.enemies,
			fieldsWithCircles: this.fieldsWithCircles,
			fieldsWithPentagons: this.fieldsWithPentagons,
			fieldsWithStars: this.fieldsWithStars,
			checkpoints: this.checkpoints,
		}
	}

	isAbleTower(place) {
		for (let i = 0; i < this.settings.checkpoints.length; i++){
			if (place.coordinates[0] == this.settings.checkpoints[i][0] && place.coordinates[1] == this.settings.checkpoints[i][1]) {
				return false;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 1;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 1;
		let path = this.findPath(this.settings.checkpoints);
		let points = [];
		for (let i = 0; i < this.settings.checkpoints.length; i++) {
			points.push(this.settings.checkpoints[i]);
		}
		let j = 0;
		for (let i = 0; (i < path.length) && (j < points.length); i++){
			if (path[i][0] == points[j][0] && path[i][1] == points[j][1]) {
				j++;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 0;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 0;
		if (j == points.length) {
			return true;
		}
		return false;
	}

	onClickField(field) {
		if (this.isAbleTower(field)){
			this.generateTower(field);
			this.variantsShow = [];
			this.variantRects.length = 4;
		} else if (this.variantRects.length < 5) {
			let waveButton = new __WEBPACK_IMPORTED_MODULE_6__variantBlock_js__["a" /* default */](4, "You cant stop monsters");
			this.variantRects.push(waveButton);
		}		
	}

	onOverField(field) {
		field.field.setStroke(this.isAbleTower(field) ? 'green' : 'red');
	}

	onOutField(field) {
		field.field.setStroke('black');	
	}

	onClickNewPentagon(field, kind, currentNewTower) {
		if (currentNewTower) {
			for (let i = 0; i < this.fieldsNewTower.length; i++) {
				let xCoord = this.fieldsNewTower[i]['coordinates'][0];
				let yCoord = this.fieldsNewTower[i]['coordinates'][1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			}
			this.fieldsNewTower = [];
			this.newStones = 0;
			this.status = 'Wave';
		}
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deleteCircles = new Array(...kind.circles);
		for (let i = 0; i < deleteCircles.length; i++){
			if (deleteCircles[i] === (currentNewTower ? currentNewTower.kind.name : field.tower.kind.name)) {
				deleteCircles.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithCircles.length; i++) {
			let xCoord = this.fieldsWithCircles[i].coordinates[0];
			let yCoord = this.fieldsWithCircles[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithPentagons.push(field);
		this.fields[x][y].tower.draw.addEventListener('click', () => {this.onClickPentagon.call(this, this.fields[x][y])})
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deleteCircles[0]]--;
		this.towers[deleteCircles[1]]--;
		this.variantsShow = [];
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
		}
	}

	onClickStayVariant(field, kind, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let xCoord = this.fieldsNewTower[i]['coordinates'][0];
			let yCoord = this.fieldsNewTower[i]['coordinates'][1];
			let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			this.fields[xCoord][yCoord]['tower'] = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
			this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
		}
		this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower ;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithCircles.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
		this.newStones = 0;
		this.status = 'Wave';
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].isAble = false;
		}
	}

	onClickVariantRect(variantRect) {
		this.createVariants.call(this, variantRect.field);
	}

	onClickPentagon(field) {
		if (!(this.towers.pentagonRPS && this.towers.pentagonSBG && this.towers.pentagonGYR)) {
			return;
		}
		this.variantsShow = [];
		let star = new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](
			'star',
			field.tower.draw.getX() - this.settings.fieldSize,
			field.tower.draw.getY(),
			this.settings.variantRadius
		);
		star.draw.addEventListener('click', () => {this.onClickNewStar.call(this, field, this.settings.star)});
		this.variantsShow.push(star);
	}

	onClickNewStar(field, kind) {
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deletePentagons = new Array(...kind.pentagons);
		for (let i = 0; i < deletePentagons.length; i++){
			if (deletePentagons[i] == field.tower.kind.name) {
				deletePentagons.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			let xCoord = this.fieldsWithPentagons[i].coordinates[0];
			let yCoord = this.fieldsWithPentagons[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithPentagons.splice(i, 1);
			}
		}


		this.fields[x][y].tower = new __WEBPACK_IMPORTED_MODULE_5__gameObjects_startower_js__["a" /* default */](kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithStars.push(field);
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[0]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[1]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deletePentagons[0]]--;
		this.towers[deletePentagons[1]]--;
		this.variantsShow = [];

	}

	generateTower(field) {

		let circlePro = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)]

		let circle = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
			circlePro, 
			field['field'].getX() + this.settings.fieldSize / 2,
			field['field'].getY() + this.settings.fieldSize / 2,
			this.settings.fieldSize / 2 - 2
		);
		field.field.setStroke('black');
		field['field'].removeEventListener('click', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('tap', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, field)});
		field['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, field)});

		circle.draw.addEventListener('click', () => { this.createVariants.call(this, field) } ); 
		circle.draw.addEventListener('tap', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;

		if (this.newStones >= this.settings.numberTowersInStep) {
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
				}
			}
			for (let i = 0; i < this.fieldsNewTower.length; i++){
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fields[x][y].field.setStroke('green');
			}
			for (let j = 0; j < this.fieldsNewTower.length; j++) {
				this.towers[this.fieldsNewTower[j].kind.name]++;
				let variants = this.listVariants();
				for (let i = 0; i < variants.length; i++) {
					for (let s = 0; s < 4; s++) {
						for (let t = 0; t < 3; t++) {

							if ((variants[i].name == this.variantRects[s].kind.name) && (this.fieldsNewTower[j].kind.name == variants[i].circles[t])){
								this.variantRects[s].isAble = true;
								this.variantRects[s].field = this.fields[this.fieldsNewTower[j].coordinates[0]][this.fieldsNewTower[j].coordinates[1]]
							}
						}
					}
				}
				this.towers[this.fieldsNewTower[j].kind.name]--;
			}
			for (let i = 0; i < this.variantRects.length; i++) {
				if (this.variantRects[i].isAble) {
					this.variantRects[i].draw.setStroke('green');
					this.variantRects[i].draw.addEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
					this.variantRects[i].draw.addEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
				}
			}
			for (let i = 0; i < 4; i++) {
				this.variantRects[i].isAble = false;
				this.variantRects[i].field = 0;
				this.variantRects[i].draw.setStroke('black');
				this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
				this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});

			}			
		}
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= this.settings.numberTowersInStep)) {
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
					currentNewTower['kind'],
					this.settings.variantX,
					this.settings.variantY,
					this.settings.variantRadius
				);
			};
		};
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]++;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower']['tower'] = 0
		}
		let alfa = 6.28 / (variants.length + 1);
		let beta = alfa;
		let variantX = field['field'].getX() + this.settings.fieldSize / 2 - this.settings.fieldSize;
		let variantY = field['field'].getY() + this.settings.fieldSize / 2;
		for (let i = 0; i < variants.length; i++){
			let variant = new __WEBPACK_IMPORTED_MODULE_4__gameObjects_pentagontower_js__["a" /* default */](
				variants[i],
				variantX,
				variantY,
				this.settings.variantRadius
			);
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('click', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variant.draw.addEventListener('tap', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variantX = field['field'].getX() + this.settings.fieldSize / 2 - Math.cos(beta) * this.settings.fieldSize;
			variantY = field['field'].getY()  + this.settings.fieldSize / 2 - Math.sin(beta) * this.settings.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new __WEBPACK_IMPORTED_MODULE_3__gameObjects_circletower_js__["a" /* default */](
				currentNewTower.kind,
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantStay.draw.addEventListener('click', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			variantStay.draw.addEventListener('tap', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && (!field || (field.tower.kind == this.settings.circleRed) || (field.tower.kind == this.settings.circlePink) || (field.tower.kind == this.settings.circleSad))){
		variants.push(this.settings.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && (!field || (field.tower.kind == this.settings.circleSad) || (field.tower.kind == this.settings.circleBlue) || (field.tower.kind == this.settings.circleGreen))){
			variants.push(this.settings.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && (!field || (field.tower.kind == this.settings.circleGreen) || (field.tower.kind == this.settings.circleYellow) || (field.tower.kind == this.settings.circleRed))){
			variants.push(this.settings.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if (this.fieldsNewTower[i].numberChangesColors > 1) {
				if (this.fieldsNewTower[i].numberChangesColors % 4 === 0) {
					let color = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)].color;
					this.fieldsNewTower[i].draw.setFill(color);
				}
				this.fieldsNewTower[i].numberChangesColors--;
			} else if (this.fieldsNewTower[i].numberChangesColors === 1) {
				let endColor = this.fieldsNewTower[i].kind.color;
				this.fieldsNewTower[i].draw.setFill(endColor);
				this.fieldsNewTower[i].numberChangesColors--;
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fieldsNewTower[i].draw.addEventListener('click', () => { this.createVariants.call(this, this.fields[x][y]) } ); 
			}
		}
	}

	gameWave() {

		if (this.path.length === 0) {
			this.path = this.findPath(this.settings.checkpoints);
		}

		if (this.enemiesNumber < this.settings.numberMonstersInWave) {
			if (this.betweenEnemies > 10) {
				let monster = new __WEBPACK_IMPORTED_MODULE_2__gameObjects_monster_js__["a" /* default */](this.settings.triangl);
				monster.health += this.settings.addHPInWave * (this.wave - 1);
				this.enemies.push(monster);
				this.betweenEnemies = 0;
				for (let i = 0; i < this.fieldsWithCircles.length; i++){
					this.fieldsWithCircles[i].tower.bulletes.push([]);
				}
				this.enemiesNumber++;
			} else {
				this.betweenEnemies++;
			}
		}

		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.enemies.length; j++){
				let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithCircles[i].tower.radiusFight){
					if (this.betweenBulles >= 2) {
						this.fieldsWithCircles[i].tower.fire(j);
						this.betweenBulles = 0;
						break;	
					} else {
						this.betweenBulles++;
					}
					
				};
			};
			for (let j = 0; j < this.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.bulletes[j][s].getY();
					let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.bulletes[j][s].getX();
					if (Math.abs(distX) < this.enemies[j].kind.size && Math.abs(distY) < this.enemies[j].kind.size){
						this.fieldsWithCircles[i].tower.bulletes[j].splice(s, 1);
						this.enemies[j].health -= this.settings.circleTowerDamage;
						continue;
					}
					let stepX = this.settings.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(this.settings.bulletStep * this.settings.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.fieldsWithCircles[i].tower.bulletes[j][s].setX(this.fieldsWithCircles[i].tower.bulletes[j][s].getX() + stepX);
					this.fieldsWithCircles[i].tower.bulletes[j][s].setY(this.fieldsWithCircles[i].tower.bulletes[j][s].getY() + stepY);
				};
			};
		};

		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			this.fieldsWithPentagons[i].tower.bulletes = 0;
			for (let j = 0; j < this.enemies.length; j++) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithPentagons[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithPentagons[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithPentagons[i].tower.radiusFight){
					this.fieldsWithPentagons[i].tower.fire(this.enemies[j]);
					break;
				}
			}
		}

		for (let i = 0; i < this.fieldsWithStars.length; i++) {
			this.fieldsWithStars[i].tower.bulletes = [];
			for (let j = 0; j < this.enemies.length; j++) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithStars[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithStars[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithStars[i].tower.radiusFight){
					this.fieldsWithStars[i].tower.fire(this.enemies[j]);
					break;
				}
			}
			for (let j = this.enemies.length - 1; j >= 0; j--) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithStars[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithStars[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithStars[i].tower.radiusFight){
					this.fieldsWithStars[i].tower.fire(this.enemies[j]);
					break;
				}
			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			let place = this.path[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (this.settings.mapX + place[0] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (this.settings.mapY + place[1] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);

			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			}

			let stepX = this.settings.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(this.settings.monsterStep * this.settings.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);

			if (this.enemies[i].killed) {
				this.enemies.splice(i, 1);
				for (let j = 0; j < this.fieldsWithCircles.length; j++){
					this.fieldsWithCircles[j].tower.bulletes.splice(i, 1);
				}
				i--;
				continue;
			}

			if (this.enemies[i].health <= 0) {
				this.enemies[i].killedTics++;
				this.enemies[i].killed = true;
				this.enemies[i].paintRed();
				this.score++;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].GET_SCORE, {
					score: this.score
				})
			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].numberTurns >= this.path.length) {
				this.enemies.splice(i, 1);
				for (let s = 0; s < this.fieldsWithCircles.length; s++){
					this.fieldsWithCircles[s].tower.bulletes.splice(i, 1);
				}
				i--;
				let damage = this.settings.damage + this.settings.addDamageInWave * (this.wave - 1);
				this.throneHealth -= damage;
				this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].THRONE_DAMAGE, {
					health: (this.throneHealth > 0 ? this.throneHealth : 0)
				})
				if (this.throneHealth <= 0) {
					this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].GAME_FINISHED, {
						score: this.score,
						death: true
					});
				}
			}
		}

		if ((this.enemies.length === 0) && (this.enemiesNumber >= this.settings.numberMonstersInWave)) {
			this.status = 'playerStep';
			this.wave++;
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_9__events_js__["a" /* default */].NEW_WAVE_STARTED, {
				wave: this.wave
			});

			this.enemiesNumber = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					if (this.fields[i][j].tower === 0) {
						this.fields[i][j]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
					}
				}
			}
			for (let i = 0; i < this.fieldsWithCircles.length; i++){
				this.fieldsWithCircles[i].tower.bulletes = [];
			}
			for (let i = 0; i < this.fieldsWithPentagons.length; i++){
				this.fieldsWithPentagons[i].tower.bulletes = 0;
			}
			for (let i = 0; i < this.fieldsWithStars.length; i++){
				this.fieldsWithStars[i].tower.bulletes = [];
			}
			this.path = [];
		}
	}

	findPath(checkpoints) {

		let matrix = Array(this.settings.mapSize);
		for (let i = 0; i < this.settings.mapSize; ++i) {
			matrix[i] = Array(this.settings.mapSize);
		}

		for (let i = 0; i < this.settings.mapSize; ++i) {
			for (let j = 0; j < this.settings.mapSize; ++j) {
				if (this.fields[i][j].tower && this.fields[i][j].tower !== 0) {
					matrix[j][i] = 1;
				} else {
					matrix[j][i] = 0;
				}
			}
		}

		const finder = new __WEBPACK_IMPORTED_MODULE_11_pathfinding___default.a.BiAStarFinder({
			allowDiagonal: true,
			heuristic: __WEBPACK_IMPORTED_MODULE_11_pathfinding___default.a.Heuristic.euclidean
		});

		let path = [];
		for (let i = 1; i < checkpoints.length; i++) {
			let subStart = checkpoints[i - 1];
			let subFinish = checkpoints[i];

			const grid = new __WEBPACK_IMPORTED_MODULE_11_pathfinding___default.a.Grid(matrix);
			let subPath = finder.findPath(subStart[0], subStart[1], subFinish[0], subFinish[1], grid);

			path = path.concat(subPath);
		}

		return(path);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;



/***/ }),
/* 83 */
/***/ (function(module, exports) {



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menu_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_login_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_registration_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_about_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_multiplayer_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_http_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_styles_scss__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__css_styles_scss__);















const http = new __WEBPACK_IMPORTED_MODULE_8__modules_http_js__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_9__modules_router_js__["a" /* default */]();

http.BaseURL = 'https://gem-td-back.herokuapp.com';

router.register('/', new __WEBPACK_IMPORTED_MODULE_0__views_menu_js__["a" /* default */]());
router.register('/login/', new __WEBPACK_IMPORTED_MODULE_1__views_login_js__["a" /* default */]());
router.register('/register/', new __WEBPACK_IMPORTED_MODULE_2__views_registration_js__["a" /* default */]());
router.register('/about/', new __WEBPACK_IMPORTED_MODULE_3__views_about_js__["a" /* default */]());
router.register('/leaders/', new __WEBPACK_IMPORTED_MODULE_4__views_leaderboard_js__["a" /* default */]());
router.register('/game/', new __WEBPACK_IMPORTED_MODULE_5__views_singleplayer_singleplayer_js__["a" /* default */]());
router.register('/multiplayer/', new __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_multiplayer_js__["a" /* default */]());

router.start();

const auth = new __WEBPACK_IMPORTED_MODULE_7__services_authorize_js__["a" /* default */]();


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(4);








class MultiPlayerGame extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'multiplayer__game'
		});
		
		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.get().removeChild(this.back.get());

		this.leftBar = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar',
			align: 'center'
		});
		this.gameField = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		});

		this.createLeftBar();
		this.createQuitWindow();
		this.createFinishWindow();
		this.createConnectionRefusedWindow();

		this.render();
		this.makeListeners();
	}

	createLeftBar() {
		this.quitBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__quit',
			align: 'center'
		});
		this.quitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitButton.get().innerHTML = 'Выйти';

		this.userBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__user',
			align: 'center'
		});
		this.userBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.userBlock_name1 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_sep = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_name2 = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_title.get().innerHTML = 'Игроки: <br>';
		this.userBlock_sep.get().innerHTML = ', ';
		
		this.scoreBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__score'
		});
		this.scoreBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.scoreBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.scoreBlock_title.get().innerHTML = 'Результат: ';
		this.scoreBlock_text.get().innerHTML = '0';
		
		this.waveBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__wave'
		})
		this.waveBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.waveBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.waveBlock_title.get().innerHTML = 'Волна: ';
		this.waveBlock_text.get().innerHTML = '1';

		this.HPBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.HPBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.HPBlock_title.get().innerHTML = 'HP: ';
		this.HPBlock_text.get().innerHTML = '100';
	}

	createQuitWindow() {
		this.quitConfirm = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window',
			align: 'center'
		})
		this.quitText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__text'
		})
		this.quitButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__buttons'
		})
		this.quitText.get().innerHTML = 'Точно выйти?';
		this.quitConfirmButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitConfirmButton.get().innerHTML = 'Точно выйти';
		this.quitCancelButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitCancelButton.get().innerHTML = 'Нет, не точно';
	}

	createFinishWindow() {
		this.finishWindow = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window',
			align: 'center'
		})
		this.finishText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__text'
		})
		this.finishButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__buttons'
		})
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	createConnectionRefusedWindow() {
		this.CRWindow = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window',
			align: 'center'
		})
		this.CRText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__text'
		})
		this.CRButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__buttons'
		})
		this.CRexitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.CRexitButton.get().innerHTML = 'Выйти в меню';
		this.CRagainButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.CRagainButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_GAME_START, (args) => {
			this.userBlock_name2.get().innerHTML = args.ally;
		})

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_CONNECTION_REFUSED, () => {
			this.CRText.get().innerHTML = 'Соединение с сервером разорвано. Игра окончена. Ваш результат: ' + this.scoreBlock_text.get().innerHTML;
			this.get().appendChild(this.CRWindow.get());
		})

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_GAME_FINISHED, (args) => {
			this.finishText.get().innerHTML = 'Игра окончена. </br> Ваш результат: ' + args.score;
			this.get().appendChild(this.finishWindow.get());
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_NEW_WAVE_STARTED, (args) => {
			this.waveBlock_text.get().innerHTML = args.wave;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_GET_SCORE, (args) => {
			this.scoreBlock_text.get().innerHTML = args.score;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_THRONE_DAMAGE, (args) => {
			this.HPBlock_text.get().innerHTML = args.health;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_PLAY_AGAIN, () => {
			this.waveBlock_text.get().innerHTML = 1;
			this.scoreBlock_text.get().innerHTML = 0;
			this.HPBlock_text.get().innerHTML = 100;
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_QUIT_CONFIRMED, {
				score: parseInt((this.scoreBlock_text.get().innerHTML))
			});
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_EXIT_TO_MENU);
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_PLAY_AGAIN);
		})

		this.CRexitButton.on('click', () => {
			this.get().removeChild(this.CRWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_EXIT_TO_MENU);
		})

		this.CRagainButton.on('click', () => {
			this.get().removeChild(this.CRWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_PLAY_AGAIN);
		})
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());

		this.leftBar.get().appendChild(this.quitBlock.get());
		this.leftBar.get().appendChild(this.userBlock.get());
		this.leftBar.get().appendChild(this.scoreBlock.get());
		this.leftBar.get().appendChild(this.waveBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_title.get());
		this.userBlock.get().appendChild(this.userBlock_name1.get());
		this.userBlock.get().appendChild(this.userBlock_sep.get());
		this.userBlock.get().appendChild(this.userBlock_name2.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_title.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_text.get());
		this.waveBlock.get().appendChild(this.waveBlock_title.get());
		this.waveBlock.get().appendChild(this.waveBlock_text.get());
		this.HPBlock.get().appendChild(this.HPBlock_title.get());
		this.HPBlock.get().appendChild(this.HPBlock_text.get());
		
		this.quitBlock.get().appendChild(this.quitButton.get());

		this.quitConfirm.get().appendChild(this.quitText.get());
		this.quitConfirm.get().appendChild(this.quitButtons.get());
		this.quitButtons.get().appendChild(this.quitConfirmButton.get());
		this.quitButtons.get().appendChild(this.quitCancelButton.get());

		this.finishWindow.get().appendChild(this.finishText.get());
		this.finishWindow.get().appendChild(this.finishButtons.get());
		this.finishButtons.get().appendChild(this.exitButton.get());
		this.finishButtons.get().appendChild(this.againButton.get());

		this.CRWindow.get().appendChild(this.CRText.get());
		this.CRWindow.get().appendChild(this.CRButtons.get());
		this.CRButtons.get().appendChild(this.CRexitButton.get());
		this.CRButtons.get().appendChild(this.CRagainButton.get());
	}

	loginSwitch(user) {
		this.userBlock_name1.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiPlayerGame;



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(5);







class MultiPlayerStart extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'multiplayer__start'
		});

		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list',
			align: 'center'
		});
		this.message = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div');
		this.newGame = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button', {
			align: 'center'
		});
		this.newGame.get().innerHTML = 'Найти союзника';

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.newGame.on('click', (event) => {
			event.preventDefault();
			this.message.get().innerHTML = 'Поиск...';
			this.newGame.get().disabled = true;
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_SEARCH);
		})

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_GAME_START, () => {
			this.message.get().innerHTML = '';
			this.newGame.get().disabled = false;
		})

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].MULTIPLAYER_CONNECTION_REFUSED, () => {
			this.message.get().innerHTML = 'Не удалось установить соединение';
			this.newGame.get().disabled = false;
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.message.get());
		this.list.get().appendChild(this.newGame.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiPlayerStart;



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authorize_js__ = __webpack_require__(4);








class SinglePlayerGame extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__game'
		});
		
		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.get().removeChild(this.back.get());

		this.leftBar = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar',
			align: 'center'
		});
		this.gameField = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		});

		this.createLeftBar();
		this.createQuitWindow();
		this.createFinishWindow();

		this.render();
		this.makeListeners();
	}

	createLeftBar() {
		this.quitBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__quit',
			align: 'center'
		});
		this.quitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitButton.get().innerHTML = 'Выйти';

		this.userBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__user',
			align: 'center'
		});
		this.userBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.userBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.userBlock_title.get().innerHTML = 'Игрок: '
		
		this.scoreBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__score'
		});
		this.scoreBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.scoreBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.scoreBlock_title.get().innerHTML = 'Результат: '
		this.scoreBlock_text.get().innerHTML = '0'
		
		this.waveBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__wave'
		})
		this.waveBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.waveBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.waveBlock_title.get().innerHTML = 'Волна: ';
		this.waveBlock_text.get().innerHTML = '1';

		this.HPBlock = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock_title = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('b');
		this.HPBlock_text = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('span');
		this.HPBlock_title.get().innerHTML = 'HP: ';
		this.HPBlock_text.get().innerHTML = '100';
	}

	createQuitWindow() {
		this.quitConfirm = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window',
			align: 'center'
		})
		this.quitText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__text'
		})
		this.quitButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__buttons'
		})
		this.quitText.get().innerHTML = 'Точно выйти?';
		this.quitConfirmButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitConfirmButton.get().innerHTML = 'Точно выйти';
		this.quitCancelButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.quitCancelButton.get().innerHTML = 'Нет, не точно';
	}

	createFinishWindow() {
		this.finishWindow = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window',
			align: 'center'
		})
		this.finishText = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__text'
		})
		this.finishButtons = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'game-window__buttons'
		})
		this.exitButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GAME_FINISHED, (args) => {
			this.finishText.get().innerHTML = 'Игра окончена. </br> Ваш результат: ' + args.score;
			this.get().appendChild(this.finishWindow.get());
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].NEW_WAVE_STARTED, (args) => {
			this.waveBlock_text.get().innerHTML = args.wave;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GET_SCORE, (args) => {
			this.scoreBlock_text.get().innerHTML = args.score;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].THRONE_DAMAGE, (args) => {
			this.HPBlock_text.get().innerHTML = args.health;
		})
		this.mediator.subscribe(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].PLAY_AGAIN, () => {
			this.waveBlock_text.get().innerHTML = 1;
			this.scoreBlock_text.get().innerHTML = 0;
			this.HPBlock_text.get().innerHTML = 100;
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].QUIT_CONFIRMED, {
				score: parseInt((this.scoreBlock_text.get().innerHTML))
			});
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].EXIT_TO_MENU);
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].PLAY_AGAIN);
		})
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());

		this.leftBar.get().appendChild(this.quitBlock.get());
		this.leftBar.get().appendChild(this.userBlock.get());
		this.leftBar.get().appendChild(this.scoreBlock.get());
		this.leftBar.get().appendChild(this.waveBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_title.get());
		this.userBlock.get().appendChild(this.userBlock_text.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_title.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_text.get());
		this.waveBlock.get().appendChild(this.waveBlock_title.get());
		this.waveBlock.get().appendChild(this.waveBlock_text.get());
		this.HPBlock.get().appendChild(this.HPBlock_title.get());
		this.HPBlock.get().appendChild(this.HPBlock_text.get());
		
		this.quitBlock.get().appendChild(this.quitButton.get());

		this.quitConfirm.get().appendChild(this.quitText.get());
		this.quitConfirm.get().appendChild(this.quitButtons.get());
		this.quitButtons.get().appendChild(this.quitConfirmButton.get());
		this.quitButtons.get().appendChild(this.quitCancelButton.get());

		this.finishWindow.get().appendChild(this.finishText.get());
		this.finishWindow.get().appendChild(this.finishButtons.get());
		this.finishButtons.get().appendChild(this.exitButton.get());
		this.finishButtons.get().appendChild(this.againButton.get());
	}

	loginSwitch(user) {
		this.userBlock_text.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerGame;



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_events_js__ = __webpack_require__(5);







class SinglePlayerStart extends __WEBPACK_IMPORTED_MODULE_0__baseview_js__["a" /* default */] {
	constructor() {
		super('div', {
			class: 'singleplayer__start'
		});

		this.mediator = new __WEBPACK_IMPORTED_MODULE_2__game_mediator_js__["a" /* default */]();

		this.padd = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'padd'
		});
		this.list = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('div', {
			class: 'list',
			align: 'center'
		});
		this.newGame = new __WEBPACK_IMPORTED_MODULE_1__components_BaseBlock_baseblock_js__["a" /* default */]('button', {
			align: 'center'
		});
		this.newGame.get().innerHTML = 'Начать игру';

		this.render();
		this.makeListeners();
	}

	makeListeners() {
		this.newGame.on('click', (event) => {
			event.preventDefault();
			this.mediator.emit(__WEBPACK_IMPORTED_MODULE_3__game_events_js__["a" /* default */].GAME_START);
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.newGame.get());
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlayerStart;



/***/ }),
/* 89 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 90 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_konva___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_konva__);



class TowerWave {
	constructor(name, x, y, radius) {
		this.settings = new __WEBPACK_IMPORTED_MODULE_0__settings_js__["a" /* default */]();
		this.draw = new __WEBPACK_IMPORTED_MODULE_1_konva___default.a.Ring({
			x: x,
			y: y,
			innerRadius: radius,
			outerRadius: radius + this.settings.waveWidth,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color
		});
		this.kind = name;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TowerWave;


/***/ })
/******/ ]);