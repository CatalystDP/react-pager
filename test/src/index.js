/**
 * Created by taddeng on 2016/4/23.
 */

let wrapper = document.getElementById('container');
let React = window.React = require('react');
let ReactDOM = window.ReactDOM = require('react-dom');

let Router = require('./router');
const lock=(el,direction)=>{
    if(direction==require('Pager').DIRECTION.INIT) return;
    document.body.style.pointerEvents='none';
};
const unlock=()=>{
    document.body.style.pointerEvents='';
};
let Pager = require('Pager').createPager({
    enableAnimation: true,
    css: {
        transition: 'pager-slide',
        forward: 'pager-slide',
        backward: 'pager-slide-reverse'
    },
    animation:{
        beforeEnter:(el,direction)=>{
            Pager.lock();
        },
        afterLeave:()=>{
            Pager.unlock();
        }
    },
    cssTransitionGroup: require('ReactCssTransitionGroup'),
    duration: 400
});
let Page1 = require('./page1'),
    Page2 = require('./page2');
let Page3=require('./page3');
function changePage(page, Child) {
    let child;
    if (!Child) {
        child = null;
    } else {
        child = <Child/>;
    }
    if (!Child) return;
    // ReactDOM.unmountComponentAtNode(wrapper);
    ReactDOM.render(<Pager page={page} component={child}/>, wrapper);
    Child = null;

}

Router.add('page1', (id, isOld, data)=> {
    changePage(id, Page1);
}).add('page2', (id, isOld, data)=> {
    changePage(id, Page2);
}).add('page3',(id,isOld,data)=>{
    changePage(id,Page3);
});
Router.go('page1');
let page1 = document.querySelector('#page1'),
    page2 = document.querySelector('#page2'),
    page3=document.querySelector('#page3');
page1.onclick = function () {
    changePage('page1', Page1);
};
page2.onclick = function () {
    changePage('page2', Page2);
};
page3.onclick=function(){
    changePage('page3',Page3);
};
