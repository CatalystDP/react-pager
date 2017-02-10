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
	    cssTransitionGroup: __webpack_require__(163),
	    duration: 400
	});
	var Page1 = __webpack_require__(169),
	    Page2 = __webpack_require__(170);
	var Page3 = __webpack_require__(171);
	function changePage(page, Child) {
	    var child = void 0;
	    if (!Child) {
	        child = null;
	    } else {
	        child = React.createElement(Child, null);
	    }
	    if (!Child) return;
	    // ReactDOM.unmountComponentAtNode(wrapper);
	
	    Child = null;
	}
	
	Router.add('page1', function (id, isOld, data) {
	    navigation.navigateTo('page1', React.createElement(Page1, null));
	}).add('page2', function (id, isOld, data) {
	    navigation.navigateTo('page2', React.createElement(Page2, null));
	}).add('page3', function (id, isOld, data) {});
	
	var page1 = document.querySelector('#page1'),
	    page2 = document.querySelector('#page2'),
	    page3 = document.querySelector('#page3');
	page1.onclick = function () {
	    Router.go('page1');
	};
	page2.onclick = function () {
	    Router.go('page2');
	};
	page3.onclick = function () {};
	var navigation = ReactDOM.render(React.createElement(Pager, { enableAnimation: true, onBeforeAnimation: function onBeforeAnimation(curNode, nextNode, direction) {
	        if (this.direction == Pager.DIRECTION.TONEW) {
	            nextNode.style.transform = 'translateX(100%) translateZ(0)';
	        } else if (this.direction == Pager.DIRECTION.TOOLD) {}
	    }, onAnimate: function onAnimate(cur, next, done, direction) {
	        if (direction == Pager.DIRECTION.INIT) done();
	        var count = 0;
	        this.animate(next, {
	            transform: 'translateX(0) translateZ(0)'
	        }, 1, function () {
	            ++count;
	            if (count >= 2) {
	                done();
	            }
	        });
	        this.animate(cur, {
	            transform: 'translateX(-100%) translateZ(0)'
	        }, 1, function () {
	            ++count;
	            if (count >= 2) {
	                done();
	            }
	        });
	    }, wrapStyle: {
	        position: 'absolute',
	        top: '0',
	        left: '0'
	    } }), wrapper);
	Router.go('page1');

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

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(29);
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

/***/ 169:
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

/***/ 170:
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

/***/ 171:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NyYy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhZ2VyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UxLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3JjL3BhZ2UzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlBLEtBQUksVUFBVSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZDtBQUNBLEtBQUksUUFBUSxPQUFPLEtBQVAsR0FBZSxvQkFBUSxDQUFSLENBQTNCO0FBQ0EsS0FBSSxXQUFXLE9BQU8sUUFBUCxHQUFrQixvQkFBUSxFQUFSLENBQWpDOztBQUVBLEtBQUksU0FBUyxvQkFBUSxHQUFSLENBQWI7QUFDQSxLQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsRUFBRCxFQUFLLFNBQUwsRUFBbUI7QUFDNUIsU0FBSSxhQUFhLG9CQUFRLEdBQVIsRUFBaUIsU0FBakIsQ0FBMkIsSUFBNUMsRUFBa0Q7QUFDbEQsY0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixhQUFwQixHQUFvQyxNQUFwQztBQUNILEVBSEQ7QUFJQSxLQUFNLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDakIsY0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixhQUFwQixHQUFvQyxFQUFwQztBQUNILEVBRkQ7QUFHQSxLQUFJLFFBQVEsb0JBQVEsR0FBUixFQUFpQixXQUFqQixDQUE2QjtBQUNyQyxzQkFBaUIsSUFEb0I7QUFFckMsVUFBSztBQUNELHFCQUFZLGFBRFg7QUFFRCxrQkFBUyxhQUZSO0FBR0QsbUJBQVU7QUFIVCxNQUZnQztBQU9yQyxnQkFBVztBQUNQLHNCQUFhLHFCQUFDLEVBQUQsRUFBSyxTQUFMLEVBQW1CO0FBQzVCLG1CQUFNLElBQU47QUFDSCxVQUhNO0FBSVAscUJBQVks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eSB0YWRkZW5nIG9uIDIwMTYvNC8yMy5cclxuICovXHJcblxyXG5sZXQgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxubGV0IFJlYWN0ID0gd2luZG93LlJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcblxyXG5sZXQgUm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcclxuY29uc3QgbG9jayA9IChlbCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09IHJlcXVpcmUoJ1BhZ2VyJykuRElSRUNUSU9OLklOSVQpIHJldHVybjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxufTtcclxuY29uc3QgdW5sb2NrID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJyc7XHJcbn07XHJcbmxldCBQYWdlciA9IHJlcXVpcmUoJ1BhZ2VyJykuY3JlYXRlUGFnZXIoe1xyXG4gICAgZW5hYmxlQW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3BhZ2VyLXNsaWRlJyxcclxuICAgICAgICBmb3J3YXJkOiAncGFnZXItc2xpZGUnLFxyXG4gICAgICAgIGJhY2t3YXJkOiAncGFnZXItc2xpZGUtcmV2ZXJzZSdcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb246IHtcclxuICAgICAgICBiZWZvcmVFbnRlcjogKGVsLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgUGFnZXIubG9jaygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXJMZWF2ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBQYWdlci51bmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzVHJhbnNpdGlvbkdyb3VwOiByZXF1aXJlKCdSZWFjdENzc1RyYW5zaXRpb25Hcm91cCcpLFxyXG4gICAgZHVyYXRpb246IDQwMFxyXG59KTtcclxubGV0IFBhZ2UxID0gcmVxdWlyZSgnLi9wYWdlMScpLFxyXG4gICAgUGFnZTIgPSByZXF1aXJlKCcuL3BhZ2UyJyk7XHJcbmxldCBQYWdlMyA9IHJlcXVpcmUoJy4vcGFnZTMnKTtcclxuZnVuY3Rpb24gY2hhbmdlUGFnZShwYWdlLCBDaGlsZCkge1xyXG4gICAgbGV0IGNoaWxkO1xyXG4gICAgaWYgKCFDaGlsZCkge1xyXG4gICAgICAgIGNoaWxkID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hpbGQgPSA8Q2hpbGQgLz47XHJcbiAgICB9XHJcbiAgICBpZiAoIUNoaWxkKSByZXR1cm47XHJcbiAgICAvLyBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHdyYXBwZXIpO1xyXG5cclxuICAgIENoaWxkID0gbnVsbDtcclxuXHJcbn1cclxuXHJcblJvdXRlci5hZGQoJ3BhZ2UxJywgKGlkLCBpc09sZCwgZGF0YSkgPT4ge1xyXG4gICAgbmF2aWdhdGlvbi5uYXZpZ2F0ZVRvKCdwYWdlMScsIDxQYWdlMSAvPik7XHJcbn0pLmFkZCgncGFnZTInLCAoaWQsIGlzT2xkLCBkYXRhKSA9PiB7XHJcbiAgICBuYXZpZ2F0aW9uLm5hdmlnYXRlVG8oJ3BhZ2UyJywgPFBhZ2UyIC8+KTtcclxufSkuYWRkKCdwYWdlMycsIChpZCwgaXNPbGQsIGRhdGEpID0+IHtcclxuXHJcbn0pO1xyXG5cclxubGV0IHBhZ2UxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UxJyksXHJcbiAgICBwYWdlMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlMicpLFxyXG4gICAgcGFnZTMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZTMnKTtcclxucGFnZTEub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFJvdXRlci5nbygncGFnZTEnKTtcclxufTtcclxucGFnZTIub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIFJvdXRlci5nbygncGFnZTInKTtcclxufTtcclxucGFnZTMub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn07XHJcbmxldCBuYXZpZ2F0aW9uID0gUmVhY3RET00ucmVuZGVyKDxQYWdlciBlbmFibGVBbmltYXRpb249e3RydWV9IG9uQmVmb3JlQW5pbWF0aW9uPXtmdW5jdGlvbiAoY3VyTm9kZSwgbmV4dE5vZGUsIGRpcmVjdGlvbikge1xyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uID09IFBhZ2VyLkRJUkVDVElPTi5UT05FVykge1xyXG4gICAgICAgIG5leHROb2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDEwMCUpIHRyYW5zbGF0ZVooMClgO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBQYWdlci5ESVJFQ1RJT04uVE9PTEQpIHtcclxuXHJcbiAgICB9XHJcbn0gfSBvbkFuaW1hdGU9e2Z1bmN0aW9uIChjdXIsIG5leHQsIGRvbmUsIGRpcmVjdGlvbikge1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PSBQYWdlci5ESVJFQ1RJT04uSU5JVCkgZG9uZSgpO1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIHRoaXMuYW5pbWF0ZShuZXh0LCB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVaKDApYFxyXG4gICAgfSwgMSwgKCkgPT4ge1xyXG4gICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgaWYgKGNvdW50ID49IDIpIHtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5hbmltYXRlKGN1ciwge1xyXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoLTEwMCUpIHRyYW5zbGF0ZVooMClgXHJcbiAgICB9LCAxLCAoKSA9PiB7XHJcbiAgICAgICAgKytjb3VudDtcclxuICAgICAgICBpZiAoY291bnQgPj0gMikge1xyXG4gICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0gfSB3cmFwU3R5bGU9e3tcclxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgdG9wOiAnMCcsXHJcbiAgICBsZWZ0OiAnMCdcclxufX0gLz4sIHdyYXBwZXIpO1xyXG5Sb3V0ZXIuZ28oJ3BhZ2UxJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NyYy9pbmRleC5qc1xuICoqLyIsIlxyXG52YXIgX3N0YWNrID0gW107XHJcbnZhciBSb3V0ZXIgPSB7XHJcbiAgICBfaGFuZGxlcnM6e30sXHJcbiAgICByb3V0ZXM6IHt9LFxyXG4gICAgYWRkOiBmdW5jdGlvbiAoaWQsIGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSB0aGlzLnJvdXRlc1tpZF0gfHwgW107XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNbaWRdLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB0aGlzLnJvdXRlc1tpZF0gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSB7fTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nbyhfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDJdKTtcclxuICAgIH0sXHJcbiAgICBnbzogZnVuY3Rpb24gKGlkLCBkYXRhKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gX3N0YWNrLmluZGV4T2YoaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAvL+ihqOekuuagiOmHjOmdouacieimgeW8ueWHulxyXG4gICAgICAgICAgICBfc3RhY2suc3BsaWNlKGluZGV4ICsgMSxfc3RhY2subGVuZ3RoKTtcclxuICAgICAgICAgICAgZXhlY3V0ZShfc3RhY2tbX3N0YWNrLmxlbmd0aCAtIDFdLCB0cnVlLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+ihqOekuuaYr+aWsOi/m+adpeeahOe7hOS7tlxyXG4gICAgICAgICAgICBleGVjdXRlKGlkLCBmYWxzZSwgZGF0YSkgJiYgX3N0YWNrLnB1c2goaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuZnVuY3Rpb24gZXhlY3V0ZShpZCwgaXNPbGQpIHtcclxuICAgIHZhciByID0gUm91dGVyLnJvdXRlc1tpZF07XHJcbiAgICBpZiAoIXIpIHJldHVybiBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcltpXS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcmMvcm91dGVyLmpzXG4gKiovIiwibGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbmxldCB1dGlsID0ge1xyXG4gICAgZXh0ZW5kKHRhcmdldCwgLi4uYXJncykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcmdzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IGFyZ3NbaV1ba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpcyhvYmosIHR5cGUpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc3BsaXQoJyAnKVsxXS5zdWJzdHIoLTIwKS5yZXBsYWNlKCddJywgJycpLnRvTG93ZXJDYXNlKCkgPT09IHR5cGU7XHJcbiAgICB9LFxyXG4gICAgaXNPYmplY3Qob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWwuaXMob2JqLCAnb2JqZWN0Jyk7XHJcbiAgICB9LFxyXG4gICAgaXNBcnJheShvYmopIHtcclxuICAgICAgICByZXR1cm4gdXRpbC5pcyhvYmosICdhcnJheScpO1xyXG4gICAgfSxcclxuICAgIGlzRnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHV0aWwuaXMob2JqLCAnZnVuY3Rpb24nKTtcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF1dGlsLmNzcy5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbC5jc3MuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzfCQpJywgJ2cnKSwgJyQxJykucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIG11bHRpcGxlIHNwYWNlcyB0byBvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTsgLy8gdHJpbSB0aGUgZW5kc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhY2xhc3NOYW1lICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICpcclxuICogQHR5cGUge3tJTklUOiBudW1iZXIsIFRPTkVXOiBudW1iZXIsIFRPT0xEOiBudW1iZXJ9fVxyXG4gKiAwIG1lYW5zIGluaXRcclxuICovXHJcbmNvbnN0IERJUkVDVElPTiA9IHtcclxuICAgIElOSVQ6IDAsXHJcbiAgICBUT05FVzogLTEsXHJcbiAgICBUT09MRDogMVxyXG59O1xyXG5jbGFzcyBQYWdlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdQYWdlckVycm9yJztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRzXHJcbiAqICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbl0g5b2TZW5hYmxlQW5pbWF0aW9uPXRydWXlubbkuJTkvKDlhaXkuoZ0cmFuc2l0aW9uR3JvdXDmnInmlYhcclxuICogICAgICAgICAgICAgQHBhcmFtIFtvcHRzLmFuaW1hdGlvbi5iZWZvcmVFbnRlcihlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uZW50ZXIoZWwsZGlyZWN0aW9uLGNhbGxiYWNrLHBhZ2UpXeWKqOeUu+e7k+adn+WQjuimgeiwg+eUqGNhbGxiYWNrXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYWZ0ZXJlbnRlcihlbCxkaXJlY3Rpb24scGFnZSldXHJcbiAqICAgICAgICAgICAgIEBwYXJhbSBbb3B0cy5hbmltYXRpb24uYmVmb3JlTGVhdmUoZWwsZGlyZWN0aW9uLHBhZ2UpXVxyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmxlYXZlKGVsLGRpcmVjdGlvbixjYWxsYmFjayxwYWdlKV3liqjnlLvnu5PmnZ/lkI7opoHosIPnlKhjYWxsYmFja1xyXG4gKiAgICAgICAgICAgICBAcGFyYW0gW29wdHMuYW5pbWF0aW9uLmFmdGVyTGVhdmUoZWwsZGlyZWN0aW9uLHBhZ2UpXVxyXG4gKiAgICAgIEBwYXJhbSBbb3B0cy5lbmFibGVBbmltYXRpb25dIHRydWXooajnpLrkvb/nlKjliqjnlLtcclxuICogICAgICAqKioqIGVuYWJsZUFuaW1hdGlvbj10cnVlICYmIOS8oOWFpeS6hmNzc1RyYW5zaXRpb25Hcm91cCDmg4XlhrXkuIvkvKAgKioqKlxyXG4gKiAgICAgIEBwYXJhbSBjc3MgY3Nz57G75ZCN5a+56LGhXHJcbiAqICAgICAgICAgICAgIFtjc3MudHJhbnNpdGlvbl0g55So5p2l5omn6KGM6L+H5rih55qE57G75ZCN5Y+v5Lul5pS+5YWldHJhbnNpc2lvbuW/hemcgOeahGNzc+WxnuaAp1xyXG4gKiAgICAgICAgICAgICBjc3MuZm9yd2FyZCDmraPlkJFjc3PnsbvlkI0g6ZyA6KaB5a6e546w57G75ZCNIHh4eC1lbnRlciB4eHgtZW50ZXItYWN0aXZlIHh4eC1sZWF2ZSB4eHgtbGVhdmUtYWN0aXZlXHJcbiAqICAgICAgICAgICAgIGNzcy5iYWNrd2FyZCDlj43lkJFjc3PnsbvlkI0g5ZCN56ew6KeE5YiZ5ZCMY3NzLmZvcndhcmRcclxuICogICAgICBAcGFyYW0gZHVyYXRpb24g5Yqo55S75oyB57ut5pe26Ze0IOWNleS9jSBtc1xyXG4gKiAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKiAgICAgICAgICAgICAg5Yqo55S76ZKp5a2Q5YaF55qEZGlyZWN0aW9u5piv55So5p2l5Yik5pat6aG16Z2i5YiH5o2i55qE5pa55ZCR55qEIFRPT0xE6KGo56S66ICB55qE6aG16Z2i6KaB5Ye65p2l5LqGIFRPTkVX6KGo56S65paw6aG16Z2i6KaB6L+b5p2l77yMSU5JVCDooajnpLrliJ3lp4vljJZcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVQYWdlcihvcHRzID0ge30pIHtcclxuICAgIGxldCBUcmFuc2l0aW9uR3JvdXAgPSBvcHRzLnRyYW5zaXRpb25Hcm91cDtcclxuICAgIGxldCBDc3NUcmFuc2l0aW9uR3JvdXAgPSBvcHRzLmNzc1RyYW5zaXRpb25Hcm91cDtcclxuICAgIGxldCBjc3MgPSBvcHRzLmNzcyB8fCB7fTtcclxuICAgIGxldCBhbmltYXRpb25PYmogPSBvcHRzLmFuaW1hdGlvbiB8fCB7fTtcclxuICAgIGxldCBkdXJhdGlvbiA9IHR5cGVvZiBvcHRzLmR1cmF0aW9uICE9ICd1bmRlZmluZWQnID8gb3B0cy5kdXJhdGlvbiA6IDMwMDtcclxuICAgIGxldCBkaXJlY3Rpb24gPSBESVJFQ1RJT04uSU5JVDtcclxuICAgIGxldCBsb2NrVGFyZ2V0ID0gb3B0cy5sb2NrVGFyZ2V0IHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07Ly/pu5jorqTplIFib2R55YWD57SgXHJcbiAgICBsZXQgQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6ICdDb250YWluZXInLFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdGhpcy5lbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmJlZm9yZUVudGVyKSAmJiBvcHRzLmVuYWJsZUFuaW1hdGlvbiAmJiBhbmltYXRpb25PYmouYmVmb3JlRW50ZXIodGhpcy5lbCwgZGlyZWN0aW9uLCBwYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxFbnRlcihkb25lKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB2YXIgX2RvbmUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfZG9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmFmdGVyRW50ZXIpICYmIGFuaW1hdGlvbk9iai5hZnRlckVudGVyKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmVudGVyKSkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uT2JqLmVudGVyKHRoaXMuZWwsIGRpcmVjdGlvbiwgX2RvbmUsIHBhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2RvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgICAgICB1dGlsLmlzRnVuY3Rpb24oYW5pbWF0aW9uT2JqLmFmdGVyTGVhdmUpICYmIG9wdHMuZW5hYmxlQW5pbWF0aW9uICYmIGFuaW1hdGlvbk9iai5hZnRlckxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRXaWxsTGVhdmUoZG9uZSkge1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcclxuICAgICAgICAgICAgdXRpbC5pc0Z1bmN0aW9uKGFuaW1hdGlvbk9iai5iZWZvcmVMZWF2ZSkgJiYgYW5pbWF0aW9uT2JqLmJlZm9yZUxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgcGFnZSk7XHJcbiAgICAgICAgICAgIHV0aWwuaXNGdW5jdGlvbihhbmltYXRpb25PYmoubGVhdmUpID8gYW5pbWF0aW9uT2JqLmxlYXZlKHRoaXMuZWwsIGRpcmVjdGlvbiwgZG9uZSwgcGFnZSkgOiBkb25lKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj47XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBXcmFwKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0+e3Byb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgfVxyXG4gICAgY29uc3QgV1JBUENMQVNTID0gJ3BhZ2VyLXdyYXAnO1xyXG4gICAgbGV0IFBhZ2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6ICdQYWdlcicsXHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERJUkVDVElPTi5JTklUO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25UaW1lb3V0UXVldWUgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUXVldWUgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTdGFjayA9IFtdOy8vc2F2ZSBSZWFjdCBDb21wb25lbnQgXHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICAgICAgLy8gaWYgKCF0aGlzLnByb3BzLmluaXRQYWdlfHwhdGhpcy5wcm9wcy5pbml0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aHJvdyBFcnJvcigncHJvcHMgRXJyb3InKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwgPSB0aGlzLnJlZnMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9jaGFuZ2VQYWdlKHRoaXMucHJvcHMuaW5pdFBhZ2UsIHRoaXMucHJvcHMuaW5pdENvbXBvbmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbmltYXRlKHRhcmdldCwgY3NzUHJvcHMsIHRpbWUsIGNhbGxiYWNrLCBlYXNpbmdGdW5jKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uID0gYGFsbCAke3RpbWV9c2A7XHJcbiAgICAgICAgICAgIGxldCB0aW1vdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRpbWUgKiAxMDAwICsgMjUpO1xyXG4gICAgICAgICAgICB0aGlzLmVucXVldWVUaW1lb3V0KHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXRpbC5leHRlbmQodGFyZ2V0LnN0eWxlLCBjc3NQcm9wcyk7XHJcbiAgICAgICAgICAgIH0sIDI1KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5xdWV1ZVRpbWVvdXQodGltb3V0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGVEb25lKGN1ck5vZGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FuaW1hdGUgZG9uZScpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoY3VyTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUXVldWUoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVxdWV1ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcEFuaW1hdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNBbmltYXRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FuaW1hdGUgc3RvcCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVF1ZXVlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnF1ZXVlVGltZW91dCh0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVvdXRRdWV1ZS5wdXNoKHRpbWVvdXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJUaW1lUXVldWUoKSB7XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9hbmltYXRpb25UaW1lb3V0UXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSB0aGlzLl9hbmltYXRpb25UaW1lb3V0UXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkb25lIOW9k+WJjeWKqOeUu+aJp+ihjOWujOWbnuiwg1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXJ0QW5pbWF0aW9uKGRvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZm46IChkaXJlY3Rpb24pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwuaXNGdW5jdGlvbih0aGlzLnByb3BzLm9uQW5pbWF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VyLCBuZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT05FVykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyID0gY2hpbGRyZW5bbGVuIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0gY2hpbGRyZW5bbGVuIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5UT09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyID0gY2hpbGRyZW5bbGVuIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0gY2hpbGRyZW5bbGVuIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uICE9IERJUkVDVElPTi5JTklUID8gdGhpcy5wcm9wcy5vbkFuaW1hdGUuYXBwbHkodGhpcywgW2N1ciwgbmV4dCwgdGhpcy5hbmltYXRlRG9uZS5iaW5kKHRoaXMsIGN1ciksIGRpcmVjdGlvbl0pIDogKGZ1bmN0aW9uICgpIHsgdGhpcy5fZGVxdWV1ZSgpOyB0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlOyB9LmJpbmQodGhpcykpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvblF1ZXVlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy/liqjnlLvpmJ/liJfph4zlj6rmnInkuIDkuKrml7bvvIznm7TmjqXmiafooYxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2RlcXVldWUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25RdWV1ZS5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBbmltYXRpbmcpIHJldHVybjsvL+W9k+WJjeWKqOeUu+aJp+ihjOWujOaJjeihjOe7p+e7reaJp+ihjFxyXG4gICAgICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5fYW5pbWF0aW9uUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgdC5mbih0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuYXZpZ2F0ZVRvKHBhZ2UsIGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VQYWdlKHBhZ2UsIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZ2V0U3RhY2tUb3AoKSB7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLnN0YWNrLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIGxlbiAtIDE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY2hhbmdlUGFnZShwYWdlLCBDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuc3RhY2subGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFja1tsZW4gLSAxXSA9PSBwYWdlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3RhY2suaW5kZXhPZihwYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjQXJyID0gdGhpcy5zdGFjay5zcGxpY2UoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBjQXJyID0gdGhpcy5wYWdlU3RhY2suc3BsaWNlKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3BDdXJQYWdlKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERJUkVDVElPTi5UT09MRDsvL29sZCB3aWxsIGRpc3BsYXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChwYWdlKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucGFnZVN0YWNrLnB1c2goQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgIC8v5paw55qE5Ye6546wXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERJUkVDVElPTi5UT05FVztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBESVJFQ1RJT04uSU5JVDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZE5ld1BhZ2UoQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldENoaWxkcmVuKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIFdSQVBDTEFTUyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRMYXN0Q2hpbGQoKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgbGV0IGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGxlbiA9PSAwKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuW2xlbiAtIDFdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZShub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3cobm9kZSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcG9wQ3VyUGFnZShpbmRleCkge1xyXG4gICAgICAgICAgICAvL2luZGV4ICDku6Xlj4rkuYvlkI5jaGlsZCBlbGVtZW50IOWFqOmDqOWIoOaOiVxyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKCksXHJcbiAgICAgICAgICAgICAgICBsZW4gPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBmb3IgKDsgaW5kZXggPCBsZW47ICsraW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQoY2hpbGRyZW5baW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoY2hpbGRyZW5baW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WKqOeUu+eahGRvbeS4uiDlvZPliY3np7votbAsaW5kZXgtMeenu+WFpVxyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgbGV0IG9sZFRvU2hvdyA9IGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICBsZXQgbGFzdENoaWxkID0gdGhpcy5nZXRMYXN0Q2hpbGQoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUobGFzdENoaWxkKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQodGhpcy5nZXRMYXN0Q2hpbGQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyhvbGRUb1Nob3cpO1xyXG4gICAgICAgICAgICBsYXN0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2FkZE5ld1BhZ2UoQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFdSQVBDTEFTUztcclxuICAgICAgICAgICAgZGl2LnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgICAgICAgICB1dGlsLmV4dGVuZChkaXYuc3R5bGUsIHRoaXMucHJvcHMud3JhcFN0eWxlIHx8IHt9KTtcclxuICAgICAgICAgICAgbGV0IHcgPSAoPFdyYXA+e0NvbXBvbmVudH08L1dyYXA+KTtcclxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKHcsIGRpdik7XHJcbiAgICAgICAgICAgIGxldCBsYXN0Q2hpbGQgPSB0aGlzLmdldExhc3RDaGlsZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBbmltYXRpb24gJiYgdXRpbC5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25CZWZvcmVBbmltYXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQmVmb3JlQW5pbWF0aW9uLmNhbGwodGhpcywgbGFzdENoaWxkLCBkaXYsIHRoaXMuZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgICAgIGxldCBoaWRlTGFzdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUobGFzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgaGlkZUxhc3QoKTsgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgcmVmPVwiY29udGFpbmVyXCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgUGFnZXIubG9jayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTi5JTklUKSB7XHJcbiAgICAgICAgICAgIFBhZ2VyLnVubG9jaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvY2tUYXJnZXQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgIH07XHJcbiAgICBQYWdlci51bmxvY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbG9ja1RhcmdldC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xyXG4gICAgfTtcclxuICAgIFBhZ2VyLkFuaW1hdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOiAnUGFnZXIuQW5pbWF0aW9uJyxcclxuXHJcbiAgICAgICAgX2NvcHlDb21wb25lbnRMaXN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnByb3BzLmNoaWxkcmVuLnNsaWNlKDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWV1ZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLnByb3BzLnR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvcHlDb21wb25lbnRMaXN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAgICAgLy/lvIDlp4vliKTmlq3lvZPliY1sc2l0IOWSjOS4i+asoeeahFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXtcImNvbnRhaW5lclwifSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJyB9fT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFBhZ2VyLkRJUkVDVElPTiA9IERJUkVDVElPTjtcclxuICAgIFBhZ2VyLkFuaW1hdGlvbi50eXBlID0ge1xyXG4gICAgICAgIEVOVEVSOiAxLFxyXG4gICAgICAgIExFQVZFOiAtMVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQYWdlcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjcmVhdGVQYWdlcixcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERQIG9uIDIwMTYvNy84LlxyXG4gKi9cclxubGV0IFJvdXRlcj1yZXF1aXJlKCcuL3JvdXRlcicpO1xyXG5sZXQgUmVhY3Q9cmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UxID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgbmFtZToncGFnZTEnLFxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgbGV0IHN0eWxlPXt9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuby1mbGlja2VyXCIgc3R5bGU9e3t3aWR0aDonMTAwJScsaGVpZ2h0OicxMDAlJyxiYWNrZ3JvdW5kOicjZWZlZmY0J319PlxyXG4gICAgICAgICAgICAgICAgcGFnZTFcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDoncmVkJ319PjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygncGFnZTEgd2lsbCB1bm1vdW50Jyk7XHJcbiAgICB9XHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cz1QYWdlMTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UxLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRFAgb24gMjAxNi83LzguXHJcbiAqL1xyXG5sZXQgUm91dGVyPXJlcXVpcmUoJy4vcm91dGVyJyk7XHJcbmxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBQYWdlMiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBuYW1lOidwYWdlMicsXHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vLWZsaWNrZXJcIiBzdHlsZT17e3dpZHRoOicxMDAlJyxoZWlnaHQ6JzEwMCUnLGJhY2tncm91bmQ6JyNlZmVmZjQnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTJcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6JzgwJScsaGVpZ2h0Oic1MCUnLGJhY2tncm91bmQ6J2JsdWUnfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UyLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGFkZGVuZyBvbiAyMDE2LzcvMTYuXHJcbiAqL1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBEUCBvbiAyMDE2LzcvOC5cclxuICovXHJcbmxldCBSb3V0ZXI9cmVxdWlyZSgnLi9yb3V0ZXInKTtcclxubGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IFBhZ2UyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIG5hbWU6J3BhZ2UzJyxcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm8tZmxpY2tlclwiIHN0eWxlPXt7d2lkdGg6JzEwMCUnLGhlaWdodDonMTAwJScsYmFja2dyb3VuZDonI2VmZWZmNCd9fT5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlM1xyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDonODAlJyxoZWlnaHQ6JzUwJScsYmFja2dyb3VuZDonZ3JlZW4nfX0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UyIHdpbGwgdW5tb3VudCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlMjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3JjL3BhZ2UzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==