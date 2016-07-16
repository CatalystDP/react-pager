/**
 * Created by taddeng on 2016/7/16.
 */
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
            util.css.addClass(el, this.transitionClass);//为transition 增加单独的类
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
            this.timeout = setTimeout(()=> {
                this.flushClassNameAndNodeQueue()
            }, 17);
        }
    }

    flushClassNameAndNodeQueue() {
        this.classNameAndNodeQueue.forEach(function (obj) {
            util.css.addClass(obj.node, obj.className);
        });
        this.classNameAndNodeQueue = [];
        this.timeout = null;
    }

    _animate({el, className, activeClassName, page}, callback) {
        try {
            util.css.addClass(el, this[className]);
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
                util.css.removeClass(el, this[className]);
                // this.removeActive? el.classList.remove(this[activeClassName]):void(0);
                util.css.removeClass(el, this[activeClassName]);
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
        setTimeout(()=> {
            util.css.addClass(el, this[activeClassName])
        }, 1);
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