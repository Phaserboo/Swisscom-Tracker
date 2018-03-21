
import React, { Component } from "react";

class WelcomingJumbotron extends Component {
 
  render() {
    return (
        <div className="jumbotron">
            <h1 className="display-4">{this.props.title}</h1>
            <p className="lead">{this.props.text}</p>
        </div>
    );
  }
}
 
export default WelcomingJumbotron;

