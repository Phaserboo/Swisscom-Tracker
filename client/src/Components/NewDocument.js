
import React, { Component } from "react";
var QRCode = require('qrcode.react');

class NewDocument extends Component {

    constructor(props) {
        super(props);
        this.state = { 'qrCode': '', 'type': 'PASSPORT_RENEWAL', 'description': '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onQrChange(s) {
        this.setState({ qrCode: s.target.value })
    }

    onDescChange(s) {
        this.setState({ description: s.target.value })
    }

    onTypeChange(e) {
        this.setState({ type: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const owner = `resource:com.biz.Citizen#${this.props.curCitizen.email}`
        fetch('/api/com.biz.PlaceRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "$class": "com.biz.PlaceRequest",
                "qrCode": this.state.qrCode,
                "description": this.state.description,
                "type": this.state.type,
                "owner": owner
            })
        }).then(res => {
            if (res.status !== 200) {
                alert(`Exception during saving the instance:\n\n${res.status}\n${res.statusText}`)
            } else {
                // alert('Saved!')
                this.props.onSubmit()
            }
        }).catch(err => {
            alert(`Exception during saving the instance:\n\n${err.status}\n${err.statusText}`)
        })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputType">Type</label>
                            <select id="inputType" className="form-control" onChange={this.onTypeChange.bind(this)} value={this.state.type}>
                                <option value="PASSPORT_RENEWAL">PASSPORT_RENEWAL</option>
                                <option value="NEW_DRIVERLICENSE">NEW_DRIVERLICENSE</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="qrCode">QR Code Value</label>
                            <input type="text" className="form-control" id="qrCode" onChange={this.onQrChange.bind(this)} placeholder="QR Code content" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="descriptionTextarea">Description</label>
                            <textarea className="form-control" id="descriptionTextarea" rows="3" onChange={this.onDescChange.bind(this)}></textarea>
                        </div>
                        <div className="form-group col-md-6">
                            <label>QR Code</label>
                            <QRCode className="form-control"
                                style={{ width: '128px', height: '128px' }}
                                value={this.state.qrCode} />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="New document" />
                </form>
            </div>
        );
    }
}

export default NewDocument;

