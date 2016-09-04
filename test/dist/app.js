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
	    *      @param [opts.animation]
	    *             @param [opts.animation.beforeEnter(el,direction,page)]
	    *             @param [opts.animation.enter(el,direction,callback,page)]动画结束后要调用callback
	    *             @param [opts.animation.afterenter(el,direction,page)]
	    *             @param [opts.animation.beforeLeave(el,direction,page)]
	    *             @param [opts.animation.leave(el,direction,callback,page)]动画结束后要调用callback
	    *             @param [opts.animation.afterLeave(el,direction,page)]
	    *      @param [opts.enableAnimation] true表示使用动画
	    *      **** enableAnimation=true 情况下传 ****
	    *      @param [opts.transition] 包含transition的类名
	    *      @param opts.enter 页面进入的类名 需要实现 .xxx-enter .xxx-enter-active 类
	    *      ****************************************
	    * @description 当传入animation之后其余的传入的css class名称都不会生效
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
								style: style, className: opts.css.transition || '' }, Component);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrOi93ZWJwYWNrL2Jvb3RzdHJhcCAwNDI2YWMyZWZhYjdmOGFlYzczZiIsIndlYnBhY2s6Ly8vd2VicGFjazovLy9zcmMvcGFnZXIuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2s6L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vd2VicGFjazovZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UxLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBLEtBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZDtBQUNBLEtBQUksUUFBUSxPQUFPLEtBQVAsR0FBZSxvQkFBUSxDQUFSLENBQTNCO0FBQ0EsS0FBSSxXQUFXLE9BQU8sUUFBUCxHQUFrQixvQkFBUSxFQUFSLENBQWpDOztBQUVBLEtBQUksU0FBUyxvQkFBUSxHQUFSLENBQWI7QUFDQSxLQUFNLE9BQUssU0FBTCxJQUFLLENBQUMsRUFBRCxFQUFJLFNBQUosRUFBZ0I7QUFDdkIsU0FBRyxhQUFXLG9CQUFRLEdBQVIsRUFBaUIsU0FBakIsQ0FBMkIsSUFBekMsRUFBK0M7QUFDL0MsY0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixhQUFwQixHQUFrQyxNQUFsQztBQUNILEVBSEQ7QUFJQSxLQUFNLFNBQU8sU0FBUCxNQUFPLEdBQUk7QUFDYixjQUFTLElBQVQsQ0FBYyxL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Qzs7Ozs7Ozs7O0FDcEJBOzs7QUFHQTs7O0FBR0EsS0FBSSxTQUFPLG9CQUFRLEdBQVIsQ0FBWDtBQUNBLEtBQUksUUFBUSxvQkFBUSxDQUFSLENBQVo7QUFDQSxLQUFJLFFBQVEsTUFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ3RCLFdBQUssT0FEaUI7QUFFdEIsV0FGc0Isb0JBRWQ7QUFDSixnQkFDSTtBQUFBO0FBQUEsZUFBSyxXQUFVLFlBQWYsRUFBNEIsT0FBTyxFQUFDLE9BQU0sTUFBUCxFQUFjLFFBQU8sTUFBckIsRUFBNEIsWUFBVyxTQUF2QyxFQUFuQztBQUFBO0FBRUksMENBQUssT0FBTyxFQUFDLE9BQU0sS0FBUCxFQUFhLFFBQU8sS0FBcEIsRUFBMEIsWUFBVyxPQUFyQyxFQUFaO0FBRkosVUFESjtBQU1ILE1BVHFCO0FBVXRCLHlCQVZzQixrQ0FVQTtBQUNsQixpQkFBUSxHQUFSLENBQVksb0JBQVo7QUFDSDtBQVpxQixFQUFsQixDQUFaO0FBZUEsUUFBTyxPQUFQLEdBQWlCLEtBQWpCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGFkZGVuZyBvbiAyMDE2LzQvMjMuXHJcbiAqL1xyXG5cclxubGV0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbmxldCBSZWFjdCA9IHdpbmRvdy5SZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5cclxubGV0IFJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmNvbnN0IGxvY2s9KGVsLGRpcmVjdGlvbik9PntcclxuICAgIGlmKGRpcmVjdGlvbj09cmVxdWlyZSgnUGFnZXInKS5ESVJFQ1RJT04uSU5JVCkgcmV0dXJuO1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzPSdub25lJztcclxufTtcclxuY29uc3QgdW5sb2NrPSgpPT57XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHM9Jyc7XHJcbn07XHJcbmxldCBQYWdlciA9IHJlcXVpcmUoJ1BhZ2VyJykuY3JlYXRlUGFnZXIoe1xyXG4gICAgZW5hYmxlQW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3BhZ2VyLXNsaWRlJyxcclxuICAgICAgICBmb3J3YXJkOiAncGFnZXItc2xpZGUnLFxyXG4gICAgICAgIGJhY2t3YXJkOiAncGFnZXItc2xpZGUtcmV2ZXJzZSdcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb246e1xyXG4gICAgICAgIGJlZm9yZUVudGVyOihlbCxkaXJlY3Rpb24pPT57XHJcbiAgICAgICAgICAgIFBhZ2VyLmxvY2soKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFmdGVyTGVhdmU6KCk9PntcclxuICAgICAgICAgICAgUGFnZXIudW5sb2NrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNzc1RyYW5zaXRpb25Hcm91cDogcmVxdWlyZSgnUmVhY3RDc3NUcmFuc2l0aW9uR3JvdXAnKSxcclxuICAgIGR1cmF0aW9uOiA0MDBcclxufSk7XHJcbmxldCBQYWdlMSA9IHJlcXVpcmUoJy4vcGFnZTEnKSxcclxuICAgIFBhZ2UyID0gcmVxdWlyZSgnLi9wYWdlMicpO1xyXG5sZXQgUGFnZTM9cmVxdWlyZSgnLi9wYWdlMycpO1xyXG5mdW5jdGlvbiBjaGFuZ2VQYWdlKHBhZ2UsIENoaWxkKSB7XHJcbiAgICBsZXQgY2hpbGQ7XHJcbiAgICBpZiAoIUNoaWxkKSB7XHJcbiAgICAgICAgY2hpbGQgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjaGlsZCA9IDxDaGlsZC8+O1xyXG4gICAgfVxyXG4gICAgaWYgKCFDaGlsZCkgcmV0dXJuO1xyXG4gICAgLy8gUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh3cmFwcGVyKTtcclxuICAgIFJlYWN0RE9NLnJlbmRlcig8UGFnZXIgcGFnZT17cGFnZX0gY29tcG9uZW50PXtjaGlsZH0vPiwgd3JhcHBlcik7XHJcbiAgICBDaGlsZCA9IG51bGw7XHJcblxyXG59XHJcblxyXG5Sb3V0ZXIuYWRkKCdwYWdlMScsIChpZCwgaXNPbGQsIGRhdGEpPT4ge1xyXG4gICAgY2hhbmdlUGFnZShpZCwgUGFnZTEpO1xyXG59KS5hZGQoJ3BhZ2UyJywgKGlkLCBpc09sZCwgZGF0YSk9PiB7XHJcbiAgICBjaGFuZ2VQYWdlKGlkLCBQYWdlMik7XHJcbn0pLmFkZCgncGFnZTMnLChpZCxpc09sZCxkYXRhKT0+e1xyXG4gICAgY2hhbmdlUGFnZShpZCxQYWdlMyk7XHJcbn0pO1xyXG5Sb3V0ZXIuZ28oJ3BhZ2UxJyk7XHJcbmxldCBwYWdlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlMScpLFxyXG4gICAgcGFnZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZTInKSxcclxuICAgIHBhZ2UzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlMycpO1xyXG5wYWdlMS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2hhbmdlUGFnZSgncGFnZTEnLCBQYWdlMSk7XHJcbn07XHJcbnBhZ2UyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGFuZ2VQYWdlKCdwYWdlMicsIFBhZ2UyKTtcclxufTtcclxucGFnZTMub25jbGljaz1mdW5jdGlvbigpe1xyXG4gICAgY2hhbmdlUGFnZSgncGFnZTMnLFBhZ2UzKTtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NyYy9pbmRleC5qc1xuICoqLyIsIlxyXG52YXIgX3N0YWNrID0gW107XHJcbnZhciBSb3V0ZXIgPSB7XHJcbiAgICBfaGFuZGxlcnM6e30sXHJcbiAgICByb3V0ZXM6IHt9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoaWQsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSB0aGlzLnJvdXRlc1tpZF0gfHwgW107XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbaWRdLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSB7fTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nbyhfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDJdKTtcclxuICAgIH0sXHJcbiAgICBnbzogZnVuY3Rpb24gKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gX3N0YWNrLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAvL+ihqOekuuagiOmHjOmdouacieimgeW8ueWHulxyXG4gICAgICAgICAgICBfc3RhY2suc3BsaWNlKGluZGV4ICsgMSxfc3RhY2subGVuZ3RoKTtcclxuICAgICAgICAgICAgZXhlY3V0ZShfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDFdLCB0cnVlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+ihqOekuuaYr+aWsOi/m+adpeeahOe7hOS7tlxyXG4gICAgICAgICAgICBleGVjdXRlKGlkLCBmYWxzZSwgZGF0YSkgJiYgX3N0YWNrLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gZXhlY3V0ZShpZCwgaXNPbGQpIHtcclxuICAgIHZhciByID0gUm91dGVyLnJvdXRlc1tpZF07XHJcbiAgICBpZiAoIXIpIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcltpXS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcm91dGVyLmpzXG4gKiovIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGFnZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGFnZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJyZWFjdFwiXSwgcm9vdFtcInJlYWN0LWRvbVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi9cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDQyNmFjMmVmYWI3ZjhhZWM3M2ZcbiAqKi9cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrOi93ZWJwYWNrL2Jvb3RzdHJhcCAwNDI2YWMyZWZhYjdmOGFlYzczZlxuICoqLyIsImxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5sZXQgdXRpbCA9IHtcclxuICAgIGV4dGVuZCh0YXJnZXQsIC4uLmFyZ3Mpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcmdzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpcyhvYmosIHR5cGUpe1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zcGxpdCgnICcpWzFdLnN1YnN0cigtMjApLnJlcGxhY2UoJ10nLCAnJykudG9Mb3dlckNhc2UoKSA9PT0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBpc09iamVjdChvYmope1xyXG4gICAgICAgIHJldHVybiB1dGlsLmlzKG9iaiwgJ29iamVjdCcpO1xyXG4gICAgfSxcclxuICAgIGlzQXJyYXkob2JqKXtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdhcnJheScpO1xyXG4gICAgfSxcclxuICAgIGlzRnVuY3Rpb24ob2JqKXtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdmdW5jdGlvbicpO1xyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzfCQpJywgJ2cnKSwgJyQxJykucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIG11bHRpcGxlIHNwYWNlcyB0byBvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTsgLy8gdHJpbSB0aGUgZW5kc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKlxyXG4gKiBAdHlwZSB7e0lOSVQ6IG51bWJlciwgVE9ORVc6IG51bWJlciwgVE9PTEQ6IG51bWJlcn19XHJcbiAqIDAgbWVhbnMgaW5pdFxyXG4gKi9cclxuY29uc3QgRElSRUNUSU9OID0ge1xyXG4gICAgSU5JVDogMCxcclxuICAgIFRPTkVXOiAtMSxcclxuICAgIFRPT0xEOiAxXHJcbn07XHJcbmNsYXNzIFBhZ2VyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1BhZ2VyRXJyb3InO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIG9wdHNcclxuICogICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uXVxyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmJlZm9yZUVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5lbnRlcihlbCxkaXJlY3Rpb24sY2FsbGJhY2sscGFnZSld5Yqo55S757uT5p2f5ZCO6KaB6LCD55SoY2FsbGJhY2tcclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5hZnRlcmVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5iZWZvcmVMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24ubGVhdmUoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgQHBhcmFtIFtvcHRzLmVuYWJsZUFuaW1hdGlvbl0gdHJ1ZeihqOekuuS9v+eUqOWKqOeUu1xyXG4gKiAgICAgICoqKiogZW5hYmxlQW5pbWF0aW9uPXRydWUg5oOF5Ya15LiL5LygICoqKipcclxuICogICAgICBAcGFyYW0gW29wdHMudHJhbnNpdGlvbl0g5YyF5ZCrdHJhbnNpdGlvbueahOexu+WQjVxyXG4gKiAgICAgIEBwYXJhbSBvcHRzLmVudGVyIOmhtemdoui/m+WFpeeahOexu+WQjSDpnIDopoHlrp7njrAgLnh4eC1lbnRlciAueHh4LWVudGVyLWFjdGl2ZSDnsbtcclxuICogICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBkZXNjcmlwdGlvbiDlvZPkvKDlhaVhbmltYXRpb27kuYvlkI7lhbbkvZnnmoTkvKDlhaXnmoRjc3MgY2xhc3PlkI3np7Dpg73kuI3kvJrnlJ/mlYhcclxuICogICAgICAgICAgICAgIOWKqOeUu+mSqeWtkOWGheeahGRpcmVjdGlvbuaYr+eUqOadpeWIpOaWremhtemdouWIh+aNoueahOaWueWQkeeahCBUT09MROihqOekuuiAgeeahOmhtemdouimgeWHuuadpeS6hiBUT05FV+ihqOekuuaWsOmhtemdouimgei/m+adpe+8jElOSVQg6KGo56S65Yid5aeL5YyWXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUGFnZXIob3B0cyA9IHt9KSB7XHJcbiAgICBpZiAob3B0cy5hbmltYXRpb24gJiYgIShvcHRzLnRyYW5zaXRpb25Hcm91cHx8b3B0cy5jc3NUcmFuc2l0aW9uR3JvdXApKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFBhZ2VyRXJyb3IoJ3lvdSBzaG91bGQgcHJvdmlkZSBSZWFjdFRyYW5zaXRpb25Hcm91cCB0byB0cmFuc2l0aW9uR3JvdXAgb3B0aW9uJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgVHJhbnNpdGlvbkdyb3VwID0gb3B0cy50cmFuc2l0aW9uR3JvdXA7XHJcbiAgICBsZXQgQ3NzVHJhbnNpdGlvbkdyb3VwID0gb3B0cy5jc3NUcmFuc2l0aW9uR3JvdXA7XHJcbiAgICBsZXQgY3NzID0gb3B0cy5jc3MgfHwge307XHJcbiAgICBsZXQgYW5pbWF0aW9uT2JqID0gb3B0cy5hbmltYXRpb24gfHwge307XHJcbiAgICBsZXQgZHVyYXRpb24gPSB0eXBlb2Ygb3B0cy5kdXJhdGlvbiAhPSAndW5kZWZpbmVkJyA/IG9wdHMuZHVyYXRpb24gOiAzMDA7XHJcbiAgICBsZXQgZGlyZWN0aW9uID0gRElSRUNUSU9OLklOSVQ7XHJcbiAgICBsZXQgbG9ja1RhcmdldD1vcHRzLmxvY2tUYXJnZXR8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07Ly/pu5jorqTplIFib2R55YWD57SgXHJcbiAgICBsZXQgQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6ICdDb250YWluZXInLFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5iZWZvcmVFbnRlcikgJiYgb3B0cy5lbmFibGVBbmltYXRpb24gJiYgYW5pbWF0aW9uT2JqLmJlZm9yZUVudGVyKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsRW50ZXIoZG9uZSl7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB2YXIgX2RvbmUgPSAoKT0+IHtcclxuICAgICAgICAgICAgICAgIF9kb25lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYWZ0ZXJFbnRlcikgJiYgYW5pbWF0aW9uT2JqLmFmdGVyRW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouZW50ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25PYmouZW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBfZG9uZSwgcGFnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfZG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5hZnRlckxlYXZlKSAmJiBvcHRzLmVuYWJsZUFuaW1hdGlvbiAmJiBhbmltYXRpb25PYmouYWZ0ZXJMZWF2ZSh0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbExlYXZlKGRvbmUpe1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5iZWZvcmVMZWF2ZSkgJiYgYW5pbWF0aW9uT2JqLmJlZm9yZUxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmoubGVhdmUpID8gYW5pbWF0aW9uT2JqLmxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgZG9uZSwgcGFnZSkgOiBkb25lKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBQYWdlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOiAnUGFnZXInLFxyXG4gICAgICAgIGdldEluaXRpYWxTdGF0ZSgpe1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB7cGFnZTogbnVsbCwgY29tcG9uZW50OiBudWxsfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVBhZ2UodGhpcy5wcm9wcy5wYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VQYWdlKG5leHRTdGF0ZS5wYWdlIHx8IG5leHRQcm9wcy5wYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aXRjaFBhZ2UocGFnZSwgY29tcG9uZW50KXtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwYWdlLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NoYW5nZVBhZ2UocGFnZSl7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLnN0YWNrLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2tbbGVuIC0gMV0gPT0gcGFnZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnN0YWNrLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFjay5zcGxpY2UoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERJUkVDVElPTi5UT09MRDsvL29sZCB3aWxsIGRpc3BsYXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChwYWdlKTtcclxuICAgICAgICAgICAgICAgIC8v5paw55qE5Ye6546wXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uVE9ORVc7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERJUkVDVElPTi5JTklUO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIGxldCBDb21wb25lbnQgPSB0aGlzLnByb3BzLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHV0aWwuZXh0ZW5kKHN0eWxlLCB0aGlzLnByb3BzLnN0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSA8Q29udGFpbmVyIGtleT17dGhpcy5wcm9wcy5wYWdlfSBwYWdlPXt0aGlzLnByb3BzLnBhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e29wdHMuY3NzLnRyYW5zaXRpb258fCcnfT5cclxuICAgICAgICAgICAgICAgIHtDb21wb25lbnR9XHJcbiAgICAgICAgICAgIDwvQ29udGFpbmVyPjtcclxuICAgICAgICAgICAgaWYgKG9wdHMuZW5hYmxlQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ3NzVHJhbnNpdGlvbkdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT05FVykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBjc3MuZm9yd2FyZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT04uVE9PTEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY3NzLmJhY2t3YXJkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENzc1RyYW5zaXRpb25Hcm91cCBjb21wb25lbnQ9XCJkaXZcIiB0cmFuc2l0aW9uTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9e2R1cmF0aW9ufSB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXtkdXJhdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZH1cclxuICAgICAgICAgICAgICAgICAgICA8L0Nzc1RyYW5zaXRpb25Hcm91cD5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVHJhbnNpdGlvbkdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8VHJhbnNpdGlvbkdyb3VwIGNvbXBvbmVudD0nZGl2JyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2l0aW9uR3JvdXA+KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb21wb25lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBQYWdlci5sb2NrPSgpPT57XHJcbiAgICAgICAgaWYoZGlyZWN0aW9uPT1ESVJFQ1RJT04uSU5JVCl7XHJcbiAgICAgICAgICAgIFBhZ2VyLnVubG9jaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2tUYXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cz0nbm9uZSc7XHJcbiAgICB9O1xyXG4gICAgUGFnZXIudW5sb2NrPSgpPT57XHJcbiAgICAgICAgbG9ja1RhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzPSdhdXRvJztcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFnZXI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY3JlYXRlUGFnZXIsXHJcbiAgICBESVJFQ1RJT05cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdlci5qc1xuICoqL1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2s6Ly8vc3JjL3BhZ2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjazovZXh0ZXJuYWwgXCJyZWFjdFwiXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqL1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2s6L2V4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERQIG9uIDIwMTYvNy84LlxyXG4gKi9cclxubGV0IFJvdXRlcj1yZXF1aXJlKCcuL3JvdXRlcicpO1xyXG5sZXQgUmVhY3Q9cmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UxID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgbmFtZToncGFnZTEnLFxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgbGV0IHN0eWxlPXt9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuby1mbGlja2VyXCIgc3R5bGU9e3t3aWR0aDonMTAwJScsaGVpZ2h0OicxMDAlJyxiYWNrZ3JvdW5kOicjZWZlZmY0J319PlxyXG4gICAgICAgICAgICAgICAgcGFnZTFcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDoncmVkJ319PjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygncGFnZTEgd2lsbCB1bm1vdW50Jyk7XHJcbiAgICB9XHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz1QYWdlMTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UxLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRFAgb24gMjAxNi83LzguXHJcbiAqL1xyXG5sZXQgUm91dGVyPXJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBQYWdlMiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOidwYWdlMicsXHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vLWZsaWNrZXJcIiBzdHlsZT17e3dpZHRoOicxMDAlJyxoZWlnaHQ6JzEwMCUnLGJhY2tncm91bmQ6JyNlZmVmZjQnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTJcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzgwJScsaGVpZ2h0Oic1MCUnLGJhY2tncm91bmQ6J2JsdWUnfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGFkZGVuZyBvbiAyMDE2LzcvMTYuXHJcbiAqL1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBEUCBvbiAyMDE2LzcvOC5cclxuICovXHJcbmxldCBSb3V0ZXI9cmVxdWlyZSgnLi9yb3V0ZXInKTtcclxubGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6J3BhZ2UzJyxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tZmxpY2tlclwiIHN0eWxlPXt7d2lkdGg6JzEwMCUnLGhlaWdodDonMTAwJScsYmFja2dyb3VuZDonI2VmZWZmNCd9fT5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlM1xyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDonZ3JlZW4nfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==