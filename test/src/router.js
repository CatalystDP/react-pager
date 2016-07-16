
var _stack = [];
var Router = {
    _handlers:{},
    routes: {},
    add: function (id, handler) {
        this.routes[id] = this.routes[id] || [];
        this.routes[id].push(handler);
        return this;
    },
    remove: function (id) {
        this.routes[id] = null;
        return this;
    },
    flush: function () {
        this.routes = {};
        return this;
    },
    back: function () {
        this.go(_stack[_stack.length - 2]);
    },
    go: function (id, data) {
        var index = _stack.indexOf(id);
        if (index != -1) {
            //表示栈里面有要弹出
            _stack.splice(index + 1,_stack.length);
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
