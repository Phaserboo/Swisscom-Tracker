
import React, { Component } from "react";

class WelcomingJumbotron extends Component {
 
  render() {
    return (<div className="alert alert-info" role="alert">{this.props.title}</div>);
  }
}
 
export default WelcomingJumbotron;

