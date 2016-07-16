/**
 * Created by taddeng on 2016/7/16.
 */
/**
 * Created by DP on 2016/7/8.
 */
let Router=require('./router');
let React = require('react');
let Page2 = React.createClass({
        name:'page3',
        render(){
            return (
                <div className="no-flicker" style={{width:'100%',height:'100%',background:'#efeff4'}}>
                    page2
                    <div style={{width:'80%',height:'50%',background:'green'}}></div>
                </div>
            )
        },
        componentWillUnmount(){
            console.log('page2 will unmount');
        }
    }
);
module.exports = Page2;