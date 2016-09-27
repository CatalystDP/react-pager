(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Pager"] = factory(require("react"), require("react-dom"));
	else
		root["Pager"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var util = {
	    extend: function extend(target) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        for (var i = 0, len = args.length; i < len; ++i) {
	            for (var key in args[i]) {
	                target[key] = args[i][key];
	            }
	        }
	    },
	    is: function is(obj, type) {
	        return Object.prototype.toString.call(obj).split(' ')[1].substr(-20).replace(']', '').toLowerCase() === type;
	    },
	    isObject: function isObject(obj) {
	        return util.is(obj, 'object');
	    },
	    isArray: function isArray(obj) {
	        return util.is(obj, 'array');
	    },
	    isFunction: function isFunction(obj) {
	        return util.is(obj, 'function');
	    },

	    css: {
	        addClass: function addClass(element, className) {
	            if (className) {
	                if (element.classList) {
	                    element.classList.add(className);
	                } else if (!util.css.hasClass(element, className)) {
	                    element.className = element.className + ' ' + className;
	                }
	            }
	            return element;
	        },
	        removeClass: function removeClass(element, className) {
	            if (className) {
	                if (element.classList) {
	                    element.classList.remove(className);
	                } else if (util.css.hasClass(element, className)) {
	                    element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	                    .replace(/^\s*|\s*$/g, ''); // trim the ends
	                }
	            }
	            return element;
	        },
	        hasClass: function hasClass(element, className) {
	            if (element.classList) {
	                return !!className && element.classList.contains(className);
	            }
	            return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	        }
	    }
	};
	/**
	 *
	 * @type {{INIT: number, TONEW: number, TOOLD: number}}
	 * 0 means init
	 */
	var DIRECTION = {
	    INIT: 0,
	    TONEW: -1,
	    TOOLD: 1
	};

	var PagerError = function (_Error) {
	    _inherits(PagerError, _Error);

	    function PagerError(message) {
	        _classCallCheck(this, PagerError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PagerError).call(this, message));

	        _this.name = 'PagerError';
	        return _this;
	    }

	    return PagerError;
	}(Error);

	/**
	 *
	 * @param opts
	 *      @param [opts.animation] 当enableAnimation=true并且传入了transitionGroup有效
	 *             @param [opts.animation.beforeEnter(el,direction,page)]
	 *             @param [opts.animation.enter(el,direction,callback,page)]动画结束后要调用callback
	 *             @param [opts.animation.afterenter(el,direction,page)]
	 *             @param [opts.animation.beforeLeave(el,direction,page)]
	 *             @param [opts.animation.leave(el,direction,callback,page)]动画结束后要调用callback
	 *             @param [opts.animation.afterLeave(el,direction,page)]
	 *      @param [opts.enableAnimation] true表示使用动画
	 *      **** enableAnimation=true && 传入了cssTransitionGroup 情况下传 ****
	 *      @param css css类名对象
	 *             [css.transition] 用来执行过渡的类名可以放入transision必需的css属性
	 *             css.forward 正向css类名 需要实现类名 xxx-enter xxx-enter-active xxx-leave xxx-leave-active
	 *             css.backward 反向css类名 名称规则同css.forward
	 *      @param duration 动画持续时间 单位 ms
	 *      ****************************************
	 * @description 
	 *              动画钩子内的direction是用来判断页面切换的方向的 TOOLD表示老的页面要出来了 TONEW表示新页面要进来，INIT 表示初始化
	 * @returns {*}
	 */


	function createPager() {
	    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (opts.animation && !(opts.transitionGroup || opts.cssTransitionGroup)) {
	        throw new PagerError('you should provide ReactTransitionGroup to transitionGroup option');
	    }
	    var TransitionGroup = opts.transitionGroup;
	    var CssTransitionGroup = opts.cssTransitionGroup;
	    var css = opts.css || {};
	    var animationObj = opts.animation || {};
	    var duration = typeof opts.duration != 'undefined' ? opts.duration : 300;
	    var direction = DIRECTION.INIT;
	    var lockTarget = opts.lockTarget || document.getElementsByTagName('body')[0]; //默认锁body元素
	    var Container = React.createClass({
	        displayName: 'Container',

	        name: 'Container',
	        componentWillMount: function componentWillMount() {},
	        componentDidMount: function componentDidMount() {
	            var page = this.props.page;
	            this.el = ReactDOM.findDOMNode(this);
	            util.isFunction(animationObj.beforeEnter) && opts.enableAnimation && animationObj.beforeEnter(this.el, direction, page);
	        },
	        componentWillEnter: function componentWillEnter(done) {
	            var _this2 = this;

	            var page = this.props.page;
	            var _done2 = function _done() {
	                _done2 = null;
	                done();
	                util.isFunction(animationObj.afterEnter) && animationObj.afterEnter(_this2.el, direction, page);
	            };
	            if (util.isFunction(animationObj.enter)) {
	                animationObj.enter(this.el, direction, _done2, page);
	            } else {
	                _done2();
	            }
	        },
	        componentWillUnmount: function componentWillUnmount() {
	            var page = this.props.page;
	            util.isFunction(animationObj.afterLeave) && opts.enableAnimation && animationObj.afterLeave(this.el, direction, page);
	        },
	        componentWillLeave: function componentWillLeave(done) {
	            var page = this.props.page;
	            util.isFunction(animationObj.beforeLeave) && animationObj.beforeLeave(this.el, direction, page);
	            util.isFunction(animationObj.leave) ? animationObj.leave(this.el, direction, done, page) : done();
	        },
	        render: function render() {
	            return React.createElement(
	                'div',
	                { style: this.props.style, className: this.props.className },
	                this.props.children
	            );
	        }
	    });
	    var Pager = React.createClass({
	        displayName: 'Pager',

	        name: 'Pager',
	        getInitialState: function getInitialState() {
	            this.stack = [];
	            return { page: null, component: null };
	        },
	        componentDidMount: function componentDidMount() {
	            this._changePage(this.props.page);
	        },
	        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	            return this._changePage(nextState.page || nextProps.page);
	        },
	        switchPage: function switchPage(page, component) {
	            this.setState({
	                page: page,
	                component: component
	            });
	        },
	        _changePage: function _changePage(page) {
	            var len = this.stack.length;
	            if (this.stack[len - 1] == page) return false;
	            var index = this.stack.indexOf(page);
	            if (index != -1) {
	                this.stack.splice(index + 1);
	                direction = DIRECTION.TOOLD; //old will display
	            } else {
	                this.stack.push(page);
	                //新的出现
	                direction = DIRECTION.TONEW;
	                if (this.stack.length <= 1) {
	                    direction = DIRECTION.INIT;
	                }
	            }
	            return true;
	        },
	        render: function render() {
	            var Component = this.props.component;
	            var style = {
	                width: '100%',
	                height: '100%',
	                left: 0,
	                right: 0,
	                position: 'absolute'
	            };
	            if (this.props.style) {
	                util.extend(style, this.props.style);
	            }
	            var child = React.createElement(
	                Container,
	                { key: this.props.page, page: this.props.page,
	                    style: style, className: opts.css.transition || '' },
	                Component
	            );
	            if (opts.enableAnimation) {
	                if (CssTransitionGroup) {
	                    var className = void 0;
	                    if (direction == DIRECTION.TONEW) {
	                        className = css.forward;
	                    } else if (direction == DIRECTION.TOOLD) {
	                        className = css.backward;
	                    } else {
	                        className = '';
	                    }
	                    return React.createElement(
	                        CssTransitionGroup,
	                        { component: 'div', transitionName: className,
	                            transitionEnterTimeout: duration, transitionLeaveTimeout: duration },
	                        child
	                    );
	                } else if (TransitionGroup) {
	                    return React.createElement(
	                        TransitionGroup,
	                        { component: 'div', style: style },
	                        child
	                    );
	                } else {
	                    return Component;
	                }
	            } else {
	                return Component;
	            }
	        }
	    });
	    Pager.lock = function () {
	        if (direction == DIRECTION.INIT) {
	            Pager.unlock();
	            return;
	        }
	        lockTarget.style.pointerEvents = 'none';
	    };
	    Pager.unlock = function () {
	        lockTarget.style.pointerEvents = 'auto';
	    };
	    return Pager;
	}

	module.exports = {
	    createPager: createPager,
	    DIRECTION: DIRECTION
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;