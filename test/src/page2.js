/**
 * Created by DP on 2016/7/8.
 */
let Router=require('./router');
let React = require('react');
let Page2 = React.createClass({
        name:'page2',
        changePage(){
            Router.go('page1');
        },
        render(){
            return (
                <div className="no-flicker" style={{width:'100%',height:'100%',background:'grey'}}>
                    <button onClick={this.changePage}>page1</button>
                    page2
                </div>
            )
        },
        componentWillUnmount(){
            console.log('page2 will unmount');
        }
    }
);
module.exports = Page2;