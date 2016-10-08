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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	                    style: style, className: css.transition || '' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkN2JhN2Y3MzlkNWYyODFhMmU4ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxLQUFJLFFBQVEsb0JBQVEsQ0FBUixDQUFaO0FBQ0EsS0FBSSxXQUFXLG9CQUFRLENBQVIsQ0FBZjtBQUNBLEtBQUksT0FBTztBQUNQLFdBRE8sa0JBQ0EsTUFEQSxFQUNnQjtBQUFBLDJDQUFMLElBQUs7QUFBTCxpQkFBSztBQUFBOztBQUNuQixjQUFLLElBQUksSUFBSSxDQUFSLEVBQVcsTUFBTSxLQUFLLE1BQTNCLEVBQW1DLElBQUksR0FBdkMsRUFBNEMsRUFBRSxDQUE5QyxFQUFpRDtBQUM3QyxrQkFBSyxJQUFJLEdBQVQsSUFBZ0IsS0FBSyxDQUFMLENBQWhCLEVBQXlCO0FBQ3JCLHdCQUFPLEdBQVAsSUFBYyxLQUFLLENBQUwsRUFBUSxHQUFSLENBQWQ7QUFDSDtBQUNKO0FBQ0osTUFQTTtBQVFQLE9BUk8sY0FRSixHQVJJLEVBUUMsSUFSRCxFQVFNO0FBQ1QsZ0JBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENB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VyxVQUFVLElBQXhCLEVBQTZCO0FBQ3pCLG1CQUFNLE1BQU47QUFDQTtBQUNIO0FBQ0Qsb0JBQVcsS0FBWCxDQUFpQixhQUFqQixHQUErQixNQUEvQjtBQUNILE1BTkQ7QUFPQSxXQUFNLE1BQU4sR0FBYSxZQUFJO0FBQ2Isb0JBQVcsS0FBWCxDQUFpQixhQUFqQixHQUErQixNQUEvQjtBQUNILE1BRkQ7QUFHQSxZQUFPLEtBQVA7QUFDSDs7QUFFRCxRQUFPLE9BQVAsR0FBaUI7QUFDYiw2QkFEYTtBQUViO0FBRmEsRUFBakIsQzs7Ozs7O0FDcE9BLGdEOzs7Ozs7QUNBQSxnRCIsImZpbGUiOiJwYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBhZ2VyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBhZ2VyXCJdID0gZmFjdG9yeShyb290W1wicmVhY3RcIl0sIHJvb3RbXCJyZWFjdC1kb21cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkN2JhN2Y3MzlkNWYyODFhMmU4ZVxuICoqLyIsImxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5sZXQgdXRpbCA9IHtcclxuICAgIGV4dGVuZCh0YXJnZXQsIC4uLmFyZ3Mpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcmdzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpcyhvYmosIHR5cGUpe1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zcGxpdCgnICcpWzFdLnN1YnN0cigtMjApLnJlcGxhY2UoJ10nLCAnJykudG9Mb3dlckNhc2UoKSA9PT0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBpc09iamVjdChvYmope1xyXG4gICAgICAgIHJldHVybiB1dGlsLmlzKG9iaiwgJ29iamVjdCcpO1xyXG4gICAgfSxcclxuICAgIGlzQXJyYXkob2JqKXtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdhcnJheScpO1xyXG4gICAgfSxcclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdmdW5jdGlvbicpO1xyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzfCQpJywgJ2cnKSwgJyQxJykucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIG11bHRpcGxlIHNwYWNlcyB0byBvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTsgLy8gdHJpbSB0aGUgZW5kc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKlxyXG4gKiBAdHlwZSB7e0lOSVQ6IG51bWJlciwgVE9ORVc6IG51bWJlciwgVE9PTEQ6IG51bWJlcn19XHJcbiAqIDAgbWVhbnMgaW5pdFxyXG4gKi9cclxuY29uc3QgRElSRUNUSU9OID0ge1xyXG4gICAgSU5JVDogMCxcclxuICAgIFRPTkVXOiAtMSxcclxuICAgIFRPT0xEOiAxXHJcbn07XHJcbmNsYXNzIFBhZ2VyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1BhZ2VyRXJyb3InO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIG9wdHNcclxuICogICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uXSDlvZNlbmFibGVBbmltYXRpb249dHJ1ZeW5tuS4lOS8oOWFpeS6hnRyYW5zaXRpb25Hcm91cOacieaViFxyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmJlZm9yZUVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5lbnRlcihlbCxkaXJlY3Rpb24sY2FsbGJhY2sscGFnZSld5Yqo55S757uT5p2f5ZCO6KaB6LCD55SoY2FsbGJhY2tcclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5hZnRlcmVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5iZWZvcmVMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24ubGVhdmUoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgQHBhcmFtIFtvcHRzLmVuYWJsZUFuaW1hdGlvbl0gdHJ1ZeihqOekuuS9v+eUqOWKqOeUu1xyXG4gKiAgICAgICoqKiogZW5hYmxlQW5pbWF0aW9uPXRydWUgJiYg5Lyg5YWl5LqGY3NzVHJhbnNpdGlvbkdyb3VwIOaDheWGteS4i+S8oCAqKioqXHJcbiAqICAgICAgQHBhcmFtIGNzcyBjc3PnsbvlkI3lr7nosaFcclxuICogICAgICAgICAgICAgW2Nzcy50cmFuc2l0aW9uXSDnlKjmnaXmiafooYzov4fmuKHnmoTnsbvlkI3lj6/ku6XmlL7lhaV0cmFuc2lzaW9u5b+F6ZyA55qEY3Nz5bGe5oCnXHJcbiAqICAgICAgICAgICAgIGNzcy5mb3J3YXJkIOato+WQkWNzc+exu+WQjSDpnIDopoHlrp7njrDnsbvlkI0geHh4LWVudGVyIHh4eC1lbnRlci1hY3RpdmUgeHh4LWxlYXZlIHh4eC1sZWF2ZS1hY3RpdmVcclxuICogICAgICAgICAgICAgY3NzLmJhY2t3YXJkIOWPjeWQkWNzc+exu+WQjSDlkI3np7Dop4TliJnlkIxjc3MuZm9yd2FyZFxyXG4gKiAgICAgIEBwYXJhbSBkdXJhdGlvbiDliqjnlLvmjIHnu63ml7bpl7Qg5Y2V5L2NIG1zXHJcbiAqICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqICAgICAgICAgICAgICDliqjnlLvpkqnlrZDlhoXnmoRkaXJlY3Rpb27mmK/nlKjmnaXliKTmlq3pobXpnaLliIfmjaLnmoTmlrnlkJHnmoQgVE9PTETooajnpLrogIHnmoTpobXpnaLopoHlh7rmnaXkuoYgVE9ORVfooajnpLrmlrDpobXpnaLopoHov5vmnaXvvIxJTklUIOihqOekuuWIneWni+WMllxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhZ2VyKG9wdHMgPSB7fSkge1xyXG4gICAgaWYgKG9wdHMuYW5pbWF0aW9uICYmICEob3B0cy50cmFuc2l0aW9uR3JvdXB8fG9wdHMuY3NzVHJhbnNpdGlvbkdyb3VwKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBQYWdlckVycm9yKCd5b3Ugc2hvdWxkIHByb3ZpZGUgUmVhY3RUcmFuc2l0aW9uR3JvdXAgdG8gdHJhbnNpdGlvbkdyb3VwIG9wdGlvbicpO1xyXG4gICAgfVxyXG4gICAgbGV0IFRyYW5zaXRpb25Hcm91cCA9IG9wdHMudHJhbnNpdGlvbkdyb3VwO1xyXG4gICAgbGV0IENzc1RyYW5zaXRpb25Hcm91cCA9IG9wdHMuY3NzVHJhbnNpdGlvbkdyb3VwO1xyXG4gICAgbGV0IGNzcyA9IG9wdHMuY3NzIHx8IHt9O1xyXG4gICAgbGV0IGFuaW1hdGlvbk9iaiA9IG9wdHMuYW5pbWF0aW9uIHx8IHt9O1xyXG4gICAgbGV0IGR1cmF0aW9uID0gdHlwZW9mIG9wdHMuZHVyYXRpb24gIT0gJ3VuZGVmaW5lZCcgPyBvcHRzLmR1cmF0aW9uIDogMzAwO1xyXG4gICAgbGV0IGRpcmVjdGlvbiA9IERJUkVDVElPTi5JTklUO1xyXG4gICAgbGV0IGxvY2tUYXJnZXQ9b3B0cy5sb2NrVGFyZ2V0fHxkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdOy8v6buY6K6k6ZSBYm9keeWFg+e0oFxyXG4gICAgbGV0IENvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOiAnQ29udGFpbmVyJyxcclxuICAgICAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYmVmb3JlRW50ZXIpICYmIG9wdHMuZW5hYmxlQW5pbWF0aW9uICYmIGFuaW1hdGlvbk9iai5iZWZvcmVFbnRlcih0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbEVudGVyKGRvbmUpe1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdmFyIF9kb25lID0gKCk9PiB7XHJcbiAgICAgICAgICAgICAgICBfZG9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmFmdGVyRW50ZXIpICYmIGFuaW1hdGlvbk9iai5hZnRlckVudGVyKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmVudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uT2JqLmVudGVyKHRoaXMuZWwsIGRpcmVjdGlvbiwgX2RvbmUsIHBhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2RvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYWZ0ZXJMZWF2ZSkgJiYgb3B0cy5lbmFibGVBbmltYXRpb24gJiYgYW5pbWF0aW9uT2JqLmFmdGVyTGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxMZWF2ZShkb25lKXtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYmVmb3JlTGVhdmUpICYmIGFuaW1hdGlvbk9iai5iZWZvcmVMZWF2ZSh0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmxlYXZlKSA/IGFuaW1hdGlvbk9iai5sZWF2ZSh0aGlzLmVsLCBkaXJlY3Rpb24sIGRvbmUsIHBhZ2UpIDogZG9uZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj47XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgUGFnZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgbmFtZTogJ1BhZ2VyJyxcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGUoKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4ge3BhZ2U6IG51bGwsIGNvbXBvbmVudDogbnVsbH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VQYWdlKHRoaXMucHJvcHMucGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlUGFnZShuZXh0U3RhdGUucGFnZSB8fCBuZXh0UHJvcHMucGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzd2l0Y2hQYWdlKHBhZ2UsIGNvbXBvbmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcGFnZSxcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jaGFuZ2VQYWdlKHBhZ2Upe1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW2xlbiAtIDFdID09IHBhZ2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdGFjay5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uVE9PTEQ7Ly9vbGQgd2lsbCBkaXNwbGF5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2gocGFnZSk7XHJcbiAgICAgICAgICAgICAgICAvL+aWsOeahOWHuueOsFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLlRPTkVXO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uSU5JVDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICBsZXQgQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmV4dGVuZChzdHlsZSwgdGhpcy5wcm9wcy5zdHlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gPENvbnRhaW5lciBrZXk9e3RoaXMucHJvcHMucGFnZX0gcGFnZT17dGhpcy5wcm9wcy5wYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjc3MudHJhbnNpdGlvbnx8Jyd9PlxyXG4gICAgICAgICAgICAgICAge0NvbXBvbmVudH1cclxuICAgICAgICAgICAgPC9Db250YWluZXI+O1xyXG4gICAgICAgICAgICBpZiAob3B0cy5lbmFibGVBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChDc3NUcmFuc2l0aW9uR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OLlRPTkVXKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNzcy5mb3J3YXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBjc3MuYmFja3dhcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8Q3NzVHJhbnNpdGlvbkdyb3VwIGNvbXBvbmVudD1cImRpdlwiIHRyYW5zaXRpb25OYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVudGVyVGltZW91dD17ZHVyYXRpb259IHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e2R1cmF0aW9ufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2NoaWxkfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ3NzVHJhbnNpdGlvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUcmFuc2l0aW9uR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxUcmFuc2l0aW9uR3JvdXAgY29tcG9uZW50PSdkaXYnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZH1cclxuICAgICAgICAgICAgICAgICAgICA8L1RyYW5zaXRpb25Hcm91cD4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFBhZ2VyLmxvY2s9KCk9PntcclxuICAgICAgICBpZihkaXJlY3Rpb249PURJUkVDVElPTi5JTklUKXtcclxuICAgICAgICAgICAgUGFnZXIudW5sb2NrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9ja1RhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJztcclxuICAgIH07XHJcbiAgICBQYWdlci51bmxvY2s9KCk9PntcclxuICAgICAgICBsb2NrVGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHM9J2F1dG8nO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQYWdlcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGVQYWdlcixcclxuICAgIERJUkVDVElPTlxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZ2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=