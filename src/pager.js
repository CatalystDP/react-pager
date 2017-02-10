let React = require('react');
let ReactDOM = require('react-dom');
let util = {
    extend(target, ...args) {
        for (let i = 0, len = args.length; i < len; ++i) {
            for (let key in args[i]) {
                target[key] = args[i][key];
            }
        }
    },
    is(obj, type) {
        return Object.prototype.toString.call(obj).split(' ')[1].substr(-20).replace(']', '').toLowerCase() === type;
    },
    isObject(obj) {
        return util.is(obj, 'object');
    },
    isArray(obj) {
        return util.is(obj, 'array');
    },
    isFunction(obj) {
        return util.is(obj, 'function');
    },
    css: {
        addClass(element, className) {
            if (className) {
                if (element.classList) {
                    element.classList.add(className);
                } else if (!util.css.hasClass(element, className)) {
                    element.className = element.className + ' ' + className;
                }
            }
            return element;
        },
        removeClass(element, className) {
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
        hasClass(element, className) {
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
const DIRECTION = {
    INIT: 0,
    TONEW: -1,
    TOOLD: 1
};
class PagerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PagerError';
    }
}

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
function createPager(opts = {}) {
    let TransitionGroup = opts.transitionGroup;
    let CssTransitionGroup = opts.cssTransitionGroup;
    let css = opts.css || {};
    let animationObj = opts.animation || {};
    let duration = typeof opts.duration != 'undefined' ? opts.duration : 300;
    let direction = DIRECTION.INIT;
    let lockTarget = opts.lockTarget || document.getElementsByTagName('body')[0];//默认锁body元素
    let Container = React.createClass({
        name: 'Container',
        componentWillMount() {
        },
        componentDidMount() {
            let page = this.props.page;
            this.el = ReactDOM.findDOMNode(this);
            util.isFunction(animationObj.beforeEnter) && opts.enableAnimation && animationObj.beforeEnter(this.el, direction, page);
        },
        componentWillEnter(done) {
            let page = this.props.page;
            var _done = () => {
                _done = null;
                done();
                util.isFunction(animationObj.afterEnter) && animationObj.afterEnter(this.el, direction, page);
            };
            if (util.isFunction(animationObj.enter)) {
                animationObj.enter(this.el, direction, _done, page);
            } else {
                _done();
            }
        },
        componentWillUnmount() {
            let page = this.props.page;
            util.isFunction(animationObj.afterLeave) && opts.enableAnimation && animationObj.afterLeave(this.el, direction, page);
        },
        componentWillLeave(done) {
            let page = this.props.page;
            util.isFunction(animationObj.beforeLeave) && animationObj.beforeLeave(this.el, direction, page);
            util.isFunction(animationObj.leave) ? animationObj.leave(this.el, direction, done, page) : done();
        },
        render() {
            return <div style={this.props.style} className={this.props.className}>{this.props.children}</div>;
        }
    });
    function Wrap(props) {
        return <div style={{ width: '100%', height: '100%' }}>{props.children}</div>
    }
    const WRAPCLASS = 'pager-wrap';
    let Pager = React.createClass({
        name: 'Pager',
        getInitialState() {
            this.direction = DIRECTION.INIT;
            this._isAnimating = false;
            this._animationTimeoutQueue = [];
            this._animationQueue = [];
            this.stack = [];
            this.pageStack = [];//save React Component 
            return {};
        },
        componentWillMount() {
            // if (!this.props.initPage||!this.props.initComponent) {
            //     throw Error('props Error');
            // }
        },
        componentDidMount() {
            this.el = this.refs.container;
            // this._changePage(this.props.initPage, this.props.initComponent);
        },
        animate(target, cssProps, time, callback, easingFunc) {
            target.style.transition = `all ${time}s`;
            let timout = setTimeout(() => {
                callback();
            }, time * 1000 + 25);
            this.enqueueTimeout(setTimeout(() => {
                util.extend(target.style, cssProps);
            }, 25));
            this.enqueueTimeout(timout);
        },
        animateDone(curNode) {
            console.log('animate done');
            this._isAnimating = false;
            this.hide(curNode);
            this.clearTimeQueue();
            this._dequeue();
        },
        stopAnimate() {
            if (!this._isAnimating) return;
            console.log('animate stop');
            this.clearTimeQueue();
            this._isAnimating = false;
        },
        enqueueTimeout(timeout) {
            this._animationTimeoutQueue.push(timeout);
        },
        clearTimeQueue() {
            while (this._animationTimeoutQueue.length > 0) {
                let t = this._animationTimeoutQueue.pop();
                clearTimeout(t);
            }
        },
        /**
         * @done 当前动画执行完回调
         */
        startAnimation(done) {
            this._animationQueue.push({
                direction: this.direction,
                fn: (direction) => {

                    if (util.isFunction(this.props.onAnimate)) {
                        let children = this.getChildren();
                        let len = children.length;
                        let cur, next;
                        if (direction == DIRECTION.TONEW) {
                            cur = children[len - 2];
                            next = children[len - 1];
                        } else if (direction == DIRECTION.TOOLD) {
                            cur = children[len - 1];
                            next = children[len - 2];
                        }
                        direction != DIRECTION.INIT ? this.props.onAnimate.apply(this, [cur, next, this.animateDone.bind(this, cur), direction]) : (function () { this._dequeue(); this._isAnimating = false; }.bind(this))();
                    }
                }
            });
            if (this._animationQueue.length === 1) {
                this._dequeue();
                //动画队列里只有一个时，直接执行
            }
        },
        _dequeue() {
            if (this._animationQueue.length == 0) return;
            if (this._isAnimating) return;//当前动画执行完才行继续执行
            this._isAnimating = true;
            let t = this._animationQueue.shift();
            t.fn(t.direction);
        },
        navigateTo(page, component) {
            this._changePage(page, component);
        },
        _getStackTop() {
            let len = this.stack.length;
            return len - 1;
        },
        _changePage(page, Component) {
            let len = this.stack.length;
            if (this.stack[len - 1] == page) return false;
            let index = this.stack.indexOf(page);
            this.stopAnimate();
            if (index != -1) {
                let cArr = this.stack.splice(index + 1);
                // let cArr = this.pageStack.splice(index + 1);
                this._popCurPage(index + 1);
                this.direction = DIRECTION.TOOLD;//old will display
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
        getChildren() {
            return this.el.querySelectorAll('.' + WRAPCLASS);
        },
        getLastChild() {
            let children = this.getChildren();
            let len = children.length;
            if (len == 0) return null;
            return children[len - 1];
        },
        hide(node) {
            if (node) {
                node.style.display = 'none';
            }
        },
        show(node) {
            if (node) {
                node.style.removeProperty('display');
            }
        },
        _popCurPage(index) {
            //index  以及之后child element 全部删掉
            let children = this.getChildren(),
                len = children.length - 1;
            for (; index < len; ++index) {
                this.el.removeChild(children[index]);
                ReactDOM.unmountComponentAtNode(children[index]);
            }
            //动画的dom为 当前移走,index-1移入
            children = this.getChildren();
            let oldToShow = children[children.length - 2];
            let lastChild = this.getLastChild();
            try {
                ReactDOM.unmountComponentAtNode(lastChild);
            } catch (e) { }
            this.el.removeChild(this.getLastChild());
            this.show(oldToShow);
            lastChild = null;
        },
        _addNewPage(Component) {
            let div = document.createElement('div');
            div.className = WRAPCLASS;
            div.style.width = '100%';
            div.style.height = '100%';
            util.extend(div.style, this.props.wrapStyle || {});
            let w = (<Wrap>{Component}</Wrap>);
            ReactDOM.render(w, div);
            let lastChild = this.getLastChild();
            if (this.props.enableAnimation && util.isFunction(this.props.onBeforeAnimation)) {
                this.props.onBeforeAnimation.call(this, lastChild, div, this.direction);
            }
            this.el.appendChild(div);
            let hideLast = () => {
                if (lastChild) {
                    this.hide(lastChild);
                }
            }
            if (this.props.enableAnimation) {
                this.startAnimation();
            } else { hideLast(); }

        },

        render() {

            return (<div ref="container" style={{ width: '100%', height: '100%' }}>

            </div>);
        }
    });
    Pager.lock = () => {
        if (direction == DIRECTION.INIT) {
            Pager.unlock();
            return;
        }
        lockTarget.style.pointerEvents = 'none';
    };
    Pager.unlock = () => {
        lockTarget.style.pointerEvents = 'auto';
    };
    Pager.Animation = React.createClass({
        name: 'Pager.Animation',

        _copyComponentList() {
            this.list = this.props.children.slice(0);
        },
        componentWillMount() {
            this._queue = [];
            this.type = this.props.type;
            this._copyComponentList();
        },
        componentDidMount() {
            this.startAnimation();
        },

        componentWillUpdate(nextProps, nextState) {
            //开始判断当前lsit 和下次的
        },
        componentDidUpdate(prevProps, prevState) {
            this.startAnimation();
        },
        render() {
            return (
                <div ref={"container"} style={{ width: '100%', height: '100%' }}>{this.props.children}</div>
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
    createPager,
};