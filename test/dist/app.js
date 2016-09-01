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
	var Pager = __webpack_require__(162).createPager({
	    enableAnimation: true,
	    css: {
	        transition: 'pager-slide',
	        forward: 'pager-slide',
	        backward: 'pager-slide-reverse'
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
	
				/******/ // The require function
				/******/function __webpack_require__(moduleId) {
	
					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;
	
					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };
	
					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
					/******/ // Flag the module as loaded
					/******/module.loaded = true;
	
					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}
	
				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;
	
				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;
	
				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";
	
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
	
					if (opts.animation && !opts.transitionGroup) {
						throw new PagerError('you should provide ReactTransitionGroup to transitionGroup option');
					}
					var TransitionGroup = opts.transitionGroup;
					var CssTransitionGroup = opts.cssTransitionGroup;
					var css = opts.css || {};
					var animationObj = opts.animation || {};
					var duration = typeof opts.duration != 'undefined' ? opts.duration : 300;
					var direction = 0;
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
									direction = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9wYWdlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UxLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBLEtBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZDtBQUNBLEtBQUksUUFBUSxPQUFPLEtBQVAsR0FBZSxvQkFBUSxDQUFSLENBQTNCO0FBQ0EsS0FBSSxXQUFXLE9BQU8sUUFBUCxHQUFrQixvQkFBUSxFQUFSLENBQWpDOztBQUVBLEtBQUksU0FBUyxvQkFBUSxHQUFSLENBQWI7QUFDQSxLQUFJLFFBQVEsb0JBQVEsR0FBUixFQUFpQixXQUFqQixDQUE2QjtBQUNyQyxzQkFBaUIsSUFEb0I7QUFFckMsVUFBSztBQUNELHFCQUFZLGFBRFg7QUFFRCxrQkFBUyxhQUZSO0FBR0QsbUJBQVU7QUFIVCxNQUZnQztBQU9yQyx5QkFBb0Isb0JBQVEsR0FBUixDQVBpQjtBQVFyQyxlQUFVO0FBUjJCLEVBQTdCLENBQVo7QUFVQSxLQUFJLFFBQVEsb0JBQVEsR0FBUixDQUFaO0FBQUEsS0FDSSxRQUFRLG9CQUFRLEdBQVIsQ0FEWjtBQUVBLEtBQUksUUFBTSxvQkFBUSxHQUFSLENBQVY7QUFDQSxVQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDN0IsU0FBSSxjQUFKO0FBQ0EsU0FBSSxDQUFDLEtBQUwsRUFBWTtBQUNSLGlCQUFRLElBQVI7QUFDSCxNQUZELE1BRU87QUFDSCxpQkFBUSxvQkFBQyxLQUFELE9BQVI7QUFDSDtBQUNE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SSwwQ0FBSyxPQUFPLEVBQUMsT0FBTSxLQUFQLEVBQWEsUUFBTyxLQUFwQixFQUEwQixZQUFXLE1BQXJDLEVBQVo7QUFGSixVQURKO0FBTUgsTUFUcUI7QUFVdEIseUJBVnNCLGtDQVVBO0FBQ2xCLGlCQUFRLEdBQVIsQ0FBWSxvQkFBWjtBQUNIO0FBWnFCLEVBQWxCLENBQVo7QUFlQSxRQUFPLE9BQVAsR0FBaUIsS0FBakIsQzs7Ozs7Ozs7O0FDcEJBOzs7QUFHQTs7O0FBR0EsS0FBSSxTQUFPLG9CQUFRLEdBQVIsQ0FBWDtBQUNBLEtBQUksUUFBUSxvQkFBUSxDQUFSLENBQVo7QUFDQSxLQUFJLFFBQVEsTUFBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ3RCLFdBQUssT0FEaUI7QUFFdEIsV0FGc0Isb0JBRWQ7QUFDSixnQkFDSTtBQUFBO0FBQUEsZUFBSyxXQUFVLFlBQWYsRUFBNEIsT0FBTyxFQUFDLE9BQU0sTUFBUCxFQUFjLFFBQU8sTUFBckIsRUFBNEIsWUFBVyxTQUF2QyxFQUFuQztBQUFBO0FBRUksMENBQUssT0FBTyxFQUFDLE9BQU0sS0FBUCxFQUFhLFFBQU8sS0FBcEIsRUFBMEIsWUFBVyxPQUFyQyxFQUFaO0FBRkosVUFESjtBQU1ILE1BVHFCO0FBVXRCLHlCQVZzQixrQ0FVQTtBQUNsQixpQkFBUSxHQUFSLENBQVksb0JBQVo7QUFDSDtBQVpxQixFQUFsQixDQUFaO0FBZUEsUUFBTyxPQUFQLEdBQWlCLEtBQWpCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGFkZGVuZyBvbiAyMDE2LzQvMjMuXHJcbiAqL1xyXG5cclxubGV0IHdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbmxldCBSZWFjdCA9IHdpbmRvdy5SZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5cclxubGV0IFJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmxldCBQYWdlciA9IHJlcXVpcmUoJ1BhZ2VyJykuY3JlYXRlUGFnZXIoe1xyXG4gICAgZW5hYmxlQW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3BhZ2VyLXNsaWRlJyxcclxuICAgICAgICBmb3J3YXJkOiAncGFnZXItc2xpZGUnLFxyXG4gICAgICAgIGJhY2t3YXJkOiAncGFnZXItc2xpZGUtcmV2ZXJzZSdcclxuICAgIH0sXHJcbiAgICBjc3NUcmFuc2l0aW9uR3JvdXA6IHJlcXVpcmUoJ1JlYWN0Q3NzVHJhbnNpdGlvbkdyb3VwJyksXHJcbiAgICBkdXJhdGlvbjogNDAwXHJcbn0pO1xyXG5sZXQgUGFnZTEgPSByZXF1aXJlKCcuL3BhZ2UxJyksXHJcbiAgICBQYWdlMiA9IHJlcXVpcmUoJy4vcGFnZTInKTtcclxubGV0IFBhZ2UzPXJlcXVpcmUoJy4vcGFnZTMnKTtcclxuZnVuY3Rpb24gY2hhbmdlUGFnZShwYWdlLCBDaGlsZCkge1xyXG4gICAgbGV0IGNoaWxkO1xyXG4gICAgaWYgKCFDaGlsZCkge1xyXG4gICAgICAgIGNoaWxkID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hpbGQgPSA8Q2hpbGQvPjtcclxuICAgIH1cclxuICAgIGlmICghQ2hpbGQpIHJldHVybjtcclxuICAgIFJlYWN0RE9NLnJlbmRlcig8UGFnZXIgcGFnZT17cGFnZX0gY29tcG9uZW50PXtjaGlsZH0vPiwgd3JhcHBlcik7XHJcbiAgICBDaGlsZCA9IG51bGw7XHJcblxyXG59XHJcblxyXG5Sb3V0ZXIuYWRkKCdwYWdlMScsIChpZCwgaXNPbGQsIGRhdGEpPT4ge1xyXG4gICAgY2hhbmdlUGFnZShpZCwgUGFnZTEpO1xyXG59KS5hZGQoJ3BhZ2UyJywgKGlkLCBpc09sZCwgZGF0YSk9PiB7XHJcbiAgICBjaGFuZ2VQYWdlKGlkLCBQYWdlMik7XHJcbn0pLmFkZCgncGFnZTMnLChpZCxpc09sZCxkYXRhKT0+e1xyXG4gICAgY2hhbmdlUGFnZShpZCxQYWdlMyk7XHJcbn0pO1xyXG5Sb3V0ZXIuZ28oJ3BhZ2UxJyk7XHJcbmxldCBwYWdlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlMScpLFxyXG4gICAgcGFnZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZTInKSxcclxuICAgIHBhZ2UzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlMycpO1xyXG5wYWdlMS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2hhbmdlUGFnZSgncGFnZTEnLCBQYWdlMSk7XHJcbn07XHJcbnBhZ2UyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjaGFuZ2VQYWdlKCdwYWdlMicsIFBhZ2UyKTtcclxufTtcclxucGFnZTMub25jbGljaz1mdW5jdGlvbigpe1xyXG4gICAgY2hhbmdlUGFnZSgncGFnZTMnLFBhZ2UzKTtcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NyYy9pbmRleC5qc1xuICoqLyIsIlxyXG52YXIgX3N0YWNrID0gW107XHJcbnZhciBSb3V0ZXIgPSB7XHJcbiAgICBfaGFuZGxlcnM6e30sXHJcbiAgICByb3V0ZXM6IHt9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoaWQsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSB0aGlzLnJvdXRlc1tpZF0gfHwgW107XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbaWRdLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSB7fTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nbyhfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDJdKTtcclxuICAgIH0sXHJcbiAgICBnbzogZnVuY3Rpb24gKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gX3N0YWNrLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAvL+ihqOekuuagiOmHjOmdouacieimgeW8ueWHulxyXG4gICAgICAgICAgICBfc3RhY2suc3BsaWNlKGluZGV4ICsgMSxfc3RhY2subGVuZ3RoKTtcclxuICAgICAgICAgICAgZXhlY3V0ZShfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDFdLCB0cnVlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+ihqOekuuaYr+aWsOi/m+adpeeahOe7hOS7tlxyXG4gICAgICAgICAgICBleGVjdXRlKGlkLCBmYWxzZSwgZGF0YSkgJiYgX3N0YWNrLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gZXhlY3V0ZShpZCwgaXNPbGQpIHtcclxuICAgIHZhciByID0gUm91dGVyLnJvdXRlc1tpZF07XHJcbiAgICBpZiAoIXIpIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcltpXS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcm91dGVyLmpzXG4gKiovIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJyZWFjdC1kb21cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGFnZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGFnZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJyZWFjdFwiXSwgcm9vdFtcInJlYWN0LWRvbVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cblx0dmFyIFJlYWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblx0dmFyIFJlYWN0RE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0dmFyIHV0aWwgPSB7XG5cdCAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcblx0ICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0ICAgICAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyZ3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3NbaV0pIHtcblx0ICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGlzOiBmdW5jdGlvbiBpcyhvYmosIHR5cGUpIHtcblx0ICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc3BsaXQoJyAnKVsxXS5zdWJzdHIoLTIwKS5yZXBsYWNlKCddJywgJycpLnRvTG93ZXJDYXNlKCkgPT09IHR5cGU7XG5cdCAgICB9LFxuXHQgICAgaXNPYmplY3Q6IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuXHQgICAgICAgIHJldHVybiB1dGlsLmlzKG9iaiwgJ29iamVjdCcpO1xuXHQgICAgfSxcblx0ICAgIGlzQXJyYXk6IGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG5cdCAgICAgICAgcmV0dXJuIHV0aWwuaXMob2JqLCAnYXJyYXknKTtcblx0ICAgIH0sXG5cdCAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuXHQgICAgICAgIHJldHVybiB1dGlsLmlzKG9iaiwgJ2Z1bmN0aW9uJyk7XG5cdCAgICB9LFxuXG5cdCAgICBjc3M6IHtcblx0ICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdCAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc05hbWU7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG5cdCAgICAgICAgfSxcblx0ICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG5cdCAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1dGlsLmNzcy5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHN8JCknLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gbXVsdGlwbGUgc3BhY2VzIHRvIG9uZVxuXHQgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7IC8vIHRyaW0gdGhlIGVuZHNcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcblx0ICAgICAgICB9LFxuXHQgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH07XG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHR5cGUge3tJTklUOiBudW1iZXIsIFRPTkVXOiBudW1iZXIsIFRPT0xEOiBudW1iZXJ9fVxyXG5cdCAqIDAgbWVhbnMgaW5pdFxyXG5cdCAqL1xuXHR2YXIgRElSRUNUSU9OID0ge1xuXHQgICAgSU5JVDogMCxcblx0ICAgIFRPTkVXOiAtMSxcblx0ICAgIFRPT0xEOiAxXG5cdH07XG5cblx0dmFyIFBhZ2VyRXJyb3IgPSBmdW5jdGlvbiAoX0Vycm9yKSB7XG5cdCAgICBfaW5oZXJpdHMoUGFnZXJFcnJvciwgX0Vycm9yKTtcblxuXHQgICAgZnVuY3Rpb24gUGFnZXJFcnJvcihtZXNzYWdlKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhZ2VyRXJyb3IpO1xuXG5cdCAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFBhZ2VyRXJyb3IpLmNhbGwodGhpcywgbWVzc2FnZSkpO1xuXG5cdCAgICAgICAgX3RoaXMubmFtZSA9ICdQYWdlckVycm9yJztcblx0ICAgICAgICByZXR1cm4gX3RoaXM7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBQYWdlckVycm9yO1xuXHR9KEVycm9yKTtcblxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBvcHRzXHJcblx0ICogICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uXVxyXG5cdCAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYmVmb3JlRW50ZXIoZWwsZGlyZWN0aW9uLHBhZ2UpXVxyXG5cdCAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uZW50ZXIoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcblx0ICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5hZnRlcmVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuXHQgKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmJlZm9yZUxlYXZlKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuXHQgKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmxlYXZlKGVsLGRpcmVjdGlvbixjYWxsYmFjayxwYWdlKV3liqjnlLvnu5PmnZ/lkI7opoHosIPnlKhjYWxsYmFja1xyXG5cdCAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcblx0ICogICAgICBAcGFyYW0gW29wdHMuZW5hYmxlQW5pbWF0aW9uXSB0cnVl6KGo56S65L2/55So5Yqo55S7XHJcblx0ICogICAgICAqKioqIGVuYWJsZUFuaW1hdGlvbj10cnVlIOaDheWGteS4i+S8oCAqKioqXHJcblx0ICogICAgICBAcGFyYW0gW29wdHMudHJhbnNpdGlvbl0g5YyF5ZCrdHJhbnNpdGlvbueahOexu+WQjVxyXG5cdCAqICAgICAgQHBhcmFtIG9wdHMuZW50ZXIg6aG16Z2i6L+b5YWl55qE57G75ZCNIOmcgOimgeWunueOsCAueHh4LWVudGVyIC54eHgtZW50ZXItYWN0aXZlIOexu1xyXG5cdCAqICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIEBkZXNjcmlwdGlvbiDlvZPkvKDlhaVhbmltYXRpb27kuYvlkI7lhbbkvZnnmoTkvKDlhaXnmoRjc3MgY2xhc3PlkI3np7Dpg73kuI3kvJrnlJ/mlYhcclxuXHQgKiAgICAgICAgICAgICAg5Yqo55S76ZKp5a2Q5YaF55qEZGlyZWN0aW9u5piv55So5p2l5Yik5pat6aG16Z2i5YiH5o2i55qE5pa55ZCR55qEIFRPT0xE6KGo56S66ICB55qE6aG16Z2i6KaB5Ye65p2l5LqGIFRPTkVX6KGo56S65paw6aG16Z2i6KaB6L+b5p2l77yMSU5JVCDooajnpLrliJ3lp4vljJZcclxuXHQgKiBAcmV0dXJucyB7Kn1cclxuXHQgKi9cblxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVBhZ2VyKCkge1xuXHQgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHQgICAgaWYgKG9wdHMuYW5pbWF0aW9uICYmICFvcHRzLnRyYW5zaXRpb25Hcm91cCkge1xuXHQgICAgICAgIHRocm93IG5ldyBQYWdlckVycm9yKCd5b3Ugc2hvdWxkIHByb3ZpZGUgUmVhY3RUcmFuc2l0aW9uR3JvdXAgdG8gdHJhbnNpdGlvbkdyb3VwIG9wdGlvbicpO1xuXHQgICAgfVxuXHQgICAgdmFyIFRyYW5zaXRpb25Hcm91cCA9IG9wdHMudHJhbnNpdGlvbkdyb3VwO1xuXHQgICAgdmFyIENzc1RyYW5zaXRpb25Hcm91cCA9IG9wdHMuY3NzVHJhbnNpdGlvbkdyb3VwO1xuXHQgICAgdmFyIGNzcyA9IG9wdHMuY3NzIHx8IHt9O1xuXHQgICAgdmFyIGFuaW1hdGlvbk9iaiA9IG9wdHMuYW5pbWF0aW9uIHx8IHt9O1xuXHQgICAgdmFyIGR1cmF0aW9uID0gdHlwZW9mIG9wdHMuZHVyYXRpb24gIT0gJ3VuZGVmaW5lZCcgPyBvcHRzLmR1cmF0aW9uIDogMzAwO1xuXHQgICAgdmFyIGRpcmVjdGlvbiA9IDA7XG5cdCAgICB2YXIgQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHQgICAgICAgIGRpc3BsYXlOYW1lOiAnQ29udGFpbmVyJyxcblxuXHQgICAgICAgIG5hbWU6ICdDb250YWluZXInLFxuXHQgICAgICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge30sXG5cdCAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHQgICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcblx0ICAgICAgICAgICAgdGhpcy5lbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuXHQgICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmJlZm9yZUVudGVyKSAmJiBvcHRzLmVuYWJsZUFuaW1hdGlvbiAmJiBhbmltYXRpb25PYmouYmVmb3JlRW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcblx0ICAgICAgICB9LFxuXHQgICAgICAgIGNvbXBvbmVudFdpbGxFbnRlcjogZnVuY3Rpb24gY29tcG9uZW50V2lsbEVudGVyKGRvbmUpIHtcblx0ICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG5cdCAgICAgICAgICAgIHZhciBfZG9uZTIgPSBmdW5jdGlvbiBfZG9uZSgpIHtcblx0ICAgICAgICAgICAgICAgIF9kb25lMiA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICBkb25lKCk7XG5cdCAgICAgICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmFmdGVyRW50ZXIpICYmIGFuaW1hdGlvbk9iai5hZnRlckVudGVyKF90aGlzMi5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgaWYgKHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouZW50ZXIpKSB7XG5cdCAgICAgICAgICAgICAgICBhbmltYXRpb25PYmouZW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBfZG9uZTIsIHBhZ2UpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgX2RvbmUyKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXHQgICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0ICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG5cdCAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYWZ0ZXJMZWF2ZSkgJiYgb3B0cy5lbmFibGVBbmltYXRpb24gJiYgYW5pbWF0aW9uT2JqLmFmdGVyTGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcblx0ICAgICAgICB9LFxuXHQgICAgICAgIGNvbXBvbmVudFdpbGxMZWF2ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbExlYXZlKGRvbmUpIHtcblx0ICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG5cdCAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYmVmb3JlTGVhdmUpICYmIGFuaW1hdGlvbk9iai5iZWZvcmVMZWF2ZSh0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xuXHQgICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmxlYXZlKSA/IGFuaW1hdGlvbk9iai5sZWF2ZSh0aGlzLmVsLCBkaXJlY3Rpb24sIGRvbmUsIHBhZ2UpIDogZG9uZSgpO1xuXHQgICAgICAgIH0sXG5cdCAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHQgICAgICAgICAgICAgICAgJ2RpdicsXG5cdCAgICAgICAgICAgICAgICB7IHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lIH0sXG5cdCAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICB2YXIgUGFnZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdCAgICAgICAgZGlzcGxheU5hbWU6ICdQYWdlcicsXG5cblx0ICAgICAgICBuYW1lOiAnUGFnZXInLFxuXHQgICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuXHQgICAgICAgICAgICB0aGlzLnN0YWNrID0gW107XG5cdCAgICAgICAgICAgIHJldHVybiB7IHBhZ2U6IG51bGwsIGNvbXBvbmVudDogbnVsbCB9O1xuXHQgICAgICAgIH0sXG5cdCAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHQgICAgICAgICAgICB0aGlzLl9jaGFuZ2VQYWdlKHRoaXMucHJvcHMucGFnZSk7XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlUGFnZShuZXh0U3RhdGUucGFnZSB8fCBuZXh0UHJvcHMucGFnZSk7XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBzd2l0Y2hQYWdlOiBmdW5jdGlvbiBzd2l0Y2hQYWdlKHBhZ2UsIGNvbXBvbmVudCkge1xuXHQgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG5cdCAgICAgICAgICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudFxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9LFxuXHQgICAgICAgIF9jaGFuZ2VQYWdlOiBmdW5jdGlvbiBfY2hhbmdlUGFnZShwYWdlKSB7XG5cdCAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLnN0YWNrLmxlbmd0aDtcblx0ICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2tbbGVuIC0gMV0gPT0gcGFnZSkgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN0YWNrLmluZGV4T2YocGFnZSk7XG5cdCAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5zcGxpY2UoaW5kZXggKyAxKTtcblx0ICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERJUkVDVElPTi5UT09MRDsgLy9vbGQgd2lsbCBkaXNwbGF5XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2gocGFnZSk7XG5cdCAgICAgICAgICAgICAgICAvL+aWsOeahOWHuueOsFxuXHQgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLlRPTkVXO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoIDw9IDEpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAwO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH0sXG5cdCAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdCAgICAgICAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLnByb3BzLmNvbXBvbmVudDtcblx0ICAgICAgICAgICAgdmFyIHN0eWxlID0ge1xuXHQgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcblx0ICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuXHQgICAgICAgICAgICAgICAgbGVmdDogMCxcblx0ICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuXHQgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUpIHtcblx0ICAgICAgICAgICAgICAgIHV0aWwuZXh0ZW5kKHN0eWxlLCB0aGlzLnByb3BzLnN0eWxlKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgY2hpbGQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHQgICAgICAgICAgICAgICAgQ29udGFpbmVyLFxuXHQgICAgICAgICAgICAgICAgeyBrZXk6IHRoaXMucHJvcHMucGFnZSwgcGFnZTogdGhpcy5wcm9wcy5wYWdlLFxuXHQgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZSwgY2xhc3NOYW1lOiBvcHRzLmNzcy50cmFuc2l0aW9uIHx8ICcnIH0sXG5cdCAgICAgICAgICAgICAgICBDb21wb25lbnRcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgaWYgKG9wdHMuZW5hYmxlQW5pbWF0aW9uKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoQ3NzVHJhbnNpdGlvbkdyb3VwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT05FVykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBjc3MuZm9yd2FyZDtcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT04uVE9PTEQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY3NzLmJhY2t3YXJkO1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICcnO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0ICAgICAgICAgICAgICAgICAgICAgICAgQ3NzVHJhbnNpdGlvbkdyb3VwLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB7IGNvbXBvbmVudDogJ2RpdicsIHRyYW5zaXRpb25OYW1lOiBjbGFzc05hbWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRW50ZXJUaW1lb3V0OiBkdXJhdGlvbiwgdHJhbnNpdGlvbkxlYXZlVGltZW91dDogZHVyYXRpb24gfSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRcblx0ICAgICAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChUcmFuc2l0aW9uR3JvdXApIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0ICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbkdyb3VwLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB7IGNvbXBvbmVudDogJ2RpdicsIHN0eWxlOiBzdHlsZSB9LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFxuXHQgICAgICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21wb25lbnQ7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gQ29tcG9uZW50O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICByZXR1cm4gUGFnZXI7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIGNyZWF0ZVBhZ2VyOiBjcmVhdGVQYWdlcixcblx0ICAgIERJUkVDVElPTjogRElSRUNUSU9OXG5cdH07XG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZGlzdC9wYWdlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRFAgb24gMjAxNi83LzguXHJcbiAqL1xyXG5sZXQgUm91dGVyPXJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmxldCBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpO1xyXG5sZXQgUGFnZTEgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBuYW1lOidwYWdlMScsXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBsZXQgc3R5bGU9e31cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vLWZsaWNrZXJcIiBzdHlsZT17e3dpZHRoOicxMDAlJyxoZWlnaHQ6JzEwMCUnLGJhY2tncm91bmQ6JyNlZmVmZjQnfX0+XHJcbiAgICAgICAgICAgICAgICBwYWdlMVxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOic4MCUnLGhlaWdodDonNTAlJyxiYWNrZ3JvdW5kOidyZWQnfX0+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwYWdlMSB3aWxsIHVubW91bnQnKTtcclxuICAgIH1cclxufSk7XHJcbm1vZHVsZS5leHBvcnRzPVBhZ2UxO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcGFnZTEuanNcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBEUCBvbiAyMDE2LzcvOC5cclxuICovXHJcbmxldCBSb3V0ZXI9cmVxdWlyZSgnLi9yb3V0ZXInKTtcclxubGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6J3BhZ2UyJyxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tZmxpY2tlclwiIHN0eWxlPXt7d2lkdGg6JzEwMCUnLGhlaWdodDonMTAwJScsYmFja2dyb3VuZDonI2VmZWZmNCd9fT5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlMlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDonYmx1ZSd9fT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZTIgd2lsbCB1bm1vdW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2UyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcGFnZTIuanNcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSB0YWRkZW5nIG9uIDIwMTYvNy8xNi5cclxuICovXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERQIG9uIDIwMTYvNy84LlxyXG4gKi9cclxubGV0IFJvdXRlcj1yZXF1aXJlKCcuL3JvdXRlcicpO1xyXG5sZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5sZXQgUGFnZTIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgbmFtZToncGFnZTMnLFxyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuby1mbGlja2VyXCIgc3R5bGU9e3t3aWR0aDonMTAwJScsaGVpZ2h0OicxMDAlJyxiYWNrZ3JvdW5kOicjZWZlZmY0J319PlxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UzXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOic4MCUnLGhlaWdodDonNTAlJyxiYWNrZ3JvdW5kOidncmVlbid9fT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZTIgd2lsbCB1bm1vdW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2UyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcGFnZTMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9