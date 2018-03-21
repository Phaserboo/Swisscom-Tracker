import React, { Component } from "react";
var QRCode = require('qrcode.react');

class Citizen extends Component {
  render() {
    var img = 'images/stop.png'
    if(this.props.state === 'NEW' || this.props.state === 'WAITING_FOR_PROCESSING')
      img = 'images/start.png'

    return (
      <div className="card mx-1 card-doc mb-1" onClick={this.props.onClick} style={{float: this.props.float, clear: this.props.clear}}>
        <QRCode className="card-img-top citizen-img" 
          style={{width: '256px', height: '256px'}}
          value={this.props.qrCode} />
        <div className="card-body" style={{paddingTop: '0px'}}>
          <img className="img-center" src={img} alt=""/>
          <br/>
          <h5 className="card-text">QR: <b>{this.props.qrCode}</b></h5>
          <hr/>
          <h5 className="card-title">{this.props.type}</h5>
          <h5 className="card-title">{this.props.description}</h5>
          <p className="card-text">{this.props.state}</p>
        </div>
      </div>
    );
  }
}
 
export default Citizen;
