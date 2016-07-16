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
        return (
            <div className="no-flicker" style={{width:'100%',height:'100%',background:'grey'}}>
                <button onClick={this.changePage}>page2</button>
                page1
            </div>
        )
    },
    componentWillUnmount(){
        console.log('page1 will unmount');
    }
});
module.exports=Page1;