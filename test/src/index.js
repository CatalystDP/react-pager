/**
 * Created by taddeng on 2016/4/23.
 */

let wrapper = document.getElementById('container');
let React = window.React = require('react');
let ReactDOM = window.ReactDOM = require('react-dom');
let Router = require('./router');
let Pager=require('Pager').createPager({
    enableAnimation:true,
    transition:'pager-slide',
    enter:'pager-slide-enter',
    reverseEnter:'pager-slide-reverse-enter',
    leave:'pager-slide-leave',
    reverseLeave:'pager-slide-reverse-leave',
    // removeActive:true,
    duration:0.5
});
let Page1 = require('./page1'),
    Page2 = require('./page2');
function changePage(page, Child) {
    let child;
    if(!Child){
        child=null;
    }else{
        child=<Child/>;
    }
    if (!Child) return;
    ReactDOM.render(<Pager page={page} component={child}/>, wrapper);
    Child = null;

}

Router.add('page1',(id,isOld,data)=>{
    changePage(id, Page1);
}).add('page2',(id,isOld,data)=>{
    changePage(id, Page2);
});
Router.go('page1');
let page1 = document.querySelector('#page1'),
    page2 = document.querySelector('#page2');
page1.onclick = function () {
    changePage('page1', Page1);
};
page2.onclick = function () {
    changePage('page2', Page2);
};