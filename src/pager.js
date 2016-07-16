let React = require('react');
let ReactDOM = require('react-dom');
let ReactTransitionGroup = require('ReactTransitionGroup');
let util = {
    extend(target, ...args){
        for (let i = 0, len = args.length; i < len; ++i) {
            for (let key in args[i]) {
                target[key] = args[i][key];
            }
        }
    },
    is(obj, type){
        return Object.prototype.toString.call(obj).split(' ')[1].substr(-20).replace(']', '').toLowerCase() === type;
    },
    isObject(obj){
        return util.is(obj, 'object');
    },
    isArray(obj){
        return util.is(obj, 'array');
    },
    isFunction(obj){
        return util.is(obj, 'function');
    },
    css:{
        addClass(element,className){
            if (className) {
                if (element.classList) {
                    element.classList.add(className);
                } else if (!util.css.hasClass(element, className)) {
                    element.className = element.className + ' ' + className;
                }
            }
            return element;
        },
        removeClass(element,className){
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
        hasClass(element,className){
            if (element.classList) {
                return !!className && element.classList.contains(className);
            }
            return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
        }
    }
};
const DIRECTION = {
    INIT: 0,
    TONEW: -1,
    TOOLD: 1
};

class CssAnimation {
    static   dasherize(str) {
        return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase()
    }

    constructor(opts) {
        this.transitionClass = opts.transition || '';
        this.enterClass = opts.enter || '';
        this.enterActiveClass = this.enterClass + '-active';
        this.reverseEnterClass = opts.reverseEnter || '';
        this.reverseEnterActiveClass = this.reverseEnterClass + '-active';
        this.leaveClass = opts.leave || '';
        this.leaveActiveClass = this.leaveClass + '-active';
        this.reverseLeaveClass = opts.reverseLeave || '';
        this.reverseLeaveActiveClass = this.reverseLeaveClass + '-active';
        this.duration = opts.duration || null;
        this.useAnimation = typeof opts.useAnimation == 'undefined' ? true : opts.useAnimation;
        this.removeActive = !!opts.removeActive;
        this.initAnimation();
        this.classNameAndNodeQueue = [];
    }

    normalizeEvent(name) {
        return this.eventPrefix ? this.eventPrefix + name : name.toLowerCase()
    }

    initAnimation() {
        //做一些初始化
        this.eventPrefix = null;
        let vendors = {Webkit: 'webkit', Moz: '', O: 'o'};
        let testEl = document.createElement('div');
        for (let vendor in vendors) {
            if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
                let event = vendors[vendor];
                this.eventPrefix = event;
                break;
            }
        }//找到支持的带transitionend前缀
        this.endEvent = this.normalizeEvent(this.useAnimation ? 'AnimationEnd' : 'TransitionEnd');
    }

    beforeEnter(el, direction, page) {
        if (!this.transitionClass) return;
        try {
            util.css.addClass(el,this.transitionClass);//为transition 增加单独的类
            console.log(`${page} beforeEnter`);
        } catch (e) {
            console.log(e);
        }

    }

    queueClassAndNode(className, node) {
        this.classNameAndNodeQueue.push({
            className: className,
            node: node
        });

        if (!this.timeout) {
            this.timeout = setTimeout(()=>{this.flushClassNameAndNodeQueue()}, 17);
        }
    }

    flushClassNameAndNodeQueue() {
        this.classNameAndNodeQueue.forEach(function (obj) {
            util.css.addClass(obj.node,obj.className);
        });
        this.classNameAndNodeQueue = [];
        this.timeout = null;
    }

    _animate({el, className, activeClassName, page}, callback) {
        try {
            util.css.addClass(el,this[className]);
        } catch (e) {
        }
        let fired = false;
        let timeout;
        let onTransitionEnd = ()=> {
            fired = true;
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            try {
                util.css.removeClass(el,this[className]);
                // this.removeActive? el.classList.remove(this[activeClassName]):void(0);
                util.css.removeClass(el,this[activeClassName]);
            } catch (e) {
                console.log(e);
            }
            el.removeEventListener(this.endEvent, onTransitionEnd, true);
            callback();
        };
        // if (this.duration != null) {
        //     timeout = setTimeout(()=> {
        //         timeout = null;
        //         if (!fired) {
        //             onTransitionEnd();//某些android上不会触发transitionEnd，确保触发这个事件
        //         }
        //     }, this.duration * 1000 + 25);
        // }
        // el.addEventListener(this.endEvent, onTransitionEnd, true);
        // this.queueClassAndNode(this[activeClassName], el);
        setTimeout(()=>{util.css.addClass(el,this[activeClassName])},1);
    };

    enter(el, direction, done, page) {

        if (direction == DIRECTION.TONEW) {
            console.log(`${page} will Enter and save`);
            this._animate({
                el,
                className: 'enterClass',
                activeClassName: 'enterActiveClass',
                page
            }, done);
        } else if (direction == DIRECTION.TOOLD) {
            console.log(`${page} will Enter`);
            this._animate({
                el,
                className: 'reverseEnterClass',
                activeClassName: 'reverseEnterActiveClass',
                page
            }, done);
        } else {
            done();
        }
    }

    afterEnter(el, direction, page) {
        console.log(`${page} after enter`);
    }

    beforeLeave(el, direction, page) {
        console.log(`${page} before leave`);
    }

    leave(el, direction, done, page) {
        if (direction == DIRECTION.TONEW) {
            console.log(`${page} will leave and save`);
            this._animate({
                el,
                page,
                className: 'leaveClass',
                activeClassName: 'leaveActiveClass'
            }, done);
        } else if (direction == DIRECTION.TOOLD) {
            console.log(`${page} will leave`);
            this._animate({
                el,
                page,
                className: 'reverseLeaveClass',
                activeClassName: 'reverseLeaveActiveClass'
            }, done)
        } else {
            done();
        }
    }

    afterLeave(pager, direction, page) {
        console.log(`${page} after leave`);
    }
}
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
function createPager(opts = {}) {
    let animationObj = opts.animation || new CssAnimation({
            transition: opts.transition,
            enter: opts.enter,
            reverseEnter: opts.reverseEnter,
            leave: opts.leave,
            reverseLeave: opts.reverseLeave,
            duration: opts.duration,
            removeActive: opts.removeActive,
            useAnimation: opts.useAnimation
        });
    let direction = 0;
    let Container = React.createClass({
        name: 'Container',
        componentWillMount(){
            this.classNameAndNodeQueue = [];
        },
        componentDidMount(){
            let page = this.props.page;
            this.el = ReactDOM.findDOMNode(this);
            util.isFunction(animationObj.beforeEnter) && opts.enableAnimation && animationObj.beforeEnter(this.el, direction, page);
        },
        componentWillEnter(done){
            let page = this.props.page;
            var _done = ()=> {
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
        componentWillUnmount(){
            let page = this.props.page;
            util.isFunction(animationObj.afterLeave) && opts.enableAnimation && animationObj.afterLeave(this.el, direction, page);
        },
        componentWillLeave(done){
            let page = this.props.page;
            util.isFunction(animationObj.beforeLeave) && animationObj.beforeLeave(this.el, direction, page);
            util.isFunction(animationObj.leave) ? animationObj.leave(this.el, direction, done, page) : done();
        },
        render(){
            return <div style={this.props.style}>{this.props.children}</div>;
        }
    });
    let Pager = React.createClass({
        name: 'Pager',
        getInitialState(){
            this.stack = [];
            return {page: null, component: null};
        },
        componentDidMount(){
            this._changePage(this.state.page || this.props.page);
        },
        shouldComponentUpdate(nextProps, nextState){
            return this._changePage(nextState.page || nextProps.page);
        },
        switchPage(page, component){
            this.setState({
                page,
                component
            });
        },
        _changePage(page){
            let len = this.stack.length;
            if (this.stack[len - 1] == page) return false;
            let index = this.stack.indexOf(page);
            if (index != -1) {
                this.stack.splice(index + 1);
                direction = DIRECTION.TOOLD;//old will display
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
        render(){
            let Component = this.state.component || this.props.component;
            let style = {
                width: '100%',
                height: '100%',
                left: 0,
                right: 0,
                position: 'absolute'
            };
            if (this.props.style) {
                util.extend(style, this.props.style);
            }
            let child = <Container key={this.state.page||this.props.page} page={this.state.page||this.props.page}
                                   style={style}>
                {React.cloneElement(Component)}
            </Container>;
            if (opts.enableAnimation) {
                return (<ReactTransitionGroup component='div' style={style}>
                    {child}
                </ReactTransitionGroup>);
            }
            return child;
        }
    });
    return Pager;
}
/**
 * @type {number}
 * 0 means initial
 * 1 means
 */

module.exports = {
    createPager,
    DIRECTION
};