import React, { Component } from "react";



	// {
	// 	"$class": "com.biz.Citizen",
	// 	"address1": "Address1",
	// 	"phoneNumber": "PhoneNumber",
	// 	"email": "CITIZEN_2",
	// 	"firstName": "CITIZEN_2",
	// 	"lastName": "Lastname"
	// }


class Citizen extends Component {
  render() {
    return (
      <div className="card mx-1 mb-1" onClick={this.props.onClick} style={{width: 16 + 'rem', float: this.props.float, clear: this.props.clear}}>
        <img className="card-img-top citizen-img" src="images/citizen.png" alt=""/>
        <div className="card-body">
          <h5 className="card-title"><b>{this.props.firstName}</b> {this.props.lastName}</h5>
          <p className="card-text">{this.props.email}</p>
          <p className="card-text">{this.props.phoneNumber}</p>
        </div>
      </div>
    );
  }
}
 
export default Citizen;
