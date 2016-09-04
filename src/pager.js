let React = require('react');
let ReactDOM = require('react-dom');
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
    css: {
        addClass(element, className){
            if (className) {
                if (element.classList) {
                    element.classList.add(className);
                } else if (!util.css.hasClass(element, className)) {
                    element.className = element.className + ' ' + className;
                }
            }
            return element;
        },
        removeClass(element, className){
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
        hasClass(element, className){
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
    if (opts.animation && !(opts.transitionGroup||opts.cssTransitionGroup)) {
        throw new PagerError('you should provide ReactTransitionGroup to transitionGroup option');
    }
    let TransitionGroup = opts.transitionGroup;
    let CssTransitionGroup = opts.cssTransitionGroup;
    let css = opts.css || {};
    let animationObj = opts.animation || {};
    let duration = typeof opts.duration != 'undefined' ? opts.duration : 300;
    let direction = DIRECTION.INIT;
    let lockTarget=opts.lockTarget||document.getElementsByTagName('body')[0];//默认锁body元素
    let Container = React.createClass({
        name: 'Container',
        componentWillMount(){
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
            return <div style={this.props.style} className={this.props.className}>{this.props.children}</div>;
        }
    });
    let Pager = React.createClass({
        name: 'Pager',
        getInitialState(){
            this.stack = [];
            return {page: null, component: null};
        },
        componentDidMount(){
            this._changePage(this.props.page);
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
                    direction = DIRECTION.INIT;
                }
            }
            return true;
        },
        render(){
            let Component = this.props.component;
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
            let child = <Container key={this.props.page} page={this.props.page}
                                   style={style} className={opts.css.transition||''}>
                {Component}
            </Container>;
            if (opts.enableAnimation) {
                if (CssTransitionGroup) {
                    let className;
                    if (direction == DIRECTION.TONEW) {
                        className = css.forward;
                    } else if (direction == DIRECTION.TOOLD) {
                        className = css.backward;
                    } else {
                        className = '';
                    }
                    return <CssTransitionGroup component="div" transitionName={className}
                                               transitionEnterTimeout={duration} transitionLeaveTimeout={duration}>
                        {child}
                    </CssTransitionGroup>
                } else if (TransitionGroup) {
                    return (<TransitionGroup component='div' style={style}>
                        {child}
                    </TransitionGroup>);
                } else {
                    return Component;
                }
            } else {
                return Component;
            }

        }
    });
    Pager.lock=()=>{
        if(direction==DIRECTION.INIT){
            Pager.unlock();
            return;
        }
        lockTarget.style.pointerEvents='none';
    };
    Pager.unlock=()=>{
        lockTarget.style.pointerEvents='auto';
    };
    return Pager;
}

module.exports = {
    createPager,
    DIRECTION
};