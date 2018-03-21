import React, { Component } from "react";

import Document from "../Components/Document";
import Timeline from "./Timeline";
import Title from "../Components/Title";

class OfficialDocuments extends Component {

    constructor(props) {
        super(props);
        this.state = { 'regulatorDocuments': [], 'regulatorDocument': null};
    }

    componentDidMount() {
        this.getDocuments()
    }

    getTypeFiltered = async (type, filter) => {
        const query = encodeURIComponent(JSON.stringify(filter))
        const response = await fetch(`/api/com.biz.${type}?filter=${query}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    getDocuments() {
        this.getTypeFiltered('TrackerRequest', {})
            .then(res => { this.setState({ regulatorDocuments: res }); })
            .catch(err => console.log(err));
    };

    getProps(inx, array) {
        if (inx === array.length - 1)
            return { clear: 'right' }
        else
            return { float: 'left' }
    }

    regulatorDocumentClick(obj, sender) {
        this.setState({ regulatorDocument: obj})
    }

    render() {
        if(!this.state.regulatorDocument) {
            const rows = []
            var regulatorDocuments = this.state.regulatorDocuments
            rows.push(<Title title="Here you may oversee all documents" key="title" />)
            rows.push(<div className="container" key="cnt">{regulatorDocuments.map(function (d, key) {
                var props = this.getProps(key, regulatorDocuments)
                return <Document key={key} qrCode={d.qrCode} type={d.type} name={d.name} state={d.state} onClick={this.regulatorDocumentClick.bind(this, d)} {...props} />
            }, this)}</div>)
            return rows
        } else {
            return <Timeline key="timeline" curDocument={this.state.regulatorDocument} />
        }
    }
}

export default OfficialDocuments;
