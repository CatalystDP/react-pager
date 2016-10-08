webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Created by taddeng on 2016/4/23.
	 */
	
	var wrapper = document.getElementById('container');
	var React = window.React = __webpack_require__(1);
	var ReactDOM = window.ReactDOM = __webpack_require__(29);
	
	var Router = __webpack_require__(161);
	var lock = function lock(el, direction) {
	    if (direction == __webpack_require__(162).DIRECTION.INIT) return;
	    document.body.style.pointerEvents = 'none';
	};
	var unlock = function unlock() {
	    document.body.style.pointerEvents = '';
	};
	var Pager = __webpack_require__(162).createPager({
	    enableAnimation: true,
	    css: {
	        transition: 'pager-slide',
	        forward: 'pager-slide',
	        backward: 'pager-slide-reverse'
	    },
	    animation: {
	        beforeEnter: function beforeEnter(el, direction) {
	            Pager.lock();
	        },
	        afterLeave: function afterLeave() {
	            Pager.unlock();
	        }
	    },
	    cssTransitionGroup: __webpack_require__(164),
	    duration: 400
	});
	var Page1 = __webpack_require__(170),
	    Page2 = __webpack_require__(171);
	var Page3 = __webpack_require__(172);
	function changePage(page, Child) {
	    var child = void 0;
	    if (!Child) {
	        child = null;
	    } else {
	        child = React.createElement(Child, null);
	    }
	    if (!Child) return;
	    // ReactDOM.unmountComponentAtNode(wrapper);
	    ReactDOM.render(React.createElement(Pager, { page: page, component: child }), wrapper);
	    Child = null;
	}
	
	Router.add('page1', function (id, isOld, data) {
	    changePage(id, Page1);
	}).add('page2', function (id, isOld, data) {
	    changePage(id, Page2);
	}).add('page3', function (id, isOld, data) {
	    changePage(id, Page3);
	});
	Router.go('page1');
	var page1 = document.querySelector('#page1'),
	    page2 = document.querySelector('#page2'),
	    page3 = document.querySelector('#page3');
	page1.onclick = function () {
	    changePage('page1', Page1);
	};
	page2.onclick = function () {
	    changePage('page2', Page2);
	};
	page3.onclick = function () {
	    changePage('page3', Page3);
	};

/***/ },

/***/ 161:
/***/ function(module, exports) {

	"use strict";
	
	var _stack = [];
	var Router = {
	    _handlers: {},
	    routes: {},
	    add: function add(id, handler) {
	        this.routes[id] = this.routes[id] || [];
	        this.routes[id].push(handler);
	        return this;
	    },
	    remove: function remove(id) {
	        this.routes[id] = null;
	        return this;
	    },
	    flush: function flush() {
	        this.routes = {};
	        return this;
	    },
	    back: function back() {
	        this.go(_stack[_stack.length - 2]);
	    },
	    go: function go(id, data) {
	        var index = _stack.indexOf(id);
	        if (index != -1) {
	            //表示栈里面有要弹出
	            _stack.splice(index + 1, _stack.length);
	            execute(_stack[_stack.length - 1], true, data);
	        } else {
	            //表示是新进来的组件
	            execute(id, false, data) && _stack.push(id);
	        }
	        return this;
	    }
	};
	function execute(id, isOld) {
	    var r = Router.routes[id];
	    if (!r) return false;
	    for (var i = 0, len = r.length; i < len; ++i) {
	        r[i].apply(null, arguments);
	    }
	    return true;
	}
	module.exports = Router;

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory(__webpack_require__(1), __webpack_require__(29));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Pager"] = factory(require("react"), require("react-dom"));else root["Pager"] = factory(root["react"], root["react-dom"]);
	})(undefined, function (__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
		return (/******/function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};
				/******/
				/******/ // The require function
				/******/function __webpack_require__(moduleId) {
					/******/
					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;
					/******/
					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };
					/******/
					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
					/******/
					/******/ // Flag the module as loaded
					/******/module.loaded = true;
					/******/
					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}
				/******/
				/******/
				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;
				/******/
				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;
				/******/
				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";
				/******/
				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			}(
			/************************************************************************/
			/******/[
			/* 0 */
			/***/function (module, exports, __webpack_require__) {
	
				'use strict';
	
				function _classCallCheck(instance, Constructor) {
					if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
					}
				}
	
				function _possibleConstructorReturn(self, call) {
					if (!self) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
				}
	
				function _inherits(subClass, superClass) {
					if (typeof superClass !== "function" && superClass !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
					}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
				}
	
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
							return React.createElement('div', { style: this.props.style, className: this.props.className }, this.props.children);
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
							var child = React.createElement(Container, { key: this.props.page, page: this.props.page,
								style: style, className: css.transition || '' }, Component);
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
									return React.createElement(CssTransitionGroup, { component: 'div', transitionName: className,
										transitionEnterTimeout: duration, transitionLeaveTimeout: duration }, child);
								} else if (TransitionGroup) {
									return React.createElement(TransitionGroup, { component: 'div', style: style }, child);
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
	
				/***/
			},
			/* 1 */
			/***/function (module, exports) {
	
				module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	
				/***/
			},
			/* 2 */
			/***/function (module, exports) {
	
				module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
				/***/
			}
			/******/])
		);
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(163)(module)))

/***/ },

/***/ 163:
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Created by DP on 2016/7/8.
	 */
	var Router = __webpack_require__(161);
	var React = __webpack_require__(1);
	var Page1 = React.createClass({
	    displayName: 'Page1',
	
	    name: 'page1',
	    render: function render() {
	        var style = {};
	        return React.createElement(
	            'div',
	            { className: 'no-flicker', style: { width: '100%', height: '100%', background: '#efeff4' } },
	            'page1',
	            React.createElement('div', { style: { width: '80%', height: '50%', background: 'red' } })
	        );
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        console.log('page1 will unmount');
	    }
	});
	module.exports = Page1;

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Created by DP on 2016/7/8.
	 */
	var Router = __webpack_require__(161);
	var React = __webpack_require__(1);
	var Page2 = React.createClass({
	    displayName: 'Page2',
	
	    name: 'page2',
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'no-flicker', style: { width: '100%', height: '100%', background: '#efeff4' } },
	            'page2',
	            React.createElement('div', { style: { width: '80%', height: '50%', background: 'blue' } })
	        );
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        console.log('page2 will unmount');
	    }
	});
	module.exports = Page2;

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Created by taddeng on 2016/7/16.
	 */
	/**
	 * Created by DP on 2016/7/8.
	 */
	var Router = __webpack_require__(161);
	var React = __webpack_require__(1);
	var Page2 = React.createClass({
	    displayName: 'Page2',
	
	    name: 'page3',
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'no-flicker', style: { width: '100%', height: '100%', background: '#efeff4' } },
	            'page3',
	            React.createElement('div', { style: { width: '80%', height: '50%', background: 'green' } })
	        );
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        console.log('page2 will unmount');
	    }
	});
	module.exports = Page2;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrOi93ZWJwYWNrL2Jvb3RzdHJhcCBkN2JhN2Y3MzlkNWYyODFhMmU4ZSIsIndlYnBhY2s6Ly8vd2VicGFjazovLy9zcmMvcGFnZXIuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2s6L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vd2VicGFjazovZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UxLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBLEtBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZDtBQUNBLEtBQUksUUFBUSxPQUFPLEtBQVAsR0FBZSxvQkFBUSxDQUFSLENBQTNCO0FBQ0EsS0FBSSxXQUFXLE9BQU8sUUFBUCxHQUFrQixvQkFBUSxFQUFSLENBQWpDOztBQUVBLEtBQUksU0FBUyxvQkFBUSxHQUFSLENBQWI7QUFDQSxLQUFNLE9BQUssU0FBTCxJQUFLLENBQUMsRUFBRCxFQUFJLFNBQUosRUFBZ0I7QUFDdkIsU0FBRyxhQUFXLG9CQUFRLEdBQVIsRUFBaUIsU0FBakIsQ0FBMkIsSUFBekMsRUFBK0M7QUFDL0MsY0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixhQUFwQixHQUFrQyxNQUFsQztBQUNILEVBSEQ7QUFJQSxLQUFNLFNBQU8sU0FBUCxNQUFPLEdBQUk7QUFDYixjQUFTLElBQVQsQ0FBYyxL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Ozs7Ozs7OztBQ3BCQTs7O0FBR0E7OztBQUdBLEtBQUksU0FBTyxvQkFBUSxHQUFSLENBQVg7QUFDQSxLQUFJLFFBQVEsb0JBQVEsQ0FBUixDQUFaO0FBQ0EsS0FBSSxRQUFRLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUN0QixXQUFLLE9BRGlCO0FBRXRCLFdBRnNCLG9CQUVkO0FBQ0osZ0JBQ0k7QUFBQTtBQUFBLGVBQUssV0FBVSxZQUFmLEVBQTRCLE9BQU8sRUFBQyxPQUFNLE1BQVAsRUFBYyxRQUFPLE1BQXJCLEVBQTRCLFlBQVcsU0FBdkMsRUFBbkM7QUFBQTtBQUVJLDBDQUFLLE9BQU8sRUFBQyxPQUFNLEtBQVAsRUFBYSxRQUFPLEtBQXBCLEVBQTBCLFlBQVcsT0FBckMsRUFBWjtBQUZKLFVBREo7QUFNSCxNQVRxQjtBQVV0Qix5QkFWc0Isa0NBVUE7QUFDbEIsaUJBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0g7QUFacUIsRUFBbEIsQ0FBWjtBQWVBLFFBQU8sT0FBUCxHQUFpQixLQUFqQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRhZGRlbmcgb24gMjAxNi80LzIzLlxyXG4gKi9cclxuXHJcbmxldCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG5sZXQgUmVhY3QgPSB3aW5kb3cuUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5sZXQgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuXHJcbmxldCBSb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcicpO1xyXG5jb25zdCBsb2NrPShlbCxkaXJlY3Rpb24pPT57XHJcbiAgICBpZihkaXJlY3Rpb249PXJlcXVpcmUoJ1BhZ2VyJykuRElSRUNUSU9OLklOSVQpIHJldHVybjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSc7XHJcbn07XHJcbmNvbnN0IHVubG9jaz0oKT0+e1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzPScnO1xyXG59O1xyXG5sZXQgUGFnZXIgPSByZXF1aXJlKCdQYWdlcicpLmNyZWF0ZVBhZ2VyKHtcclxuICAgIGVuYWJsZUFuaW1hdGlvbjogdHJ1ZSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIHRyYW5zaXRpb246ICdwYWdlci1zbGlkZScsXHJcbiAgICAgICAgZm9yd2FyZDogJ3BhZ2VyLXNsaWRlJyxcclxuICAgICAgICBiYWNrd2FyZDogJ3BhZ2VyLXNsaWRlLXJldmVyc2UnXHJcbiAgICB9LFxyXG4gICAgYW5pbWF0aW9uOntcclxuICAgICAgICBiZWZvcmVFbnRlcjooZWwsZGlyZWN0aW9uKT0+e1xyXG4gICAgICAgICAgICBQYWdlci5sb2NrKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZnRlckxlYXZlOigpPT57XHJcbiAgICAgICAgICAgIFBhZ2VyLnVubG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjc3NUcmFuc2l0aW9uR3JvdXA6IHJlcXVpcmUoJ1JlYWN0Q3NzVHJhbnNpdGlvbkdyb3VwJyksXHJcbiAgICBkdXJhdGlvbjogNDAwXHJcbn0pO1xyXG5sZXQgUGFnZTEgPSByZXF1aXJlKCcuL3BhZ2UxJyksXHJcbiAgICBQYWdlMiA9IHJlcXVpcmUoJy4vcGFnZTInKTtcclxubGV0IFBhZ2UzPXJlcXVpcmUoJy4vcGFnZTMnKTtcclxuZnVuY3Rpb24gY2hhbmdlUGFnZShwYWdlLCBDaGlsZCkge1xyXG4gICAgbGV0IGNoaWxkO1xyXG4gICAgaWYgKCFDaGlsZCkge1xyXG4gICAgICAgIGNoaWxkID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hpbGQgPSA8Q2hpbGQvPjtcclxuICAgIH1cclxuICAgIGlmICghQ2hpbGQpIHJldHVybjtcclxuICAgIC8vIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUod3JhcHBlcik7XHJcbiAgICBSZWFjdERPTS5yZW5kZXIoPFBhZ2VyIHBhZ2U9e3BhZ2V9IGNvbXBvbmVudD17Y2hpbGR9Lz4sIHdyYXBwZXIpO1xyXG4gICAgQ2hpbGQgPSBudWxsO1xyXG5cclxufVxyXG5cclxuUm91dGVyLmFkZCgncGFnZTEnLCAoaWQsIGlzT2xkLCBkYXRhKT0+IHtcclxuICAgIGNoYW5nZVBhZ2UoaWQsIFBhZ2UxKTtcclxufSkuYWRkKCdwYWdlMicsIChpZCwgaXNPbGQsIGRhdGEpPT4ge1xyXG4gICAgY2hhbmdlUGFnZShpZCwgUGFnZTIpO1xyXG59KS5hZGQoJ3BhZ2UzJywoaWQsaXNPbGQsZGF0YSk9PntcclxuICAgIGNoYW5nZVBhZ2UoaWQsUGFnZTMpO1xyXG59KTtcclxuUm91dGVyLmdvKCdwYWdlMScpO1xyXG5sZXQgcGFnZTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZTEnKSxcclxuICAgIHBhZ2UyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UyJyksXHJcbiAgICBwYWdlMz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZTMnKTtcclxucGFnZTEub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNoYW5nZVBhZ2UoJ3BhZ2UxJywgUGFnZTEpO1xyXG59O1xyXG5wYWdlMi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2hhbmdlUGFnZSgncGFnZTInLCBQYWdlMik7XHJcbn07XHJcbnBhZ2UzLm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuICAgIGNoYW5nZVBhZ2UoJ3BhZ2UzJyxQYWdlMyk7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvaW5kZXguanNcbiAqKi8iLCJcclxudmFyIF9zdGFjayA9IFtdO1xyXG52YXIgUm91dGVyID0ge1xyXG4gICAgX2hhbmRsZXJzOnt9LFxyXG4gICAgcm91dGVzOiB7fSxcclxuICAgIGFkZDogZnVuY3Rpb24gKGlkLCBoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbaWRdID0gdGhpcy5yb3V0ZXNbaWRdIHx8IFtdO1xyXG4gICAgICAgIHRoaXMucm91dGVzW2lkXS5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbaWRdID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBmbHVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVzID0ge307XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ28oX3N0YWNrW19zdGFjay5sZW5ndGggLSAyXSk7XHJcbiAgICB9LFxyXG4gICAgZ286IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IF9zdGFjay5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgLy/ooajnpLrmoIjph4zpnaLmnInopoHlvLnlh7pcclxuICAgICAgICAgICAgX3N0YWNrLnNwbGljZShpbmRleCArIDEsX3N0YWNrLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUoX3N0YWNrW19zdGFjay5sZW5ndGggLSAxXSwgdHJ1ZSwgZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/ooajnpLrmmK/mlrDov5vmnaXnmoTnu4Tku7ZcclxuICAgICAgICAgICAgZXhlY3V0ZShpZCwgZmFsc2UsIGRhdGEpICYmIF9zdGFjay5wdXNoKGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn07XHJcbmZ1bmN0aW9uIGV4ZWN1dGUoaWQsIGlzT2xkKSB7XHJcbiAgICB2YXIgciA9IFJvdXRlci5yb3V0ZXNbaWRdO1xyXG4gICAgaWYgKCFyKSByZXR1cm4gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gci5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHJbaV0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3JvdXRlci5qc1xuICoqLyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlBhZ2VyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBhZ2VyXCJdID0gZmFjdG9yeShyb290W1wicmVhY3RcIl0sIHJvb3RbXCJyZWFjdC1kb21cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ3YmE3ZjczOWQ1ZjI4MWEyZThlXG4gKiovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjazovd2VicGFjay9ib290c3RyYXAgZDdiYTdmNzM5ZDVmMjgxYTJlOGVcbiAqKi8iLCJsZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5sZXQgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxubGV0IHV0aWwgPSB7XHJcbiAgICBleHRlbmQodGFyZ2V0LCAuLi5hcmdzKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJncy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJnc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBhcmdzW2ldW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXMob2JqLCB0eXBlKXtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc3BsaXQoJyAnKVsxXS5zdWJzdHIoLTIwKS5yZXBsYWNlKCddJywgJycpLnRvTG93ZXJDYXNlKCkgPT09IHR5cGU7XHJcbiAgICB9LFxyXG4gICAgaXNPYmplY3Qob2JqKXtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdvYmplY3QnKTtcclxuICAgIH0sXHJcbiAgICBpc0FycmF5KG9iail7XHJcbiAgICAgICAgcmV0dXJuIHV0aWwuaXMob2JqLCAnYXJyYXknKTtcclxuICAgIH0sXHJcbiAgICBpc0Z1bmN0aW9uKG9iail7XHJcbiAgICAgICAgcmV0dXJuIHV0aWwuaXMob2JqLCAnZnVuY3Rpb24nKTtcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXV0aWwuY3NzLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHV0aWwuY3NzLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGNsYXNzTmFtZSArICcoPzpcXFxcc3wkKScsICdnJyksICckMScpLnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBtdWx0aXBsZSBzcGFjZXMgdG8gb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7IC8vIHRyaW0gdGhlIGVuZHNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhY2xhc3NOYW1lICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICpcclxuICogQHR5cGUge3tJTklUOiBudW1iZXIsIFRPTkVXOiBudW1iZXIsIFRPT0xEOiBudW1iZXJ9fVxyXG4gKiAwIG1lYW5zIGluaXRcclxuICovXHJcbmNvbnN0IERJUkVDVElPTiA9IHtcclxuICAgIElOSVQ6IDAsXHJcbiAgICBUT05FVzogLTEsXHJcbiAgICBUT09MRDogMVxyXG59O1xyXG5jbGFzcyBQYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdQYWdlckVycm9yJztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRzXHJcbiAqICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbl0g5b2TZW5hYmxlQW5pbWF0aW9uPXRydWXlubbkuJTkvKDlhaXkuoZ0cmFuc2l0aW9uR3JvdXDmnInmlYhcclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5iZWZvcmVFbnRlcihlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uZW50ZXIoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJlbnRlcihlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYmVmb3JlTGVhdmUoZWwsZGlyZWN0aW9uLHBhZ2UpXVxyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmxlYXZlKGVsLGRpcmVjdGlvbixjYWxsYmFjayxwYWdlKV3liqjnlLvnu5PmnZ/lkI7opoHosIPnlKhjYWxsYmFja1xyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmFmdGVyTGVhdmUoZWwsZGlyZWN0aW9uLHBhZ2UpXVxyXG4gKiAgICAgIEBwYXJhbSBbb3B0cy5lbmFibGVBbmltYXRpb25dIHRydWXooajnpLrkvb/nlKjliqjnlLtcclxuICogICAgICAqKioqIGVuYWJsZUFuaW1hdGlvbj10cnVlICYmIOS8oOWFpeS6hmNzc1RyYW5zaXRpb25Hcm91cCDmg4XlhrXkuIvkvKAgKioqKlxyXG4gKiAgICAgIEBwYXJhbSBjc3MgY3Nz57G75ZCN5a+56LGhXHJcbiAqICAgICAgICAgICAgIFtjc3MudHJhbnNpdGlvbl0g55So5p2l5omn6KGM6L+H5rih55qE57G75ZCN5Y+v5Lul5pS+5YWldHJhbnNpc2lvbuW/hemcgOeahGNzc+WxnuaAp1xyXG4gKiAgICAgICAgICAgICBjc3MuZm9yd2FyZCDmraPlkJFjc3PnsbvlkI0g6ZyA6KaB5a6e546w57G75ZCNIHh4eC1lbnRlciB4eHgtZW50ZXItYWN0aXZlIHh4eC1sZWF2ZSB4eHgtbGVhdmUtYWN0aXZlXHJcbiAqICAgICAgICAgICAgIGNzcy5iYWNrd2FyZCDlj43lkJFjc3PnsbvlkI0g5ZCN56ew6KeE5YiZ5ZCMY3NzLmZvcndhcmRcclxuICogICAgICBAcGFyYW0gZHVyYXRpb24g5Yqo55S75oyB57ut5pe26Ze0IOWNleS9jSBtc1xyXG4gKiAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKiAgICAgICAgICAgICAg5Yqo55S76ZKp5a2Q5YaF55qEZGlyZWN0aW9u5piv55So5p2l5Yik5pat6aG16Z2i5YiH5o2i55qE5pa55ZCR55qEIFRPT0xE6KGo56S66ICB55qE6aG16Z2i6KaB5Ye65p2l5LqGIFRPTkVX6KGo56S65paw6aG16Z2i6KaB6L+b5p2l77yMSU5JVCDooajnpLrliJ3lp4vljJZcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVQYWdlcihvcHRzID0ge30pIHtcclxuICAgIGlmIChvcHRzLmFuaW1hdGlvbiAmJiAhKG9wdHMudHJhbnNpdGlvbkdyb3VwfHxvcHRzLmNzc1RyYW5zaXRpb25Hcm91cCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUGFnZXJFcnJvcigneW91IHNob3VsZCBwcm92aWRlIFJlYWN0VHJhbnNpdGlvbkdyb3VwIHRvIHRyYW5zaXRpb25Hcm91cCBvcHRpb24nKTtcclxuICAgIH1cclxuICAgIGxldCBUcmFuc2l0aW9uR3JvdXAgPSBvcHRzLnRyYW5zaXRpb25Hcm91cDtcclxuICAgIGxldCBDc3NUcmFuc2l0aW9uR3JvdXAgPSBvcHRzLmNzc1RyYW5zaXRpb25Hcm91cDtcclxuICAgIGxldCBjc3MgPSBvcHRzLmNzcyB8fCB7fTtcclxuICAgIGxldCBhbmltYXRpb25PYmogPSBvcHRzLmFuaW1hdGlvbiB8fCB7fTtcclxuICAgIGxldCBkdXJhdGlvbiA9IHR5cGVvZiBvcHRzLmR1cmF0aW9uICE9ICd1bmRlZmluZWQnID8gb3B0cy5kdXJhdGlvbiA6IDMwMDtcclxuICAgIGxldCBkaXJlY3Rpb24gPSBESVJFQ1RJT04uSU5JVDtcclxuICAgIGxldCBsb2NrVGFyZ2V0PW9wdHMubG9ja1RhcmdldHx8ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTsvL+m7mOiupOmUgWJvZHnlhYPntKBcclxuICAgIGxldCBDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhaW5lcicsXHJcbiAgICAgICAgY29tcG9uZW50V2lsbE1vdW50KCl7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmJlZm9yZUVudGVyKSAmJiBvcHRzLmVuYWJsZUFuaW1hdGlvbiAmJiBhbmltYXRpb25PYmouYmVmb3JlRW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxFbnRlcihkb25lKXtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHZhciBfZG9uZSA9ICgpPT4ge1xyXG4gICAgICAgICAgICAgICAgX2RvbmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5hZnRlckVudGVyKSAmJiBhbmltYXRpb25PYmouYWZ0ZXJFbnRlcih0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5lbnRlcikpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbk9iai5lbnRlcih0aGlzLmVsLCBkaXJlY3Rpb24sIF9kb25lLCBwYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9kb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmFmdGVyTGVhdmUpICYmIG9wdHMuZW5hYmxlQW5pbWF0aW9uICYmIGFuaW1hdGlvbk9iai5hZnRlckxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsTGVhdmUoZG9uZSl7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmJlZm9yZUxlYXZlKSAmJiBhbmltYXRpb25PYmouYmVmb3JlTGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5sZWF2ZSkgPyBhbmltYXRpb25PYmoubGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBkb25lLCBwYWdlKSA6IGRvbmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbGV0IFBhZ2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6ICdQYWdlcicsXHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlKCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHtwYWdlOiBudWxsLCBjb21wb25lbnQ6IG51bGx9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlUGFnZSh0aGlzLnByb3BzLnBhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZVBhZ2UobmV4dFN0YXRlLnBhZ2UgfHwgbmV4dFByb3BzLnBhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3dpdGNoUGFnZShwYWdlLCBjb21wb25lbnQpe1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHBhZ2UsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY2hhbmdlUGFnZShwYWdlKXtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuc3RhY2subGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFja1tsZW4gLSAxXSA9PSBwYWdlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3RhY2suaW5kZXhPZihwYWdlKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnNwbGljZShpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLlRPT0xEOy8vb2xkIHdpbGwgZGlzcGxheVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy/mlrDnmoTlh7rnjrBcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERJUkVDVElPTi5UT05FVztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLklOSVQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgbGV0IENvbXBvbmVudCA9IHRoaXMucHJvcHMuY29tcG9uZW50O1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbC5leHRlbmQoc3R5bGUsIHRoaXMucHJvcHMuc3R5bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IDxDb250YWluZXIga2V5PXt0aGlzLnByb3BzLnBhZ2V9IHBhZ2U9e3RoaXMucHJvcHMucGFnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y3NzLnRyYW5zaXRpb258fCcnfT5cclxuICAgICAgICAgICAgICAgIHtDb21wb25lbnR9XHJcbiAgICAgICAgICAgIDwvQ29udGFpbmVyPjtcclxuICAgICAgICAgICAgaWYgKG9wdHMuZW5hYmxlQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3NzVHJhbnNpdGlvbkdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT05FVykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBjc3MuZm9yd2FyZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT04uVE9PTEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY3NzLmJhY2t3YXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENzc1RyYW5zaXRpb25Hcm91cCBjb21wb25lbnQ9XCJkaXZcIiB0cmFuc2l0aW9uTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9e2R1cmF0aW9ufSB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXtkdXJhdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZH1cclxuICAgICAgICAgICAgICAgICAgICA8L0Nzc1RyYW5zaXRpb25Hcm91cD5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVHJhbnNpdGlvbkdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8VHJhbnNpdGlvbkdyb3VwIGNvbXBvbmVudD0nZGl2JyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb21wb25lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBQYWdlci5sb2NrPSgpPT57XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uPT1ESVJFQ1RJT04uSU5JVCl7XHJcbiAgICAgICAgICAgIFBhZ2VyLnVubG9jaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2tUYXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSc7XHJcbiAgICB9O1xyXG4gICAgUGFnZXIudW5sb2NrPSgpPT57XHJcbiAgICAgICAgbG9ja1RhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzPSdhdXRvJztcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFnZXI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlUGFnZXIsXHJcbiAgICBESVJFQ1RJT05cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdlci5qc1xuICoqL1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2s6Ly8vc3JjL3BhZ2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjazovZXh0ZXJuYWwgXCJyZWFjdFwiXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqL1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2s6L2V4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERQIG9uIDIwMTYvNy84LlxyXG4gKi9cclxubGV0IFJvdXRlcj1yZXF1aXJlKCcuL3JvdXRlcicpO1xyXG5sZXQgUmVhY3Q9cmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UxID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgbmFtZToncGFnZTEnLFxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgbGV0IHN0eWxlPXt9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuby1mbGlja2VyXCIgc3R5bGU9e3t3aWR0aDonMTAwJScsaGVpZ2h0OicxMDAlJyxiYWNrZ3JvdW5kOicjZWZlZmY0J319PlxyXG4gICAgICAgICAgICAgICAgcGFnZTFcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDoncmVkJ319PjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygncGFnZTEgd2lsbCB1bm1vdW50Jyk7XHJcbiAgICB9XHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz1QYWdlMTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UxLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRFAgb24gMjAxNi83LzguXHJcbiAqL1xyXG5sZXQgUm91dGVyPXJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBQYWdlMiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOidwYWdlMicsXHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vLWZsaWNrZXJcIiBzdHlsZT17e3dpZHRoOicxMDAlJyxoZWlnaHQ6JzEwMCUnLGJhY2tncm91bmQ6JyNlZmVmZjQnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTJcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzgwJScsaGVpZ2h0Oic1MCUnLGJhY2tncm91bmQ6J2JsdWUnfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGFkZGVuZyBvbiAyMDE2LzcvMTYuXHJcbiAqL1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBEUCBvbiAyMDE2LzcvOC5cclxuICovXHJcbmxldCBSb3V0ZXI9cmVxdWlyZSgnLi9yb3V0ZXInKTtcclxubGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6J3BhZ2UzJyxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tZmxpY2tlclwiIHN0eWxlPXt7d2lkdGg6JzEwMCUnLGhlaWdodDonMTAwJScsYmFja2dyb3VuZDonI2VmZWZmNCd9fT5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlM1xyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDonZ3JlZW4nfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==