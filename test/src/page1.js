/**
 * Created by DP on 2016/7/8.
 */
let Router=require('./router');
let React=require('react');
let Page1 = React.createClass({
    name:'page1',
    changePage(){
        Router.go('page2');
    },
    render(){
        let style={}
        return (
            <div className="no-flicker pager-slide" style={{width:'100%',height:'100%',
            position:'absolute',background:'#efeff4',top:'0',left:'0'}}>
                <button onClick={this.changePage}>page2</button>
                page1
                <div style={{width:'80%',height:'50%',background:'red'}}></div>
            </div>
        )
    },
    componentWillUnmount(){
        console.log('page1 will unmount');
    }
});
module.exports=Page1;