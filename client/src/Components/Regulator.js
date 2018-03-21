import React, { Component } from "react";
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";
// import Home from "./Home";
// import Stuff from "./Stuff";

class Regulator extends Component {
  render() {
    return (
      <div className="card mx-1 mb-1" onClick={this.props.onClick} style={{width: 16 + 'rem', float: this.props.float, clear: this.props.clear}}>
        <img className="card-img-top citizen-img" src="images/regulator.png" alt=""/>
        <div className="card-body">
          <h5 className="card-title"><b>{this.props.firstName}</b> {this.props.lastName}</h5>
          <p className="card-text">{this.props.email}</p>
        </div>
      </div>
    );
  }
}
 
export default Regulator;
