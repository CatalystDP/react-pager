/**
 * Created by DP on 2016/7/8.
 */
let Router=require('./router');
let React=require('react');
let Page1 = React.createClass({
    name:'page1',
    render(){
        let style={}
        return (
            <div className="no-flicker" style={{width:'100%',height:'100%',background:'#efeff4'}}>
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