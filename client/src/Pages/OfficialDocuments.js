import React, { Component } from "react";

import Title from "../Components/Title";
import OfficialDocument from "../Components/OfficialDocument";

class OfficialDocuments extends Component {

    constructor(props) {
        super(props);
        this.state = { 'officialDocuments': [] };
    }

    componentDidMount() {
        this.getDocuments()
    }

    getTypeFiltered = async (type, filter) => {
        type = encodeURIComponent(type)
        const query = encodeURIComponent(JSON.stringify(filter))
        const response = await fetch(`/api/com.biz.${type}?filter=${query}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    getDocuments() {
        this.getTypeFiltered('TrackerRequest', {})
            .then(res => { this.setState({ officialDocuments: res }); })
            .catch(err => console.log(err));
    };

    getProps(inx, array) {
        if (inx === array.length - 1)
            return { clear: 'right' }
        else
            return { float: 'left' }
    }

    officialDocumentClick(obj, sender) {
        var request = ''
        if (obj.state === 'NEW' || obj.state === 'WAITING_FOR_PROCESSING') {
            request = 'StartProcessingRequest'
        } else {
            request = 'EndProcessingRequest'
        }

        fetch(`/api/com.biz.${request}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "$class": `com.biz.${request}`,
                "request": `resource:com.biz.TrackerRequest#${obj.qrCode}`,
                "official": `resource:com.biz.Official#${this.props.curOfficial.eid}`,
            })
        }).then(res => {
            if (res.status !== 200) {
                alert(`Exception during saving the instance:\n\n${res.status}\n${res.statusText}`)
            } else {
                this.getDocuments();
            }
        }).catch(err => {
            alert(`Exception during saving the instance:\n\n${err.status}\n${err.statusText}`)
        })
    }

    render() {
        const rows = []
        var officialDocuments = this.state.officialDocuments
        rows.push(<Title title="Here you may work on documents" key="title" />)
        rows.push(<div className="container" key="cnt">{officialDocuments.map(function (d, key) {
            var props = this.getProps(key, officialDocuments)
            return <OfficialDocument key={key} qrCode={d.qrCode} type={d.type} description={d.currentOfficial} state={d.state} onClick={this.officialDocumentClick.bind(this, d)} {...props} />
        }, this)}</div>)
        return rows
    }
}

export default OfficialDocuments;
