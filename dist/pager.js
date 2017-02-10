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
	    function Wrap(props) {
	        return React.createElement(
	            'div',
	            { style: { width: '100%', height: '100%' } },
	            props.children
	        );
	    }
	    var WRAPCLASS = 'pager-wrap';
	    var Pager = React.createClass({
	        displayName: 'Pager',
	
	        name: 'Pager',
	        getInitialState: function getInitialState() {
	            this.direction = DIRECTION.INIT;
	            this._isAnimating = false;
	            this._animationTimeoutQueue = [];
	            this._animationQueue = [];
	            this.stack = [];
	            this.pageStack = []; //save React Component 
	            return {};
	        },
	        componentWillMount: function componentWillMount() {
	            // if (!this.props.initPage||!this.props.initComponent) {
	            //     throw Error('props Error');
	            // }
	        },
	        componentDidMount: function componentDidMount() {
	            this.el = this.refs.container;
	            // this._changePage(this.props.initPage, this.props.initComponent);
	        },
	        animate: function animate(target, cssProps, time, callback, easingFunc) {
	            target.style.transition = 'all ' + time + 's';
	            var timout = setTimeout(function () {
	                callback();
	            }, time * 1000 + 25);
	            this.enqueueTimeout(setTimeout(function () {
	                util.extend(target.style, cssProps);
	            }, 25));
	            this.enqueueTimeout(timout);
	        },
	        animateDone: function animateDone(curNode) {
	            console.log('animate done');
	            this._isAnimating = false;
	            this.hide(curNode);
	            this.clearTimeQueue();
	            this._dequeue();
	        },
	        stopAnimate: function stopAnimate() {
	            if (!this._isAnimating) return;
	            console.log('animate stop');
	            this.clearTimeQueue();
	            this._isAnimating = false;
	        },
	        enqueueTimeout: function enqueueTimeout(timeout) {
	            this._animationTimeoutQueue.push(timeout);
	        },
	        clearTimeQueue: function clearTimeQueue() {
	            while (this._animationTimeoutQueue.length > 0) {
	                var t = this._animationTimeoutQueue.pop();
	                clearTimeout(t);
	            }
	        },
	
	        /**
	         * @done 当前动画执行完回调
	         */
	        startAnimation: function startAnimation(done) {
	            var _this3 = this;
	
	            this._animationQueue.push({
	                direction: this.direction,
	                fn: function fn(direction) {
	
	                    if (util.isFunction(_this3.props.onAnimate)) {
	                        var children = _this3.getChildren();
	                        var len = children.length;
	                        var cur = void 0,
	                            next = void 0;
	                        if (direction == DIRECTION.TONEW) {
	                            cur = children[len - 2];
	                            next = children[len - 1];
	                        } else if (direction == DIRECTION.TOOLD) {
	                            cur = children[len - 1];
	                            next = children[len - 2];
	                        }
	                        direction != DIRECTION.INIT ? _this3.props.onAnimate.apply(_this3, [cur, next, _this3.animateDone.bind(_this3, cur), direction]) : function () {
	                            this._dequeue();this._isAnimating = false;
	                        }.bind(_this3)();
	                    }
	                }
	            });
	            if (this._animationQueue.length === 1) {
	                this._dequeue();
	                //动画队列里只有一个时，直接执行
	            }
	        },
	        _dequeue: function _dequeue() {
	            if (this._animationQueue.length == 0) return;
	            if (this._isAnimating) return; //当前动画执行完才行继续执行
	            this._isAnimating = true;
	            var t = this._animationQueue.shift();
	            t.fn(t.direction);
	        },
	        navigateTo: function navigateTo(page, component) {
	            this._changePage(page, component);
	        },
	        _getStackTop: function _getStackTop() {
	            var len = this.stack.length;
	            return len - 1;
	        },
	        _changePage: function _changePage(page, Component) {
	            var len = this.stack.length;
	            if (this.stack[len - 1] == page) return false;
	            var index = this.stack.indexOf(page);
	            this.stopAnimate();
	            if (index != -1) {
	                var cArr = this.stack.splice(index + 1);
	                // let cArr = this.pageStack.splice(index + 1);
	                this._popCurPage(index + 1);
	                this.direction = DIRECTION.TOOLD; //old will display
	            } else {
	                this.stack.push(page);
	                // this.pageStack.push(Component);
	                //新的出现
	                this.direction = DIRECTION.TONEW;
	                if (this.stack.length <= 1) {
	                    this.direction = DIRECTION.INIT;
	                }
	                this._addNewPage(Component);
	            }
	            return true;
	        },
	        getChildren: function getChildren() {
	            return this.el.querySelectorAll('.' + WRAPCLASS);
	        },
	        getLastChild: function getLastChild() {
	            var children = this.getChildren();
	            var len = children.length;
	            if (len == 0) return null;
	            return children[len - 1];
	        },
	        hide: function hide(node) {
	            if (node) {
	                node.style.display = 'none';
	            }
	        },
	        show: function show(node) {
	            if (node) {
	                node.style.removeProperty('display');
	            }
	        },
	        _popCurPage: function _popCurPage(index) {
	            //index  以及之后child element 全部删掉
	            var children = this.getChildren(),
	                len = children.length - 1;
	            for (; index < len; ++index) {
	                this.el.removeChild(children[index]);
	                ReactDOM.unmountComponentAtNode(children[index]);
	            }
	            //动画的dom为 当前移走,index-1移入
	            children = this.getChildren();
	            var oldToShow = children[children.length - 2];
	            var lastChild = this.getLastChild();
	            try {
	                ReactDOM.unmountComponentAtNode(lastChild);
	            } catch (e) {}
	            this.el.removeChild(this.getLastChild());
	            this.show(oldToShow);
	            lastChild = null;
	        },
	        _addNewPage: function _addNewPage(Component) {
	            var _this4 = this;
	
	            var div = document.createElement('div');
	            div.className = WRAPCLASS;
	            div.style.width = '100%';
	            div.style.height = '100%';
	            util.extend(div.style, this.props.wrapStyle || {});
	            var w = React.createElement(
	                Wrap,
	                null,
	                Component
	            );
	            ReactDOM.render(w, div);
	            var lastChild = this.getLastChild();
	            if (this.props.enableAnimation && util.isFunction(this.props.onBeforeAnimation)) {
	                this.props.onBeforeAnimation.call(this, lastChild, div, this.direction);
	            }
	            this.el.appendChild(div);
	            var hideLast = function hideLast() {
	                if (lastChild) {
	                    _this4.hide(lastChild);
	                }
	            };
	            if (this.props.enableAnimation) {
	                this.startAnimation();
	            } else {
	                hideLast();
	            }
	        },
	        render: function render() {
	
	            return React.createElement('div', { ref: 'container', style: { width: '100%', height: '100%' } });
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
	    Pager.Animation = React.createClass({
	        displayName: 'Animation',
	
	        name: 'Pager.Animation',
	
	        _copyComponentList: function _copyComponentList() {
	            this.list = this.props.children.slice(0);
	        },
	        componentWillMount: function componentWillMount() {
	            this._queue = [];
	            this.type = this.props.type;
	            this._copyComponentList();
	        },
	        componentDidMount: function componentDidMount() {
	            this.startAnimation();
	        },
	        componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	            //开始判断当前lsit 和下次的
	        },
	        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	            this.startAnimation();
	        },
	        render: function render() {
	            return React.createElement(
	                'div',
	                { ref: "container", style: { width: '100%', height: '100%' } },
	                this.props.children
	            );
	        }
	    });
	    Pager.DIRECTION = DIRECTION;
	    Pager.Animation.type = {
	        ENTER: 1,
	        LEAVE: -1
	    };
	    return Pager;
	}
	
	module.exports = {
	    createPager: createPager
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0ZmJkOGYxZTQ5MjRhOWU3YmNmMiIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb21cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxLQUFJLFFBQVEsb0JBQVEsQ0FBUixDQUFaO0FBQ0EsS0FBSSxXQUFXLG9CQUFRLENBQVIsQ0FBZjtBQUNBLEtBQUksT0FBTztBQUNQLFdBRE8sa0JBQ0EsTUFEQSxFQUNpQjtBQUFBLDJDQUFOLElBQU07QUFBTixpQkFBTTtBQUFBOztBQUNwQixjQUFLLElBQUksSUFBSSxDQUFSLEVBQVcsTUFBTSxLQUFLLE1BQTNCLEVBQW1DLElBQUksR0FBdkMsRUFBNEMsRUFBRSxDQUE5QyxFQUFpRDtBQUM3QyxrQkFBSyxJQUFJLEdBQVQsSUFBZ0IsS0FBSyxDQUFMLENBQWhCLEVBQXlCO0FBQ3JCLHdCQUFPLEdBQVAsSUFBYyxLQUFLLENBQUwsRUFBUSxHQUFSLENBQWQ7QUFDSDtBQUNKO0FBQ0osTUFQTTtBQVFQLE9BUk8sY0FRSixHQVJJLEVBUUMsSUFSRCxFQVFPO0FBQ1YsZ0JBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENB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SyxNQUFMLEdBQWMsRUFBZDtBQUNBLGtCQUFLLElBQUwsR0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUF2QjtBQUNBLGtCQUFLLGtCQUFMO0FBQ0gsVUFWK0I7QUFXaEMsMEJBWGdDLCtCQVdaO0FBQ2hCLGtCQUFLLGNBQUw7QUFDSCxVQWIrQjtBQWVoQyw0QkFmZ0MsK0JBZVosU0FmWSxFQWVELFNBZkMsRUFlVTtBQUN0QztBQUNILFVBakIrQjtBQWtCaEMsMkJBbEJnQyw4QkFrQmIsU0FsQmEsRUFrQkYsU0FsQkUsRUFrQlM7QUFDckMsa0JBQUssY0FBTDtBQUNILFVBcEIrQjtBQXFCaEMsZUFyQmdDLG9CQXFCdkI7QUFDTCxvQkFDSTtBQUFBO0FBQUEsbUJBQUssS0FBSyxXQUFWLEVBQXVCLE9BQU8sRUFBRSxPQUFPLE1BQVQsRUFBaUIsUUFBUSxNQUF6QixFQUE5QjtBQUFrRSxzQkFBSyxLQUFMLENBQVc7QUFBN0UsY0FESjtBQUdIO0FBekIrQixNQUFsQixDQUFsQjtBQTJCQSxXQUFNLFNBQU4sR0FBa0IsU0FBbEI7QUFDQSxXQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsR0FBdUI7QUFDbkIsZ0JBQU8sQ0FEWTtBQUVuQixnQkFBTyxDQUFDO0FBRlcsTUFBdkI7QUFJQSxZQUFPLEtBQVA7QUFDSDs7QUFFRCxRQUFPLE9BQVAsR0FBaUI7QUFDYjtBQURhLEVBQWpCLEM7Ozs7OztBQ2hYQSxnRDs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoicGFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInJlYWN0LWRvbVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJQYWdlclwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQYWdlclwiXSA9IGZhY3Rvcnkocm9vdFtcInJlYWN0XCJdLCByb290W1wicmVhY3QtZG9tXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNGZiZDhmMWU0OTI0YTllN2JjZjJcbiAqKi8iLCJsZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5sZXQgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxubGV0IHV0aWwgPSB7XHJcbiAgICBleHRlbmQodGFyZ2V0LCAuLi5hcmdzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyZ3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3NbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gYXJnc1tpXVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGlzKG9iaiwgdHlwZSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zcGxpdCgnICcpWzFdLnN1YnN0cigtMjApLnJlcGxhY2UoJ10nLCAnJykudG9Mb3dlckNhc2UoKSA9PT0gdHlwZTtcclxuICAgIH0sXHJcbiAgICBpc09iamVjdChvYmopIHtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdvYmplY3QnKTtcclxuICAgIH0sXHJcbiAgICBpc0FycmF5KG9iaikge1xyXG4gICAgICAgIHJldHVybiB1dGlsLmlzKG9iaiwgJ2FycmF5Jyk7XHJcbiAgICB9LFxyXG4gICAgaXNGdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdmdW5jdGlvbicpO1xyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXV0aWwuY3NzLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1dGlsLmNzcy5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHN8JCknLCAnZycpLCAnJDEnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gbXVsdGlwbGUgc3BhY2VzIHRvIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpOyAvLyB0cmltIHRoZSBlbmRzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFjbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKlxyXG4gKiBAdHlwZSB7e0lOSVQ6IG51bWJlciwgVE9ORVc6IG51bWJlciwgVE9PTEQ6IG51bWJlcn19XHJcbiAqIDAgbWVhbnMgaW5pdFxyXG4gKi9cclxuY29uc3QgRElSRUNUSU9OID0ge1xyXG4gICAgSU5JVDogMCxcclxuICAgIFRPTkVXOiAtMSxcclxuICAgIFRPT0xEOiAxXHJcbn07XHJcbmNsYXNzIFBhZ2VyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1BhZ2VyRXJyb3InO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIG9wdHNcclxuICogICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uXSDlvZNlbmFibGVBbmltYXRpb249dHJ1ZeW5tuS4lOS8oOWFpeS6hnRyYW5zaXRpb25Hcm91cOacieaViFxyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmJlZm9yZUVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5lbnRlcihlbCxkaXJlY3Rpb24sY2FsbGJhY2sscGFnZSld5Yqo55S757uT5p2f5ZCO6KaB6LCD55SoY2FsbGJhY2tcclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5hZnRlcmVudGVyKGVsLGRpcmVjdGlvbixwYWdlKV1cclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5iZWZvcmVMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24ubGVhdmUoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJMZWF2ZShlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgQHBhcmFtIFtvcHRzLmVuYWJsZUFuaW1hdGlvbl0gdHJ1ZeihqOekuuS9v+eUqOWKqOeUu1xyXG4gKiAgICAgICoqKiogZW5hYmxlQW5pbWF0aW9uPXRydWUgJiYg5Lyg5YWl5LqGY3NzVHJhbnNpdGlvbkdyb3VwIOaDheWGteS4i+S8oCAqKioqXHJcbiAqICAgICAgQHBhcmFtIGNzcyBjc3PnsbvlkI3lr7nosaFcclxuICogICAgICAgICAgICAgW2Nzcy50cmFuc2l0aW9uXSDnlKjmnaXmiafooYzov4fmuKHnmoTnsbvlkI3lj6/ku6XmlL7lhaV0cmFuc2lzaW9u5b+F6ZyA55qEY3Nz5bGe5oCnXHJcbiAqICAgICAgICAgICAgIGNzcy5mb3J3YXJkIOato+WQkWNzc+exu+WQjSDpnIDopoHlrp7njrDnsbvlkI0geHh4LWVudGVyIHh4eC1lbnRlci1hY3RpdmUgeHh4LWxlYXZlIHh4eC1sZWF2ZS1hY3RpdmVcclxuICogICAgICAgICAgICAgY3NzLmJhY2t3YXJkIOWPjeWQkWNzc+exu+WQjSDlkI3np7Dop4TliJnlkIxjc3MuZm9yd2FyZFxyXG4gKiAgICAgIEBwYXJhbSBkdXJhdGlvbiDliqjnlLvmjIHnu63ml7bpl7Qg5Y2V5L2NIG1zXHJcbiAqICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqICAgICAgICAgICAgICDliqjnlLvpkqnlrZDlhoXnmoRkaXJlY3Rpb27mmK/nlKjmnaXliKTmlq3pobXpnaLliIfmjaLnmoTmlrnlkJHnmoQgVE9PTETooajnpLrogIHnmoTpobXpnaLopoHlh7rmnaXkuoYgVE9ORVfooajnpLrmlrDpobXpnaLopoHov5vmnaXvvIxJTklUIOihqOekuuWIneWni+WMllxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhZ2VyKG9wdHMgPSB7fSkge1xyXG4gICAgbGV0IFRyYW5zaXRpb25Hcm91cCA9IG9wdHMudHJhbnNpdGlvbkdyb3VwO1xyXG4gICAgbGV0IENzc1RyYW5zaXRpb25Hcm91cCA9IG9wdHMuY3NzVHJhbnNpdGlvbkdyb3VwO1xyXG4gICAgbGV0IGNzcyA9IG9wdHMuY3NzIHx8IHt9O1xyXG4gICAgbGV0IGFuaW1hdGlvbk9iaiA9IG9wdHMuYW5pbWF0aW9uIHx8IHt9O1xyXG4gICAgbGV0IGR1cmF0aW9uID0gdHlwZW9mIG9wdHMuZHVyYXRpb24gIT0gJ3VuZGVmaW5lZCcgPyBvcHRzLmR1cmF0aW9uIDogMzAwO1xyXG4gICAgbGV0IGRpcmVjdGlvbiA9IERJUkVDVElPTi5JTklUO1xyXG4gICAgbGV0IGxvY2tUYXJnZXQgPSBvcHRzLmxvY2tUYXJnZXQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTsvL+m7mOiupOmUgWJvZHnlhYPntKBcclxuICAgIGxldCBDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhaW5lcicsXHJcbiAgICAgICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYmVmb3JlRW50ZXIpICYmIG9wdHMuZW5hYmxlQW5pbWF0aW9uICYmIGFuaW1hdGlvbk9iai5iZWZvcmVFbnRlcih0aGlzLmVsLCBkaXJlY3Rpb24sIHBhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbEVudGVyKGRvbmUpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHZhciBfZG9uZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIF9kb25lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYWZ0ZXJFbnRlcikgJiYgYW5pbWF0aW9uT2JqLmFmdGVyRW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouZW50ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25PYmouZW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBfZG9uZSwgcGFnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfZG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmouYWZ0ZXJMZWF2ZSkgJiYgb3B0cy5lbmFibGVBbmltYXRpb24gJiYgYW5pbWF0aW9uT2JqLmFmdGVyTGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxMZWF2ZShkb25lKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmJlZm9yZUxlYXZlKSAmJiBhbmltYXRpb25PYmouYmVmb3JlTGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5sZWF2ZSkgPyBhbmltYXRpb25PYmoubGVhdmUodGhpcy5lbCwgZGlyZWN0aW9uLCBkb25lLCBwYWdlKSA6IGRvbmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIFdyYXAocHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJyB9fT57cHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICB9XHJcbiAgICBjb25zdCBXUkFQQ0xBU1MgPSAncGFnZXItd3JhcCc7XHJcbiAgICBsZXQgUGFnZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgbmFtZTogJ1BhZ2VyJyxcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRElSRUNUSU9OLklOSVQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVvdXRRdWV1ZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25RdWV1ZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVN0YWNrID0gW107Ly9zYXZlIFJlYWN0IENvbXBvbmVudCBcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgICAgICAvLyBpZiAoIXRoaXMucHJvcHMuaW5pdFBhZ2V8fCF0aGlzLnByb3BzLmluaXRDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRocm93IEVycm9yKCdwcm9wcyBFcnJvcicpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbCA9IHRoaXMucmVmcy5jb250YWluZXI7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2NoYW5nZVBhZ2UodGhpcy5wcm9wcy5pbml0UGFnZSwgdGhpcy5wcm9wcy5pbml0Q29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGUodGFyZ2V0LCBjc3NQcm9wcywgdGltZSwgY2FsbGJhY2ssIGVhc2luZ0Z1bmMpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb24gPSBgYWxsICR7dGltZX1zYDtcclxuICAgICAgICAgICAgbGV0IHRpbW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgdGltZSAqIDEwMDAgKyAyNSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5xdWV1ZVRpbWVvdXQoc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmV4dGVuZCh0YXJnZXQuc3R5bGUsIGNzc1Byb3BzKTtcclxuICAgICAgICAgICAgfSwgMjUpKTtcclxuICAgICAgICAgICAgdGhpcy5lbnF1ZXVlVGltZW91dCh0aW1vdXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5pbWF0ZURvbmUoY3VyTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0ZSBkb25lJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZShjdXJOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVRdWV1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZXF1ZXVlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wQW5pbWF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0FuaW1hdGluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0ZSBzdG9wJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUXVldWUoKTtcclxuICAgICAgICAgICAgdGhpcy5faXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVucXVldWVUaW1lb3V0KHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uVGltZW91dFF1ZXVlLnB1c2godGltZW91dCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhclRpbWVRdWV1ZSgpIHtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2FuaW1hdGlvblRpbWVvdXRRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IHRoaXMuX2FuaW1hdGlvblRpbWVvdXRRdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRvbmUg5b2T5YmN5Yqo55S75omn6KGM5a6M5Zue6LCDXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhcnRBbmltYXRpb24oZG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25RdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBmbjogKGRpcmVjdGlvbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25BbmltYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXIsIG5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OLlRPTkVXKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBjaGlsZHJlbltsZW4gLSAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBjaGlsZHJlbltsZW4gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OLlRPT0xEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBjaGlsZHJlbltsZW4gLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBjaGlsZHJlbltsZW4gLSAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gIT0gRElSRUNUSU9OLklOSVQgPyB0aGlzLnByb3BzLm9uQW5pbWF0ZS5hcHBseSh0aGlzLCBbY3VyLCBuZXh0LCB0aGlzLmFuaW1hdGVEb25lLmJpbmQodGhpcywgY3VyKSwgZGlyZWN0aW9uXSkgOiAoZnVuY3Rpb24gKCkgeyB0aGlzLl9kZXF1ZXVlKCk7IHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7IH0uYmluZCh0aGlzKSkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uUXVldWUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+WKqOeUu+mYn+WIl+mHjOWPquacieS4gOS4quaXtu+8jOebtOaOpeaJp+ihjFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZGVxdWV1ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvblF1ZXVlLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0FuaW1hdGluZykgcmV0dXJuOy8v5b2T5YmN5Yqo55S75omn6KGM5a6M5omN6KGM57un57ut5omn6KGMXHJcbiAgICAgICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLl9hbmltYXRpb25RdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICB0LmZuKHQuZGlyZWN0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hdmlnYXRlVG8ocGFnZSwgY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVBhZ2UocGFnZSwgY29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9nZXRTdGFja1RvcCgpIHtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuc3RhY2subGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gbGVuIC0gMTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jaGFuZ2VQYWdlKHBhZ2UsIENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW2xlbiAtIDFdID09IHBhZ2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zdGFjay5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BBbmltYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNBcnIgPSB0aGlzLnN0YWNrLnNwbGljZShpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGNBcnIgPSB0aGlzLnBhZ2VTdGFjay5zcGxpY2UoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvcEN1clBhZ2UoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRElSRUNUSU9OLlRPT0xEOy8vb2xkIHdpbGwgZGlzcGxheVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wYWdlU3RhY2sucHVzaChDb21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy/mlrDnmoTlh7rnjrBcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRElSRUNUSU9OLlRPTkVXO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERJUkVDVElPTi5JTklUO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkTmV3UGFnZShDb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q2hpbGRyZW4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgV1JBUENMQVNTKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldExhc3RDaGlsZCgpIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobGVuID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5bbGVuIC0gMV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvdyhub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9wb3BDdXJQYWdlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIC8vaW5kZXggIOS7peWPiuS5i+WQjmNoaWxkIGVsZW1lbnQg5YWo6YOo5Yig5o6JXHJcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4oKSxcclxuICAgICAgICAgICAgICAgIGxlbiA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGZvciAoOyBpbmRleCA8IGxlbjsgKytpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChjaGlsZHJlbltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShjaGlsZHJlbltpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yqo55S755qEZG9t5Li6IOW9k+WJjeenu+i1sCxpbmRleC0x56e75YWlXHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBsZXQgb2xkVG9TaG93ID0gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgIGxldCBsYXN0Q2hpbGQgPSB0aGlzLmdldExhc3RDaGlsZCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShsYXN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cclxuICAgICAgICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZCh0aGlzLmdldExhc3RDaGlsZCgpKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93KG9sZFRvU2hvdyk7XHJcbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfYWRkTmV3UGFnZShDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gV1JBUENMQVNTO1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICAgICAgICAgIHV0aWwuZXh0ZW5kKGRpdi5zdHlsZSwgdGhpcy5wcm9wcy53cmFwU3R5bGUgfHwge30pO1xyXG4gICAgICAgICAgICBsZXQgdyA9ICg8V3JhcD57Q29tcG9uZW50fTwvV3JhcD4pO1xyXG4gICAgICAgICAgICBSZWFjdERPTS5yZW5kZXIodywgZGl2KTtcclxuICAgICAgICAgICAgbGV0IGxhc3RDaGlsZCA9IHRoaXMuZ2V0TGFzdENoaWxkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFuaW1hdGlvbiAmJiB1dGlsLmlzRnVuY3Rpb24odGhpcy5wcm9wcy5vbkJlZm9yZUFuaW1hdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25CZWZvcmVBbmltYXRpb24uY2FsbCh0aGlzLCBsYXN0Q2hpbGQsIGRpdiwgdGhpcy5kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgbGV0IGhpZGVMYXN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShsYXN0Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZUFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyBoaWRlTGFzdCgpOyB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoPGRpdiByZWY9XCJjb250YWluZXJcIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBQYWdlci5sb2NrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OLklOSVQpIHtcclxuICAgICAgICAgICAgUGFnZXIudW5sb2NrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9ja1RhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gICAgfTtcclxuICAgIFBhZ2VyLnVubG9jayA9ICgpID0+IHtcclxuICAgICAgICBsb2NrVGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XHJcbiAgICB9O1xyXG4gICAgUGFnZXIuQW5pbWF0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6ICdQYWdlci5BbmltYXRpb24nLFxyXG5cclxuICAgICAgICBfY29weUNvbXBvbmVudExpc3QoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHRoaXMucHJvcHMuY2hpbGRyZW4uc2xpY2UoMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMucHJvcHMudHlwZTtcclxuICAgICAgICAgICAgdGhpcy5fY29weUNvbXBvbmVudExpc3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgICAvL+W8gOWni+WIpOaWreW9k+WJjWxzaXQg5ZKM5LiL5qyh55qEXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e1wiY29udGFpbmVyXCJ9IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgUGFnZXIuRElSRUNUSU9OID0gRElSRUNUSU9OO1xyXG4gICAgUGFnZXIuQW5pbWF0aW9uLnR5cGUgPSB7XHJcbiAgICAgICAgRU5URVI6IDEsXHJcbiAgICAgICAgTEVBVkU6IC0xXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhZ2VyO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNyZWF0ZVBhZ2VyLFxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZ2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicmVhY3QtZG9tXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=