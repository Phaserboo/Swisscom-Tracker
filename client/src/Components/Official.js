import React, { Component } from "react";
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";
// import Home from "./Home";
// import Stuff from "./Stuff";

class Official extends Component {
  render() {
    return (
    <div className="card mx-1 mb-1" onClick={this.props.onClick} style={{width: 16 + 'rem', float: this.props.float, clear: this.props.clear}}>
        <img className="card-img-top citizen-img" src="images/officer.png" alt=""/>
        <div className="card-body">
          <h5 className="card-title"><b>{this.props.eid}</b></h5>
          <p className="card-text">{this.props.firstName} {this.props.lastName}</p>
          <p className="card-text">{this.props.organization}</p>
        </div>
      </div>
    );
  }
}
 
export default Official;
